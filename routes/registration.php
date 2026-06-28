<?php

use App\Http\Controllers\Registration\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::get('/register',  [RegistrationController::class, 'index'])->name('register');
Route::post('/register', [RegistrationController::class, 'store'])->name('register.store');

Route::get('/register/confirmation/{badgeId}',
    [RegistrationController::class, 'confirmation'])->name('register.confirmation');

Route::post('/register/accreditation-done/{badgeId}',
    [RegistrationController::class, 'accreditationDone'])->name('register.accreditation-done');
