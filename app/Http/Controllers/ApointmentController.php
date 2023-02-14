<?php

namespace App\Http\Controllers;

use App\Mail\appointmentZoom;
use App\Models\psychiatrist;
use GuzzleHttp\Client;
use App\Models\apointment;
use App\Models\artical;
use App\Models\Diagnosis;
use App\Models\patient;
use App\Models\question;
use App\Models\Session;
use App\Models\zoomMeeting;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use MacsiDigital\Zoom\Facades\Zoom;
class ApointmentController extends Controller
{

    public function index(){
        $apointments=apointment::all();
        $apointmentsFiltered=[];
        foreach ($apointments as $apointment){
        $apointment->patient;
        $apointment->psychiatrist;
        $apointment->meeting;
        $apointmentData = [
          'id'=>$apointment->id,
          'patient_name'=>$apointment->patient->name,
          'psychiatrist'=>$apointment->psychiatrist->name,
          'date_created'=> $this->getDate(
          $apointment->created_at),
          'date'=> $this->getDate($apointment->date),
          'status'=>$this->status($apointment->status),
          'price'=>$apointment->price,
          'payment_operation_num'=>($apointment->payment_way===1)?"Pay Done":"Don't Pay",
          'rate'=>$apointment->rate,
          'start_url'=>$apointment->meeting->start_url,
          'join_url'=>$apointment->meeting->join_url
        ];
        array_push($apointmentsFiltered,$apointmentData);
        }
        return $apointmentsFiltered;
    }
    function status($s)
  { // 0=>witting 1=>day 2=>hour 3=>now 4=>Done 5=>cancel
      if($s==0)
        return "Witting";
      elseif($s==1)
        return "One day left";
      elseif($s==2)
        return "One hour left";
      elseif($s==3)
        return "Now";
      elseif($s==4)
        return "Done";
      elseif($s==5)
        return "Cancel";
    }
    public function getDate($date)
    {
      $d = new Carbon($date);
      return $d->year . "/" . $d->month . "/" . $d->day . " - " . $d->hour . ":" . $d->minute;
    }
    public function myApointment(Request $request){
        $apointmentsFiltered=[];
        if(auth()->user()->type==="patient"){
          $apointments = apointment::where('patient_id',auth()->id())->get();
          foreach ($apointments as $apointment){
            $apointment->psychiatrist;
            $apointment->meeting;
            $apointmentData = [
              'id'=>$apointment->id,
              'psychiatrist_id'=>$apointment->psychiatrist->id,
              'psychiatrist'=>$apointment->psychiatrist->name,
              'img_psychiatrist'=>$apointment->psychiatrist->img,
              'status'=>$this->status($apointment->status),
              'price'=>$apointment->price,
              'date'=>$this->getDate($apointment->date)
            ];
            array_push($apointmentsFiltered,$apointmentData);
          }
        }
        else if (auth()->user()->type==="psychiatrist"){
          $apointments = apointment::where('psychiatrist_id',auth()->id())->get();
      foreach ($apointments as $apointment){
        $apointment->patient;
        $apointment->meeting;

        $apointmentData = [
          'id'=>$apointment->id,
          'patient_name'=>$apointment->patient->name,
          'date_created'=> $this->getDate(
            $apointment->created_at),
          'date'=> $this->getDate(
            $apointment->date),
          'status'=>$this->status($apointment->status),
          'price'=>$apointment->price,
          'payment_way'
          => ($apointment->payment_way === 1) ? true :false,
        ];
        array_push($apointmentsFiltered,$apointmentData);
      }
        }
        return $apointmentsFiltered;
    }

    public function insert(Request $request){
          $date = new Carbon($request->date);
          $day=$date->dayOfWeek;
          $time = $date->format("H:i");
          $data = Session::where('psychiatrist_id',$request->psychiatrist_id)->where('day',$day)->where('time',$time)->get();
          // return $data;
          if(count($data)==0){
            return ["message"=>"Not found in appointments"];
          };
          $data2 = apointment::where('psychiatrist_id',$request->psychiatrist_id)
            ->where('date',$date->format('Y-m-d H:i'))->where('status','!=','4')->get();

          if(count($data2)!=0){
            return ["message"=>"This Appointment not avilable"];
          }

        $meeting = $this->createMeeting($request,$data);

        $apointment = apointment::create([
          'patient_id'=>auth()->id(),
          'psychiatrist_id'=>$request->psychiatrist_id,
          'date'=>(new Carbon($request->date))->format('Y-m-d H:i'),
          'status'=>0,
          'price'=> $data[0]["price"],
          'payment_way'=>'paypal',
          'zoomMeetings_id'=>$meeting->id
        //  'zoomMeetings_id'=>1
        ]);

        $data3 = Diagnosis::where('patient_id',auth()->id())->where('psychiatrist_id',$request->psychiatrist_id)->get();
        if(count($data3)==0){
          Diagnosis::create([
            'patient_id'=>auth()->id(),
            'psychiatrist_id'=>$request->psychiatrist_id
          ]);
        }
        Notification::send(auth()->user(),new \App\Notifications\apointment("Done Create Appointment and Send massage to your email for more details"));
        $psychiatrist = \App\Models\User::find($apointment->psychiatrist_id);
        Notification::send($psychiatrist,new \App\Notifications\apointment("Your have New Appointment and send massage to your email for more details"));

      $this->sendMail($apointment,"An appointment has been created");

        return response(["message"=>"Appointment is Done"]);

    }

