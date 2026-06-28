<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;

class SponsorsController extends Controller
{
    public function index()
    {
        $sponsors = config('eapce.sponsors');
        return view('sponsors', compact('sponsors'));
    }
}
