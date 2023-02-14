<?php

namespace App\Http\Controllers;

use App\Models\artical;
use App\Models\artical_comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class ArticalCommentController extends Controller
{
  public function insert(Request $request)
  {
    artical_comment::create([
      'patient_id' => auth()->id(),
      'artical_id' => $request->artical_id,
      'comment' => $request->comment,
    ]);
    $id =artical::find($request->artical_id)->psychiatrist_id;
    $id = ($id===1)?2:$id;
    $psychiatrist = \App\Models\User::find($id);
    Notification::send($psychiatrist,new \App\Notifications\artical("Your have New Comment in your artical"));
  }

  public function delete(Request $request)
  {
    return artical_comment::where('artical_id',$request->artical_id)->where('patient_id',auth()->id())->delete();
  }
}
