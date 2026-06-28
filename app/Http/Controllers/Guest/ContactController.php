<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\SendContactRequest;

class ContactController extends Controller
{
    public function index()
    {
        return view('contact');
    }

    public function send(SendContactRequest $request)
    {
        // In production: Mail::to('info@eapce27.org')->send(new ContactMail($request->validated()));
        return back()->with('success', 'Your message has been received. We will respond within 48 hours.');
    }
}
