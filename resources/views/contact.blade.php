@extends('layouts.app')
@section('title', "Contact — EAPCE'27")

@section('content')
<div style="background:linear-gradient(160deg,#060e1c,#0c1f35 70%);padding:80px 0 60px">
    <div class="container">
        <div class="section-label">{{ __('messages.nav_contact') }}</div>
        <h1 style="color:var(--white);font-size:clamp(2rem,4vw,3rem);font-weight:900">Contact Us</h1>
    </div>
</div>
<section class="section">
    <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start;max-width:960px;margin:0 auto">
            <div>
                @if(session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
                @endif
                <div class="card" style="padding:32px">
                    <h2 style="font-size:1.2rem;font-weight:800;color:var(--navy);margin-bottom:20px">Send a Message</h2>
                    <form method="POST" action="{{ route('contact.send') }}">
                        @csrf
                        @if($errors->any())
                        <div class="alert alert-error">
                            @foreach($errors->all() as $e)<div>{{ $e }}</div>@endforeach
                        </div>
                        @endif
                        <div class="form-group">
                            <label>Full Name *</label>
                            <input class="form-control" type="text" name="name" value="{{ old('name') }}" required>
                        </div>
                        <div class="form-group">
                            <label>Email Address *</label>
                            <input class="form-control" type="email" name="email" value="{{ old('email') }}" required>
                        </div>
                        <div class="form-group">
                            <label>Subject *</label>
                            <input class="form-control" type="text" name="subject" value="{{ old('subject') }}" required>
                        </div>
                        <div class="form-group">
                            <label>Message *</label>
                            <textarea class="form-control" name="message" rows="5" required style="resize:vertical">{{ old('message') }}</textarea>
                        </div>
                        <button type="submit" class="btn-gold" style="width:100%;justify-content:center;padding:13px">{{ __('messages.send_message') }}</button>
                    </form>
                </div>
            </div>
            <div>
                <div class="card" style="padding:28px;margin-bottom:20px">
                    <h3 style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:14px">Secretariat</h3>
                    <p style="font-size:0.875rem;color:var(--gray);line-height:1.7">Rwanda Mines, Petroleum &amp; Gas Board (RMB)<br>
                    KG 9 Ave, Kigali, Rwanda<br>
                    info@eapce27.org<br>
                    +250 788 000 000</p>
                </div>
                <div class="card" style="padding:28px;margin-bottom:20px">
                    <h3 style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:14px">Exhibition &amp; Sponsorship</h3>
                    <p style="font-size:0.875rem;color:var(--gray)">exhibitions@eapce27.org<br>+250 788 111 222</p>
                </div>
                <div class="card" style="padding:28px">
                    <h3 style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:14px">Media &amp; Press</h3>
                    <p style="font-size:0.875rem;color:var(--gray)">press@eapce27.org<br>+250 788 333 444</p>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
