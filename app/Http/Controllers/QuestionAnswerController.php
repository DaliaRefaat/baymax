<?php

namespace App\Http\Controllers;

use App\Models\question;
use App\Models\question_answer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class QuestionAnswerController extends Controller
{
  //
  public function insert(Request $request)
  {
    $id = (auth()->user()->type === 'admin') ? 1 : auth()->id();
    question_answer::create([
      'psychiatrist_id' => $id,
      'question_id' => $request->question_id,
      'answer' => $request->answer,
    ]);
    $patient = \App\Models\User::find(question::find($request->question_id)->patient_id);
    Notification::send($patient,new \App\Notifications\question("Your have New Replay in your Question"));
  }

  public function delete(Request $request)
  {
    return question_answer::where('question_id',$request->question_id)->where('psychiatrist_id',auth()->id())->delete();
  }
}
