<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $speakers = array_slice(config('eapce.speakers'), 0, 4);
        $press    = config('eapce.press');
        return view('home', compact('speakers', 'press'));
    }
}
