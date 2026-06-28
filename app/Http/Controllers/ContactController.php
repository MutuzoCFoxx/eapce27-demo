<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return view('contact');
    }

    public function send(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:100',
            'email'   => 'required|email',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|max:3000',
        ]);

        // In production: Mail::to('info@eapce27.org')->send(new ContactMail($request->all()));
        return back()->with('success', 'Your message has been received. We will respond within 48 hours.');
    }
}
