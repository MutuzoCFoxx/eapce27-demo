<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;

class AgendaController extends Controller
{
    public function index()
    {
        $agenda    = config('eapce.agenda');
        $tagColors = config('eapce.tag_colors');
        return view('agenda', compact('agenda', 'tagColors'));
    }
}
