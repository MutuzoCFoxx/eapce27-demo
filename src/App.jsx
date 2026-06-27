import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── PALETTE ────────────────────────────────────────────────────────────────
const C = {
  navy: "#0a2540",
  navyMid: "#0d3260",
  blue: "#1a5276",
  gold: "#c9a84c",
  goldLight: "#f5ecd4",
  green: "#1a6b3a",
  greenLight: "#e8f5ee",
  white: "#ffffff",
  offWhite: "#f8fafc",
  gray: "#64748b",
  lightGray: "#e2e8f0",
  text: "#0f172a",
  danger: "#dc2626",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const AGENDA = {
  "Pre-Conference (Mar 8)": [
    { time: "08:00–09:00", title: "Delegate Registration & Accreditation", room: "Foyer 1A", type: "logistics" },
    { time: "09:00–12:00", title: "NOC / Steering Committee Meeting", room: "AD10 (VIP Lounge)", type: "official" },
    { time: "10:30–11:00", title: "Mid-Morning Coffee Break", room: "Concourse", type: "break" },
    { time: "12:00–13:00", title: "Pre-Conference Lunch", room: "KCC Dining", type: "break" },
    { time: "13:00–17:00", title: "Technical Workshop: Upstream Petroleum Regulation in EAC", room: "MH4", type: "session" },
    { time: "18:00–20:00", title: "Welcome Cocktail Reception", room: "KCC Concourse", type: "social" },
  ],
  "Day 1 — Mar 9": [
    { time: "08:30–10:00", title: "Official Opening Ceremony — Heads of State / Ministers", room: "Auditorium", type: "plenary" },
    { time: "10:30–12:30", title: "Plenary: Strategic Petroleum Resources Exploitation for Sustainable Energy Security in EAC", room: "Auditorium", type: "plenary" },
    { time: "12:30–13:30", title: "Networking Lunch", room: "KCC Dining", type: "break" },
    { time: "13:30–15:30", title: "Breakout A: Oil & Gas Investment Climate", room: "AD11", type: "session" },
    { time: "13:30–15:30", title: "Breakout B: Upstream Licensing & Data Management", room: "AD12", type: "session" },
    { time: "13:30–15:30", title: "Breakout C: Refining & Energy Transition", room: "MH4", type: "session" },
    { time: "16:00–17:30", title: "Plenary: East African Petroleum Resources for Enhanced Regional Economy", room: "Auditorium", type: "plenary" },
    { time: "18:30–22:00", title: "Gala Dinner & Cultural Evening", room: "Outside Tent / KCC", type: "social" },
  ],
  "Day 2 — Mar 10": [
    { time: "08:30–10:00", title: "Plenary: Social–Economic Transformation through Petroleum Resources", room: "Auditorium", type: "plenary" },
    { time: "10:30–12:30", title: "Country Presentations: Uganda, Kenya, Tanzania, Burundi", room: "Auditorium", type: "session" },
    { time: "13:30–15:30", title: "B2B Meetings — Investors & Service Providers", room: "AD1–AD4", type: "b2b" },
    { time: "13:30–15:30", title: "Poster Sessions & Technical Exhibits", room: "Concourse", type: "session" },
    { time: "16:00–17:30", title: "Panel: Energy Financing & Foreign Direct Investment", room: "Auditorium", type: "plenary" },
    { time: "17:30–19:30", title: "Cocktail Reception — Networking", room: "KCC Concourse", type: "social" },
  ],
  "Day 3 — Mar 11": [
    { time: "08:30–10:00", title: "Country Presentations: DRC, Rwanda, South Sudan", room: "Auditorium", type: "plenary" },
    { time: "10:30–12:00", title: "Site Visits & Field Excursions", room: "Departure from KCC", type: "excursion" },
    { time: "13:00–15:00", title: "Ministerial High-Level Dialogue: Shared Vision for EAC Energy Security", room: "Auditorium", type: "plenary" },
    { time: "15:00–16:00", title: "Closing Ceremony & Communiqué Adoption", room: "Auditorium", type: "official" },
  ],
};

const SPEAKERS = [
  { name: "H.E. Amb. (Dr.) Veronica Nduva", role: "Secretary General, East African Community", country: "EAC", session: "Opening Ceremony", initials: "VN", color: "#0a2540" },
  { name: "Prof. Jean-Pierre Rwabukumba", role: "CEO, Rwanda Mines, Petroleum & Gas Board", country: "Rwanda", session: "Plenary Day 1", initials: "JR", color: "#1a6b3a" },
  { name: "Dr. Akinwumi Adesina", role: "Energy Policy Advisor", country: "Kenya", session: "B2B Sessions", initials: "AA", color: "#c9a84c" },
  { name: "Ms. Fatuma Ndunguru", role: "Director General, TPDC Tanzania", country: "Tanzania", session: "Country Presentations", initials: "FN", color: "#0a2540" },
  { name: "Eng. Robert Kasande", role: "Commissioner, PEPD Uganda", country: "Uganda", session: "Upstream Licensing", initials: "RK", color: "#1a6b3a" },
  { name: "Dr. Claudine Uwera", role: "Investment Promotion Director, RDB", country: "Rwanda", session: "Investment Climate", initials: "CU", color: "#8b1a1a" },
  { name: "Mr. Abdullahi Hassan", role: "Head of Upstream, South Sudan", country: "South Sudan", session: "Country Presentations", initials: "AH", color: "#c9a84c" },
  { name: "Ms. Amina Waceke", role: "CEO, EAC Energy Investment Fund", country: "Burundi", session: "Energy Financing", initials: "AW", color: "#0a2540" },
];

const SPONSORS = [
  { tier: "Platinum", price: "USD 50,000", color: "#a0856c", textColor: "#fff", slots: 2, taken: 2,
    benefits: ["Prime booth (A-Zone, 6×6m)", "Logo on all materials & website hero", "10 delegate passes", "Speaking slot — opening ceremony", "VIP dinner seating", "Full-page brochure ad"] },
  { tier: "Gold", price: "USD 25,000", color: "#c9a84c", textColor: "#0f172a", slots: 5, taken: 3,
    benefits: ["Premium booth (B-Zone, 4×4m)", "Logo on website & banners", "6 delegate passes", "Speaking slot — panel session", "Gala dinner tickets (4)", "Half-page brochure ad"] },
  { tier: "Silver", price: "USD 12,000", color: "#64748b", textColor: "#fff", slots: 10, taken: 7,
    benefits: ["Standard booth (C-Zone, 3×3m)", "Logo on select materials", "4 delegate passes", "Exhibition listing", "Gala dinner tickets (2)"] },
  { tier: "Bronze", price: "USD 5,000", color: "#cd7f32", textColor: "#fff", slots: 15, taken: 9,
    benefits: ["Tabletop display space", "Logo on website", "2 delegate passes", "Exhibition listing", "Name in program"] },
];

const EXHIBITORS_MOCK = [
  { id: "E001", company: "TotalEnergies SE", booth: "A-01", status: "Confirmed", tier: "Platinum" },
  { id: "E002", company: "Schlumberger (SLB)", booth: "A-02", status: "Confirmed", tier: "Gold" },
  { id: "E003", company: "Baker Hughes East Africa", booth: "B-01", status: "Pending", tier: "Silver" },
  { id: "E004", company: "Tullow Oil Rwanda", booth: "B-03", status: "Confirmed", tier: "Gold" },
  { id: "E005", company: "Africa Oil Corp", booth: "C-02", status: "Confirmed", tier: "Silver" },
  { id: "E006", company: "Halliburton EAC", booth: "C-04", status: "Pending", tier: "Bronze" },
];

const HOTELS = [
  { name: "Radisson Blu Hotel & Convention Centre", stars: 5, distance: "On-site", rate: "USD 220/night", rooms: "Available", code: "EAPCE27-RBL" },
  { name: "Marriott Hotel Kigali", stars: 5, distance: "1.2 km", rate: "USD 195/night", rooms: "Limited", code: "EAPCE27-MKG" },
  { name: "Serena Hotel Kigali", stars: 5, distance: "2.0 km", rate: "USD 180/night", rooms: "Available", code: "EAPCE27-SKG" },
  { name: "Kigali Marriott Executive Apartments", stars: 4, distance: "1.5 km", rate: "USD 140/night", rooms: "Available", code: "EAPCE27-MEA" },
  { name: "The Retreat Hotel", stars: 4, distance: "3.0 km", rate: "USD 110/night", rooms: "Available", code: "EAPCE27-RTR" },
];

const REGISTRATION_TYPES = [
  { id: "delegate", label: "Delegate (Full Access)", price: 850 },
  { id: "exhibitor", label: "Exhibitor Representative", price: 450 },
  { id: "media", label: "Media / Press", price: 0 },
  { id: "student", label: "Student / Academic", price: 150 },
  { id: "government", label: "Government Official", price: 0 },
];

const PRESS_RELEASES = [
  { date: "June 10, 2026", tag: "Announcement", title: "Rwanda Officially Announced as Host of 12th EAPCE 2027", summary: "The Republic of Rwanda through the Rwanda Mines, Petroleum and Gas Board (RMB) has been officially confirmed as the host nation for EAPCE'27, to be held at Kigali Convention Centre from 9–11 March 2027." },
  { date: "June 20, 2026", tag: "Exhibition", title: "Exhibition Booth Applications Now Open for EAPCE'27", summary: "Energy companies and industry stakeholders are invited to secure exhibition booth space at EAPCE'27. Seventy booths are available across Platinum, Gold, Silver, and Bronze tiers." },
  { date: "July 5, 2026", tag: "Sponsorship", title: "EAPCE'27 Sponsorship Packages Released — Early Bird Discount Available", summary: "Rwanda Convention Bureau and RMB have released the official sponsorship prospectus for EAPCE'27. Companies can now secure naming rights, speaking opportunities, and premium delegate packages." },
];

const ANALYTICS_REG = [
  { month: "Aug", count: 45 }, { month: "Sep", count: 120 }, { month: "Oct", count: 210 },
  { month: "Nov", count: 380 }, { month: "Dec", count: 510 }, { month: "Jan", count: 720 },
  { month: "Feb", count: 910 }, { month: "Mar", count: 1047 },
];
const ANALYTICS_REVENUE = [
  { month: "Aug", revenue: 38250 }, { month: "Sep", revenue: 102000 }, { month: "Oct", revenue: 178500 },
  { month: "Nov", revenue: 323000 }, { month: "Dec", revenue: 433500 }, { month: "Jan", revenue: 612000 },
  { month: "Feb", revenue: 773500 }, { month: "Mar", revenue: 889950 },
];
const ANALYTICS_PIE = [
  { name: "Delegates", value: 612, color: "#0a2540" },
  { name: "Exhibitors", value: 210, color: "#1a6b3a" },
  { name: "Government", value: 125, color: "#c9a84c" },
  { name: "Media", value: 68, color: "#64748b" },
  { name: "Students", value: 32, color: "#cd7f32" },
];
const ANALYTICS_BOOTHS = [
  { zone: "Platinum", sold: 2, total: 2 },
  { zone: "Gold", sold: 4, total: 5 },
  { zone: "Silver", sold: 7, total: 10 },
  { zone: "Bronze", sold: 9, total: 15 },
];

const tagColors = {
  plenary: { bg: "#dbeafe", text: "#1e40af" },
  session: { bg: "#dcfce7", text: "#15803d" },
  break: { bg: "#fef9c3", text: "#854d0e" },
  social: { bg: "#fce7f3", text: "#9d174d" },
  logistics: { bg: "#f1f5f9", text: "#475569" },
  official: { bg: "#ede9fe", text: "#5b21b6" },
  b2b: { bg: "#ffedd5", text: "#9a3412" },
  excursion: { bg: "#d1fae5", text: "#065f46" },
};

const PAGES = ["Home", "Agenda", "Register", "Exhibition", "Sponsors", "Speakers", "Venue", "Media", "Admin"];

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────
function Countdown({ dark }) {
  const target = new Date("2027-03-09T08:00:00");
  const [diff, setDiff] = useState(target - Date.now());
  useEffect(() => { const t = setInterval(() => setDiff(target - Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, Math.floor(diff / 86400000));
  const h = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000));
  const s = Math.max(0, Math.floor((diff % 60000) / 1000));
  const Box = ({ v, label }) => (
    <div style={{ textAlign: "center" }}>
      <div style={{ background: dark ? "rgba(255,255,255,0.12)" : C.navy, borderRadius: 8, padding: "12px 20px", fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: 2, fontVariantNumeric: "tabular-nums", minWidth: 72, border: `1px solid ${dark ? "rgba(255,255,255,0.2)" : "transparent"}` }}>{String(v).padStart(2, "0")}</div>
      <div style={{ color: dark ? "rgba(255,255,255,0.55)" : C.gray, fontSize: 10, marginTop: 6, textTransform: "uppercase", letterSpacing: 2 }}>{label}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
      <Box v={d} label="Days" /><Box v={h} label="Hours" /><Box v={m} label="Mins" /><Box v={s} label="Secs" />
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ background: scrolled ? "rgba(10,37,64,0.98)" : C.navy, backdropFilter: "blur(10px)", borderBottom: `2px solid ${C.gold}`, position: "sticky", top: 0, zIndex: 200, transition: "background 0.3s" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setPage("Home")}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: `linear-gradient(135deg, ${C.gold}, #e8c96a)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: C.navy }}>EAC</div>
          <div>
            <div style={{ color: C.gold, fontWeight: 800, fontSize: 15, letterSpacing: 0.5 }}>EAPCE'27</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, letterSpacing: 1, textTransform: "uppercase" }}>Kigali · 9–11 March 2027</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          {PAGES.filter(p => p !== "Admin").map(p => (
            <button key={p} onClick={() => setPage(p)}
              style={{ background: "transparent", color: page === p ? C.gold : "rgba(255,255,255,0.72)", border: "none", padding: "8px 12px", cursor: "pointer", fontSize: 12, fontWeight: page === p ? 700 : 400, borderBottom: page === p ? `2px solid ${C.gold}` : "2px solid transparent" }}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage("Register")} style={{ marginLeft: 12, background: C.gold, color: C.navy, border: "none", padding: "9px 20px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 800 }}>Register Now</button>
          <button onClick={() => setPage("Admin")} style={{ marginLeft: 6, background: "transparent", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.12)", padding: "8px 10px", borderRadius: 6, cursor: "pointer", fontSize: 10 }}>🔒</button>
        </div>
      </div>
    </nav>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div>
      {/* HERO */}
      <div style={{ background: `linear-gradient(160deg, #050e1a 0%, #0a2540 40%, #0d3d2a 100%)`, padding: "80px 24px 70px", textAlign: "center", position: "relative", overflow: "hidden", minHeight: 540, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 480, height: 480, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.13)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 60%, rgba(26,106,58,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(201,168,76,0.1) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", borderRadius: 24, padding: "6px 18px", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "inline-block" }} />
            <span style={{ color: C.gold, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>East African Community · Official Event</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(28px,5.5vw,56px)", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.1, letterSpacing: -1 }}>
            12th East African<br />Petroleum Conference<br /><span style={{ color: C.gold }}>&amp; Exhibition</span>
          </h1>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontStyle: "italic", margin: "16px 0 10px" }}>
            "Strategic and Sustainable Oil and Gas Resources Exploitation for Energy Security in EAC"
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, margin: "20px 0 36px", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}><span style={{ color: C.gold }}>📅</span> 9–11 March 2027</span>
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.2)" }} />
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}><span style={{ color: C.gold }}>📍</span> Kigali Convention Centre, Rwanda</span>
          </div>
          <Countdown dark />
          <div style={{ marginTop: 40, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("Register")} style={{ background: C.gold, color: C.navy, border: "none", padding: "16px 36px", borderRadius: 6, fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 24px rgba(201,168,76,0.35)" }}>Get Your Pass →</button>
            <button onClick={() => setPage("Exhibition")} style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.35)", padding: "16px 36px", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Book a Booth</button>
            <button onClick={() => setPage("Sponsors")} style={{ background: "transparent", color: C.gold, border: "2px solid rgba(201,168,76,0.4)", padding: "16px 36px", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Sponsor EAPCE'27</button>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ background: C.gold, padding: "20px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 12 }}>
          {[["1,000+", "Expected Delegates"], ["70", "Exhibition Booths"], ["8", "EAC Partner States"], ["3", "Conference Days"], ["USD 2B+", "Projected Deals"], ["4", "Breakout Tracks"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: C.navy, fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>{v}</div>
              <div style={{ color: "rgba(10,37,64,0.65)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT TO EXPECT */}
      <div style={{ background: C.offWhite, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>What to Expect</SectionLabel>
          <SectionTitle>East Africa's Premier Energy Forum</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20, marginTop: 36 }}>
            {[
              ["🎤", "High-Level Plenaries", "Heads of State, Ministers and CEOs address strategic energy priorities across the EAC region"],
              ["🤝", "B2B Deal Meetings", "Structured one-on-one investor and operator meetings facilitated across all 8 partner states"],
              ["🏭", "Exhibition Floor", "70 booths showcasing upstream, midstream, downstream and services across KCC halls"],
              ["🌍", "Country Licensing Rounds", "National oil companies present new acreage and investment opportunities to global majors"],
              ["🍽️", "Gala Dinner & Awards", "Networking dinner celebrating East African energy excellence and project milestones"],
              ["📊", "Technical Sessions", "Peer-reviewed papers on upstream regulation, data management, refining and energy transition"],
              ["📰", "Media & Press Centre", "Dedicated media hub with live streaming, press briefings and social content studio"],
              ["✈️", "Field Excursions", "Curated site visits to Rwanda's petroleum and methane gas development sites"],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ background: "#fff", borderRadius: 10, padding: "24px 20px", border: `1px solid ${C.lightGray}`, borderTop: `3px solid ${C.gold}` }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: C.text, fontSize: 14, marginBottom: 8 }}>{title}</div>
                <div style={{ color: C.gray, fontSize: 12, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED SPEAKERS */}
      <div style={{ background: C.navy, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel light>Confirmed Speakers</SectionLabel>
          <SectionTitle light>Distinguished Voices from Across East Africa</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16, marginTop: 36 }}>
            {SPEAKERS.map(s => (
              <div key={s.name} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "20px 16px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: s.color, color: "#fff", fontSize: 20, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", border: `3px solid ${C.gold}` }}>{s.initials}</div>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 13, marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.4, marginBottom: 8 }}>{s.role}</div>
                <span style={{ background: "rgba(201,168,76,0.15)", color: C.gold, padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 700, border: "1px solid rgba(201,168,76,0.3)" }}>🌍 {s.country}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            Speaker nominations: <strong style={{ color: "rgba(255,255,255,0.6)" }}>abstracts@eapce27.rw</strong> · Deadline Dec 31, 2026
          </div>
        </div>
      </div>

      {/* AGENDA PREVIEW */}
      <div style={{ background: "#fff", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>Programme</SectionLabel>
          <SectionTitle>Conference Agenda at a Glance</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginTop: 36 }}>
            {[
              { day: "Mar 8", label: "Pre-Conference", items: ["NOC/Steering Committee", "Technical Workshop", "Welcome Reception"], color: C.blue },
              { day: "Mar 9", label: "Day 1 — Opening", items: ["Official Opening Ceremony", "Strategic Plenary", "3 Breakout Tracks", "Gala Dinner"], color: C.navy },
              { day: "Mar 10", label: "Day 2 — Investment", items: ["Social-Economic Plenary", "Country Presentations", "B2B Deal Meetings", "FDI Panel"], color: C.green },
              { day: "Mar 11", label: "Day 3 — Closing", items: ["DRC/Rwanda/South Sudan", "Field Excursions", "Ministerial Dialogue", "Communiqué Adoption"], color: "#7a3b00" },
            ].map(({ day, label, items, color }) => (
              <div key={day} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.lightGray}` }}>
                <div style={{ background: color, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 6, padding: "4px 10px", color: "#fff", fontWeight: 900, fontSize: 16 }}>{day}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{label}</div>
                </div>
                <div style={{ padding: "16px 20px", background: "#fff" }}>
                  {items.map(item => (
                    <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8, fontSize: 12, color: C.gray }}>
                      <span style={{ color: C.gold, flexShrink: 0 }}>▸</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button onClick={() => {}} style={{ background: C.navy, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>View Full Programme →</button>
          </div>
        </div>
      </div>

      {/* SPONSORS */}
      <div style={{ background: C.offWhite, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>Partners & Sponsors</SectionLabel>
          <SectionTitle>Supporting EAPCE'27</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 16, marginTop: 36 }}>
            {SPONSORS.map(s => (
              <div key={s.tier} style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.lightGray}`, overflow: "hidden" }}>
                <div style={{ background: s.color, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: s.textColor, fontWeight: 900, fontSize: 15, textTransform: "uppercase", letterSpacing: 1 }}>{s.tier}</span>
                  <span style={{ color: s.textColor, fontWeight: 700, fontSize: 13, opacity: 0.9 }}>{s.price}</span>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ fontSize: 11, color: C.gray, marginBottom: 10 }}>
                    {s.slots - s.taken}/{s.slots} slots remaining
                    <div style={{ background: C.lightGray, borderRadius: 4, height: 4, marginTop: 6 }}>
                      <div style={{ background: s.taken === s.slots ? C.danger : s.color, width: `${(s.taken / s.slots) * 100}%`, height: "100%", borderRadius: 4 }} />
                    </div>
                  </div>
                  {s.benefits.slice(0, 3).map(b => <div key={b} style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>✓ {b}</div>)}
                  <div style={{ fontSize: 10, color: C.gray, marginBottom: 12 }}>+{s.benefits.length - 3} more benefits</div>
                  <button style={{ width: "100%", background: s.color, color: s.textColor, border: "none", padding: "9px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Become a {s.tier} Sponsor</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY RWANDA */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #0d3d2a 100%)`, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel light>Host Country</SectionLabel>
          <SectionTitle light>Why Rwanda &amp; Kigali?</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginTop: 36 }}>
            {[
              ["🌐", "#1 in Africa", "Ease of Doing Business (World Bank)"],
              ["✈️", "Well-Connected Hub", "RwandAir — direct flights to 30+ African cities"],
              ["🏆", "MICE Leader", "Africa's leading meetings & conventions destination"],
              ["🔒", "Safe & Secure", "Consistently ranked among Africa's safest nations"],
              ["🌿", "Green City", "Kigali — Africa's cleanest and most livable city"],
              ["⛽", "Petroleum Potential", "Emerging upstream sector — Lake Albert basin & methane gas"],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 26, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.gold }}>{title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEWS */}
      <div style={{ background: "#fff", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>News &amp; Media</SectionLabel>
          <SectionTitle>Latest Updates</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 36 }}>
            {PRESS_RELEASES.map((pr, i) => (
              <div key={pr.title} style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.lightGray}` }}>
                <div style={{ height: 100, background: `linear-gradient(135deg, hsl(${210 + i * 25},55%,${22 + i * 4}%) 0%, hsl(${140 + i * 20},45%,${18 + i * 4}%) 100%)`, display: "flex", alignItems: "flex-end", padding: "12px 16px" }}>
                  <span style={{ background: C.gold, color: C.navy, padding: "3px 10px", borderRadius: 12, fontSize: 10, fontWeight: 800 }}>{pr.tag}</span>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ fontSize: 10, color: C.gray, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{pr.date}</div>
                  <div style={{ fontWeight: 700, color: C.text, fontSize: 14, marginBottom: 8, lineHeight: 1.4 }}>{pr.title}</div>
                  <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.6, marginBottom: 14 }}>{pr.summary.slice(0, 100)}…</div>
                  <button style={{ background: "transparent", border: `1px solid ${C.navy}`, color: C.navy, padding: "6px 14px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Read More →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ORGANIZERS */}
      <div style={{ background: C.offWhite, padding: "36px 24px", borderTop: `1px solid ${C.lightGray}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: C.gray, textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>Organised by</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            {["Rwanda Convention Bureau (RCB)", "Rwanda Mines, Petroleum & Gas Board (RMB)", "East African Community (EAC)"].map(org => (
              <div key={org} style={{ background: "#fff", border: `1px solid ${C.lightGray}`, borderRadius: 8, padding: "12px 20px", fontSize: 12, fontWeight: 700, color: C.navy }}>{org}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AGENDA PAGE ─────────────────────────────────────────────────────────────
function AgendaPage() {
  const days = Object.keys(AGENDA);
  const [active, setActive] = useState(days[0]);
  return (
    <PageWrap title="Conference Programme" subtitle="9–11 March 2027 · Kigali Convention Centre, Rwanda">
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap", borderBottom: `2px solid ${C.lightGray}`, paddingBottom: 16 }}>
        {days.map(d => (
          <button key={d} onClick={() => setActive(d)} style={{ background: active === d ? C.navy : "#fff", color: active === d ? "#fff" : C.navy, border: `2px solid ${active === d ? C.navy : C.lightGray}`, padding: "9px 18px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{d}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {AGENDA[active].map((item, i) => {
          const tc = tagColors[item.type] || tagColors.session;
          return (
            <div key={i} style={{ display: "flex", gap: 16, background: "#fff", borderRadius: 8, padding: "16px 20px", border: `1px solid ${C.lightGray}`, alignItems: "flex-start", borderLeft: `4px solid ${tc.text}` }}>
              <div style={{ minWidth: 96, color: C.gray, fontSize: 11, fontWeight: 700, paddingTop: 2, fontFamily: "monospace" }}>{item.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{item.title}</div>
                <div style={{ color: C.gray, fontSize: 11, marginTop: 4 }}>📍 {item.room}</div>
              </div>
              <span style={{ background: tc.bg, color: tc.text, padding: "4px 12px", borderRadius: 12, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", textTransform: "uppercase" }}>{item.type}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Object.entries(tagColors).map(([k, v]) => (
          <span key={k} style={{ background: v.bg, color: v.text, padding: "4px 12px", borderRadius: 12, fontSize: 10, fontWeight: 700 }}>{k}</span>
        ))}
      </div>
    </PageWrap>
  );
}

// ─── REGISTER PAGE ────────────────────────────────────────────────────────────
function RegisterPage() {
  const [step, setStep] = useState(1);
  const [regType, setRegType] = useState(REGISTRATION_TYPES[0]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", org: "", country: "", phone: "", dietary: "", hotel: "" });
  const [errors, setErrors] = useState({});
  const [registered, setRegistered] = useState(() => JSON.parse(sessionStorage.getItem("eapce_regs") || "[]"));
  const [badgeId] = useState(() => "EAPCE27-" + Math.random().toString(36).substr(2, 8).toUpperCase());

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Valid email required";
    if (!form.org.trim()) e.org = "Required";
    if (!form.country.trim()) e.country = "Required";
    const dup = registered.find(r => r.email.toLowerCase() === form.email.toLowerCase());
    if (dup) e.email = "Already registered (ID: " + dup.id + ")";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => { if (!validate()) return; if (regType.price > 0) { setStep(2); return; } finalize(); };
  const finalize = () => {
    const rec = { ...form, type: regType.label, price: regType.price, id: badgeId, ts: new Date().toISOString() };
    const updated = [...registered, rec];
    sessionStorage.setItem("eapce_regs", JSON.stringify(updated));
    setRegistered(updated); setStep(3);
  };

  const F = ({ label, name, type = "text", required }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}{required && <span style={{ color: C.danger }}> *</span>}</label>
      <input type={type} value={form[name]} onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: "" })); }}
        style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${errors[name] ? C.danger : C.lightGray}`, borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box", background: errors[name] ? "#fff5f5" : "#fff" }} />
      {errors[name] && <div style={{ color: C.danger, fontSize: 11, marginTop: 4 }}>⚠ {errors[name]}</div>}
    </div>
  );

  return (
    <PageWrap title="Delegate Registration" subtitle="Secure your place at EAPCE'27 — 9–11 March 2027, Kigali">
      <div style={{ display: "flex", gap: 0, marginBottom: 36, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.lightGray}` }}>
        {["1. Your Details", "2. Payment", "3. Confirmation"].map((s, i) => (
          <div key={s} style={{ flex: 1, padding: "12px 8px", background: step === i + 1 ? C.navy : step > i + 1 ? C.green : C.offWhite, color: step >= i + 1 ? "#fff" : C.gray, textAlign: "center", fontSize: 12, fontWeight: 700, borderRight: i < 2 ? `1px solid ${C.lightGray}` : "none" }}>
            {step > i + 1 ? "✓ " : ""}{s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: `1px solid ${C.lightGray}` }}>
            <h3 style={{ margin: "0 0 20px", color: C.navy, fontSize: 16 }}>Registration Type</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              {REGISTRATION_TYPES.map(rt => (
                <label key={rt.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, border: `2px solid ${regType.id === rt.id ? C.navy : C.lightGray}`, cursor: "pointer", background: regType.id === rt.id ? "#f0f6ff" : "#fff" }}>
                  <input type="radio" name="regType" checked={regType.id === rt.id} onChange={() => setRegType(rt)} style={{ accentColor: C.navy }} />
                  <span style={{ flex: 1, fontWeight: 600, fontSize: 13 }}>{rt.label}</span>
                  <span style={{ fontWeight: 800, color: rt.price === 0 ? C.green : C.navy }}>{rt.price === 0 ? "FREE" : `USD ${rt.price}`}</span>
                </label>
              ))}
            </div>
            <h3 style={{ margin: "0 0 20px", color: C.navy, fontSize: 16 }}>Personal Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <F label="First Name" name="firstName" required /><F label="Last Name" name="lastName" required />
            </div>
            <F label="Email Address" name="email" type="email" required />
            <F label="Organisation / Company" name="org" required />
            <F label="Country" name="country" required />
            <F label="Phone Number" name="phone" />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Dietary Requirements</label>
              <select value={form.dietary} onChange={e => setForm(f => ({ ...f, dietary: e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14 }}>
                <option value="">None</option><option>Vegetarian</option><option>Vegan</option><option>Halal</option><option>Gluten-Free</option>
              </select>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Hotel Preference</label>
              <select value={form.hotel} onChange={e => setForm(f => ({ ...f, hotel: e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14 }}>
                <option value="">No preference / self-arranged</option>
                {HOTELS.map(h => <option key={h.name}>{h.name} ({h.rate})</option>)}
              </select>
            </div>
            <button onClick={handleSubmit} style={{ width: "100%", background: C.navy, color: "#fff", border: "none", padding: "15px", borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
              {regType.price > 0 ? `Proceed to Payment — USD ${regType.price} →` : "Complete Registration (Free) →"}
            </button>
          </div>
          <div style={{ background: C.navy, borderRadius: 12, padding: 24, position: "sticky", top: 80 }}>
            <h4 style={{ margin: "0 0 16px", color: C.gold, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>Order Summary</h4>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{regType.label}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>EAPCE'27 · Kigali · March 9–11, 2027</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>Registration Fee</span>
              <span style={{ fontWeight: 700, color: "#fff" }}>{regType.price === 0 ? "FREE" : `USD ${regType.price}`}</span>
            </div>
            {regType.price > 0 && (
              <div style={{ borderTop: `1px solid ${C.gold}`, paddingTop: 12, marginTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 800, color: "#fff" }}>Total</span>
                <span style={{ fontWeight: 900, color: C.gold, fontSize: 20 }}>USD {regType.price}</span>
              </div>
            )}
            <div style={{ marginTop: 20, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontWeight: 700, color: C.gold, marginBottom: 8, fontSize: 12 }}>✓ Included in your pass</div>
              {["All plenary sessions", "Exhibition floor access", "Conference bag & materials", "Daily lunches & coffee", "Gala dinner ticket"].map(item => (
                <div key={item} style={{ color: "rgba(255,255,255,0.55)", marginBottom: 5, fontSize: 11 }}>• {item}</div>
              ))}
            </div>
            <div style={{ marginTop: 14, fontSize: 10, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>🔒 QR-coded badge issued on confirmation</div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: `1px solid ${C.lightGray}` }}>
            <h3 style={{ margin: "0 0 6px", color: C.navy }}>Secure Payment</h3>
            <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 6, padding: 10, marginBottom: 24, fontSize: 12, color: "#0369a1" }}>🔒 Demo — no real payment processed</div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Card Number</label>
              <input defaultValue="4242 4242 4242 4242" style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div><label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Expiry</label><input defaultValue="12/28" style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14 }} /></div>
              <div><label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>CVV</label><input defaultValue="123" type="password" style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14 }} /></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderTop: `2px solid ${C.navy}`, marginBottom: 16 }}>
              <span style={{ color: C.gray, fontSize: 13 }}>Total due</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: C.navy }}>USD {regType.price}</span>
            </div>
            <button onClick={finalize} style={{ width: "100%", background: C.green, color: "#fff", border: "none", padding: "15px", borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: "pointer", marginBottom: 10 }}>✓ Pay USD {regType.price}</button>
            <button onClick={() => setStep(1)} style={{ width: "100%", background: "transparent", color: C.gray, border: `1px solid ${C.lightGray}`, padding: "11px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>← Back</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 48, border: `1px solid ${C.lightGray}` }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.green, color: "#fff", fontSize: 32, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>✓</div>
            <h2 style={{ color: C.green, marginBottom: 8, fontSize: 24 }}>Registration Confirmed!</h2>
            <p style={{ color: C.gray, marginBottom: 28 }}>Welcome, {form.firstName}! Confirmation sent to <strong>{form.email}</strong>.</p>
            <div style={{ background: C.navy, color: "#fff", borderRadius: 12, padding: 28, marginBottom: 24, display: "inline-block", minWidth: 280, textAlign: "left" }}>
              <div style={{ background: C.gold, color: C.navy, borderRadius: 6, padding: "4px 12px", fontSize: 9, fontWeight: 900, letterSpacing: 2, marginBottom: 14, display: "inline-block" }}>OFFICIAL DELEGATE BADGE</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{form.firstName} {form.lastName}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 2 }}>{form.org}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>{form.country}</div>
              <div style={{ background: "#fff", borderRadius: 6, padding: 10, display: "inline-block", marginBottom: 10 }}>
                <div style={{ width: 72, height: 72, background: "repeating-linear-gradient(0deg,#000 0px,#000 4px,#fff 4px,#fff 8px),repeating-linear-gradient(90deg,#000 0px,#000 4px,#fff 4px,#fff 8px)", backgroundBlendMode: "difference" }} />
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: 2 }}>{badgeId}</div>
              <div style={{ fontSize: 10, color: C.gold, marginTop: 4 }}>EAPCE'27 · KIGALI · MAR 9–11, 2027</div>
            </div>
          </div>
        </div>
      )}
    </PageWrap>
  );
}

// ─── EXHIBITION PAGE ──────────────────────────────────────────────────────────
function ExhibitionPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: "", pass: "" });
  const [view, setView] = useState("overview");

  if (!loggedIn) return (
    <PageWrap title="Exhibition & Booth Booking" subtitle="70 booths across KCC halls — Platinum, Gold, Silver and Bronze zones">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 28, alignItems: "start" }}>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
            {[["70", "Total Booths"], ["5", "Exhibition Days"], ["1,000+", "Expected Visitors"], ["8", "EAC Countries"]].map(([v, l]) => (
              <div key={l} style={{ background: C.navy, color: "#fff", borderRadius: 10, padding: "18px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: C.gold }}>{v}</div>
                <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: 10, padding: 24, border: `1px solid ${C.lightGray}`, marginBottom: 20 }}>
            <h3 style={{ color: C.navy, margin: "0 0 14px", fontSize: 15 }}>Why Exhibit at EAPCE'27?</h3>
            {["Reach 1,000+ energy & mining executives from all 8 EAC nations", "Prime positioning alongside Heads of State and Ministers", "B2B meeting facilitation with investors and operators", "Brand exposure across 3 days of plenary and exhibition", "Dedicated media coverage and social media amplification"].map(b => (
              <div key={b} style={{ display: "flex", gap: 10, marginBottom: 10, fontSize: 13, color: C.gray }}><span style={{ color: C.gold, fontWeight: 700, flexShrink: 0 }}>✓</span>{b}</div>
            ))}
          </div>
          <div style={{ background: C.offWhite, borderRadius: 10, padding: 20, border: `1px solid ${C.lightGray}` }}>
            <h4 style={{ color: C.navy, margin: "0 0 14px", fontSize: 14 }}>Exhibition Floor Plan — KCC</h4>
            <div style={{ background: "#fff", border: `1px solid ${C.lightGray}`, borderRadius: 8, padding: 16 }}>
              <div style={{ background: C.navy, color: "#fff", textAlign: "center", padding: 8, borderRadius: 6, marginBottom: 12, fontSize: 11, fontWeight: 700 }}>AUDITORIUM (NORTH)</div>
              {["A", "B", "C", "D"].map(row => (
                <div key={row} style={{ display: "flex", gap: 4, marginBottom: 4, alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: C.gray, minWidth: 14, fontWeight: 700 }}>{row}</span>
                  {Array.from({ length: 10 }, (_, i) => {
                    const ex = EXHIBITORS_MOCK.find(e => e.booth === `${row}-${String(i + 1).padStart(2, "0")}`);
                    return (
                      <div key={i} style={{ flex: 1, minHeight: 28, borderRadius: 3, background: ex ? (ex.status === "Confirmed" ? "#bfdbfe" : "#fef3c7") : "#e2e8f0", border: `1px solid ${ex ? "#93c5fd" : "#cbd5e1"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700, color: ex ? "#1e3a5f" : "#94a3b8" }}>
                        {row}{i + 1}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                {[["#bfdbfe", "Booked"], ["#fef3c7", "Pending"], ["#e2e8f0", "Available"]].map(([bg, label]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: C.gray }}>
                    <div style={{ width: 14, height: 14, background: bg, borderRadius: 2, border: "1px solid #ccc" }} />{label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ background: "#fff", borderRadius: 10, padding: 28, border: `1px solid ${C.lightGray}`, position: "sticky", top: 80 }}>
            <h3 style={{ margin: "0 0 6px", color: C.navy }}>Exhibitor Portal Login</h3>
            <div style={{ background: "#f0f9ff", borderRadius: 6, padding: 10, marginBottom: 20, fontSize: 12, color: "#0369a1" }}>Demo: <strong>exhibitor@demo.com</strong> / <strong>eapce2027</strong></div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Email</label>
              <input value={loginForm.user} onChange={e => setLoginForm(f => ({ ...f, user: e.target.value }))} placeholder="exhibitor@demo.com" style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Password</label>
              <input type="password" value={loginForm.pass} onChange={e => setLoginForm(f => ({ ...f, pass: e.target.value }))} placeholder="eapce2027" style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <button onClick={() => { if (loginForm.user && loginForm.pass) setLoggedIn(true); }} style={{ width: "100%", background: C.navy, color: "#fff", border: "none", padding: 13, borderRadius: 8, fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Access Dashboard →</button>
            <div style={{ marginTop: 20, borderTop: `1px solid ${C.lightGray}`, paddingTop: 16, fontSize: 12, color: C.gray, textAlign: "center" }}>New exhibitor? Contact <strong>exhibition@eapce27.rw</strong></div>
          </div>
        </div>
      </div>
    </PageWrap>
  );

  return (
    <PageWrap title="Exhibitor Dashboard" subtitle="TotalEnergies SE — Booth A-01 (Platinum)">
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        {["overview", "floor-plan", "assets", "logistics"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{ background: view === v ? C.navy : "#fff", color: view === v ? "#fff" : C.navy, border: `2px solid ${view === v ? C.navy : C.lightGray}`, padding: "8px 18px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, textTransform: "capitalize" }}>{v.replace("-", " ")}</button>
        ))}
        <button onClick={() => setLoggedIn(false)} style={{ marginLeft: "auto", background: "transparent", color: C.danger, border: `1px solid ${C.danger}`, padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Logout</button>
      </div>
      {view === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
            {[["A-01", "Your Booth", C.gold, C.navy], ["Platinum", "Tier", C.navy, "#fff"], ["5", "Days Active", C.green, "#fff"], ["6", "Passes Included", "#7a3b00", "#fff"]].map(([v, l, bg, tc]) => (
              <div key={l} style={{ background: bg, color: tc, borderRadius: 8, padding: "18px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 900 }}>{v}</div>
                <div style={{ fontSize: 10, opacity: 0.75, marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: 8, border: `1px solid ${C.lightGray}`, overflow: "hidden" }}>
            <div style={{ background: C.navy, color: "#fff", padding: "12px 18px", fontWeight: 700, fontSize: 13 }}>All Exhibitors</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: C.offWhite }}>{["ID", "Company", "Booth", "Tier", "Status"].map(h => <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.gray, borderBottom: `1px solid ${C.lightGray}`, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>)}</tr></thead>
              <tbody>{EXHIBITORS_MOCK.map(e => (
                <tr key={e.id} style={{ borderBottom: `1px solid ${C.lightGray}` }}>
                  <td style={{ padding: "10px 16px", fontSize: 11, color: C.gray, fontFamily: "monospace" }}>{e.id}</td>
                  <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 700 }}>{e.company}</td>
                  <td style={{ padding: "10px 16px", fontSize: 13 }}>{e.booth}</td>
                  <td style={{ padding: "10px 16px" }}><span style={{ background: e.tier === "Platinum" ? "#f5e6c8" : e.tier === "Gold" ? "#fef3c7" : e.tier === "Silver" ? "#f1f5f9" : "#fde8d8", color: e.tier === "Platinum" ? "#7a5c00" : e.tier === "Gold" ? "#854d0e" : e.tier === "Silver" ? "#475569" : "#9a3412", padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700 }}>{e.tier}</span></td>
                  <td style={{ padding: "10px 16px" }}><span style={{ color: e.status === "Confirmed" ? C.green : C.gold, fontWeight: 700, fontSize: 12 }}>{e.status === "Confirmed" ? "✓" : "⏳"} {e.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}
      {view === "logistics" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
          {[
            { title: "Setup", items: ["Mar 7–8 (08:00–18:00)", "Booth A-01, Zone A Platinum", "3-phase 30A power supplied", "Table + 4 chairs included"] },
            { title: "During Event", items: ["Mar 9–11 (08:00–17:00)", "Coffee station included", "WiFi: EAPCE27-EXH", "AV screen mount provided"] },
            { title: "Dismantling", items: ["Mar 11 (17:00–20:00)", "Freight collection Mar 12", "24hr on-site security", "Report damage by Mar 14"] },
          ].map(({ title, items }) => (
            <div key={title} style={{ background: "#fff", borderRadius: 8, padding: 20, border: `1px solid ${C.lightGray}` }}>
              <div style={{ fontWeight: 700, color: C.navy, marginBottom: 12, fontSize: 14, borderBottom: `2px solid ${C.gold}`, paddingBottom: 8 }}>{title}</div>
              {items.map(item => <div key={item} style={{ fontSize: 12, color: C.gray, marginBottom: 8 }}>• {item}</div>)}
            </div>
          ))}
        </div>
      )}
    </PageWrap>
  );
}

// ─── SPONSORS PAGE ────────────────────────────────────────────────────────────
function SponsorsPage() {
  const [applied, setApplied] = useState(false);
  return (
    <PageWrap title="Sponsorship Opportunities" subtitle="Partner with East Africa's premier energy conference — EAPCE'27">
      {!applied ? (
        <div>
          <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #0d3d2a 100%)`, borderRadius: 12, padding: "32px 28px", marginBottom: 36 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 20 }}>
              {[["1,000+", "Target Delegates"], ["USD 2B+", "Projected Deals"], ["8", "Countries"], ["50+", "Media Accredited"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: C.gold }}>{v}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20, marginBottom: 36 }}>
            {SPONSORS.map(t => (
              <div key={t.tier} style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.lightGray}`, overflow: "hidden" }}>
                <div style={{ background: t.color, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: t.textColor, fontWeight: 900, fontSize: 16, textTransform: "uppercase", letterSpacing: 1 }}>{t.tier}</span>
                  <span style={{ color: t.textColor, fontWeight: 800, fontSize: 14 }}>{t.price}</span>
                </div>
                <div style={{ padding: "18px 22px" }}>
                  <div style={{ fontSize: 11, color: C.gray, marginBottom: 10 }}>
                    {t.slots - t.taken}/{t.slots} slots remaining
                    <div style={{ background: C.lightGray, borderRadius: 4, height: 4, marginTop: 6 }}>
                      <div style={{ background: t.taken === t.slots ? C.danger : t.color, width: `${(t.taken / t.slots) * 100}%`, height: "100%", borderRadius: 4 }} />
                    </div>
                  </div>
                  {t.benefits.map(b => <div key={b} style={{ fontSize: 12, marginBottom: 6, color: C.text, display: "flex", gap: 8 }}><span style={{ color: t.color, fontWeight: 700 }}>✓</span>{b}</div>)}
                  <button onClick={() => setApplied(true)} style={{ marginTop: 16, width: "100%", background: t.color, color: t.textColor, border: "none", padding: "11px", borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: "pointer" }}>Apply for {t.tier} →</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: C.offWhite, borderRadius: 12, padding: "28px 32px", textAlign: "center", border: `1px solid ${C.lightGray}` }}>
            <h3 style={{ color: C.navy, margin: "0 0 8px" }}>Custom Sponsorship Packages</h3>
            <p style={{ color: C.gray, fontSize: 14, marginBottom: 14 }}>Looking for session naming rights, award sponsorship, or a bespoke engagement package?</p>
            <div style={{ fontSize: 14, color: C.navy, fontWeight: 600 }}>📧 sponsorship@eapce27.rw &nbsp;·&nbsp; 📞 +250 788 452 503</div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: `1px solid ${C.lightGray}` }}>
            <div style={{ background: "#d1fae5", border: "1px solid #6ee7b7", borderRadius: 8, padding: 12, marginBottom: 24, fontSize: 13, color: "#065f46", fontWeight: 600 }}>✓ Application received — our team will contact you within 24 hours</div>
            {[["Package", "Gold Sponsor"], ["Status", "Under Review"], ["Invoice", "INV-EAPCE27-SP-004 (Pending)"], ["Contact", "partnerships@rcb.rw"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: `1px solid ${C.lightGray}`, fontSize: 13 }}>
                <span style={{ color: C.gray }}>{k}</span><span style={{ fontWeight: 700 }}>{v}</span>
              </div>
            ))}
            <button onClick={() => setApplied(false)} style={{ marginTop: 20, background: "transparent", color: C.danger, border: `1px solid ${C.danger}`, padding: "9px 20px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>← Back</button>
          </div>
        </div>
      )}
    </PageWrap>
  );
}

// ─── SPEAKERS PAGE ────────────────────────────────────────────────────────────
function SpeakersPage() {
  const [selected, setSelected] = useState(null);
  return (
    <PageWrap title="Speakers & Resource Persons" subtitle="Distinguished experts, ministers and industry leaders from across East Africa and beyond">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
        {SPEAKERS.map(s => (
          <div key={s.name} onClick={() => setSelected(selected?.name === s.name ? null : s)}
            style={{ background: "#fff", borderRadius: 12, padding: "24px 20px", border: `2px solid ${selected?.name === s.name ? s.color : C.lightGray}`, cursor: "pointer", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: s.color, color: "#fff", fontSize: 22, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", border: `3px solid ${C.gold}` }}>{s.initials}</div>
            <div style={{ fontWeight: 800, color: C.text, fontSize: 14, marginBottom: 5 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: C.gray, marginBottom: 10, lineHeight: 1.4 }}>{s.role}</div>
            <span style={{ background: C.offWhite, color: C.navy, padding: "4px 12px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>🌍 {s.country}</span>
            {selected?.name === s.name && (
              <div style={{ marginTop: 14, textAlign: "left", borderTop: `1px solid ${C.lightGray}`, paddingTop: 12 }}>
                <div style={{ fontSize: 10, color: C.gray, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Session</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{s.session}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, background: C.navy, borderRadius: 10, padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Submit a Speaker Nomination or Abstract</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 3 }}>Deadline: 31 December 2026</div>
        </div>
        <div style={{ color: C.gold, fontWeight: 600, fontSize: 13 }}>abstracts@eapce27.rw</div>
      </div>
    </PageWrap>
  );
}

// ─── VENUE PAGE ───────────────────────────────────────────────────────────────
function VenuePage() {
  return (
    <PageWrap title="Venue & Accommodation" subtitle="Kigali Convention Centre (KCC) — Heart of Kigali, Rwanda">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        <div style={{ background: "linear-gradient(135deg, #e8f4f8, #d6eaf8)", borderRadius: 10, height: 200, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.lightGray}` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>📍</div>
            <div style={{ fontWeight: 800, color: C.navy, fontSize: 16 }}>Kigali Convention Centre</div>
            <div style={{ color: C.gray, fontSize: 12 }}>KG 2 Roundabout, Kigali, Rwanda</div>
            <div style={{ fontSize: 11, color: "#0369a1", marginTop: 4 }}>-1.9441° S, 30.0619° E</div>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 10, padding: 24, border: `1px solid ${C.lightGray}` }}>
          <h4 style={{ color: C.navy, margin: "0 0 14px" }}>✈️ Getting There</h4>
          {[["Kigali Intl Airport", "12 km · 20 min"], ["From Nairobi (NBO)", "1h 15min flight"], ["From Dar es Salaam", "1h 45min flight"], ["From Kampala", "1h flight"], ["City Centre Hotels", "5–15 min taxi"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8, paddingBottom: 8, borderBottom: `1px solid ${C.lightGray}` }}>
              <span style={{ fontWeight: 600, color: C.text }}>{k}</span><span style={{ color: C.gray }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <h3 style={{ color: C.navy, marginBottom: 16 }}>Official Partner Hotels</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {HOTELS.map(h => (
          <div key={h.name} style={{ background: "#fff", borderRadius: 8, padding: "16px 20px", border: `1px solid ${C.lightGray}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{"⭐".repeat(h.stars)} {h.name}</div>
              <div style={{ fontSize: 11, color: C.gray, marginTop: 3 }}>📍 {h.distance} from KCC &nbsp;·&nbsp; Code: <strong>{h.code}</strong></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, color: C.navy, fontSize: 15 }}>{h.rate}</div>
                <div style={{ fontSize: 11, color: h.rooms === "Limited" ? C.danger : C.green, fontWeight: 600 }}>{h.rooms === "Limited" ? "⚠ Limited" : "✓ Available"}</div>
              </div>
              <button style={{ background: C.navy, color: "#fff", border: "none", padding: "9px 18px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Book</button>
            </div>
          </div>
        ))}
      </div>
    </PageWrap>
  );
}

// ─── MEDIA PAGE ───────────────────────────────────────────────────────────────
function MediaPage() {
  return (
    <PageWrap title="News & Media Centre" subtitle="Press releases, media accreditation and communications for EAPCE'27">
      <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #0d3d2a 100%)`, borderRadius: 12, padding: "32px 28px", color: "#fff", marginBottom: 36 }}>
        <div style={{ display: "inline-block", background: C.gold, color: C.navy, padding: "4px 14px", borderRadius: 12, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, marginBottom: 14 }}>MEDIA & PR CAMPAIGN</div>
        <h3 style={{ margin: "0 0 10px", fontSize: 20 }}>EAPCE'27 Multi-Channel Communications Strategy</h3>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>A coordinated campaign across broadcast, print, digital and social channels targeting African energy executives, global investors and government officials.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
          {[["📺 Broadcast", "CNBC Africa, KBC, NTV, RBC TV"], ["📰 Print", "EAC Gazette, The East African, The New Times"], ["💻 Digital", "LinkedIn, X, Facebook, YouTube"], ["📧 Email", "50,000+ industry contacts"]].map(([ch, desc]) => (
            <div key={ch} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{ch}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
      <h3 style={{ color: C.navy, marginBottom: 20 }}>Press Releases</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
        {PRESS_RELEASES.map((pr, i) => (
          <div key={pr.title} style={{ background: "#fff", borderRadius: 10, overflow: "hidden", border: `1px solid ${C.lightGray}`, display: "grid", gridTemplateColumns: "100px 1fr" }}>
            <div style={{ background: `linear-gradient(135deg, hsl(${210 + i * 25},55%,22%) 0%, hsl(${140 + i * 20},45%,18%) 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
              <span style={{ background: C.gold, color: C.navy, padding: "3px 8px", borderRadius: 8, fontSize: 9, fontWeight: 800, textAlign: "center" }}>{pr.tag}</span>
            </div>
            <div style={{ padding: "18px 22px" }}>
              <div style={{ fontSize: 10, color: C.gray, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>📅 {pr.date}</div>
              <div style={{ fontWeight: 800, color: C.text, fontSize: 14, marginBottom: 8 }}>{pr.title}</div>
              <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.6, marginBottom: 12 }}>{pr.summary}</div>
              <button style={{ background: "transparent", border: `1px solid ${C.navy}`, color: C.navy, padding: "6px 16px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Read Full Release →</button>
            </div>
          </div>
        ))}
      </div>
      <h3 style={{ color: C.navy, marginBottom: 16 }}>Photo Gallery — EAPCE'25 Highlights</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 10, marginBottom: 32 }}>
        {["Opening Ceremony", "Exhibition Floor", "Ministerial Panel", "B2B Meetings", "Gala Dinner", "Field Excursion"].map((label, i) => (
          <div key={label} style={{ borderRadius: 8, height: 110, background: `linear-gradient(135deg, hsl(${200 + i * 22},50%,${20 + i * 4}%), hsl(${140 + i * 15},45%,${18 + i * 3}%))`, display: "flex", alignItems: "flex-end", padding: "10px 12px" }}>
            <span style={{ background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6 }}>{label}</span>
          </div>
        ))}
      </div>
      <div style={{ background: C.offWhite, borderRadius: 10, padding: 20, border: `1px solid ${C.lightGray}` }}>
        <h4 style={{ color: C.navy, margin: "0 0 14px" }}>Follow &amp; Share</h4>
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          {[["LinkedIn", "#0077b5"], ["X / Twitter", "#0f172a"], ["Facebook", "#1877f2"], ["YouTube", "#ff0000"]].map(([p, c]) => (
            <button key={p} style={{ background: c, color: "#fff", border: "none", padding: "9px 20px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{p}</button>
          ))}
        </div>
        <div style={{ fontSize: 13, color: C.gray }}>Official hashtags: <strong style={{ color: C.navy }}>#EAPCE27</strong> &nbsp;·&nbsp; <strong style={{ color: C.navy }}>#EACEnergy</strong> &nbsp;·&nbsp; <strong style={{ color: C.navy }}>#KigaliEnergy2027</strong></div>
      </div>
    </PageWrap>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const registered = JSON.parse(sessionStorage.getItem("eapce_regs") || "[]");
  if (!authed) return (
    <PageWrap title="Admin Dashboard" subtitle="Restricted — authorised personnel only">
      <div style={{ maxWidth: 360, margin: "0 auto", background: "#fff", borderRadius: 12, padding: 36, border: `1px solid ${C.lightGray}`, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.navy, color: "#fff", fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>🔒</div>
        <h3 style={{ color: C.navy, margin: "0 0 6px" }}>Admin Access</h3>
        <div style={{ background: "#f0f9ff", borderRadius: 6, padding: 10, marginBottom: 20, fontSize: 12, color: "#0369a1" }}>Demo password: <strong>admin2027</strong></div>
        <input type="password" placeholder="Enter password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && pw === "admin2027" && setAuthed(true)} style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14, marginBottom: 12, boxSizing: "border-box" }} />
        <button onClick={() => { if (pw === "admin2027") setAuthed(true); }} style={{ width: "100%", background: C.navy, color: "#fff", border: "none", padding: 13, borderRadius: 8, fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Access Dashboard →</button>
      </div>
    </PageWrap>
  );
  return (
    <PageWrap title="Admin Dashboard" subtitle="EAPCE'27 — Live Analytics & Registration Management">
      <button onClick={() => setAuthed(false)} style={{ marginBottom: 20, background: "transparent", color: C.danger, border: `1px solid ${C.danger}`, padding: "7px 18px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Logout</button>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 14, marginBottom: 28 }}>
        {[["1,047", "Registered Delegates", C.navy], ["USD 889,950", "Total Revenue", C.green], ["68/70", "Booths Booked", C.gold], ["USD 50,000", "Sponsorship", "#7a3b00"]].map(([v, l, c]) => (
          <div key={l} style={{ background: "#fff", borderRadius: 10, padding: "18px 20px", border: `1px solid ${C.lightGray}`, borderLeft: `4px solid ${c}` }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${C.lightGray}` }}>
          <div style={{ fontWeight: 700, color: C.navy, marginBottom: 14, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Registration Trend</div>
          <ResponsiveContainer width="100%" height={160}><LineChart data={ANALYTICS_REG}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Line type="monotone" dataKey="count" stroke={C.navy} strokeWidth={2} dot={{ r: 3 }} /></LineChart></ResponsiveContainer>
        </div>
        <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${C.lightGray}` }}>
          <div style={{ fontWeight: 700, color: C.navy, marginBottom: 14, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Revenue (USD)</div>
          <ResponsiveContainer width="100%" height={160}><BarChart data={ANALYTICS_REVENUE}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip formatter={v => ["$" + v.toLocaleString()]} /><Bar dataKey="revenue" fill={C.green} radius={[3, 3, 0, 0]} /></BarChart></ResponsiveContainer>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${C.lightGray}` }}>
          <div style={{ fontWeight: 700, color: C.navy, marginBottom: 14, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Delegate Breakdown</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <PieChart width={120} height={120}><Pie data={ANALYTICS_PIE} cx={55} cy={55} innerRadius={30} outerRadius={55} dataKey="value">{ANALYTICS_PIE.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie></PieChart>
            <div style={{ flex: 1 }}>{ANALYTICS_PIE.map(d => (<div key={d.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5, alignItems: "center" }}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, background: d.color, borderRadius: 2 }} /><span>{d.name}</span></div><span style={{ fontWeight: 700 }}>{d.value}</span></div>))}</div>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 10, padding: 20, border: `1px solid ${C.lightGray}` }}>
          <div style={{ fontWeight: 700, color: C.navy, marginBottom: 14, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Booth Sales</div>
          {ANALYTICS_BOOTHS.map(b => (<div key={b.zone} style={{ marginBottom: 14 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}><span style={{ fontWeight: 700 }}>{b.zone}</span><span style={{ color: C.gray }}>{b.sold}/{b.total}</span></div><div style={{ background: C.lightGray, borderRadius: 4, height: 8 }}><div style={{ background: b.sold === b.total ? C.green : C.gold, width: `${(b.sold / b.total) * 100}%`, height: "100%", borderRadius: 4 }} /></div></div>))}
        </div>
      </div>
      <div style={{ background: "#fff", borderRadius: 10, border: `1px solid ${C.lightGray}`, overflow: "hidden" }}>
        <div style={{ background: C.navy, color: "#fff", padding: "13px 18px", fontWeight: 700, fontSize: 13 }}>Registrations ({registered.length > 0 ? registered.length : "Sample"})</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: C.offWhite }}>{["ID", "Name", "Email", "Organisation", "Country", "Type", "Status"].map(h => <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: C.gray, borderBottom: `1px solid ${C.lightGray}`, whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>)}</tr></thead>
            <tbody>
              {(registered.length > 0 ? registered : [
                { id: "EAPCE27-A1B2C3", firstName: "Amina", lastName: "Waceke", email: "a.waceke@eac.int", org: "EAC Secretariat", country: "Arusha", type: "Government Official" },
                { id: "EAPCE27-D4E5F6", firstName: "Robert", lastName: "Kasande", email: "r.kasande@pepd.go.ug", org: "PEPD Uganda", country: "Uganda", type: "Delegate (Full Access)" },
                { id: "EAPCE27-G7H8I9", firstName: "Fatuma", lastName: "Ndunguru", email: "f.ndunguru@tpdc.co.tz", org: "TPDC Tanzania", country: "Tanzania", type: "Delegate (Full Access)" },
              ]).map(r => (
                <tr key={r.id} style={{ borderBottom: `1px solid ${C.lightGray}` }}>
                  <td style={{ padding: "10px 16px", fontSize: 10, color: C.gray, fontFamily: "monospace" }}>{r.id}</td>
                  <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 700 }}>{r.firstName} {r.lastName}</td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: C.gray }}>{r.email}</td>
                  <td style={{ padding: "10px 16px", fontSize: 12 }}>{r.org}</td>
                  <td style={{ padding: "10px 16px", fontSize: 12 }}>{r.country}</td>
                  <td style={{ padding: "10px 16px" }}><span style={{ background: "#dbeafe", color: "#1e40af", padding: "3px 10px", borderRadius: 10, fontSize: 10, fontWeight: 700 }}>{(r.type || "").split("(")[0].trim()}</span></td>
                  <td style={{ padding: "10px 16px" }}><span style={{ color: C.green, fontWeight: 700, fontSize: 12 }}>✓ Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrap>
  );
}

// ─── SHARED ───────────────────────────────────────────────────────────────────
function SectionLabel({ children, light }) {
  return <div style={{ fontSize: 11, fontWeight: 800, color: C.gold, textTransform: "uppercase", letterSpacing: 3, marginBottom: 10 }}>{children}</div>;
}
function SectionTitle({ children, light }) {
  return <h2 style={{ color: light ? "#fff" : C.navy, fontSize: "clamp(20px,3.5vw,32px)", fontWeight: 900, margin: 0, lineHeight: 1.2, letterSpacing: -0.5 }}>{children}</h2>;
}
function PageWrap({ title, subtitle, children }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 24px 64px" }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.gold, textTransform: "uppercase", letterSpacing: 3, marginBottom: 8 }}>EAPCE'27</div>
        <h1 style={{ margin: 0, color: C.navy, fontSize: "clamp(22px,4vw,36px)", fontWeight: 900, letterSpacing: -0.5 }}>{title}</h1>
        {subtitle && <p style={{ margin: "8px 0 0", color: C.gray, fontSize: 14 }}>{subtitle}</p>}
        <div style={{ width: 48, height: 3, background: C.gold, marginTop: 14, borderRadius: 2 }} />
      </div>
      {children}
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: "#060f1c", color: "rgba(255,255,255,0.5)", padding: "48px 24px 28px", marginTop: 80, borderTop: `3px solid ${C.gold}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32, marginBottom: 36 }}>
          <div>
            <div style={{ color: C.gold, fontWeight: 900, fontSize: 18, marginBottom: 10 }}>EAPCE'27</div>
            <div style={{ fontSize: 12, lineHeight: 1.8 }}>12th East African Petroleum<br />Conference & Exhibition<br />9–11 March 2027<br />Kigali Convention Centre, Rwanda</div>
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              {["LI", "X", "FB", "YT"].map(s => <div key={s} style={{ width: 30, height: 30, borderRadius: 6, background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>{s}</div>)}
            </div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 14, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Quick Links</div>
            {["Home", "Agenda", "Register", "Exhibition", "Sponsors", "Speakers", "Venue", "Media"].map(p => (
              <div key={p} onClick={() => setPage(p)} style={{ fontSize: 12, marginBottom: 8, cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>{p}</div>
            ))}
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 14, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Contact</div>
            <div style={{ fontSize: 12, lineHeight: 2.2 }}>
              📧 info@eapce27.rw<br />📧 sponsorship@eapce27.rw<br />📧 abstracts@eapce27.rw<br />📞 +250 788 452 503
            </div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 14, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Organisers</div>
            <div style={{ fontSize: 12, lineHeight: 2 }}>Rwanda Convention Bureau<br />Rwanda Mines, Petroleum<br />&amp; Gas Board (RMB)<br />East African Community (EAC)</div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          © 2027 EAPCE'27 · Rwanda Convention Bureau · All rights reserved &nbsp;·&nbsp; #EAPCE27 #KigaliEnergy2027
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  useEffect(() => { window.scrollTo(0, 0); }, [page]);
  const pages = { Home: <HomePage setPage={setPage} />, Agenda: <AgendaPage />, Register: <RegisterPage />, Exhibition: <ExhibitionPage />, Sponsors: <SponsorsPage />, Speakers: <SpeakersPage />, Venue: <VenuePage />, Media: <MediaPage />, Admin: <AdminPage /> };
  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: C.offWhite, minHeight: "100vh", color: C.text }}>
      <Nav page={page} setPage={setPage} />
      <main>{pages[page]}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
