@extends('layouts.app')
@section('title', "Conference Agenda — EAPCE'27")

@push('styles')
<style>
.agenda-header { background: linear-gradient(160deg,#060e1c,#0c1f35 70%); padding:80px 0 60px; }
.agenda-header h1 { color:var(--white); font-size:clamp(2rem,4vw,3rem); font-weight:900; }
.day-tab { display:inline-block; padding:8px 20px; border-radius:4px; font-size:0.82rem; font-weight:700; cursor:pointer; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.6); margin:4px; background:transparent; transition:all 0.2s; }
.day-tab.active { background:var(--gold); color:var(--navy); border-color:var(--gold); }
.session-row { display:flex; gap:16px; padding:18px 0; border-bottom:1px solid var(--light-gray); align-items:flex-start; }
.session-row:last-child { border-bottom:none; }
.session-time { flex:0 0 110px; font-size:0.8rem; font-weight:700; color:var(--gray); padding-top:2px; white-space:nowrap; }
.session-body { flex:1; }
.session-title { font-size:0.95rem; font-weight:600; color:var(--navy); margin-bottom:4px; }
.session-room { font-size:0.8rem; color:var(--gray); }
.type-badge { display:inline-block; font-size:0.7rem; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; padding:2px 8px; border-radius:12px; margin-bottom:6px; }
</style>
@endpush

@section('content')
<div class="agenda-header">
    <div class="container">
        <div class="section-label">{{ __('messages.nav_agenda') }}</div>
        <h1>Conference Programme</h1>
        <p style="color:rgba(255,255,255,0.6);margin-top:10px">9–11 March 2027 · Kigali Convention Centre, Rwanda</p>
    </div>
</div>

<section class="section" style="background:var(--off-white)">
    <div class="container">
        @php $days = array_keys($agenda); @endphp
        <div style="margin-bottom:32px">
            @foreach($days as $i => $day)
                <button class="day-tab {{ $i===0?'active':'' }}" onclick="showDay({{ $i }},this)">{{ $day }}</button>
            @endforeach
        </div>

        @foreach($agenda as $i => [$day, $sessions])
        @php $idx = array_search($day, array_keys($agenda)); @endphp
        @endforeach

        @php $dayIdx = 0; @endphp
        @foreach($agenda as $day => $sessions)
        <div id="day-{{ $dayIdx }}" class="day-panel card" style="{{ $dayIdx > 0 ? 'display:none' : '' }};padding:8px 28px">
            @foreach($sessions as $s)
            @php $tc = $tagColors[$s['type']] ?? ['bg'=>'#f1f5f9','text'=>'#475569']; @endphp
            <div class="session-row">
                <div class="session-time">{{ $s['time'] }}</div>
                <div class="session-body">
                    <span class="type-badge" style="background:{{ $tc['bg'] }};color:{{ $tc['text'] }}">{{ $s['type'] }}</span>
                    <div class="session-title">{{ $s['title'] }}</div>
                    <div class="session-room">{{ $s['room'] }}</div>
                </div>
            </div>
            @endforeach
        </div>
        @php $dayIdx++; @endphp
        @endforeach
    </div>
</section>

@push('scripts')
<script>
function showDay(idx, btn) {
    document.querySelectorAll('.day-panel').forEach((p,i) => p.style.display = i===idx?'':'none');
    document.querySelectorAll('.day-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}
</script>
@endpush
@endsection
