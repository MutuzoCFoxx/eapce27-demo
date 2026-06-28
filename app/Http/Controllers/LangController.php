<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LangController extends Controller
{
    public function switch(Request $request, string $locale)
    {
        $allowed = ['en', 'fr', 'sw'];
        if (in_array($locale, $allowed)) {
            session(['locale' => $locale]);
            app()->setLocale($locale);
        }
        return redirect()->back()->fallback(route('home'));
    }
}