  public function createMeeting(Request $request ,$data){

    $key = "TziLV2biR5yXFWMgeaJUMw";
    $secret = "qS5URkV6cudZcmShP90dn8XwaHhg1IvuoxJQ";
    // $user = psychiatrist::find($request->psychiatrist_id);
    // $key = $user->API_Key;
    // $secret = $user->API_secret;
    $payload = [
      'iss' => $key,
      'exp' => strtotime('+1 minute'),
    ];
    $jwt =  \Firebase\JWT\JWT::encode($payload, $secret, 'HS256');

    $client = new Client();
    $headers = [
      'Authorization' => 'Bearer '.$jwt,
      'Content-Type'  => 'application/json',
      'Accept'        => 'application/json',
    ];
    $path = 'users/me/meetings';
    $url = "https://api.zoom.us/v2/";

    $body = [
      'headers' => $headers,
      'body'    => json_encode([
        'topic'      => "Bay-Max Appointment With " . auth()->user()->name,
        'type'       => 2,
        'start_time' =>  new Carbon($request->date), #'2022-12-12 10:00:00'
        'duration'   => $data[0]["duration"],
        'agenda'     => null,
        'timezone'     => 'Africa/Cairo',
        'settings'   => [
          'host_video'        =>  false,
          'participant_video' => false,
          'waiting_room'      => true,
        ],
      ]),
    ];

    $response =  $client->post($url.$path, $body);
    $meeting =   json_decode($response->getBody(), true);

    return zoomMeeting::create([
      'meeting_id'=>$meeting["id"],
      'start_url'=>$meeting["start_url"],
      'join_url'=>$meeting["join_url"]
    ]);
  }


  public function deleteAppointment(Request $request)
  {
    $appoint = apointment::find($request->id);

    if($appoint->status===4|| $appoint->status === 5){
      apointment::destroy($appoint->id);
    }
    else{
      $appoint->update(['status'=>'5']);
    }
  }

  public function createMeeting2(Request $request ,$data){
    $user = Zoom::user()->first();
    $meeting =Zoom::meeting()->make([
      'topic' => 'Bay-Max Appointment ',
      'duration'=>$data[0]["duration"],
      'type'=>8,
      'start_time' =>  new Carbon($request->date), #'2022-12-12 10:00:00'
      'timezone'=>'Africa/Cairo'
    ]);
    $meeting->settings()->make([
      'join_before_host' => true,
      'approval_type' => 1,
      'registration_type' => 2,
      'enforce_login' => false,
      'waiting_room' => false,
    ]);
    $meeting->recurrence()->make([
      'type' => 2,
      'repeat_interval' => 1,
      'weekly_days' => '2',
      'end_times' => 0,
    ]);
    $meetingData = $user->meetings()->save($meeting);
//      return $meetingData;
    return zoomMeeting::create([
      'meeting_id'=>$meetingData->id,
      'start_url'=>$meetingData->start_url,
      'join_url'=>$meetingData->join_url
    ]);
  }


