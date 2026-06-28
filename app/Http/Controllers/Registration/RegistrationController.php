<?php

namespace App\Http\Controllers\Registration;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegistrationRequest;
use App\Services\RegistrationService;

class RegistrationController extends Controller
{
    public function __construct(private readonly RegistrationService $service) {}

    public function index()
    {
        $regTypes = config('eapce.reg_types');
        $hotels   = config('eapce.hotels');
        return view('register', compact('regTypes', 'hotels'));
    }

    public function store(StoreRegistrationRequest $request)
    {
        $registration = $this->service->create(
            $request->validated(),
            $request->input('reg_type')
        );

        return redirect()->route('register.confirmation', $registration->badge_id);
    }

    public function confirmation(string $badgeId)
    {
        $reg              = $this->service->findByBadgeId($badgeId);
        $accreditationUrl = config('eapce.accreditation_url');
        return view('register-confirmation', compact('reg', 'accreditationUrl'));
    }

    public function accreditationDone(string $badgeId)
    {
        $this->service->markAccredited($badgeId);
        return redirect()
            ->route('register.confirmation', $badgeId)
            ->with('accred_done', true);
    }
}
