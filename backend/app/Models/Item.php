<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
   protected $fillable = ['name', 'description'];

   public function user()
   {
       return $this->belongsTo(User::class);
   }

  public function images()
  {
      return $this->hasMany(Image::class);
  }

  public function coverImage()
  {
      return $this->hasOne(Image::class)->where('from', 'cover');
  }

  public function galleryImages()
  {
      return $this->hasMany(Image::class)->where('from', 'gallery');
  }

}
