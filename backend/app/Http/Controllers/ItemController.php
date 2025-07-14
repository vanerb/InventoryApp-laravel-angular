<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ItemController extends Controller
{
     use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         return $request->user()->items;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $item = $request->user()->items()->create($request->validate([
               'name' => 'required|string|max:255',
               'description' => 'nullable|string',
           ]));

           return response()->json($item, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
          $item = Item::findOrFail($id);

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
           $item->update($request->only(['name', 'description']));
           return $item;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
     $item = Item::findOrFail($id);
       $this->authorize('delete', $item);
           $item->delete();
           return response()->noContent();
    }
}
