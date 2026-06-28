<?php

return [

    'agenda' => [
        'Pre-Conference (Mar 8)' => [
            ['time'=>'08:00–09:00','title'=>'Delegate Registration & Accreditation','room'=>'Foyer 1A','type'=>'logistics'],
            ['time'=>'09:00–12:00','title'=>'NOC / Steering Committee Meeting','room'=>'AD10 (VIP Lounge)','type'=>'official'],
            ['time'=>'10:30–11:00','title'=>'Mid-Morning Coffee Break','room'=>'Concourse','type'=>'break'],
            ['time'=>'12:00–13:00','title'=>'Pre-Conference Lunch','room'=>'KCC Dining','type'=>'break'],
            ['time'=>'13:00–17:00','title'=>'Technical Workshop: Upstream Petroleum Regulation in EAC','room'=>'MH4','type'=>'session'],
            ['time'=>'18:00–20:00','title'=>'Welcome Cocktail Reception','room'=>'KCC Concourse','type'=>'social'],
        ],
        'Day 1 — Mar 9' => [
            ['time'=>'08:30–10:00','title'=>'Official Opening Ceremony — Heads of State / Ministers','room'=>'Auditorium','type'=>'plenary'],
            ['time'=>'10:30–12:30','title'=>'Plenary: Strategic Petroleum Resources Exploitation for Sustainable Energy Security in EAC','room'=>'Auditorium','type'=>'plenary'],
            ['time'=>'12:30–13:30','title'=>'Networking Lunch','room'=>'KCC Dining','type'=>'break'],
            ['time'=>'13:30–15:30','title'=>'Breakout A: Oil & Gas Investment Climate','room'=>'AD11','type'=>'session'],
            ['time'=>'13:30–15:30','title'=>'Breakout B: Upstream Licensing & Data Management','room'=>'AD12','type'=>'session'],
            ['time'=>'13:30–15:30','title'=>'Breakout C: Refining & Energy Transition','room'=>'MH4','type'=>'session'],
            ['time'=>'16:00–17:30','title'=>'Plenary: East African Petroleum Resources for Enhanced Regional Economy','room'=>'Auditorium','type'=>'plenary'],
            ['time'=>'18:30–22:00','title'=>'Gala Dinner & Cultural Evening','room'=>'Outside Tent / KCC','type'=>'social'],
        ],
        'Day 2 — Mar 10' => [
            ['time'=>'08:30–10:00','title'=>'Plenary: Social–Economic Transformation through Petroleum Resources','room'=>'Auditorium','type'=>'plenary'],
            ['time'=>'10:30–12:30','title'=>'Country Presentations: Uganda, Kenya, Tanzania, Burundi','room'=>'Auditorium','type'=>'session'],
            ['time'=>'13:30–15:30','title'=>'B2B Meetings — Investors & Service Providers','room'=>'AD1–AD4','type'=>'b2b'],
            ['time'=>'13:30–15:30','title'=>'Poster Sessions & Technical Exhibits','room'=>'Concourse','type'=>'session'],
            ['time'=>'16:00–17:30','title'=>'Panel: Energy Financing & Foreign Direct Investment','room'=>'Auditorium','type'=>'plenary'],
            ['time'=>'17:30–19:30','title'=>'Cocktail Reception — Networking','room'=>'KCC Concourse','type'=>'social'],
        ],
        'Day 3 — Mar 11' => [
            ['time'=>'08:30–10:00','title'=>'Country Presentations: DRC, Rwanda, South Sudan','room'=>'Auditorium','type'=>'plenary'],
            ['time'=>'10:30–12:00','title'=>'Site Visits & Field Excursions','room'=>'Departure from KCC','type'=>'excursion'],
            ['time'=>'13:00–15:00','title'=>'Ministerial High-Level Dialogue: Shared Vision for EAC Energy Security','room'=>'Auditorium','type'=>'plenary'],
            ['time'=>'15:00–16:00','title'=>'Closing Ceremony & Communiqué Adoption','room'=>'Auditorium','type'=>'official'],
        ],
    ],

    'speakers' => [
        ['name'=>'H.E. Amb. (Dr.) Veronica Nduva','role'=>'Secretary General, East African Community','country'=>'EAC','session'=>'Opening Ceremony','initials'=>'VN','color'=>'#0c1f35'],
        ['name'=>'Prof. Jean-Pierre Rwabukumba','role'=>'CEO, Rwanda Mines, Petroleum & Gas Board','country'=>'Rwanda','session'=>'Plenary Day 1','initials'=>'JR','color'=>'#1a6b3a'],
        ['name'=>'Dr. Akinwumi Adesina','role'=>'Energy Policy Advisor','country'=>'Kenya','session'=>'B2B Sessions','initials'=>'AA','color'=>'#c9a84c'],
        ['name'=>'Ms. Fatuma Ndunguru','role'=>'Director General, TPDC Tanzania','country'=>'Tanzania','session'=>'Country Presentations','initials'=>'FN','color'=>'#0c1f35'],
        ['name'=>'Eng. Robert Kasande','role'=>'Commissioner, PEPD Uganda','country'=>'Uganda','session'=>'Upstream Licensing','initials'=>'RK','color'=>'#1a6b3a'],
        ['name'=>'Dr. Claudine Uwera','role'=>'Investment Promotion Director, RDB','country'=>'Rwanda','session'=>'Investment Climate','initials'=>'CU','color'=>'#8b1a1a'],
        ['name'=>'Mr. Abdullahi Hassan','role'=>'Head of Upstream, South Sudan','country'=>'South Sudan','session'=>'Country Presentations','initials'=>'AH','color'=>'#c9a84c'],
        ['name'=>'Ms. Amina Waceke','role'=>'CEO, EAC Energy Investment Fund','country'=>'Burundi','session'=>'Energy Financing','initials'=>'AW','color'=>'#0c1f35'],
    ],

    'sponsors' => [
        ['tier'=>'Platinum','price'=>'USD 50,000','color'=>'#a0856c','text'=>'#fff','slots'=>2,'taken'=>2,
         'benefits'=>['Prime booth (A-Zone, 6×6m)','Logo on all materials & website hero','10 delegate passes','Speaking slot — opening ceremony','VIP dinner seating','Full-page brochure ad']],
        ['tier'=>'Gold','price'=>'USD 25,000','color'=>'#c9a84c','text'=>'#0f172a','slots'=>5,'taken'=>3,
         'benefits'=>['Premium booth (B-Zone, 4×4m)','Logo on website & banners','6 delegate passes','Speaking slot — panel session','Gala dinner tickets (4)','Half-page brochure ad']],
        ['tier'=>'Silver','price'=>'USD 12,000','color'=>'#64748b','text'=>'#fff','slots'=>10,'taken'=>7,
         'benefits'=>['Standard booth (C-Zone, 3×3m)','Logo on select materials','4 delegate passes','Exhibition listing','Gala dinner tickets (2)']],
        ['tier'=>'Bronze','price'=>'USD 5,000','color'=>'#cd7f32','text'=>'#fff','slots'=>15,'taken'=>9,
         'benefits'=>['Tabletop display space','Logo on website','2 delegate passes','Exhibition listing','Name in program']],
    ],

    'reg_types' => [
        ['id'=>'delegate','label'=>'Delegate (Full Access)','price'=>850],
        ['id'=>'exhibitor','label'=>'Exhibitor Representative','price'=>450],
        ['id'=>'media','label'=>'Media / Press','price'=>0],
        ['id'=>'student','label'=>'Student / Academic','price'=>150],
        ['id'=>'government','label'=>'Government Official','price'=>0],
    ],

    'hotels' => [
        ['name'=>'Radisson Blu Hotel & Convention Centre','stars'=>5,'distance'=>'On-site','rate'=>'USD 220/night','rooms'=>'Available','code'=>'EAPCE27-RBL'],
        ['name'=>'Marriott Hotel Kigali','stars'=>5,'distance'=>'1.2 km','rate'=>'USD 195/night','rooms'=>'Limited','code'=>'EAPCE27-MKG'],
        ['name'=>'Serena Hotel Kigali','stars'=>5,'distance'=>'2.0 km','rate'=>'USD 180/night','rooms'=>'Available','code'=>'EAPCE27-SKG'],
        ['name'=>'Kigali Marriott Executive Apartments','stars'=>4,'distance'=>'1.5 km','rate'=>'USD 140/night','rooms'=>'Available','code'=>'EAPCE27-MEA'],
        ['name'=>'The Retreat Hotel','stars'=>4,'distance'=>'3.0 km','rate'=>'USD 110/night','rooms'=>'Available','code'=>'EAPCE27-RTR'],
    ],

    'press' => [
        ['date'=>'June 10, 2026','tag'=>'Announcement','title'=>'Rwanda Officially Announced as Host of 12th EAPCE 2027','summary'=>'The Republic of Rwanda through the Rwanda Mines, Petroleum and Gas Board (RMB) has been officially confirmed as the host nation for EAPCE\'27, to be held at Kigali Convention Centre from 9–11 March 2027.'],
        ['date'=>'June 20, 2026','tag'=>'Exhibition','title'=>'Exhibition Booth Applications Now Open for EAPCE\'27','summary'=>'Energy companies and industry stakeholders are invited to secure exhibition booth space at EAPCE\'27. Seventy booths are available across Platinum, Gold, Silver, and Bronze tiers.'],
        ['date'=>'July 5, 2026','tag'=>'Sponsorship','title'=>'EAPCE\'27 Sponsorship Packages Released — Early Bird Discount Available','summary'=>'Rwanda Convention Bureau and RMB have released the official sponsorship prospectus for EAPCE\'27. Companies can now secure naming rights, speaking opportunities, and premium delegate packages.'],
    ],

    'accreditation_url' => 'https://app.eventpass.rw/register/event/DP9GdOp95zBxPY05sb77cHKKCfYCqx3zWiSSnSD5ZKgKApzSvUMktcDgHRDqKqjl',

    'tag_colors' => [
        'plenary'   => ['bg'=>'#dbeafe','text'=>'#1e40af'],
        'session'   => ['bg'=>'#dcfce7','text'=>'#15803d'],
        'break'     => ['bg'=>'#fef9c3','text'=>'#854d0e'],
        'social'    => ['bg'=>'#fce7f3','text'=>'#9d174d'],
        'logistics' => ['bg'=>'#f1f5f9','text'=>'#475569'],
        'official'  => ['bg'=>'#ede9fe','text'=>'#5b21b6'],
        'b2b'       => ['bg'=>'#ffedd5','text'=>'#9a3412'],
        'excursion' => ['bg'=>'#d1fae5','text'=>'#065f46'],
    ],
];
