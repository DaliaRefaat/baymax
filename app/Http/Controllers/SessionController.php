<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    //

    public function index()
    {
      $sessions = Session::all();
      $sessionsFiltered = [];
      foreach ($sessions as $sesstion){
        $sesstion->psychiatrist;
        $sesstionOnly = [
          'id'=>$sesstion->id,
          'day'=>$sesstion->day,
          'time'=>$sesstion->time,
          'duration'=>$sesstion->duration,
          'price'=>$sesstion->price,
          'psychiatristName'=>$sesstion->psychiatrist->name
        ];
        array_push($sessionsFiltered,$sesstionOnly);
      }
      return $sessionsFiltered;

    }

    public function insert(Request $request){
      $sesstionData = [
        'day'=>$request->day,
        'time'=>$request->time,
        'duration'=>$request->duration,
        'price'=>$request->price
      ];
      if(isset($request->psychiatrist_id)){
        $sesstionData= array_merge($sesstionData,['psychiatrist_id'=>$request->psychiatrist_id]);
      }
      else{
        $sesstionData = array_merge($sesstionData,['psychiatrist_id'=>auth()->id()]);
      }
        $sesstion = Session::create($sesstionData);
        $sesstion->psychiatrist;
        return $sesstion;
    }

    public function delete(Request $request){
      Session::destroy($request->id);
    }

    public function psychiatristSession(Request $request){
      if(isset($request->psychiatrist_id)){
        return Session::all()->where('psychiatrist_id',$request->psychiatrist_id);
      }
      return Session::all()->where('psychiatrist_id',auth()->id());
    }
}
