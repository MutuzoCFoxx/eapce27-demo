@extends('layouts.app')
@section('title', "Admin Login — EAPCE'27")

@section('content')
<div style="min-height:70vh;display:flex;align-items:center;justify-content:center;padding:60px 20px">
    <div style="width:100%;max-width:400px">
        <div class="card" style="padding:40px">
            <div style="text-align:center;margin-bottom:28px">
                <div style="font-size:2rem;font-weight:900;color:var(--navy)">EAPCE'27</div>
                <div style="font-size:0.75rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);margin-top:4px">Admin Area</div>
            </div>

            @if(session('error'))
                <div class="alert alert-error">{{ session('error') }}</div>
            @endif
            @if(session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
            @endif

            <form method="POST" action="{{ route('admin.login.post') }}">
                @csrf
                <div class="form-group">
                    <label for="password">Admin Password</label>
                    <input id="password" type="password" name="password" class="form-control"
                           placeholder="Enter admin password" required autofocus>
                    @error('password')
                        <div class="form-error">{{ $message }}</div>
                    @enderror
                </div>
                <button type="submit" class="btn-gold" style="width:100%;text-align:center;padding:13px">
                    Sign In →
                </button>
            </form>

            <p style="text-align:center;margin-top:20px;font-size:0.8rem;color:var(--gray)">
                <a href="{{ route('home') }}" style="color:var(--blue)">← Return to public site</a>
            </p>
        </div>
    </div>
</div>
@endsection
