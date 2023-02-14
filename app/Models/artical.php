<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class artical extends Model
{
    use HasFactory;
    protected $fillable=['psychiatrist_id','title','type','body','img'];

  public function comments()
  {
    return $this->hasMany(artical_comment::class, 'artical_id');
  }
}
