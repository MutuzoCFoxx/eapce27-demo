<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ExhibitionController;
use App\Http\Controllers\SponsorsController;
use App\Http\Controllers\SpeakersController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LangController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/agenda', [AgendaController::class, 'index'])->name('agenda');
Route::get('/exhibition', [ExhibitionController::class, 'index'])->name('exhibition');
Route::get('/sponsors', [SponsorsController::class, 'index'])->name('sponsors');
Route::get('/speakers', [SpeakersController::class, 'index'])->name('speakers');
Route::get('/venue', [VenueController::class, 'index'])->name('venue');
Route::get('/media', [MediaController::class, 'index'])->name('media');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');

// Registration
Route::get('/register', [RegisterController::class, 'index'])->name('register');
Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
Route::get('/register/confirmation/{badgeId}', [RegisterController::class, 'confirmation'])->name('register.confirmation');
Route::post('/register/accreditation-done/{badgeId}', [RegisterController::class, 'accreditationDone'])->name('register.accreditation-done');

// Contact
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

// Admin
Route::get('/admin', [AdminController::class, 'index'])->name('admin');
Route::delete('/admin/registrations/{id}', [AdminController::class, 'destroy'])->name('admin.destroy');

// Language switcher
Route::get('/lang/{locale}', [LangController::class, 'switch'])->name('lang.switch');
