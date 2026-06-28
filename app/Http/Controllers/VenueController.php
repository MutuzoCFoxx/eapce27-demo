<?php

namespace App\Http\Controllers;

class VenueController extends Controller
{
    public function index()
    {
        $hotels = config('eapce.hotels');
        return view('venue', compact('hotels'));
    }
}
