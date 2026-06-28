<?php

namespace App\Services;

use App\Models\Registration;
use App\Repositories\RegistrationRepository;

class RegistrationService
{
    public function __construct(private readonly RegistrationRepository $repo) {}

    public function create(array $validated, string $regType): Registration
    {
        $regTypes = collect(config('eapce.reg_types'))->keyBy('id');
        $price    = $regTypes[$regType]['price'] ?? 0;
        $badgeId  = $this->generateBadgeId($regType);

        return $this->repo->create([
            ...$validated,
            'badge_id' => $badgeId,
            'price'    => $price,
        ]);
    }

    public function markAccredited(string $badgeId): void
    {
        $this->repo->updateByBadgeId($badgeId, ['accreditation_done' => true]);
    }

    public function findByBadgeId(string $badgeId): Registration
    {
        return $this->repo->findByBadgeId($badgeId);
    }

    private function generateBadgeId(string $regType): string
    {
        $prefix = strtoupper(substr($regType, 0, 3));
        $number = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
        return "EAPCE-{$prefix}-{$number}";
    }
}
