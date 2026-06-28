<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\RegistrationRepository;

class RegistrationController extends Controller
{
    public function __construct(private readonly RegistrationRepository $repo) {}

    public function destroy(int $id)
    {
        $this->repo->delete($id);
        return redirect()->route('admin.dashboard')
            ->with('success', 'Registration deleted.');
    }
}
