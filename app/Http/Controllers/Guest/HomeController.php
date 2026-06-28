<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index()
    {
        $speakers = array_slice(config('eapce.speakers'), 0, 4);
        $press    = config('eapce.press');
        return view('home', compact('speakers', 'press'));
    }
}
