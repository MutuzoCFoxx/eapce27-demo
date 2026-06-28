<?php

namespace App\Repositories;

use App\Models\Registration;
use Illuminate\Database\Eloquent\Collection;

class RegistrationRepository
{
    public function all(): Collection
    {
        return Registration::latest()->get();
    }

    public function findByBadgeId(string $badgeId): Registration
    {
        return Registration::where('badge_id', $badgeId)->firstOrFail();
    }

    public function findOrFail(int $id): Registration
    {
        return Registration::findOrFail($id);
    }

    public function create(array $data): Registration
    {
        return Registration::create($data);
    }

    public function updateByBadgeId(string $badgeId, array $data): void
    {
        Registration::where('badge_id', $badgeId)->update($data);
    }

    public function delete(int $id): void
    {
        Registration::findOrFail($id)->delete();
    }
}
