<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
      use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
           return $request->user()->items()->with('images')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
                   'name' => 'required|string|max:255',
                   'description' => 'nullable|string',
                   'cover_image' => 'nullable|image',
                   'gallery_images.*' => 'nullable|image',
               ]);

               $item = $request->user()->items()->create($validated);

               $this->handleImages($request, $item);

               return response()->json($item->load('images'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    $item = Item::with('images')->findOrFail($id);
             $this->authorize('view', $item);
             return $item;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
      $item = Item::findOrFail($id);
            $this->authorize('update', $item);

            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'cover_image' => 'nullable|image',
                'gallery_images.*' => 'nullable|image',
            ]);


            $item->update($validated);
            $this->handleImages($request, $item, true);

            return $item->load('images');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
     $item = Item::findOrFail($id);
            $this->authorize('delete', $item);

            foreach ($item->images as $image) {
                $this->safeDeleteImage($image);
            }

            $item->delete();

            return response()->noContent();
    }


 // 🔁 Manejo de imágenes de portada y galería
  protected function handleImages(Request $request, Item $item, $isUpdate = false)
  {
      // Borrar portada si hay y si es actualización
      if ($isUpdate && $item->coverImage) {
          $this->safeDeleteImage($item->coverImage);
          $item->coverImage()->delete();
      }

      // Borrar galería completa si es actualización
      if ($isUpdate) {
          foreach ($item->galleryImages as $oldImage) {
              $this->safeDeleteImage($oldImage);
              $oldImage->delete();
          }
      }

      // Subir nueva portada si existe
      if ($request->hasFile('cover_image')) {
          $coverPath = $this->storeUniqueImage($request->file('cover_image'));
          $item->images()->create([
              'path' => $coverPath,
              'from' => 'cover',
          ]);
      }

      // Subir nuevas imágenes de galería si existen
      if ($request->hasFile('gallery_images')) {
          foreach ($request->file('gallery_images') as $imageFile) {
              $path = $this->storeUniqueImage($imageFile);
              $item->images()->create([
                  'path' => $path,
                  'from' => 'gallery',
              ]);
          }
      }
  }



 protected function storeUniqueImage($file)
    {
        $hash = md5_file($file->getRealPath());
        $filename = $hash . '.' . $file->getClientOriginalExtension();
        $path = 'images/' . $filename;

        if (!Storage::disk('public')->exists($path)) {
            $file->storeAs('images', $filename, 'public');
        }

        return $path;
    }

    // Eliminar imagen del disco solo si nadie más la usa
    protected function safeDeleteImage(Image $image)
    {
        $count = Image::where('path', $image->path)->count();

        if ($count <= 1 && Storage::disk('public')->exists($image->path)) {
            Storage::disk('public')->delete($image->path);
        }

        $image->delete();
    }



}
