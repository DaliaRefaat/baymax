<?php

namespace App\Http\Controllers;

use App\Models\artical;
use App\Models\User;
use Illuminate\Http\Request;

class ArticalController extends Controller
{
  public function index()
  {
    $articals = artical::all();
    for($i=0;$i<count($articals);$i++){
      $articals[$i] = [
        "id" => $articals[$i]->id,
        "psychiatrist_id" => $articals[$i]->psychiatrist_id,
        "psychiatrist_name" => User::find($articals[$i]->psychiatrist_id)->name,
        "img" => $articals[$i]->img,
        "title" => $articals[$i]->title,
        "type" => $articals[$i]->type,
        "body" => $articals[$i]->body,
        "date" => $articals[$i]->created_at,
      ];
    }
    return $articals;
  }

  public function show(Request $request)
  {
    $artical = artical::findorfail($request->id);
    $comments = $artical->comments;
    $articalSame = artical::where("type",$artical->type)->where("id","!=",$artical->id)->limit(3)->get();
    for ($i = 0; $i < count($articalSame); $i++) {
      $articalSame[$i] = [
        "id" => $articalSame[$i]->id,
        "psychiatrist_id" => $articalSame[$i]->psychiatrist_id,
        "psychiatrist_name" => User::find($articalSame[$i]->psychiatrist_id)->name,
        "img" => $articalSame[$i]->img,
        "title" => $articalSame[$i]->title,
        "type" => $articalSame[$i]->type,
        "body" => $articalSame[$i]->body,
        "date" => $articalSame[$i]->created_at,
      ];
    }
    $artical=[
      "id"=>$artical->id,
      "psychiatrist_id"=>$artical->psychiatrist_id,
      "psychiatrist_name"=>User::find($artical->psychiatrist_id)->name,
      "img"=>$artical->img,
      "title"=>$artical->title,
      "type"=>$artical->type,
      "body"=> $artical->body,
      "date"=>$artical->created_at,
      "comments"=>$artical->comments,
      "same"=>$articalSame
    ];
    for ($i = 0; $i < count($comments); $i++) {
      $comments[$i] = [
        'patient_name' => User::find($comments[$i]->patient_id)->name,
        'comment' => $comments[$i]->comment,
        'date' => $comments[$i]->created_at,
        'img'=>User::find($comments[$i]->patient_id)->img
      ];
    }
    return $artical;
  }

  public function insert(Request $request)
  {
    $id = (auth()->user()->type==='admin')?1:auth()->id();
    $file = $request->img->getClientOriginalName();
    $path = $request->img->storeAs('ArticalImg', $file, 'public');
    artical::create([
      'title' => $request->title,
      'psychiatrist_id' => $id,
      'type'=>$request->type,
      'body'=>$request->body,
      'img'=>$path
    ]);
  }
  public function delete(Request $request)
  {
    artical::destroy($request->id);
  }
}
