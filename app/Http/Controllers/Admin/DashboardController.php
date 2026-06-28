<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\RegistrationRepository;
use App\Services\RegistrationStatsService;

class DashboardController extends Controller
{
    public function __construct(
        private readonly RegistrationRepository    $repo,
        private readonly RegistrationStatsService  $stats,
    ) {}

    public function index()
    {
        $registrations = $this->repo->all();
        $stats         = $this->stats->summary($registrations);
        $byCountry     = $this->stats->byCountry($registrations);

        return view('admin.dashboard', compact('registrations', 'stats', 'byCountry'));
    }
}
