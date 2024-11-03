<?php

use Illuminate\Support\Facades\Route;

Route::post('/login', 'App\Http\Controllers\loginController@login')->name('login');

Route::prefix('client')->group(function () {
    Route::post('/register', 'App\Http\Controllers\loginController@client_register')->name('client.register');
});

Route::get('/products', 'App\Http\Controllers\ProductController@index')->name('products.index');
Route::get('/categories', 'App\Http\Controllers\ProductCategoryController@index')->name('categories.index');
Route::get('/coupons', 'App\Http\Controllers\CouponController@index')->name('coupons.index');

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('client')->group(function () {
        Route::post('/change/password/{id}', 'App\Http\Controllers\userController@change_password')->name('usuarios.change_password');
        Route::put('/update/{id}', 'App\Http\Controllers\userController@update')->name('usuarios.update');
        Route::get('/logout', 'App\Http\Controllers\loginController@clientlogout')->name('clientlogout');
    });

    Route::prefix('carrito')->group(function (){
        Route::get('/cart', 'App\Http\Controllers\CartController@getCart')->name('cart.get');
        Route::post('/cart/add', 'App\Http\Controllers\CartController@addToCart')->name('cart.add');
        Route::post('/cart/update', 'App\Http\Controllers\CartController@updateCart')->name('cart.update');
        Route::post('/cart/remove', 'App\Http\Controllers\CartController@removeFromCart')->name('cart.remove');
    });

    Route::middleware('admin')->group(function () {

        Route::prefix('user')->group(function () {
            Route::get('/all', 'App\Http\Controllers\userController@all')->name('user.all');
            Route::get('/logout', 'App\Http\Controllers\loginController@logout')->name('logout');
            Route::post('/register', 'App\Http\Controllers\loginController@user_register')->name('user.register');
            Route::post('/change-status/{id}', 'App\Http\Controllers\loginController@changeStatus')->name('user.change_status');
        });

        Route::prefix('products')->group(function () {
            Route::post('/', 'App\Http\Controllers\ProductController@store')->name('products.store');
            Route::post('/{id}', 'App\Http\Controllers\ProductController@update')->name('products.update');
            Route::post('/change-status/{id}', 'App\Http\Controllers\ProductController@changeStatus')->name('products.change_status');
        });

        Route::prefix('categories')->group(function () {
            Route::post('/', 'App\Http\Controllers\ProductCategoryController@store')->name('categories.store');
            Route::put('/{id}', 'App\Http\Controllers\ProductCategoryController@update')->name('categories.update');
            Route::post('/change-status/{id}', 'App\Http\Controllers\ProductCategoryController@changeStatus')->name('categories.change_status');
        });

        Route::prefix('coupons')->group(function () {
            Route::post('/', 'App\Http\Controllers\CouponController@store')->name('coupons.store');
            Route::post('/{id}', 'App\Http\Controllers\CouponController@update')->name('coupons.update');
            Route::post('/change-status/{id}', 'App\Http\Controllers\CouponController@changeStatus')->name('coupons.change_status');
        });

        Route::prefix('roles')->group(function () {
            Route::get('/', 'App\Http\Controllers\RolesController@index')->name('roles.index');
            Route::post('/', 'App\Http\Controllers\RolesController@store')->name('roles.store');
        });
    });
});
