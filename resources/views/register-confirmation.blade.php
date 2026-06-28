@extends('layouts.app')
@section('title', "Registration Confirmed — EAPCE'27")

@push('styles')
<style>
.confirm-wrap { max-width:660px; margin:60px auto; padding:0 20px 80px; }
.confirm-icon { width:64px; height:64px; background:#dcfce7; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 20px; }
.badge-card { background:linear-gradient(135deg,var(--navy) 0%,#1a4a6e 100%); border-radius:12px; padding:32px; color:var(--white); margin:28px 0; }
.badge-id { font-size:1.8rem; font-weight:900; letter-spacing:0.08em; color:var(--gold); }
.accred-box { background:#fffbeb; border:1px solid #fcd34d; border-radius:8px; padding:24px; margin-top:24px; }
.accred-done-box { background:#dcfce7; border:1px solid #86efac; border-radius:8px; padding:24px; margin-top:24px; }
.collect-info { margin-top:16px; }
.collect-info p { font-size:0.9rem; color:#15803d; line-height:1.7; }
.collect-info strong { display:block; font-size:1rem; color:#065f46; }
</style>
@endpush

@section('content')
<div class="confirm-wrap">
    <div class="card" style="padding:40px;text-align:center">
        <div class="confirm-icon">✓</div>
        <h1 style="font-size:1.8rem;font-weight:900;color:var(--navy);margin-bottom:8px">{{ __('messages.reg_success') }}</h1>
        <p style="color:var(--gray)">Welcome to EAPCE'27, <strong>{{ $reg->first_name }}</strong>!</p>

        <div class="badge-card" style="text-align:left">
            <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:4px">Badge ID</div>
            <div class="badge-id">{{ $reg->badge_id }}</div>
            <div style="margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:16px;font-size:0.875rem">
                <div>
                    <div style="color:rgba(255,255,255,0.45);font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:2px">Name</div>
                    <div style="font-weight:600">{{ $reg->full_name }}</div>
                </div>
                <div>
                    <div style="color:rgba(255,255,255,0.45);font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:2px">Organisation</div>
                    <div style="font-weight:600">{{ $reg->organisation }}</div>
                </div>
                <div>
                    <div style="color:rgba(255,255,255,0.45);font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:2px">Country</div>
                    <div style="font-weight:600">{{ $reg->country }}</div>
                </div>
                <div>
                    <div style="color:rgba(255,255,255,0.45);font-size:0.7rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:2px">Category</div>
                    <div style="font-weight:600;text-transform:capitalize">{{ $reg->reg_type }}</div>
                </div>
            </div>
        </div>

        @if(session('accred_done') || $reg->accreditation_done)
        <div class="accred-done-box" style="text-align:left">
            <div style="font-weight:700;font-size:1rem;color:#15803d;margin-bottom:12px">✓ Accreditation Complete</div>
            <div class="collect-info">
                <strong>Registration Desk — Kigali Convention Centre Foyer</strong>
                <p>{{ __('messages.badge_collect') }}</p>
                <p style="margin-top:10px;color:#047857"><strong>Badge ID: {{ $reg->badge_id }}</strong></p>
            </div>
        </div>
        @else
        <div class="accred-box" style="text-align:left">
            <div style="font-weight:700;font-size:1rem;color:#92400e;margin-bottom:8px">Next Step: Complete Your Accreditation</div>
            <p style="font-size:0.875rem;color:#78350f;margin-bottom:16px">Please proceed to the EventPass accreditation system to finalise your event badge and access credentials.</p>
            <div style="display:flex;flex-direction:column;gap:10px">
                <a href="{{ $accreditationUrl }}" target="_blank" rel="noopener noreferrer" class="btn-gold" style="text-align:center">
                    {{ __('messages.proceed_accred') }}
                </a>
                <form method="POST" action="{{ route('register.accreditation-done', $reg->badge_id) }}">
                    @csrf
                    <button type="submit" style="width:100%;padding:10px;border:1px solid var(--light-gray);border-radius:4px;background:var(--white);color:var(--gray);font-size:0.85rem;cursor:pointer;font-family:inherit">
                        {{ __('messages.accred_done_btn') }}
                    </button>
                </form>
            </div>
        </div>
        @endif

        <div style="margin-top:28px;padding-top:24px;border-top:1px solid var(--light-gray)">
            <a href="{{ route('home') }}" style="color:var(--blue);font-size:0.875rem;font-weight:600">← Return to Homepage</a>
        </div>
    </div>
</div>
@endsection
