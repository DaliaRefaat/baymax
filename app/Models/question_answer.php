<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class question_answer extends Model
{
    use HasFactory;
    protected $fillable=['question_id','psychiatrist_id','answer'];
}
