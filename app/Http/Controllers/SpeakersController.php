<?php

namespace App\Http\Controllers;

class SpeakersController extends Controller
{
    public function index()
    {
        $speakers = config('eapce.speakers');
        return view('speakers', compact('speakers'));
    }
}
