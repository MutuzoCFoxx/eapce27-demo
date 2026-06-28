@extends('layouts.app')
@section('title', "Sponsorship — EAPCE'27")

@push('styles')
<style>
.sponsor-card { border-radius:10px; padding:32px; margin-bottom:24px; }
.benefit-list { list-style:none; margin-top:16px; }
.benefit-list li { font-size:0.875rem; padding:5px 0; display:flex; gap:8px; align-items:flex-start; }
.benefit-list li::before { content:"✓"; color:var(--green); font-weight:700; flex-shrink:0; }
.slots-bar { height:6px; border-radius:3px; background:rgba(0,0,0,0.1); margin-top:12px; overflow:hidden; }
.slots-fill { height:100%; border-radius:3px; background:currentColor; }
</style>
@endpush

@section('content')
<div style="background:linear-gradient(160deg,#060e1c,#0c1f35 70%);padding:80px 0 60px">
    <div class="container">
        <div class="section-label">{{ __('messages.nav_sponsors') }}</div>
        <h1 style="color:var(--white);font-size:clamp(2rem,4vw,3rem);font-weight:900">Sponsorship Opportunities</h1>
        <p style="color:rgba(255,255,255,0.6);margin-top:10px">Position your brand at the heart of East Africa's energy conversation.</p>
    </div>
</div>
<section class="section">
    <div class="container">
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px">
            @foreach($sponsors as $sp)
            <div class="sponsor-card" style="background:{{ $sp['color'] }};color:{{ $sp['text'] }}">
                <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;opacity:0.7;margin-bottom:6px">{{ $sp['tier'] }} Sponsor</div>
                <div style="font-size:2rem;font-weight:900;margin-bottom:4px">{{ $sp['price'] }}</div>
                <div style="font-size:0.8rem;opacity:0.6">{{ $sp['taken'] }} of {{ $sp['slots'] }} slots taken</div>
                <div class="slots-bar"><div class="slots-fill" style="width:{{ round($sp['taken']/$sp['slots']*100) }}%;background:{{ $sp['text'] }};opacity:0.4"></div></div>
                <ul class="benefit-list" style="color:{{ $sp['text'] }}">
                    @foreach($sp['benefits'] as $b)
                    <li>{{ $b }}</li>
                    @endforeach
                </ul>
                <a href="{{ route('contact') }}" class="btn-outline" style="margin-top:20px;display:block;text-align:center;color:{{ $sp['text'] }};border-color:{{ $sp['text'] }};opacity:0.85">Enquire Now</a>
            </div>
            @endforeach
        </div>
        <div class="card" style="padding:32px;margin-top:32px;text-align:center">
            <h3 style="font-size:1.1rem;font-weight:700;color:var(--navy);margin-bottom:8px">Custom Packages Available</h3>
            <p style="color:var(--gray);font-size:0.9rem;margin-bottom:20px">Looking for a bespoke sponsorship arrangement? Our team can design a custom package to meet your brand objectives.</p>
            <a href="{{ route('contact') }}" class="btn-gold">Request Custom Package</a>
        </div>
    </div>
</section>
@endsection
