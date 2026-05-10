<?php

use App\Http\Controllers\Api\SearchController;
use Illuminate\Support\Facades\Route;

Route::get('/search', [SearchController::class, 'search'])->middleware('auth');
Route::get('/rooms/by-asrama/{asramaId}', [App\Http\Controllers\Admin\RoomController::class, 'getRoomsByAsrama']);
