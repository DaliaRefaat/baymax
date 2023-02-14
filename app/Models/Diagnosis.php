<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnosis extends Model
{
    use HasFactory;
    protected $fillable=['patient_id','psychiatrist_id','chat_allow'];

    public function patient(){
      return $this->belongsTo(User::class);
    }

  public function psychiatrist(){
    return $this->belongsTo(User::class);
  }

}
