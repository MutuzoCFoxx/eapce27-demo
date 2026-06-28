@extends('layouts.app')
@section('title', "Venue & Hotels — EAPCE'27")

@section('content')
<div style="background:linear-gradient(160deg,#060e1c,#0c1f35 70%);padding:80px 0 60px">
    <div class="container">
        <div class="section-label">{{ __('messages.nav_venue') }}</div>
        <h1 style="color:var(--white);font-size:clamp(2rem,4vw,3rem);font-weight:900">Venue & Accommodation</h1>
    </div>
</div>
<section class="section">
    <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start">
            <div>
                <div class="card" style="padding:32px">
                    <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);margin-bottom:10px">Main Venue</div>
                    <h2 style="font-size:1.4rem;font-weight:800;color:var(--navy);margin-bottom:12px">Kigali Convention Centre</h2>
                    <p style="color:var(--gray);font-size:0.9rem;line-height:1.7;margin-bottom:16px">The Kigali Convention Centre (KCC) is East Africa's most iconic conference facility, known for its striking dome architecture and world-class facilities. Situated at the heart of Kigali, it is easily accessible from the city's major hotels and Kigali International Airport (30 min).</p>
                    <p style="font-size:0.85rem;color:var(--gray)"><strong style="color:var(--navy)">Address:</strong> KG 2 Roundabout, Kigali, Rwanda</p>
                    <p style="font-size:0.85rem;color:var(--gray);margin-top:4px"><strong style="color:var(--navy)">Airport:</strong> 30 min from Kigali International Airport (KGL)</p>
                    <p style="font-size:0.85rem;color:var(--gray);margin-top:4px"><strong style="color:var(--navy)">Capacity:</strong> 2,600 pax main auditorium</p>
                </div>
            </div>
            <div>
                <div style="background:linear-gradient(135deg,var(--navy),#1a4a6e);border-radius:10px;height:220px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-size:0.85rem;margin-bottom:20px">Google Maps embed would go here</div>
                <div class="card" style="padding:20px">
                    <h4 style="font-size:0.85rem;font-weight:700;color:var(--navy);margin-bottom:10px">Key Distances</h4>
                    @foreach([['Kigali Intl Airport','30 min'],['Kigali City Centre','5 min walk'],['Radisson Blu','On-site'],['Marriott Hotel','1.2 km'],['Serena Hotel','2.0 km']] as $d)
                    <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--light-gray);font-size:0.85rem">
                        <span style="color:var(--text)">{{ $d[0] }}</span>
                        <span style="color:var(--gold);font-weight:600">{{ $d[1] }}</span>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
        @media (max-width:768px) { .venue-grid { grid-template-columns:1fr!important; } }

        <h2 style="font-size:1.4rem;font-weight:800;color:var(--navy);margin:48px 0 24px">Official Conference Hotels</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px">
            @foreach($hotels as $h)
            <div class="card" style="padding:24px">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
                    <div style="font-size:0.95rem;font-weight:700;color:var(--navy)">{{ $h['name'] }}</div>
                    <div style="color:var(--gold);font-size:0.85rem;white-space:nowrap;margin-left:8px">{{ str_repeat('★', $h['stars']) }}</div>
                </div>
                <div style="font-size:0.82rem;color:var(--gray);margin-bottom:12px">
                    <span>📍 {{ $h['distance'] }} from KCC</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div>
                        <div style="font-size:0.95rem;font-weight:700;color:var(--green)">{{ $h['rate'] }}</div>
                        <div style="font-size:0.72rem;color:var(--gray)">Group code: {{ $h['code'] }}</div>
                    </div>
                    <span style="font-size:0.72rem;font-weight:700;padding:3px 10px;border-radius:12px;background:{{ $h['rooms']==='Limited' ? '#fef9c3' : '#dcfce7' }};color:{{ $h['rooms']==='Limited' ? '#854d0e' : '#15803d' }}">{{ $h['rooms'] }}</span>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>
@endsection
