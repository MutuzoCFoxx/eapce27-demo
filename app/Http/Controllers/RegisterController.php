<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registration;

class RegisterController extends Controller
{
    public function index()
    {
        $regTypes = config('eapce.reg_types');
        $hotels   = config('eapce.hotels');
        return view('register', compact('regTypes', 'hotels'));
    }

    public function store(Request $request)
    {
        $regTypes = collect(config('eapce.reg_types'))->keyBy('id');
        $regType  = $request->input('reg_type');
        $price    = $regTypes[$regType]['price'] ?? 0;

        $validated = $request->validate([
            'first_name'   => 'required|string|max:100',
            'last_name'    => 'required|string|max:100',
            'email'        => 'required|email|unique:registrations,email',
            'organisation' => 'required|string|max:200',
            'country'      => 'required|string|max:100',
            'phone'        => 'nullable|string|max:30',
            'reg_type'     => 'required|string',
            'dietary'      => 'nullable|string|max:200',
            'hotel'        => 'nullable|string|max:200',
        ]);

        $badgeId = 'EAPCE-' . strtoupper(substr($validated['reg_type'], 0, 3)) . '-' . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);

        Registration::create([
            ...$validated,
            'badge_id' => $badgeId,
            'price'    => $price,
        ]);

        return redirect()->route('register.confirmation', $badgeId);
    }

    public function confirmation(string $badgeId)
    {
        $reg = Registration::where('badge_id', $badgeId)->firstOrFail();
        $accreditationUrl = config('eapce.accreditation_url');
        return view('register-confirmation', compact('reg', 'accreditationUrl'));
    }

    public function accreditationDone(string $badgeId)
    {
        Registration::where('badge_id', $badgeId)->update(['accreditation_done' => true]);
        return redirect()->route('register.confirmation', $badgeId)->with('accred_done', true);
    }
}
