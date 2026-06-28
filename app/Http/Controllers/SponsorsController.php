<?php

namespace App\Http\Controllers;

class SponsorsController extends Controller
{
    public function index()
    {
        $sponsors = config('eapce.sponsors');
        return view('sponsors', compact('sponsors'));
    }
}
