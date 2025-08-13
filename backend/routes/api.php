<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserController;

#User
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/user/all', [UserController::class, 'index']);
Route::get('/user/byId/{id}', [UserController::class, 'show']);
Route::get('/user/token', [UserController::class, 'byToken']);
Route::middleware('auth:api_token')->put('/user/{id}', [UserController::class, 'update']);
Route::delete('/user/{id}', [UserController::class, 'destroy']);


#Autentication sin token (PROVISIONAL PARA PRUEBAS)
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);


#Items
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => $request->user());
    Route::apiResource('items', ItemController::class);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});
