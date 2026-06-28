@extends('layouts.app')
@section('title', "Admin — EAPCE'27")

@push('styles')
<style>
.admin-stat { background:var(--white); border-radius:8px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
.admin-stat-num { font-size:2rem; font-weight:900; color:var(--navy); }
.admin-stat-label { font-size:0.75rem; color:var(--gray); text-transform:uppercase; letter-spacing:0.1em; margin-top:4px; }
table { width:100%; border-collapse:collapse; font-size:0.85rem; }
thead th { background:var(--navy); color:rgba(255,255,255,0.8); font-size:0.72rem; letter-spacing:0.08em; text-transform:uppercase; padding:10px 14px; text-align:left; }
tbody tr { border-bottom:1px solid var(--light-gray); }
tbody tr:hover { background:#f8fafc; }
tbody td { padding:10px 14px; color:var(--text); }
.del-btn { background:none; border:1px solid #fca5a5; color:var(--danger); padding:4px 10px; border-radius:4px; font-size:0.75rem; cursor:pointer; }
.del-btn:hover { background:#fee2e2; }
</style>
@endpush

@section('content')
<div style="background:linear-gradient(160deg,#060e1c,#0c1f35 70%);padding:60px 0 40px">
    <div class="container">
        <div class="section-label">{{ __('messages.nav_admin') }}</div>
        <h1 style="color:var(--white);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:900">Registration Dashboard</h1>
    </div>
</div>

<section style="padding:40px 0">
    <div class="container">
        @if(session('success'))
        <div class="alert alert-success" style="margin-bottom:20px">{{ session('success') }}</div>
        @endif

        {{-- Stats grid --}}
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:16px;margin-bottom:36px">
            <div class="admin-stat"><div class="admin-stat-num">{{ $stats['total'] }}</div><div class="admin-stat-label">Total Registrations</div></div>
            <div class="admin-stat"><div class="admin-stat-num">{{ $stats['delegates'] }}</div><div class="admin-stat-label">Delegates</div></div>
            <div class="admin-stat"><div class="admin-stat-num">{{ $stats['exhibitors'] }}</div><div class="admin-stat-label">Exhibitors</div></div>
            <div class="admin-stat"><div class="admin-stat-num">{{ $stats['media'] }}</div><div class="admin-stat-label">Media</div></div>
            <div class="admin-stat"><div class="admin-stat-num">{{ $stats['government'] }}</div><div class="admin-stat-label">Government</div></div>
            <div class="admin-stat"><div class="admin-stat-num">{{ $stats['accredited'] }}</div><div class="admin-stat-label">Accredited</div></div>
            <div class="admin-stat" style="grid-column:span 2"><div class="admin-stat-num" style="color:var(--green)">USD {{ number_format($stats['revenue']) }}</div><div class="admin-stat-label">Total Revenue</div></div>
        </div>

        {{-- Top countries --}}
        @if($byCountry->count())
        <div class="card" style="padding:24px;margin-bottom:32px">
            <h3 style="font-size:0.9rem;font-weight:700;color:var(--navy);margin-bottom:16px">Top Countries</h3>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
                @foreach($byCountry as $country => $count)
                <div style="background:var(--off-white);border:1px solid var(--light-gray);border-radius:6px;padding:6px 14px;font-size:0.82rem">
                    <strong style="color:var(--navy)">{{ $country }}</strong> <span style="color:var(--gray)">{{ $count }}</span>
                </div>
                @endforeach
            </div>
        </div>
        @endif

        {{-- Registrations table --}}
        <div class="card" style="padding:0;overflow-x:auto">
            <table>
                <thead>
                    <tr>
                        <th>Badge ID</th><th>Name</th><th>Organisation</th><th>Country</th><th>Type</th><th>Price</th><th>Accredited</th><th>Registered</th><th></th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($registrations as $r)
                    <tr>
                        <td style="font-family:monospace;font-size:0.78rem;color:var(--blue)">{{ $r->badge_id }}</td>
                        <td><strong>{{ $r->full_name }}</strong><br><span style="color:var(--gray);font-size:0.78rem">{{ $r->email }}</span></td>
                        <td>{{ $r->organisation }}</td>
                        <td>{{ $r->country }}</td>
                        <td><span class="badge" style="background:#eff6ff;color:#1e40af;text-transform:capitalize">{{ $r->reg_type }}</span></td>
                        <td>{{ $r->price > 0 ? 'USD '.$r->price : 'Free' }}</td>
                        <td>
                            @if($r->accreditation_done)
                                <span class="badge" style="background:#dcfce7;color:#15803d">✓ Done</span>
                            @else
                                <span class="badge" style="background:#fef9c3;color:#854d0e">Pending</span>
                            @endif
                        </td>
                        <td style="color:var(--gray);font-size:0.8rem;white-space:nowrap">{{ $r->created_at->format('d M Y') }}</td>
                        <td>
                            <form method="POST" action="{{ route('admin.destroy', $r->id) }}" onsubmit="return confirm('Delete this registration?')">
                                @csrf @method('DELETE')
                                <button type="submit" class="del-btn">Delete</button>
                            </form>
                        </td>
                    </tr>
                    @empty
                    <tr><td colspan="9" style="text-align:center;color:var(--gray);padding:32px">No registrations yet.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</section>
@endsection
