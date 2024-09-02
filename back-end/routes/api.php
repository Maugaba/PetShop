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

    //Products
    Route::prefix('products')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('products.index');
        Route::get('/{id}', [ProductController::class, 'show'])->name('products.show');
        Route::post('/', [ProductController::class, 'store'])->name('products.store');
        Route::put('/{id}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
    });
    //Categories
    Route::prefix('categories')->group(function () {
        Route::get('/', [ProductCategoryController::class, 'index'])->name('categories.index');
        Route::get('/{id}', [ProductCategoryController::class, 'show'])->name('categories.show');
        Route::post('/', [ProductCategoryController::class, 'store'])->name('categories.store');
        Route::put('/{id}', [ProductCategoryController::class, 'update'])->name('categories.update');
        Route::delete('/{id}', [ProductCategoryController::class, 'destroy'])->name('categories.destroy');
    });

    //Coupons
    Route::prefix('coupons')->group(function () {
        Route::get('/', [CouponController::class, 'index'])->name('coupons.index');
        Route::get('/{id}', [CouponController::class, 'show'])->name('coupons.show');
        Route::post('/', [CouponController::class, 'store'])->name('coupons.store');
        Route::put('/{id}', [CouponController::class, 'update'])->name('coupons.update');
        Route::delete('/{id}', [CouponController::class, 'destroy'])->name('coupons.destroy');
    });
    
});


