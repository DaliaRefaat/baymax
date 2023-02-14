<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class patient_lab_test extends Model
{
    use HasFactory;
    protected $fillable=['patient_id','test_path'];
}
