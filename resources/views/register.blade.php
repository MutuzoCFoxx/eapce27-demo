@extends('layouts.app')
@section('title', "Register — EAPCE'27")

@push('styles')
<style>
.reg-header { background:linear-gradient(160deg,#060e1c,#0c1f35 70%); padding:80px 0 60px; }
.reg-header h1 { color:var(--white); font-size:clamp(2rem,4vw,3rem); font-weight:900; }
.reg-wrap { max-width:700px; margin:0 auto; }
.reg-type-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:12px; margin-bottom:8px; }
.reg-type-card { border:2px solid var(--light-gray); border-radius:8px; padding:16px; cursor:pointer; transition:all 0.15s; position:relative; }
.reg-type-card input[type=radio] { position:absolute; opacity:0; }
.reg-type-card.selected { border-color:var(--blue); background:#eff6ff; }
.reg-type-name { font-weight:700; font-size:0.9rem; color:var(--navy); }
.reg-type-price { font-size:0.8rem; color:var(--gray); margin-top:4px; }
.reg-type-price strong { color:var(--green); }
</style>
@endpush

@section('content')
<div class="reg-header">
    <div class="container">
        <div class="section-label">{{ __('messages.nav_register') }}</div>
        <h1>Delegate Registration</h1>
        <p style="color:rgba(255,255,255,0.6);margin-top:10px">EAPCE'27 · 9–11 March 2027 · Kigali Convention Centre</p>
    </div>
</div>

<section class="section">
    <div class="container reg-wrap">

        @if($errors->any())
        <div class="alert alert-error">
            <ul style="margin:0;padding-left:18px">
                @foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach
            </ul>
        </div>
        @endif

        <div class="card" style="padding:36px">
            <form method="POST" action="{{ route('register.store') }}" id="reg-form">
                @csrf

                <h3 style="font-size:1.1rem;font-weight:700;color:var(--navy);margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid var(--light-gray)">1. Registration Type</h3>
                <div class="reg-type-grid" style="margin-bottom:28px">
                    @foreach($regTypes as $rt)
                    <label class="reg-type-card {{ old('reg_type') === $rt['id'] ? 'selected' : '' }}" id="label-{{ $rt['id'] }}">
                        <input type="radio" name="reg_type" value="{{ $rt['id'] }}" {{ old('reg_type') === $rt['id'] ? 'checked' : '' }} onchange="selectType(this)">
                        <div class="reg-type-name">{{ $rt['label'] }}</div>
                        <div class="reg-type-price"><strong>{{ $rt['price'] === 0 ? 'Complimentary' : 'USD '.$rt['price'] }}</strong></div>
                    </label>
                    @endforeach
                </div>

                <h3 style="font-size:1.1rem;font-weight:700;color:var(--navy);margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid var(--light-gray)">2. Personal Details</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label>First Name *</label>
                        <input class="form-control" type="text" name="first_name" value="{{ old('first_name') }}" required>
                        @error('first_name')<div class="form-error">{{ $message }}</div>@enderror
                    </div>
                    <div class="form-group">
                        <label>Last Name *</label>
                        <input class="form-control" type="text" name="last_name" value="{{ old('last_name') }}" required>
                        @error('last_name')<div class="form-error">{{ $message }}</div>@enderror
                    </div>
                </div>
                <div class="form-group">
                    <label>Email Address *</label>
                    <input class="form-control" type="email" name="email" value="{{ old('email') }}" required>
                    @error('email')<div class="form-error">{{ $message }}</div>@enderror
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Organisation *</label>
                        <input class="form-control" type="text" name="organisation" value="{{ old('organisation') }}" required>
                        @error('organisation')<div class="form-error">{{ $message }}</div>@enderror
                    </div>
                    <div class="form-group">
                        <label>Country *</label>
                        <input class="form-control" type="text" name="country" value="{{ old('country') }}" required>
                        @error('country')<div class="form-error">{{ $message }}</div>@enderror
                    </div>
                </div>
                <div class="form-group">
                    <label>Phone (optional)</label>
                    <input class="form-control" type="tel" name="phone" value="{{ old('phone') }}">
                </div>

                <h3 style="font-size:1.1rem;font-weight:700;color:var(--navy);margin:28px 0 20px;padding-bottom:12px;border-bottom:1px solid var(--light-gray)">3. Preferences</h3>
                <div class="form-group">
                    <label>Dietary Requirements (optional)</label>
                    <select class="form-control" name="dietary">
                        <option value="">None / No restriction</option>
                        <option value="vegetarian" {{ old('dietary')==='vegetarian'?'selected':'' }}>Vegetarian</option>
                        <option value="vegan" {{ old('dietary')==='vegan'?'selected':'' }}>Vegan</option>
                        <option value="halal" {{ old('dietary')==='halal'?'selected':'' }}>Halal</option>
                        <option value="kosher" {{ old('dietary')==='kosher'?'selected':'' }}>Kosher</option>
                        <option value="gluten-free" {{ old('dietary')==='gluten-free'?'selected':'' }}>Gluten-Free</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Hotel Preference (optional)</label>
                    <select class="form-control" name="hotel">
                        <option value="">I will arrange my own accommodation</option>
                        @foreach($hotels as $h)
                        <option value="{{ $h['name'] }}" {{ old('hotel')===$h['name']?'selected':'' }}>{{ $h['name'] }} ({{ $h['stars'] }}★ · {{ $h['rate'] }})</option>
                        @endforeach
                    </select>
                </div>

                <button type="submit" class="btn-gold" style="width:100%;justify-content:center;margin-top:12px;padding:14px">Submit Registration</button>
            </form>
        </div>
    </div>
</section>

@push('scripts')
<script>
function selectType(radio) {
    document.querySelectorAll('.reg-type-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('label-' + radio.value).classList.add('selected');
}
</script>
@endpush
@endsection
