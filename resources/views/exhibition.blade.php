@extends('layouts.app')
@section('title', "Exhibition — EAPCE'27")

@section('content')
<div style="background:linear-gradient(160deg,#060e1c,#0c1f35 70%);padding:80px 0 60px">
    <div class="container">
        <div class="section-label">{{ __('messages.nav_exhibition') }}</div>
        <h1 style="color:var(--white);font-size:clamp(2rem,4vw,3rem);font-weight:900">Exhibition Floor</h1>
        <p style="color:rgba(255,255,255,0.6);margin-top:10px">70 booths across 4,000 m² of prime exhibition space at Kigali Convention Centre.</p>
    </div>
</div>
<section class="section">
    <div class="container">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px">
            @php $exhibStats = [['70','Exhibition Booths'],['4,000 m²','Exhibition Space'],['3 Days','Open to Delegates']]; @endphp
            @foreach($exhibStats as $stat)
            <div class="card" style="padding:28px;text-align:center">
                <div style="font-size:2.2rem;font-weight:900;color:var(--navy)">{{ $stat[0] }}</div>
                <div style="font-size:0.8rem;color:var(--gray);text-transform:uppercase;letter-spacing:0.08em;margin-top:4px">{{ $stat[1] }}</div>
            </div>
            @endforeach
        </div>

        <h2 style="font-size:1.3rem;font-weight:800;color:var(--navy);margin-bottom:20px">Booth Zones</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-bottom:40px">
            @foreach($sponsors as $sp)
            <div style="border-radius:8px;padding:24px;background:{{ $sp['color'] }};color:{{ $sp['text'] }}">
                <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;opacity:0.7">{{ $sp['tier'] }} Zone</div>
                <div style="font-size:1.5rem;font-weight:900;margin:6px 0 4px">{{ $sp['slots'] }} booths</div>
                <div style="font-size:0.8rem;opacity:0.7">{{ $sp['taken'] }} reserved · {{ $sp['slots'] - $sp['taken'] }} available</div>
                <div style="margin-top:10px;height:4px;background:rgba(0,0,0,0.15);border-radius:2px;overflow:hidden">
                    <div style="height:100%;width:{{ round($sp['taken']/$sp['slots']*100) }}%;background:{{ $sp['text'] }};opacity:0.5;border-radius:2px"></div>
                </div>
                <div style="font-size:0.85rem;font-weight:700;margin-top:12px">{{ $sp['price'] }} / booth</div>
            </div>
            @endforeach
        </div>

        <div class="card" style="padding:36px;text-align:center">
            <h3 style="font-size:1.2rem;font-weight:800;color:var(--navy);margin-bottom:8px">Reserve Your Booth</h3>
            <p style="color:var(--gray);font-size:0.9rem;margin-bottom:24px">Booths are filling fast. Contact our exhibition team to secure your space and floor plan preference.</p>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
                <a href="{{ route('contact') }}" class="btn-gold">{{ __('messages.book_booth') }}</a>
                <a href="{{ route('sponsors') }}" class="btn-outline" style="color:var(--navy);border-color:var(--light-gray)">View Sponsorship Tiers</a>
            </div>
        </div>
    </div>
</section>
@endsection
