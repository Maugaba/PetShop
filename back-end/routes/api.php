<?php

use Illuminate\Support\Facades\Route;

Route::post('/login', 'App\Http\Controllers\loginController@login')->name('login');
Route::prefix('client')->group(function () {
    Route::post('/register', 'App\Http\Controllers\loginController@client_register')->name('client.register');
    Route::post('/change/password/{id}', 'App\Http\Controllers\userController@change_password')->name('usuarios.change_password');
    Route::post('/update/{id}', 'App\Http\Controllers\userController@update')->name('usuarios.update');
    Route::get('/logout', 'App\Http\Controllers\loginController@clientlogout')->name('clientlogout');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('user')->group(function () {
        Route::get('/all', 'App\Http\Controllers\userController@all')->name('user.all');
        Route::get('/logout', 'App\Http\Controllers\loginController@logout')->name('logout');
        Route::post('/register', 'App\Http\Controllers\loginController@user_register')->name('user.register');
    });
    
});