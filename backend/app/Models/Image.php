<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['path', 'from'];

      public function item()
      {
          return $this->belongsTo(Item::class);
      }
}
