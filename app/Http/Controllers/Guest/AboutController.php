<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;

class AboutController extends Controller
{
    public function index()
    {
        return view('about');
    }
}
