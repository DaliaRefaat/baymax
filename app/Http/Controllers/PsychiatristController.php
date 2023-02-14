<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ApointmentController;
use App\Mail\appointmentZoom;
use App\Models\apointment;
use App\Models\artical;
use App\Models\chat;
use App\Models\Diagnosis;
use App\Models\psychiatrist;
use App\Models\User;
use Illuminate\Http\Request;

class PsychiatristController extends Controller
{
  public function index()
  {
    $psychiatrists = psychiatrist::where('id','!=','1')->get();
    $psychiatristAll = [];
    foreach ($psychiatrists as $psychiatrist) {
      $psychiatrist->user;

      array_push($psychiatristAll, [
        'id'=> $psychiatrist->user->id,
        'name'=> $psychiatrist->user->name,
        'email'=> $psychiatrist->user->email,
        'phone'=> $psychiatrist->user->phone,
        'img'=> $psychiatrist->user->img,
        'years_experience'=> $psychiatrist->years_experience,
        'specialization'=> $psychiatrist->specialization,
        'articals'=>  count(psychiatrist::findorfail($psychiatrist->user->id)->articals),
        'appointments'=> apointment::where('psychiatrist_id', $psychiatrist->user->id)->get()->count(),
        'patients'=>Diagnosis::where('psychiatrist_id', $psychiatrist->user->id)->get()->count()
      ]);
    }
    return $psychiatristAll;
  }


  public function show(Request $request)
  {
    if (isset($request->id)) {
      $psychiatrist = psychiatrist::findorfail($request->id);
    } else {
      $psychiatrist = psychiatrist::findorfail(auth()->id());
    }
    $reviews=[];
    $reviews2=apointment::where('psychiatrist_id',$psychiatrist->id)->where('status','4')->limit(5)->get();
    foreach ($reviews2 as  $review) {
      $review->patient;
      array_push($reviews,[
        'patient'=>$review->patient->name,
        'img'=>$review->patient->img,
        'rate'=>$review->rate
      ]);
    }
    $psychiatrist=[
    "id"=> $psychiatrist->id,
    "years_experience"=> $psychiatrist->years_experience,
    "details"=> $psychiatrist->details,
    "specialization"=>$psychiatrist->specialization,
    "API_Key"=> $psychiatrist->API_Key,
    "API_secret" => $psychiatrist->API_secret,
    'user'=> $psychiatrist->user,
    'sessions'=> $psychiatrist->sessions,
    'review'=>$reviews
    ];
    return $psychiatrist;
  }


  public function updateAuth(Request $request)
  {
    $psychiatrist = User::findorfail(auth()->id());
    $psychiatrist->update([
      'name' => $request->name,
      'email' => $request->email,
      'gender' => $request->gender,
      'phone' => $request->phone,
      'birth_date' => $request->birth_date,
      // 'password' => bcrypt($request->password),
      'years_experience'=>$request->years_experience,
      'details'=>$request->details,
      'specialization'=>$request->specialization
    ]);
    $psychiatrist2 = psychiatrist::find(auth()->id());
    $psychiatrist2->update([
      'years_experience'=>$request->years_experience,
      'details'=>$request->details,
      'specialization'=>$request->specialization
    ]);
    return $psychiatrist;
  }
  public function myArticals()
  {
    $articals =  psychiatrist::findorfail(auth()->id())->articals;
    return $articals;
  }
  public function avilable(){
    $psychiatrists =  User::where('id','!=',1)->where('status','1')->where('type','psychiatrist')->get();
    for($i = 0 ; $i<count($psychiatrists);$i++){

      $psychiatrists[$i]->psychiatrist;
      $psychiatrists[$i]=[
        'id'=>$psychiatrists[$i]->id,
        'name'=>$psychiatrists[$i]->name,
        'img'=>$psychiatrists[$i]->img,
        'specialization'=>$psychiatrists[$i]->psychiatrist->specialization
      ];
  }
    return $psychiatrists;
  }
  public function allowChat(Request $request){
    $status = Diagnosis::where('psychiatrist_id',auth()->id())->where('patient_id',$request->id)->get();
    $x = ($status[0]->chat_allow === 1) ? 0 : 1 ;
    Diagnosis::where('psychiatrist_id', auth()->id())->where('patient_id', $request->id)->update(['chat_allow'=>$x]);
    return $status;
  }

  public function chats(){
    $patient = Diagnosis::where('psychiatrist_id',auth()->id())->where('chat_allow','1')->get();
    for($i = 0 ;$i<count($patient);$i++){
      $patient[$i]->patient;
      $patient[$i] = [
        'id'=>$patient[$i]->patient->id,
        'name'=>$patient[$i]->patient->name,
        'img'=>$patient[$i]->patient->img
      ];
    }
    return $patient;
  }
  public function sendMsg(Request $request){
    chat::create([
      'psychiatrist_id'=>auth()->id(),
      'patient_id'=>$request->patient_id,
      'msg'=>$request->msg,
      'sender'=>'psychiatrist'
    ]);
  }
  public function getMsg(Request $request){
    $msgs = chat::where('psychiatrist_id',auth()->id())->where('patient_id',$request->patient_id)->get();
    $name = User::find($request->patient_id)->name;
    for ($i = 0; $i < count($msgs); $i++) {
      $msgs[$i] = [
        'patient_name' => $name,
        'psychiatrist_name' => auth()->user()->name,
        'sender' => $msgs[$i]->sender,
        'img' => ($msgs[$i]->sender === 'patient') ? User::find($request->patient_id)->img:auth()->user()->img  ,
        'msg' => $msgs[$i]->msg,
        'date' => $msgs[$i]->created_at
      ];
    }
    return $msgs;
  }

  public function zoomSettings(Request $request)
  {
    $psychiatrist = psychiatrist::find(auth()->id());
    $psychiatrist->update([
      'API_Key'=>$request->API_Key,
      'API_secret'=>$request->API_secret
    ]);
  }
  public function home()
  {
    return [
      'patient'=>Diagnosis::where('psychiatrist_id',auth()->id())->get()->count(),
      'appointment'=>apointment::where('psychiatrist_id',auth()->id())->get()->count(),
      'todayAppointment'=>count((new ApointmentController())->todayAppointment()),
      'articals'=>artical::where('psychiatrist_id',auth()->id())->get()->count(),
      'todayAppointmentCards'=> (new ApointmentController())->todayAppointment()
    ];
  }
  public function myPatient(Request $request)
  {
    $patients =  Diagnosis::where('psychiatrist_id',auth()->id())->get();
    // return $patients;
    // return auth()->id();
    for ($i = 0; $i < count($patients); $i++) {
      $patients[$i]->patient;
      $patients[$i] = [
        'id' => $patients[$i]->patient->id,
        'name' => $patients[$i]->patient->name,
        'allow_chat' => ($patients[$i]->chat_allow==1),
        'date'=>(new ApointmentController())->getDate($patients[$i]->created_at)
      ];
    }
    return $patients;
  }

}
