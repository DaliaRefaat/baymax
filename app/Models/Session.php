<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;
    protected $fillable=['psychiatrist_id','day','time','duration','price'];

    public function  psychiatrist(){
      return $this->belongsTo(User::class);
    }
}
