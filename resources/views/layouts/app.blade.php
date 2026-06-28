<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', "EAPCE'27 — Kigali, Rwanda")</title>
    <meta name="description" content="@yield('description', 'East African Petroleum Conference & Exhibition 2027 — 9–11 March, Kigali Convention Centre, Rwanda.')">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
            --navy: #0c1f35; --navy-mid: #122944; --blue: #1a4a6e;
            --gold: #c9a84c; --gold-light: #f5ecd4; --green: #1a6b3a;
            --white: #ffffff; --off-white: #f7f8fa; --gray: #64748b;
            --light-gray: #e2e8f0; --text: #0f172a; --danger: #dc2626;
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', 'Segoe UI', sans-serif; background: var(--off-white); color: var(--text); min-height: 100vh; }
        a { color: inherit; text-decoration: none; }
        img { max-width: 100%; display: block; }
        .container { max-width: 1280px; margin: 0 auto; padding: 0 20px; }
        .btn-gold { display: inline-block; background: var(--gold); color: var(--navy); font-weight: 700; font-size: 0.875rem; letter-spacing: 0.05em; text-transform: uppercase; padding: 12px 28px; border-radius: 4px; border: 2px solid var(--gold); cursor: pointer; transition: opacity 0.2s; }
        .btn-gold:hover { opacity: 0.88; }
        .btn-outline { display: inline-block; background: transparent; color: var(--white); font-weight: 700; font-size: 0.875rem; letter-spacing: 0.05em; text-transform: uppercase; padding: 12px 28px; border-radius: 4px; border: 2px solid rgba(255,255,255,0.45); cursor: pointer; transition: border-color 0.2s; }
        .btn-outline:hover { border-color: var(--white); }
        .section { padding: 80px 0; }
        .section-label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
        .section-title { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 800; color: var(--navy); line-height: 1.15; }
        .card { background: var(--white); border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); overflow: hidden; }
        .badge { display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; }
        /* Sticky nav */
        #site-nav { position: sticky; top: 0; z-index: 200; }
        .lang-bar { background: #060e1c; border-bottom: 1px solid rgba(255,255,255,0.06); padding: 0 20px; }
        .lang-bar-inner { max-width: 1280px; margin: 0 auto; display: flex; justify-content: flex-end; align-items: center; height: 34px; gap: 4px; }
        .lang-btn { background: transparent; color: rgba(255,255,255,0.45); border: 1px solid rgba(255,255,255,0.12); padding: 2px 10px; border-radius: 3px; cursor: pointer; font-size: 10.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.15s; }
        .lang-btn.active { background: var(--gold); color: var(--navy); border-color: var(--gold); }
        .main-nav { background: var(--navy); box-shadow: 0 2px 20px rgba(0,0,0,0.4); border-bottom: 1px solid rgba(255,255,255,0.07); }
        .main-nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; min-height: 60px; }
        .nav-logo { display: flex; flex-direction: column; line-height: 1; }
        .nav-logo-title { color: var(--white); font-size: 1.3rem; font-weight: 900; letter-spacing: 0.02em; }
        .nav-logo-sub { color: var(--gold); font-size: 0.6rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 1px; }
        .nav-links { display: flex; align-items: center; gap: 2px; list-style: none; }
        .nav-links a { color: rgba(255,255,255,0.72); font-size: 0.8rem; font-weight: 500; padding: 8px 10px; border-radius: 3px; transition: color 0.15s, background 0.15s; white-space: nowrap; }
        .nav-links a:hover, .nav-links a.active { color: var(--white); background: rgba(255,255,255,0.08); }
        .nav-cta { display: flex; gap: 8px; align-items: center; }
        .nav-cta .btn-gold { padding: 7px 18px; font-size: 0.78rem; }
        /* Hamburger */
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--white); margin: 5px 0; border-radius: 2px; transition: all 0.25s; }
        .mobile-menu { display: none; background: var(--navy-mid); border-top: 1px solid rgba(255,255,255,0.07); padding: 12px 20px 20px; }
        .mobile-menu a { display: block; color: rgba(255,255,255,0.75); font-size: 0.9rem; font-weight: 500; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mobile-menu a:last-child { border-bottom: none; }
        .mobile-menu a.active { color: var(--gold); }
        @media (max-width: 960px) {
            .nav-links, .nav-cta { display: none; }
            .hamburger { display: block; }
            .mobile-menu.open { display: block; }
        }
        /* Footer */
        .site-footer { background: var(--navy); color: rgba(255,255,255,0.55); padding: 60px 0 28px; }
        .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; margin-bottom: 48px; }
        .footer-brand .nav-logo-title { font-size: 1.5rem; }
        .footer-brand p { font-size: 0.85rem; margin-top: 12px; line-height: 1.65; }
        .footer-col h4 { color: var(--white); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 14px; }
        .footer-col a, .footer-col p { color: rgba(255,255,255,0.55); font-size: 0.85rem; line-height: 2; display: block; }
        .footer-col a:hover { color: var(--gold); }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; font-size: 0.78rem; text-align: center; }
        /* Alerts */
        .alert { padding: 14px 18px; border-radius: 6px; margin-bottom: 20px; font-size: 0.9rem; }
        .alert-success { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
        .alert-error { background: #fee2e2; color: var(--danger); border: 1px solid #fca5a5; }
        /* Forms */
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--navy); margin-bottom: 6px; }
        .form-control { width: 100%; border: 1px solid var(--light-gray); border-radius: 6px; padding: 10px 14px; font-size: 0.9rem; font-family: inherit; background: var(--white); color: var(--text); transition: border-color 0.15s; }
        .form-control:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px rgba(26,74,110,0.12); }
        .form-error { color: var(--danger); font-size: 0.8rem; margin-top: 4px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }
    </style>
    @stack('styles')
