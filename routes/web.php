<?php

use App\Http\Controllers\LangController;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/guest.php';
require __DIR__ . '/registration.php';
require __DIR__ . '/admin.php';

Route::get('/lang/{locale}', [LangController::class, 'switch'])->name('lang.switch');
