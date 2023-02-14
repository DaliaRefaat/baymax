<?php

use App\Http\Controllers\ApointmentController;
use App\Http\Controllers\ArticalCommentController;
use App\Http\Controllers\ArticalController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PsychiatristController;
use App\Http\Controllers\QuestionAnswerController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});



Route::group([
  'middleware' => 'api',
  'prefix' => 'auth'
], function ($router) {
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/register', [AuthController::class, 'register']);
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::get('/user-profile', [AuthController::class, 'userProfile']);
  Route::get('/patient_profile', [AuthController::class, 'patientProfile']);
  Route::get('/psychiatrist_profile', [AuthController::class, 'psychiatristProfile']);
  Route::get('/myNotification', [AuthController::class, 'myNotification']);
  Route::delete('/readnotfication', [AuthController::class, 'readNotification']);
  Route::post('/updateImage', [AuthController::class, 'updateImage']);
  Route::post('/updateStatus', [AuthController::class, 'updateStatus']);
});

Route::controller(PatientController::class)->group(function () {
  Route::get('/patientAll', 'index');
  Route::get('/show-patient', 'show');
  Route::post('/update-patient', 'updateAuth');
  Route::get('/my-questions', 'myQuestions');
  Route::get('/patient-chat','chats');
  Route::get('/Patient-getMsg', 'getMsg');
  Route::post('/patient-sendMsg','sendMsg');
  Route::post('/patient-uploadLabTest', 'uploadLabTest');
  Route::post('/patient-uploadPrescription', 'uploadPrescription');
  Route::get('/patient-getFiles', 'getFiles');
});

Route::controller(PsychiatristController::class)->group(function () {
  Route::get('/psychiatristAll', 'index');
  Route::get('/show-psychiatrist', 'show');
  Route::post('/update-psychiatrist', 'updateAuth');
  Route::get('/my-articals', 'myArticals');
  Route::get('/avilable-psychiatrist','avilable');
  Route::post('/allowChat','allowChat');
  Route::get('/psychiatrist-chat','chats');
  Route::get('/psychiatrist-getMsg', 'getMsg');
  Route::post('/psychiatrist-sendMsg', 'sendMsg');
  Route::get('/psychiatrist-home', 'home');
  Route::get('/myPatient', 'myPatient');
  Route::post('/zoomSettings', 'zoomSettings');
});

Route::controller(QuestionController::class)->group(function () {
  Route::post('/insert-question', 'insert');
  Route::get('/questions', 'index');
  Route::delete('/delete-question', 'delete');
  Route::get('/question', 'show');
});
Route::controller(QuestionAnswerController::class)->group(function () {
  Route::post('/insert-question-answer', 'insert');
  Route::delete('/delete-question-answer', 'delete');
});

Route::controller(ArticalController::class)->group(function () {
  Route::post('/insert-artical', 'insert');
  Route::get('/articals', 'index');
  Route::delete('/delete-artical', 'delete');
  Route::get('/artical', 'show');
});
Route::controller(ArticalCommentController::class)->group(function () {
  Route::post('/insert-artical-comment', 'insert');
  Route::delete('/delete-artical-comment', 'delete');
});
Route::controller(SessionController::class)->group(function () {
  Route::get('/allSession','index');
  Route::post('/insert-session', 'insert');
  Route::delete('/delete-session', 'delete');
  Route::get('/psychiatrist-session', 'psychiatristSession');
});

Route::controller(ApointmentController::class)->group(function () {
  Route::get('/allApointments','index');
  Route::post('/insert-apointment', 'insert');
  Route::get('/my-apointments', 'myApointment');
  Route::delete('/deleteAppointment', 'deleteAppointment');
  Route::post('/pay', 'pay');
  Route::post('/zoom','createMeeting');
  Route::get('/adminHome', 'adminHome');
  Route::get('/zoomtest','zoomTest');
  Route::get('/checkapointment','checkApointmentEveryTenMin');
});