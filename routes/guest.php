<?php

use App\Http\Controllers\Guest\HomeController;
use App\Http\Controllers\Guest\AboutController;
use App\Http\Controllers\Guest\AgendaController;
use App\Http\Controllers\Guest\ExhibitionController;
use App\Http\Controllers\Guest\SponsorsController;
use App\Http\Controllers\Guest\SpeakersController;
use App\Http\Controllers\Guest\VenueController;
use App\Http\Controllers\Guest\MediaController;
use App\Http\Controllers\Guest\ContactController;
use Illuminate\Support\Facades\Route;

Route::get('/',           [HomeController::class,      'index'])->name('home');
Route::get('/about',      [AboutController::class,     'index'])->name('about');
Route::get('/agenda',     [AgendaController::class,    'index'])->name('agenda');
Route::get('/exhibition', [ExhibitionController::class,'index'])->name('exhibition');
Route::get('/sponsors',   [SponsorsController::class,  'index'])->name('sponsors');
Route::get('/speakers',   [SpeakersController::class,  'index'])->name('speakers');
Route::get('/venue',      [VenueController::class,     'index'])->name('venue');
Route::get('/media',      [MediaController::class,     'index'])->name('media');
Route::get('/contact',    [ContactController::class,   'index'])->name('contact');
Route::post('/contact',   [ContactController::class,   'send'])->name('contact.send');
