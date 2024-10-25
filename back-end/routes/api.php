<?php

use Illuminate\Support\Facades\Route;

Route::post('/login', 'App\Http\Controllers\loginController@login')->name('login');
Route::prefix('client')->group(function () {
    Route::post('/register', 'App\Http\Controllers\loginController@client_register')->name('client.register');
    Route::post('/change/password/{id}', 'App\Http\Controllers\userController@change_password')->name('usuarios.change_password');
    Route::put('/update/{id}', 'App\Http\Controllers\userController@update')->name('usuarios.update');
    Route::get('/logout', 'App\Http\Controllers\loginController@clientlogout')->name('clientlogout');
    Route::get('/users', 'App\Http\Controllers\loginController@getUsers')->name('users.index');
});

Route::prefix('user')->group(function () {
    Route::get('/all', 'App\Http\Controllers\userController@all')->name('user.all');
    Route::get('/logout', 'App\Http\Controllers\loginController@logout')->name('logout');
    Route::post('/register', 'App\Http\Controllers\loginController@user_register')->name('user.register');
    Route::post('/change-status/{id}', 'App\Http\Controllers\loginController@changeStatus')->name('user.change_status');


});

//Products
Route::prefix('products')->group(function () {
    Route::get('/', 'App\Http\Controllers\ProductController@index')->name('products.index');  
    Route::post('/', 'App\Http\Controllers\ProductController@store')->name('products.store'); 
    Route::post('/{id}', 'App\Http\Controllers\ProductController@update')->name('products.update'); 
    Route::post('/change-status/{id}', 'App\Http\Controllers\ProductController@changeStatus')->name('products.change_status'); 
});

// categories
Route::prefix('categories')->group(function () {
    Route::get('/', 'App\Http\Controllers\ProductCategoryController@index')->name('categories.index');    
    Route::post('/', 'App\Http\Controllers\ProductCategoryController@store')->name('categories.store');    
    Route::put('/{id}', 'App\Http\Controllers\ProductCategoryController@update')->name('categories.update');
    Route::post('/change-status/{id}', 'App\Http\Controllers\ProductCategoryController@changeStatus')->name('categories.change_status'); 
});

// Coupons
Route::prefix('coupons')->group(function () {
    Route::get('/', 'App\Http\Controllers\CouponController@index')->name('coupons.index'); 
    Route::post('/', 'App\Http\Controllers\CouponController@store')->name('coupons.store');
    Route::post('/change-status/{id}', 'App\Http\Controllers\CouponController@changeStatus')->name('coupons.change_status'); 
    Route::post('/{id}', 'App\Http\Controllers\CouponController@update')->name('coupons.update'); 
});

//ROles
route::prefix('roles')->group(function () {    
    Route::get('/', 'App\Http\Controllers\RolesController@index')->name('roles.index');     
    Route::post('/', 'App\Http\Controllers\RolesController@store')->name('roles.store'); 
});