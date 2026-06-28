@extends('layouts.app')

@section('title', "EAPCE'27 — East African Petroleum Conference & Exhibition")

@push('styles')
<style>
.hero { background: linear-gradient(160deg, #060e1c 0%, #0c1f35 55%, #1a4a6e 100%); padding: 120px 0 100px; position: relative; overflow: hidden; }
.hero::after { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); pointer-events: none; }
.hero-inner { position: relative; z-index: 1; }
.hero-tag { display: inline-flex; align-items: center; gap: 8px; background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.3); color: var(--gold); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; margin-bottom: 28px; }
.hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 900; color: var(--white); line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 16px; }
.hero-theme { font-size: clamp(0.9rem, 1.5vw, 1.1rem); color: rgba(255,255,255,0.65); font-style: italic; max-width: 700px; line-height: 1.6; margin-bottom: 16px; }
.hero-meta { color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-bottom: 36px; }
.hero-meta strong { color: var(--white); }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 60px; }
.stats-bar { display: grid; grid-template-columns: repeat(6, 1fr); gap: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 40px; }
.stat-item { text-align: center; padding: 0 12px; border-right: 1px solid rgba(255,255,255,0.08); }
.stat-item:last-child { border-right: none; }
.stat-num { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 900; color: var(--gold); line-height: 1; }
.stat-label { font-size: 0.7rem; font-weight: 600; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 6px; }
@media (max-width: 768px) { .stats-bar { grid-template-columns: repeat(3,1fr); gap: 20px 0; } .stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 12px 0; } }

