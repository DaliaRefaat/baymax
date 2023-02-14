<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class psychiatrist extends Model
{
  use HasFactory;
  protected $fillable = ['id', 'years_experience', 'details', 'specialization', 'API_Key', 'API_secret'];
  public $timestamps = false;

  public function user()
  {
    return $this->belongsTo(User::class, 'id');
  }
  public function sessions(){
    return $this->hasMany(Session::class);
  }
  public function articals()
  {
    return $this->hasMany(artical::class);
  }
}
