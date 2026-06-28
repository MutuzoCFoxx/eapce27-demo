<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;

class ExhibitionController extends Controller
{
    public function index()
    {
        $sponsors = config('eapce.sponsors');
        return view('exhibition', compact('sponsors'));
    }
}
