<?php

use Illuminate\Support\Facades\Route;

// Rutas de autenticación públicas
Route::post('/login', 'App\Http\Controllers\loginController@login')->name('login');

Route::prefix('client')->group(function () {
    Route::post('/register', 'App\Http\Controllers\loginController@client_register')->name('client.register');
});

// Rutas de visualización públicas
Route::get('/products', 'App\Http\Controllers\ProductController@index')->name('products.index');
Route::get('/categories', 'App\Http\Controllers\ProductCategoryController@index')->name('categories.index');
// Si los cupones son públicos:
Route::get('/coupons', 'App\Http\Controllers\CouponController@index')->name('coupons.index');

Route::middleware('auth:sanctum')->group(function () {

    // Rutas para clientes autenticados
    Route::prefix('client')->group(function () {
        Route::post('/change/password/{id}', 'App\Http\Controllers\userController@change_password')->name('usuarios.change_password');
        Route::put('/update/{id}', 'App\Http\Controllers\userController@update')->name('usuarios.update');
        Route::get('/logout', 'App\Http\Controllers\loginController@clientlogout')->name('clientlogout');
    });

    // **Rutas para el carrito, accesibles a cualquier usuario autenticado**
    Route::prefix('carrito')->group(function (){
        Route::get('/cart', 'App\Http\Controllers\CartController@getCart')->name('cart.get');
        Route::post('/cart/add', 'App\Http\Controllers\CartController@addToCart')->name('cart.add');
        Route::post('/cart/update', 'App\Http\Controllers\CartController@updateCart')->name('cart.update');
        Route::post('/cart/remove', 'App\Http\Controllers\CartController@removeFromCart')->name('cart.remove');
    });

    // Rutas para usuarios administrativos (requiere autenticación y rol de administrador)
    Route::middleware('admin')->group(function () {

        Route::prefix('user')->group(function () {
            Route::get('/all', 'App\Http\Controllers\userController@all')->name('user.all');
            Route::get('/logout', 'App\Http\Controllers\loginController@logout')->name('logout');
            Route::post('/register', 'App\Http\Controllers\loginController@user_register')->name('user.register');
            Route::post('/change-status/{id}', 'App\Http\Controllers\loginController@changeStatus')->name('user.change_status');
        });

        // Productos
        Route::prefix('products')->group(function () {
            Route::post('/', 'App\Http\Controllers\ProductController@store')->name('products.store');
            Route::post('/{id}', 'App\Http\Controllers\ProductController@update')->name('products.update');
            Route::post('/change-status/{id}', 'App\Http\Controllers\ProductController@changeStatus')->name('products.change_status');
        });

        // Categorías
        Route::prefix('categories')->group(function () {
            Route::post('/', 'App\Http\Controllers\ProductCategoryController@store')->name('categories.store');
            Route::put('/{id}', 'App\Http\Controllers\ProductCategoryController@update')->name('categories.update');
            Route::post('/change-status/{id}', 'App\Http\Controllers\ProductCategoryController@changeStatus')->name('categories.change_status');
        });

        // Cupones
        Route::prefix('coupons')->group(function () {
            Route::post('/', 'App\Http\Controllers\CouponController@store')->name('coupons.store');
            Route::post('/{id}', 'App\Http\Controllers\CouponController@update')->name('coupons.update');
            Route::post('/change-status/{id}', 'App\Http\Controllers\CouponController@changeStatus')->name('coupons.change_status');
        });

        // Roles
        Route::prefix('roles')->group(function () {
            Route::get('/', 'App\Http\Controllers\RolesController@index')->name('roles.index');
            Route::post('/', 'App\Http\Controllers\RolesController@store')->name('roles.store');
        });
    });
});
