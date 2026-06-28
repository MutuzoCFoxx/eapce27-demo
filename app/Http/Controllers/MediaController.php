<?php

namespace App\Http\Controllers;

class MediaController extends Controller
{
    public function index()
    {
        $press = config('eapce.press');
        return view('media', compact('press'));
    }
}
