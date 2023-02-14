<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class artical_comment extends Model
{
    use HasFactory;
    protected $fillable=['artical_id','patient_id','comment'];
}