</head>
<body>
    <div id="site-nav">
        <div class="lang-bar">
            <div class="lang-bar-inner">
                @foreach(['en','fr','sw'] as $loc)
                    <a href="{{ route('lang.switch', $loc) }}" class="lang-btn {{ app()->getLocale() === $loc ? 'active' : '' }}">{{ strtoupper($loc) }}</a>
                @endforeach
            </div>
        </div>
        <nav class="main-nav">
            <div class="main-nav-inner">
                <a href="{{ route('home') }}" class="nav-logo">
                    <span class="nav-logo-title">EAPCE'27</span>
                    <span class="nav-logo-sub">Kigali · 9–11 Mar 2027</span>
                </a>
                <ul class="nav-links">
                    @foreach([
                        'home'       => __('messages.nav_home'),
                        'about'      => __('messages.nav_about'),
                        'agenda'     => __('messages.nav_agenda'),
                        'exhibition' => __('messages.nav_exhibition'),
                        'sponsors'   => __('messages.nav_sponsors'),
                        'speakers'   => __('messages.nav_speakers'),
                        'venue'      => __('messages.nav_venue'),
                        'media'      => __('messages.nav_media'),
                        'contact'    => __('messages.nav_contact'),
                    ] as $r => $label)
                        <li><a href="{{ route($r) }}" class="{{ request()->routeIs($r) ? 'active' : '' }}">{{ $label }}</a></li>
                    @endforeach
                </ul>
                <div class="nav-cta">
                    <a href="{{ route('register') }}" class="btn-gold">{{ __('messages.register_now') }}</a>
                </div>
                <button class="hamburger" id="hamburger" aria-label="Menu" onclick="toggleMenu()">
                    <span></span><span></span><span></span>
                </button>
            </div>
            <div class="mobile-menu" id="mobile-menu">
                @foreach([
                    'home'       => __('messages.nav_home'),
                    'about'      => __('messages.nav_about'),
                    'agenda'     => __('messages.nav_agenda'),
                    'register'   => __('messages.nav_register'),
                    'exhibition' => __('messages.nav_exhibition'),
                    'sponsors'   => __('messages.nav_sponsors'),
                    'speakers'   => __('messages.nav_speakers'),
                    'venue'      => __('messages.nav_venue'),
                    'media'      => __('messages.nav_media'),
                    'contact'    => __('messages.nav_contact'),
                ] as $r => $label)
                    <a href="{{ route($r) }}" class="{{ request()->routeIs($r) ? 'active' : '' }}">{{ $label }}</a>
                @endforeach
            </div>
        </nav>
    </div>

    <main>
        @yield('content')
    </main>

    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="nav-logo">
                        <span class="nav-logo-title">EAPCE'27</span>
                        <span class="nav-logo-sub" style="margin-top:4px">Kigali · 9–11 March 2027</span>
                    </div>
                    <p>East African Petroleum Conference &amp; Exhibition.<br>Hosted by Rwanda Mines, Petroleum and Gas Board.</p>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <a href="{{ route('about') }}">{{ __('messages.nav_about') }}</a>
                    <a href="{{ route('agenda') }}">{{ __('messages.nav_agenda') }}</a>
                    <a href="{{ route('speakers') }}">{{ __('messages.nav_speakers') }}</a>
                    <a href="{{ route('sponsors') }}">{{ __('messages.nav_sponsors') }}</a>
                    <a href="{{ route('exhibition') }}">{{ __('messages.nav_exhibition') }}</a>
                </div>
                <div class="footer-col">
                    <h4>Attend</h4>
                    <a href="{{ route('register') }}">{{ __('messages.register_now') }}</a>
                    <a href="{{ route('venue') }}">{{ __('messages.nav_venue') }}</a>
                    <a href="{{ route('media') }}">{{ __('messages.nav_media') }}</a>
                    <a href="{{ route('contact') }}">{{ __('messages.nav_contact') }}</a>
                </div>
                <div class="footer-col">
                    <h4>Contact</h4>
                    <p>Kigali Convention Centre<br>KG 2 Roundabout, Kigali</p>
                    <p style="margin-top:8px">info@eapce27.org<br>+250 788 000 000</p>
                </div>
            </div>
            <div class="footer-bottom">{{ __('messages.footer_copy') }}</div>
        </div>
    </footer>

    <script>
        function toggleMenu() {
            var m = document.getElementById('mobile-menu');
            m.classList.toggle('open');
        }
    </script>
    @stack('scripts')
</body>
</html>
