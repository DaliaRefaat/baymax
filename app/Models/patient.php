<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class patient extends Model
{
  use HasFactory;
  protected $fillable = ['id', 'num_of_bot'];
  public $timestamps = false;

  public function user()
  {
    return $this->belongsTo(User::class, 'id');
  }
  public function questions()
  {
    return $this->hasMany(question::class);
  }
}
