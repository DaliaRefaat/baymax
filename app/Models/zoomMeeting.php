<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class zoomMeeting extends Model
{
    use HasFactory;
  protected $fillable = ['meeting_id','start_url','join_url'];
  public $timestamps = false;
}
