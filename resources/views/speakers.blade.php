@extends('layouts.app')
@section('title', "Speakers — EAPCE'27")

@section('content')
<div style="background:linear-gradient(160deg,#060e1c,#0c1f35 70%);padding:80px 0 60px">
    <div class="container">
        <div class="section-label">{{ __('messages.nav_speakers') }}</div>
        <h1 style="color:var(--white);font-size:clamp(2rem,4vw,3rem);font-weight:900">Confirmed Speakers</h1>
        <p style="color:rgba(255,255,255,0.6);margin-top:10px">High-level voices shaping energy policy across East Africa and beyond.</p>
    </div>
</div>
<section class="section">
    <div class="container">
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:24px">
            @foreach($speakers as $s)
            <div class="card" style="padding:28px;text-align:center">
                <div style="width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.6rem;font-weight:800;color:var(--white);background:{{ $s['color'] }};margin:0 auto 16px">{{ $s['initials'] }}</div>
                <div style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:6px">{{ $s['name'] }}</div>
                <div style="font-size:0.82rem;color:var(--gray);line-height:1.45;margin-bottom:8px">{{ $s['role'] }}</div>
                <div style="font-size:0.72rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--gold)">{{ $s['country'] }}</div>
                <div style="margin-top:10px;font-size:0.75rem;color:rgba(26,74,110,0.7);background:#eff6ff;padding:4px 10px;border-radius:12px;display:inline-block">{{ $s['session'] }}</div>
            </div>
            @endforeach
        </div>
        <div style="text-align:center;margin-top:40px;padding:28px;background:var(--white);border-radius:8px;border:1px dashed var(--light-gray)">
            <p style="font-size:0.9rem;color:var(--gray)">Speaker programme is continuously updated. <a href="{{ route('contact') }}" style="color:var(--blue);font-weight:600">Contact us</a> to submit a speaker nomination.</p>
        </div>
    </div>
</section>
@endsection
