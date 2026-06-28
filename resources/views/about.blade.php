@extends('layouts.app')
@section('title', "About EAPCE'27")

@section('content')
<div style="background:linear-gradient(160deg,#060e1c,#0c1f35 70%);padding:80px 0 60px">
    <div class="container">
        <div class="section-label">{{ __('messages.nav_about') }}</div>
        <h1 style="color:var(--white);font-size:clamp(2rem,4vw,3rem);font-weight:900">About EAPCE'27</h1>
        <p style="color:rgba(255,255,255,0.6);margin-top:10px;max-width:640px">The premier forum for East Africa's petroleum and energy sector, hosted by Rwanda.</p>
    </div>
</div>
<section class="section">
    <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;margin-bottom:60px">
            <div>
                <div class="section-label">Background</div>
                <h2 class="section-title" style="margin-bottom:20px">East African Petroleum Conference & Exhibition</h2>
                <p style="color:var(--gray);font-size:0.95rem;line-height:1.75;margin-bottom:14px">
                    The East African Petroleum Conference and Exhibition (EAPCE) is the flagship energy event of the East African Community (EAC), convening biennially to bring together Heads of State, Ministers, industry CEOs, investors, and technical experts from across the region.
                </p>
                <p style="color:var(--gray);font-size:0.95rem;line-height:1.75;margin-bottom:14px">
                    Established in 1993, EAPCE has grown into one of Africa's most authoritative petroleum conferences, providing a platform for policy dialogue, investment facilitation, and technical exchange that directly shapes the region's energy trajectory.
                </p>
                <p style="color:var(--gray);font-size:0.95rem;line-height:1.75">
                    EAPCE'27 marks the 12th edition and will be hosted by the Republic of Rwanda through the Rwanda Mines, Petroleum and Gas Board (RMB), 9–11 March 2027 at the Kigali Convention Centre.
                </p>
            </div>
            <div>
                <div class="card" style="padding:32px">
                    <h3 style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:16px">Conference Theme</h3>
                    <blockquote style="border-left:4px solid var(--gold);padding-left:16px;color:var(--navy);font-size:1rem;font-style:italic;font-weight:600;line-height:1.6">
                        "Strategic and Sustainable Oil and Gas Resources Exploitation for Energy Security in EAC"
                    </blockquote>
                    <div style="margin-top:24px">
                        <h3 style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:14px">Key Objectives</h3>
                        @foreach([
                            'Review progress on EAC energy sector development',
                            'Facilitate investment in petroleum exploration and production',
                            'Strengthen regional energy cooperation frameworks',
                            'Promote sustainable and responsible resource development',
                            'Foster technology transfer and capacity building',
                        ] as $obj)
                        <div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--light-gray);font-size:0.875rem;color:var(--gray)">
                            <span style="color:var(--gold);font-weight:700;flex-shrink:0">→</span>{{ $obj }}
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        <div style="background:linear-gradient(135deg,var(--navy),#1a4a6e);border-radius:12px;padding:48px;color:var(--white);text-align:center;margin-bottom:60px">
            <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:8px">Why Rwanda?</h2>
            <p style="color:rgba(255,255,255,0.65);max-width:640px;margin:0 auto 32px;font-size:0.95rem;line-height:1.7">Rwanda has positioned itself as East Africa's hub for international conferences and business, combining world-class infrastructure, political stability, and a rapidly growing energy sector.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px">
                @foreach([['#1','MICE Destination in Africa','ICCA Ranking'],['30 min','Airport to KCC','Transfer Time'],['100%','Renewable Power','National Grid'],['Safe & Clean','Business Climate','Consistently ranked']] as $stat)
                <div>
                    <div style="font-size:1.8rem;font-weight:900;color:var(--gold)">{{ $stat[0] }}</div>
                    <div style="font-size:0.85rem;font-weight:600;margin:4px 0 2px">{{ $stat[1] }}</div>
                    <div style="font-size:0.72rem;color:rgba(255,255,255,0.45)">{{ $stat[2] }}</div>
                </div>
                @endforeach
            </div>
        </div>

        <div style="text-align:center">
            <h2 style="font-size:1.3rem;font-weight:800;color:var(--navy);margin-bottom:8px">Organised By</h2>
            <p style="color:var(--gray);font-size:0.9rem;margin-bottom:24px">Under the auspices of the East African Community (EAC)</p>
            <div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center">
                @foreach(['Rwanda Mines, Petroleum & Gas Board (RMB)','East African Community (EAC)','Rwanda Convention Bureau','Planet Events Group'] as $org)
                <div style="background:var(--white);border:1px solid var(--light-gray);border-radius:8px;padding:14px 22px;font-size:0.85rem;font-weight:600;color:var(--navy)">{{ $org }}</div>
                @endforeach
            </div>
        </div>
    </div>
</section>
@endsection
