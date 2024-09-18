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

//Products
Route::prefix('products')->group(function () {
    Route::get('/', 'App\Http\Controllers\ProductController@index')->name('products.index');  // Obtener todos los productos
    Route::post('/', 'App\Http\Controllers\ProductController@store')->name('products.store'); // Crear un nuevo producto
    Route::post('/{id}', 'App\Http\Controllers\ProductController@update')->name('products.update'); // Actualizar un producto existente
    Route::post('/change-status/{id}', 'App\Http\Controllers\ProductController@changeStatus')->name('products.change_status'); // Cambiar el estado de un producto
});

// categories
Route::prefix('categories')->group(function () {
    Route::get('/', 'App\Http\Controllers\ProductCategoryController@index')->name('categories.index');    
    Route::post('/', 'App\Http\Controllers\ProductCategoryController@store')->name('categories.store');    
    Route::put('/{id}', 'App\Http\Controllers\ProductCategoryController@update')->name('categories.update');
    Route::post('/change-status/{id}', 'App\Http\Controllers\ProductCategoryController@changeStatus')->name('categories.change_status'); // Ruta para cambiar el estado
});

// Coupons
Route::prefix('coupons')->group(function () {
    Route::get('/', 'App\Http\Controllers\CouponController@index')->name('coupons.index'); // Obtener todos los cupones
    Route::post('/', 'App\Http\Controllers\CouponController@store')->name('coupons.store'); // Crear un nuevo cupón
    Route::post('/change-status/{id}', 'App\Http\Controllers\CouponController@changeStatus')->name('coupons.change_status'); // Cambiar el estado de un cupón
    Route::post('/{id}', 'App\Http\Controllers\CouponController@update')->name('coupons.update'); // Actualizar un cupón existente
});

//ROles
route::prefix('roles')->group(function () {    
    Route::get('/', 'App\Http\Controllers\RolesController@index')->name('roles.index');  // Obtener todos los roles    
    Route::post('/', 'App\Http\Controllers\RolesController@store')->name('roles.store'); // Crear un nuevo rol  
});