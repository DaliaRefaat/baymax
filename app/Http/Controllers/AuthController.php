<?php

namespace App\Http\Controllers;

use App\Models\Diagnosis;
use App\Models\patient;
use App\Models\psychiatrist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Foundation\Auth\User as AuthUser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
  /**
   * Create a new AuthController instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth:api', ['except' => ['login', 'register']]);
  }

  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required|email',
      'password' => 'required|string|min:6',
    ]);
    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }
    if (!$token = auth()->attempt($validator->validated())) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }
    return $this->createNewToken($token);
  }
  /**
   * Register a User.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'name' => 'required|string|between:2,100',
      'email' => 'required|string|email|max:100|unique:users',
      'password' => 'required|string|min:6',
    ]);
    if ($validator->fails()) {
      return response()->json($validator->errors()->toJson(), 400);
    }
    $user = User::create(array_merge(
      $validator->validated(),
      [
        'password' => bcrypt($request->password),
        'type' => (isset($request->type))?$request->type:"patient",
        'birth_date' => $request->birth_date,
        'gender' => $request->gender,
        'img'=> 'imagesProfile/logo.png',
        'phone' => $request->phone,
        'status'=>'1'
      ],
    ));
    if ($user->type == 'patient') {
      patient::create([
        'id' => $user->id,
        'num_of_bot' => 0
      ]);
      Diagnosis::create([
        'patient_id'=>$user->id,
        'psychiatrist_id'=>1,
        'chat_allow'=>1
      ]);
    } elseif ($user->type == 'psychiatrist') {
      psychiatrist::create([
        'id' => $user->id,
        'years_experience' => 0,
        'details' => "",
        'specialization' => "",
        'API_Key' => "",
        'API_secret' => "",
      ]);
    }

    return response()->json([
      'message' => 'User successfully registered',
      'user' => $user
    ], 201);
  }

  /**
   * Log the user out (Invalidate the token).
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout()
  {
    auth()->logout();
    return response()->json(['message' => 'User successfully signed out']);
  }
  /**
   * Refresh a token.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function refresh()
  {
    return $this->createNewToken(auth()->refresh());
  }
  /**
   * Get the authenticated User.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function userProfile()
  {
    return response()->json(auth()->user());
  }
  public function patientProfile()
  {
    return response()->json(auth()->user());
  }
  public function psychiatristProfile()
  {
    return response()->json(auth()->user());
  }
  /**
   * Get the token array structure.
   *
   * @param string $token
   *
   * @return \Illuminate\Http\JsonResponse
   */
  protected function createNewToken(string $token)
  {
    return response()->json([
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => auth()->factory()->getTTL() * 60,
      'user' => auth()->user()
    ]);
  }


  protected function myNotification(){
    return auth()->user()->unreadNotifications;
  }

  protected function readNotification(Request $request){
    DB::table('notifications')->where('id',$request->id)->update(['read_at'=>now()]);
    return $this->myNotification();
  }

  public function updateImage(Request $request)
  {
    $path = $request->img->store( 'imagesProfile', 'public');
    $user = User::findorfail(auth()->id());
    $user->update([
      'img' => $path,
    ]);
    return $path;
  }
  public function updateStatus(Request $request)
  {
    $user = User::find(auth()->id());
    $user::update([
      'status'=> 1
    ]);
  }
}
