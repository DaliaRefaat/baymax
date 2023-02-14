<?php

namespace App\Http\Controllers;

use App\Models\chat;
use App\Models\Diagnosis;
use App\Models\patient;
use App\Models\patient_lab_test;
use App\Models\patient_prescription;
use App\Models\psychiatrist;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Http;

class PatientController extends Controller
{
  //

  public function index()
  {
    $patients = patient::all();
    $patientAll = [];
    foreach ($patients as $patient) {
      $patient->user;
      array_push($patientAll, $patient);
    }
    return $patientAll;
  }


  public function show(Request $request)
  {
    if(isset($request->id)){
      $patient = patient::findorfail($request->id);
      $patient->user;
    }
    else{
      $patient = auth()->user();
    }
    return ['user'=>$patient,'files'=>$this->getFiles($request)];
  }


  public function updateAuth(Request $request)
  {
    $patient = User::findorfail(auth()->id());
    $data =[
      'name' => $request->name,
      'email' => $request->email,
      'gender' => $request->gender,
      'phone' => $request->phone,
      'birth_date' => $request->birth_date
    ];
    if($request!==''){
      array_push($data,['password'=>bcrypt($request->password)]);
    }
    $patient->update($data);
    return $patient;
  }


  public function myQuestions()
  {
    $questions =  patient::findorfail(auth()->id())->questions;
    foreach ($questions as $question) {
      $answers = $question->answers;
      for ($i = 0; $i < count($answers); $i++) {
        $answers[$i] = [
          'psychiatrist_id' => $answers[$i]->psychiatrist_id,
          'psychiatrist_name' => User::find($answers[$i]->psychiatrist_id)->name,
          'answer' => $answers[$i]->answer,
          'date' => $answers[$i]->created_at
        ];
      }
    }
    return $questions;
  }

  public function chats(){
    $psychiatrist = Diagnosis::where('patient_id',auth()->id())->where('chat_allow','1')->get();
    for($i = 0 ;$i<count($psychiatrist);$i++){
      $psychiatrist[$i]->psychiatrist;
      $psychiatrist[$i] = [
        'id'=>$psychiatrist[$i]->psychiatrist->id,
        'name'=>$psychiatrist[$i]->psychiatrist->name,
        'img'=>$psychiatrist[$i]->psychiatrist->img
      ];
    }
    return $psychiatrist;
  }
  public function sendMsg(Request $request){
    if($request->psychiatrist_id == 1){
      $this->sendChatBot($request);
    }
    else{
      chat::create([
        'patient_id'=>auth()->id(),
        'psychiatrist_id'=>$request->psychiatrist_id,
        'msg'=>$request->msg,
        'sender'=>'patient'
      ]);
    }
  }
  public function getMsg(Request $request){
    $msgs = chat::where('patient_id',auth()->id())->where('psychiatrist_id',$request->psychiatrist_id)->get();
    $name=User::find($request->psychiatrist_id)->name;
    for ($i=0;$i<count($msgs);$i++) {
      $msgs[$i]=[
        'patient_name'=>auth()->user()->name,
        'psychiatrist_name'=>$name,
        'sender'=>$msgs[$i]->sender,
        'img'=>($msgs[$i]->sender==='patient')?auth()->user()->img:User::find($request->psychiatrist_id)->img,
        'msg'=>$msgs[$i]->msg,
        'date'=>$msgs[$i]->created_at
      ];
    }
    return $msgs;
  }
  public function sendChatBot(Request $request){
    chat::create([
      'patient_id' => auth()->id(),
      'psychiatrist_id' => $request->psychiatrist_id,
      'msg' => $request->msg,
      'sender' => 'patient'
    ]);

//    $replay = Http::get("http://127.0.0.1:5000/get?msg=".$request->msg);
      $replay =   json_decode(Http::get("http://127.0.0.1:5000/get?msg=".$request->msg), true);

    chat::create([
      'patient_id' => auth()->id(),
      'psychiatrist_id' => $request->psychiatrist_id,
      'msg' => $replay["msg"],
      'sender' => 'psychiatrist'
    ]);
  }
  public function uploadLabTest(Request $request)
  {
    if(isset($request->patient_id)){
      $id=$request->patient_id;
      $patient = \App\Models\User::find($request->patient_id);
      Notification::send($patient, new \App\Notifications\files("Your have New LabTest"));
    }
    else{
      $id=auth()->id();
    }
    $file = $request->labTest->getClientOriginalName();
    $path = $request->labTest->storeAs('labTestsPatient',$file,'public');

    patient_lab_test::create([
      'patient_id'=> $id,
      'test_path'=> $path
    ]);
    return $this->getFiles($request);
  }
  public function uploadPrescription(Request $request)
  {
    if(isset($request->patient_id)){
      $id=$request->patient_id;
      $patient = User::find($request->patient_id);
      Notification::send($patient, new \App\Notifications\files("Your have New Prescription"));
    }
    else{
      $id=auth()->id();
    }
    $file = $request->prescription->getClientOriginalName();
    $path = $request->prescription->storeAs('prescriptionsPatient',$file,'public');

    patient_prescription::create([
      'patient_id'=> $id,
      'prescription_path'=>$path
    ]);
    return $this->getFiles($request);
  }
  public function getFiles(Request $request)
  {
    $id = (isset($request->patient_id))? $request->patient_id : ((isset($request->id))? $request->id : auth()->id());

    $labTests = patient_lab_test::where('patient_id', $id)->get();
    $prescription = patient_prescription::where('patient_id', $id)->get();

    $files = [
      'labTest'=>$labTests,
      'prescription'=> $prescription
    ];
    return $files;
  }
}
