<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;

class VenueController extends Controller
{
    public function index()
    {
        $hotels = config('eapce.hotels');
        return view('venue', compact('hotels'));
    }
}
