<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class apointment extends Model
{
    use HasFactory;

    protected $fillable=['patient_id','psychiatrist_id','date','status','price','payment_way','rate','zoomMeetings_id'];

    public function patient()
    {
      return $this->belongsTo(User::class, 'patient_id');
    }
  public function psychiatrist()
  {
    return $this->belongsTo(User::class, 'psychiatrist_id');
  }
  public function meeting(){
    return $this->belongsTo(zoomMeeting::class, 'zoomMeetings_id');
  }

}
