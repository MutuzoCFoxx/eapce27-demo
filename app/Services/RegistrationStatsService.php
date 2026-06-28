<?php

namespace App\Services;

use App\Repositories\RegistrationRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;

class RegistrationStatsService
{
    public function __construct(private readonly RegistrationRepository $repo) {}

    public function summary(Collection $registrations): array
    {
        return [
            'total'      => $registrations->count(),
            'delegates'  => $registrations->where('reg_type', 'delegate')->count(),
            'exhibitors' => $registrations->where('reg_type', 'exhibitor')->count(),
            'media'      => $registrations->where('reg_type', 'media')->count(),
            'students'   => $registrations->where('reg_type', 'student')->count(),
            'government' => $registrations->where('reg_type', 'government')->count(),
            'revenue'    => $registrations->sum('price'),
            'accredited' => $registrations->where('accreditation_done', true)->count(),
        ];
    }

    public function byCountry(Collection $registrations, int $limit = 10): SupportCollection
    {
        return $registrations
            ->groupBy('country')
            ->map(fn($group) => $group->count())
            ->sortDesc()
            ->take($limit);
    }
}