.expect-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; margin-top: 40px; }
.expect-card { background: var(--white); border-radius: 8px; padding: 28px; border-left: 4px solid var(--gold); box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.expect-icon { font-size: 1.5rem; margin-bottom: 12px; }
.expect-card h3 { font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.expect-card p { font-size: 0.875rem; color: var(--gray); line-height: 1.65; }

.speakers-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; margin-top: 36px; }
.speaker-card { background: var(--white); border-radius: 8px; padding: 24px; text-align: center; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.speaker-avatar { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 800; color: var(--white); margin: 0 auto 14px; }
.speaker-name { font-size: 0.95rem; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
.speaker-role { font-size: 0.8rem; color: var(--gray); line-height: 1.4; }
.speaker-country { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gold); margin-top: 8px; }

.news-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; margin-top: 36px; }
.news-card { background: var(--white); border-radius: 8px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.news-card-body { padding: 24px; }
.news-date { font-size: 0.75rem; color: var(--gray); margin-bottom: 8px; }
.news-card h3 { font-size: 1rem; font-weight: 700; color: var(--navy); margin-bottom: 10px; line-height: 1.4; }
.news-card p { font-size: 0.85rem; color: var(--gray); line-height: 1.65; }

.cta-section { background: linear-gradient(135deg, var(--navy) 0%, #1a4a6e 100%); padding: 80px 0; text-align: center; }
.cta-section h2 { font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 900; color: var(--white); margin-bottom: 12px; }
.cta-section p { color: rgba(255,255,255,0.65); font-size: 1rem; margin-bottom: 32px; }
.cta-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
</style>
@endpush

@section('content')
{{-- Hero --}}
<section class="hero">
    <div class="container hero-inner">
        <div class="hero-tag">{{ __('messages.hero_tag') }}</div>
        <h1>EAPCE<span style="color:var(--gold)">'27</span></h1>
        <p class="hero-theme">{{ __('messages.hero_theme') }}</p>
        <p class="hero-meta"><strong>{{ __('messages.hero_date') }}</strong> · {{ __('messages.hero_venue') }}</p>
        <div class="hero-actions">
            <a href="{{ route('register') }}" class="btn-gold">{{ __('messages.register_now') }}</a>
            <a href="{{ route('exhibition') }}" class="btn-outline">{{ __('messages.book_booth') }}</a>
            <a href="{{ route('sponsors') }}" class="btn-outline">{{ __('messages.become_sponsor') }}</a>
        </div>
        <div class="stats-bar">
            <div class="stat-item"><div class="stat-num">1,200+</div><div class="stat-label">{{ __('messages.stat_delegates') }}</div></div>
            <div class="stat-item"><div class="stat-num">70</div><div class="stat-label">{{ __('messages.stat_booths') }}</div></div>
            <div class="stat-item"><div class="stat-num">8</div><div class="stat-label">{{ __('messages.stat_states') }}</div></div>
            <div class="stat-item"><div class="stat-num">3</div><div class="stat-label">{{ __('messages.stat_days') }}</div></div>
            <div class="stat-item"><div class="stat-num">$2B+</div><div class="stat-label">{{ __('messages.stat_deals') }}</div></div>
            <div class="stat-item"><div class="stat-num">12</div><div class="stat-label">{{ __('messages.stat_tracks') }}</div></div>
        </div>
    </div>
</section>

{{-- What to Expect --}}
<section class="section" style="background:var(--off-white)">
    <div class="container">
        <div class="section-label">{{ __('messages.what_expect') }}</div>
        <h2 class="section-title">{{ __('messages.expect_title') }}</h2>
        <div class="expect-grid">
            @php
            $expectItems = [
                ['⚡','High-Level Plenaries','Heads of State, Ministers and CEOs address strategic energy priorities across the EAC region'],
                ['🤝','B2B Networking Hub','Structured investor-operator matchmaking sessions with over 200 pre-arranged meetings'],
                ['🏭','Exhibition Floor','70 booths showcasing the latest in upstream, midstream, and renewable energy technology'],
                ['📊','Technical Sessions','12 breakout tracks covering upstream regulation, refining, financing, and energy transition'],
                ['🌍','Country Presentations','All 8 EAC Partner States present petroleum sector updates and investment opportunities'],
                ['🎓','Ministerial Dialogue','High-level ministerial roundtable on regional energy policy and shared infrastructure'],
                ['🛢️','Field Excursions','Technical site visits to Rwanda\'s key energy infrastructure and geological sites'],
                ['🏆','Awards Gala','Annual East African Energy Awards recognising excellence across the value chain'],
            ];
            @endphp
            @foreach($expectItems as $ev)
            <div class="expect-card">
                <div class="expect-icon">{{ $ev[0] }}</div>
                <h3>{{ $ev[1] }}</h3>
                <p>{{ $ev[2] }}</p>
            </div>
            @endforeach
        </div>
    </div>
</section>

{{-- Featured Speakers --}}
<section class="section" style="background:var(--white)">
    <div class="container">
        <div class="section-label">Confirmed Speakers</div>
        <h2 class="section-title">{{ __('messages.nav_speakers') }}</h2>
        <div class="speakers-row">
            @foreach($speakers as $s)
            <div class="speaker-card">
                <div class="speaker-avatar" style="background:{{ $s['color'] }}">{{ $s['initials'] }}</div>
                <div class="speaker-name">{{ $s['name'] }}</div>
                <div class="speaker-role">{{ $s['role'] }}</div>
                <div class="speaker-country">{{ $s['country'] }}</div>
            </div>
            @endforeach
        </div>
        <div style="text-align:center;margin-top:32px">
            <a href="{{ route('speakers') }}" class="btn-gold">View All Speakers</a>
        </div>
    </div>
</section>

{{-- Press --}}
<section class="section" style="background:var(--off-white)">
    <div class="container">
        <div class="section-label">Latest News</div>
        <h2 class="section-title">Press Releases</h2>
        <div class="news-grid">
            @foreach($press as $item)
            <div class="news-card">
                <div class="news-card-body">
                    <div class="news-date">{{ $item['date'] }} · <span class="badge" style="background:#dbeafe;color:#1e40af">{{ $item['tag'] }}</span></div>
                    <h3>{{ $item['title'] }}</h3>
                    <p>{{ $item['summary'] }}</p>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>

{{-- CTA --}}
<section class="cta-section">
    <div class="container">
        <h2>Secure Your Place at EAPCE'27</h2>
        <p>Join 1,200+ energy leaders, investors, and policymakers in Kigali this March.</p>
        <div class="cta-actions">
            <a href="{{ route('register') }}" class="btn-gold">{{ __('messages.register_now') }}</a>
            <a href="{{ route('sponsors') }}" class="btn-outline">{{ __('messages.become_sponsor') }}</a>
            <a href="{{ route('contact') }}" class="btn-outline">{{ __('messages.nav_contact') }}</a>
        </div>
    </div>
</section>
@endsection
