<?php

use Illuminate\Http\Request;

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

Route::get('/tasks', 'TaskController@listAll');
Route::post('/tasks/rearrange', 'TaskController@rearrange');

Route::group(['middleware' => ['allow_duplicates']], function() {
    Route::post('/task', 'TaskController@store');
    Route::put('/task/{id}', 'TaskController@update');
});

Route::put('/task/complete/{id}', 'TaskController@updateCompletion');

// Route::resource('/task', 'TaskController');
