<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class question extends Model
{
  use HasFactory;
  protected $fillable = ['patient_id', 'title'];


  public function answers()
  {
    return $this->hasMany(question_answer::class, 'question_id');
  }
}
