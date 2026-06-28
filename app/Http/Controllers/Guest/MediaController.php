<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;

class MediaController extends Controller
{
    public function index()
    {
        $press = config('eapce.press');
        return view('media', compact('press'));
    }
}
