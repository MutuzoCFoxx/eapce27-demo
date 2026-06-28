<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;

class SpeakersController extends Controller
{
    public function index()
    {
        $speakers = config('eapce.speakers');
        return view('speakers', compact('speakers'));
    }
}
