<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Registration;

class AdminController extends Controller
{
    public function index()
    {
        $registrations = Registration::latest()->get();
        $stats = [
            'total'      => $registrations->count(),
            'delegates'  => $registrations->where('reg_type', 'delegate')->count(),
            'exhibitors' => $registrations->where('reg_type', 'exhibitor')->count(),
            'media'      => $registrations->where('reg_type', 'media')->count(),
            'students'   => $registrations->where('reg_type', 'student')->count(),
            'government' => $registrations->where('reg_type', 'government')->count(),
            'revenue'    => $registrations->sum('price'),
            'accredited' => $registrations->where('accreditation_done', true)->count(),
        ];
        $byCountry = $registrations->groupBy('country')
            ->map(fn($g) => $g->count())
            ->sortDesc()
            ->take(10);

        return view('admin', compact('registrations', 'stats', 'byCountry'));
    }

    public function destroy(int $id)
    {
        Registration::findOrFail($id)->delete();
        return redirect()->route('admin')->with('success', 'Registration deleted.');
    }
}
