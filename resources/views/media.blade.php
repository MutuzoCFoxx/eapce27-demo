@extends('layouts.app')
@section('title', "Media & Press — EAPCE'27")

@section('content')
<div style="background:linear-gradient(160deg,#060e1c,#0c1f35 70%);padding:80px 0 60px">
    <div class="container">
        <div class="section-label">{{ __('messages.nav_media') }}</div>
        <h1 style="color:var(--white);font-size:clamp(2rem,4vw,3rem);font-weight:900">Media & Press</h1>
        <p style="color:rgba(255,255,255,0.6);margin-top:10px">Official press releases, media accreditation, and press resources.</p>
    </div>
</div>
<section class="section">
    <div class="container">
        <div style="display:grid;grid-template-columns:2fr 1fr;gap:40px;align-items:start">
            <div>
                <h2 style="font-size:1.2rem;font-weight:800;color:var(--navy);margin-bottom:20px">Press Releases</h2>
                <div style="display:flex;flex-direction:column;gap:20px">
                    @foreach($press as $item)
                    <div class="card" style="padding:24px">
                        <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px">
                            <span style="font-size:0.75rem;color:var(--gray)">{{ $item['date'] }}</span>
                            <span class="badge" style="background:#dbeafe;color:#1e40af">{{ $item['tag'] }}</span>
                        </div>
                        <h3 style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:8px">{{ $item['title'] }}</h3>
                        <p style="font-size:0.875rem;color:var(--gray);line-height:1.65">{{ $item['summary'] }}</p>
                    </div>
                    @endforeach
                </div>
            </div>
            <div>
                <div class="card" style="padding:24px;margin-bottom:20px">
                    <h3 style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:12px">Media Accreditation</h3>
                    <p style="font-size:0.85rem;color:var(--gray);margin-bottom:14px;line-height:1.65">Journalists and media organisations may apply for complimentary press accreditation. Coverage must be related to energy, petroleum, or East African business.</p>
                    <a href="{{ route('register') }}" class="btn-gold" style="display:block;text-align:center;font-size:0.8rem;padding:10px">Apply for Press Pass</a>
                </div>
                <div class="card" style="padding:24px">
                    <h3 style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:12px">Press Contacts</h3>
                    <p style="font-size:0.85rem;color:var(--gray);margin-bottom:4px"><strong style="color:var(--text)">Media Enquiries</strong></p>
                    <p style="font-size:0.85rem;color:var(--gray)">press@eapce27.org</p>
                    <p style="font-size:0.85rem;color:var(--gray);margin-top:12px"><strong style="color:var(--text)">General Information</strong></p>
                    <p style="font-size:0.85rem;color:var(--gray)">info@eapce27.org</p>
                    <p style="font-size:0.85rem;color:var(--gray);margin-top:4px">+250 788 000 000</p>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