    public function sendMail(apointment $apointment,string $message){
      $apointment->patient;
      $apointment->psychiatrist;
      $messageData = [
        'toUser'=>$apointment->patient->name,
        'withUser'=>"Dr / " . $apointment->psychiatrist->name,
        'start_Time'=>$apointment->date,
        'message'=>$message
      ];
      Mail::to('mo7amed.said.223@gmail.com')->send(new \App\Mail\apointment($messageData));

      $messageData2 = [
        'withUser'=>"patient / " . $apointment->patient->name,
        'toUser'=>"Dr /" . $apointment->psychiatrist->name,
        'start_Time'=>$apointment->date,
        'message'=>$message
      ];
      Mail::to('mo7amed.said.223@gmail.com')->send(new \App\Mail\apointment($messageData2));
    }
  public function sendMailZoom(apointment $apointment,string $message){
    $apointment->patient;
    $apointment->psychiatrist;
    $apointment->meeting;

    $messageData = [
      'toUser'=>$apointment->patient->name,
      'withUser'=>"Dr / " . $apointment->psychiatrist->name,
      'start_Time'=>"Now",
      'message'=>$message,
      'link'=>$apointment->meeting->join_url
    ];
    Mail::to('mo7amed.said.223@gmail.com')->send(new \App\Mail\apointment($messageData));

    $messageData2 = [
      'withUser'=>"patient / " . $apointment->patient->name,
      'toUser'=>"Dr /" . $apointment->psychiatrist->name,
      'start_Time'=>'Now',
      'message'=>$message,
      'link'=>$apointment->meeting->start_url
    ];
    Mail::to('mo7amed.said.223@gmail.com')->send(new \App\Mail\apointment($messageData2));
  }
    public function checkApointmentBeforeHour(){
      $meetings = apointment::whereTime('date','<=',date("H:i",strtotime("+3 Hour")))
        ->where('status','1')->get();
      foreach ($meetings as $meeting){
        $this->sendMail($meeting , "One hour left until the appointment");
        $meeting->status = 2;
        $meeting->save();
      }
      return "Done";
    }
  public function checkApointmentBeforeDay(){
    $meetings = apointment::whereTime('date','<=',date("H:i",strtotime("+24 Hour")))
      ->where('status','0')->get();
    foreach ($meetings as $meeting){
      $this->sendMail($meeting , "One day left until the appointment");
      $meeting->status = 1;
      $meeting->save();
    }
    return "Done";
  }

  public function checkApointmentNow(){
    $meetings = apointment::whereTime('date','<=',date("H:i",strtotime("+0 Hour")))
      ->where('status','2')->get();
    foreach ($meetings as $meeting){
      $this->sendMailZoom($meeting , "One day left until the appointment");
      $meeting->status = 3;
      $meeting->save();
    }
    return "Done";
  }
  public function checkApointmentComplete(){
    $meetings = apointment::whereTime('date','<=',date("H:i",strtotime("-1 Hour")))
      ->where('status','3')->get();
    foreach ($meetings as $meeting){
      $meeting->status = 4;
      $meeting->save();
    }
    return "Done";
  }

  public function todayAppointment()
  {
    $apointmentsFiltered = [];
    $appointments =  apointment::where('psychiatrist_id',auth()->id())->whereDate('date',Carbon::today())->where('status','!=',4)->get();
    foreach ($appointments as $apointment) {
      $apointment->patient;

      $apointmentData = [
        'id' => $apointment->id,
        'patient_id'=>$apointment->patient->id,
        'patient_name' => $apointment->patient->name,
        'date' => $this->getDate(
          $apointment->date
        ),
        'patient_img'=> $apointment->patient->img
      ];
      array_push($apointmentsFiltered, $apointmentData);
    }
    return $apointmentsFiltered;
  }

    public function zoomtest(){
      $key = "KcKoCAiGQVaQ8raR4jPINA";
      $secret = "kIIaRCnIi7T357auUIOnQuUR8wXZyyFvaOTr";
      $payload = [
        'iss' => $key,
        'exp' => strtotime('+1 minute'),
      ];
      $jwt =  \Firebase\JWT\JWT::encode($payload, $secret, 'HS256');

      $client = new Client();
      $headers = [
        'Authorization' => 'Bearer '.$jwt,
        'Content-Type'  => 'application/json',
        'Accept'        => 'application/json',
      ];
      $path = 'users/me/meetings';
      $url = "https://api.zoom.us/v2/";

      $body = [
        'headers' => $headers,
        'body'    => json_encode([
          'topic'      => "Appointment Bay Max",
          'type'       => 2,
          'start_time' =>  new Carbon('2023-01-01 10:00:00'),
          'duration'   => 30,
          'agenda'     => null,
          'timezone'     => 'Africa/Cairo',
          'settings'   => [
            'host_video'        =>  false,
            'participant_video' => false,
            'waiting_room'      => true,
          ],
        ]),
      ];

      $response =  $client->post($url.$path, $body);
      $meeting =   json_decode($response->getBody(), true);

      return [
        'meeting_id'=>$meeting["id"],
        'start_url'=>$meeting["start_url"],
        'join_url'=>$meeting["join_url"]
      ];
    }
public function pay(Request $request){
    $status = apointment::find($request->id);
    $x = ($status->payment_way == '1') ? 0 : 1 ;
    apointment::find($request->id)->update(['payment_way'=>$x]);
    return $status;
  }
    public function adminHome()
    {
      return[
        'patient'=>patient::all()->count(),
        'psychiatrist'=>psychiatrist::all()->count() - 1,
        'artical'=>artical::all()->count(),
        'appointment'=>apointment::all()->count(),
        'appointmentToDay'=>apointment::whereDate('date',Carbon::today())->where('status','!=',4)->get()->count(),
        'question'=>question::all()->count()
      ];
    }

}
