<?php

namespace App\Http\Controllers;

use App\Models\psychiatrist;
use App\Models\question;
use App\Models\User;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
  //

  public function index()
  {
    $questions = question::all();
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


  public function show(Request $request)
  {
    $question = question::findorfail($request->id);
    $answers = $question->answers;
    for ($i = 0; $i < count($answers); $i++) {
      $answers[$i] = [
        'psychiatrist_id' => $answers[$i]->psychiatrist_id,
        'psychiatrist_name' => User::find($answers[$i]->psychiatrist_id)->name,
        'answer' => $answers[$i]->answer,
        'date' => $answers[$i]->created_at
      ];
    }
    return $question;
  }


  public function insert(Request $request)
  {
    question::create([
      'title' => $request->title,
      'patient_id' => auth()->id(),
    ]);
  }


  public function delete(Request $request)
  {
    question::destroy($request->id);
  }
}
