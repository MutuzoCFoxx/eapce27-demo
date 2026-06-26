
import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── DATA ───────────────────────────────────────────────────────────────────
const AGENDA = {
  "Pre-Conference (Mar 8)": [
    { time: "08:00–09:00", title: "Delegate Registration & Accreditation", room: "Foyer 1A", type: "logistics" },
    { time: "09:00–12:00", title: "NOC / Steering Committee Meeting", room: "AD10 (VIP Lounge)", type: "official" },
    { time: "10:30–11:00", title: "Mid-Morning Coffee Break", room: "Concourse", type: "break" },
    { time: "12:00–13:00", title: "Pre-Conference Lunch", room: "KCC Dining", type: "break" },
    { time: "13:00–17:00", title: "Technical Workshop: Upstream Petroleum Regulation in EAC", room: "MH4", type: "session" },
    { time: "14:00–14:30", title: "Afternoon Coffee Break", room: "Concourse", type: "break" },
    { time: "18:00–20:00", title: "Welcome Cocktail Reception", room: "KCC Concourse", type: "social" },
  ],
  "Day 1 — Mar 9": [
    { time: "07:30–08:30", title: "Registration & Badge Collection", room: "Foyer 1A", type: "logistics" },
    { time: "08:30–10:00", title: "Official Opening Ceremony — Heads of State / Ministers", room: "Auditorium", type: "plenary" },
    { time: "10:00–10:30", title: "Mid-Morning Coffee Break", room: "Concourse / Exhibition", type: "break" },
    { time: "10:30–12:30", title: "Plenary: Strategic Petroleum Resources Exploitation for Sustainable Energy Security in EAC", room: "Auditorium", type: "plenary" },
    { time: "12:30–13:30", title: "Networking Lunch", room: "KCC Dining", type: "break" },
    { time: "13:30–15:30", title: "Breakout A: Oil & Gas Investment Climate", room: "AD11", type: "session" },
    { time: "13:30–15:30", title: "Breakout B: Upstream Licensing & Data Management", room: "AD12", type: "session" },
    { time: "13:30–15:30", title: "Breakout C: Refining & Energy Transition", room: "MH4", type: "session" },
    { time: "15:30–16:00", title: "Coffee Break", room: "Concourse", type: "break" },
    { time: "16:00–17:30", title: "Plenary: East African Petroleum Resources for Enhanced Regional Economy", room: "Auditorium", type: "plenary" },
    { time: "18:30–22:00", title: "Gala Dinner & Cultural Evening", room: "Outside Tent / KCC", type: "social" },
  ],
  "Day 2 — Mar 10": [
    { time: "08:30–10:00", title: "Plenary: Social–Economic Transformation through Petroleum Resources", room: "Auditorium", type: "plenary" },
    { time: "10:00–10:30", title: "Coffee Break", room: "Concourse / Exhibition", type: "break" },
    { time: "10:30–12:30", title: "Country Presentations: Uganda, Kenya, Tanzania, Burundi", room: "Auditorium", type: "session" },
    { time: "12:30–13:30", title: "Lunch & Exhibition Viewing", room: "KCC Dining", type: "break" },
    { time: "13:30–15:30", title: "B2B Meetings — Investors & Service Providers", room: "AD1–AD4", type: "b2b" },
    { time: "13:30–15:30", title: "Poster Sessions & Technical Exhibits", room: "Concourse", type: "session" },
    { time: "15:30–16:00", title: "Coffee Break", room: "Concourse", type: "break" },
    { time: "16:00–17:30", title: "Panel: Energy Financing & Foreign Direct Investment", room: "Auditorium", type: "plenary" },
    { time: "17:30–19:30", title: "Cocktail Reception — Networking", room: "KCC Concourse", type: "social" },
  ],
  "Day 3 — Mar 11": [
    { time: "08:30–10:00", title: "Country Presentations: DRC, Rwanda, South Sudan", room: "Auditorium", type: "plenary" },
    { time: "10:00–10:30", title: "Coffee Break", room: "Concourse / Exhibition", type: "break" },
    { time: "10:30–12:00", title: "Site Visits & Field Excursions", room: "Departure from KCC", type: "excursion" },
    { time: "12:00–13:00", title: "Lunch", room: "KCC Dining", type: "break" },
    { time: "13:00–15:00", title: "Ministerial High-Level Dialogue: Shared Vision for EAC Energy Security", room: "Auditorium", type: "plenary" },
    { time: "15:00–16:00", title: "Closing Ceremony & Communiqué Adoption", room: "Auditorium", type: "official" },
    { time: "16:00–16:30", title: "Farewell Coffee", room: "Concourse", type: "break" },
  ],
};

const SPEAKERS = [
  { name: "H.E. Amb. (Dr.) Veronica Nduva", role: "Secretary General, East African Community", country: "EAC", session: "Opening Ceremony", initials: "VN", color: "#0a4275" },
  { name: "Prof. Jean-Pierre Rwabukumba", role: "CEO, Rwanda Mines, Petroleum & Gas Board", country: "Rwanda", session: "Plenary Day 1", initials: "JR", color: "#1a6b3a" },
  { name: "Dr. Akinwumi Adesina", role: "Energy Policy Advisor", country: "Kenya", session: "B2B Sessions", initials: "AA", color: "#d4a017" },
  { name: "Ms. Fatuma Ndunguru", role: "Director General, TPDC Tanzania", country: "Tanzania", session: "Country Presentations", initials: "FN", color: "#0a4275" },
  { name: "Eng. Robert Kasande", role: "Commissioner, PEPD Uganda", country: "Uganda", session: "Upstream Licensing", initials: "RK", color: "#1a6b3a" },
  { name: "Dr. Claudine Uwera", role: "Investment Promotion Director, RDB", country: "Rwanda", session: "Investment Climate", initials: "CU", color: "#8b1a1a" },
  { name: "Mr. Abdullahi Hassan", role: "Head of Upstream, South Sudan", country: "South Sudan", session: "Country Presentations", initials: "AH", color: "#d4a017" },
  { name: "Ms. Amina Waceke", role: "CEO, EAC Energy Investment Fund", country: "Burundi", session: "Energy Financing", initials: "AW", color: "#0a4275" },
];

const EXHIBITORS_MOCK = [
  { id: "E001", company: "TotalEnergies SE", booth: "A-01", status: "Confirmed", tier: "Platinum", contact: "exhibitor@totalenergies.com" },
  { id: "E002", company: "Schlumberger (SLB)", booth: "A-02", status: "Confirmed", tier: "Gold", contact: "ea@slb.com" },
  { id: "E003", company: "Baker Hughes East Africa", booth: "B-01", status: "Pending", tier: "Silver", contact: "info@bakerhughes.rw" },
  { id: "E004", company: "Tullow Oil Rwanda", booth: "B-03", status: "Confirmed", tier: "Gold", contact: "kigali@tullowoil.com" },
  { id: "E005", company: "Africa Oil Corp", booth: "C-02", status: "Confirmed", tier: "Silver", contact: "info@africaoilcorp.com" },
  { id: "E006", company: "Halliburton EAC", booth: "C-04", status: "Pending", tier: "Bronze", contact: "eac@halliburton.com" },
];

const SPONSOR_TIERS = [
  { tier: "Platinum", price: "USD 50,000", benefits: ["Prime booth location (A-Zone, 6×6m)", "Logo on all materials & website hero", "10 delegate passes", "Speaking slot at opening ceremony", "VIP dinner seating", "Full-page brochure ad", "Social media feature (5 posts)"], color: "#a0856c", slots: 2 },
  { tier: "Gold", price: "USD 25,000", benefits: ["Premium booth (B-Zone, 4×4m)", "Logo on website & banners", "6 delegate passes", "Speaking slot at panel session", "Gala dinner tickets (4)", "Half-page brochure ad", "Social media feature (3 posts)"], color: "#d4a017", slots: 5 },
  { tier: "Silver", price: "USD 12,000", benefits: ["Standard booth (C-Zone, 3×3m)", "Logo on select materials", "4 delegate passes", "Exhibition listing", "Gala dinner tickets (2)", "Quarter-page brochure ad"], color: "#7a7a7a", slots: 10 },
  { tier: "Bronze", price: "USD 5,000", benefits: ["Tabletop display space", "Logo on website", "2 delegate passes", "Exhibition listing", "Name in conference program"], color: "#cd7f32", slots: 15 },
];

const HOTELS = [
  { name: "Radisson Blu Hotel & Convention Centre", stars: 5, distance: "On-site", rate: "USD 220/night", rooms: "Available", code: "EAPCE27-RBL" },
  { name: "Marriott Hotel Kigali", stars: 5, distance: "1.2 km", rate: "USD 195/night", rooms: "Limited", code: "EAPCE27-MKG" },
  { name: "Serena Hotel Kigali", stars: 5, distance: "2.0 km", rate: "USD 180/night", rooms: "Available", code: "EAPCE27-SKG" },
  { name: "Kigali Marriott Executive Apartments", stars: 4, distance: "1.5 km", rate: "USD 140/night", rooms: "Available", code: "EAPCE27-MEA" },
  { name: "The Retreat Hotel", stars: 4, distance: "3.0 km", rate: "USD 110/night", rooms: "Available", code: "EAPCE27-RTR" },
];

const REGISTRATION_TYPES = [
  { id: "delegate", label: "Delegate (Full Access)", price: 850, currency: "USD" },
  { id: "exhibitor", label: "Exhibitor Representative", price: 450, currency: "USD" },
  { id: "media", label: "Media / Press", price: 0, currency: "USD" },
  { id: "student", label: "Student / Academic", price: 150, currency: "USD" },
  { id: "government", label: "Government Official", price: 0, currency: "USD" },
];

const PRESS_RELEASES = [
  { date: "June 10, 2026", title: "Rwanda Officially Announced as Host of 12th East African Petroleum Conference 2027", summary: "The Republic of Rwanda through the Rwanda Mines, Petroleum and Gas Board (RMB) has been officially confirmed as the host nation for the 12th edition of the East African Petroleum Conference and Exhibition (EAPCE'27), to be held at Kigali Convention Centre from 9–11 March 2027." },
  { date: "June 20, 2026", title: "Exhibition Booth Applications Now Open for EAPCE'27", summary: "Energy companies, service providers, and industry stakeholders across East Africa and beyond are invited to secure exhibition booth space at EAPCE'27. Seventy booths are available across Platinum, Gold, Silver, and Bronze tiers." },
  { date: "July 5, 2026", title: "EAPCE'27 Sponsorship Packages Released — Early Bird Discount Available", summary: "Rwanda Convention Bureau and Rwanda Mines, Petroleum and Gas Board have released the official sponsorship prospectus for EAPCE'27. Companies can now secure naming rights, speaking opportunities, and premium delegate packages." },
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
  { name: "Delegates", value: 612, color: "#0a4275" },
  { name: "Exhibitors", value: 210, color: "#1a6b3a" },
  { name: "Government", value: 125, color: "#d4a017" },
  { name: "Media", value: 68, color: "#7a7a7a" },
  { name: "Students", value: 32, color: "#cd7f32" },
];
const ANALYTICS_BOOTHS = [
  { zone: "Platinum", sold: 2, total: 2 },
  { zone: "Gold", sold: 4, total: 5 },
  { zone: "Silver", sold: 7, total: 10 },
  { zone: "Bronze", sold: 9, total: 15 },
];

// ─── STYLES ─────────────────────────────────────────────────────────────────
const C = {
  navy: "#0a4275",
  navyDark: "#062a4e",
  green: "#1a6b3a",
  greenLight: "#e8f5ee",
  gold: "#d4a017",
  goldLight: "#fdf6e3",
  rwandaBlue: "#20bfe8",
  rwandaYellow: "#e5be01",
  white: "#ffffff",
  offWhite: "#f4f7fb",
  gray: "#6b7280",
  lightGray: "#e5e7eb",
  text: "#1a1a2e",
  danger: "#dc2626",
};

const tagColors = {
  plenary: { bg: "#dbeafe", text: "#1d4ed8" },
  session: { bg: "#dcfce7", text: "#15803d" },
  break: { bg: "#fef9c3", text: "#92400e" },
  social: { bg: "#fce7f3", text: "#9d174d" },
  logistics: { bg: "#f3f4f6", text: "#374151" },
  official: { bg: "#ede9fe", text: "#5b21b6" },
  b2b: { bg: "#ffedd5", text: "#9a3412" },
  excursion: { bg: "#d1fae5", text: "#065f46" },
};

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────
function Countdown() {
  const target = new Date("2027-03-09T08:00:00");
  const [diff, setDiff] = useState(target - Date.now());
  useEffect(() => { const t = setInterval(() => setDiff(target - Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, Math.floor(diff / 86400000));
  const h = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000));
  const s = Math.max(0, Math.floor((diff % 60000) / 1000));
  const Box = ({ v, label }) => (
    <div style={{ textAlign: "center", minWidth: 64 }}>
      <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "10px 16px", fontSize: 32, fontWeight: 700, color: "#fff", letterSpacing: 2, fontVariantNumeric: "tabular-nums" }}>{String(v).padStart(2, "0")}</div>
      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
      <Box v={d} label="Days" /><Box v={h} label="Hours" /><Box v={m} label="Mins" /><Box v={s} label="Secs" />
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
const PAGES = ["Home", "Agenda", "Register", "Exhibitors", "Sponsors", "Venue", "Speakers", "Media", "Admin"];

function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ background: C.navyDark, borderBottom: `3px solid ${C.gold}`, position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 58 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.navy}, ${C.green})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>EAC</div>
          <div>
            <div style={{ color: C.gold, fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>EAPCE'27</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 9, letterSpacing: 0.5 }}>KIGALI · MARCH 9–11</div>
          </div>
        </div>
        {/* Desktop */}
        <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {PAGES.map(p => (
            <button key={p} onClick={() => setPage(p)}
              style={{ background: page === p ? C.gold : "transparent", color: page === p ? C.navyDark : "rgba(255,255,255,0.75)", border: "none", padding: "6px 10px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontWeight: page === p ? 700 : 400, letterSpacing: 0.5 }}>
              {p === "Admin" ? "🔒 Admin" : p}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(160deg, ${C.navyDark} 0%, #0d5c8a 50%, ${C.green} 100%)`, padding: "60px 20px 50px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(212,160,23,0.1) 0%, transparent 50%)" }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: C.gold, color: C.navyDark, padding: "4px 16px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>East African Community · Official Event</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(22px,5vw,44px)", fontWeight: 800, margin: "0 0 8px", lineHeight: 1.15 }}>12th East African Petroleum<br />Conference & Exhibition</h1>
          <div style={{ color: C.gold, fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, marginBottom: 8 }}>EAPCE'27</div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 6 }}>📅 March 9–11, 2027 &nbsp;|&nbsp; 📍 Kigali Convention Centre, Rwanda</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, fontStyle: "italic", marginBottom: 32 }}>"Strategic and Sustainable Oil and Gas Resources Exploitation for Energy Security in EAC"</div>
          <Countdown />
          <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("Register")} style={{ background: C.gold, color: C.navyDark, border: "none", padding: "14px 32px", borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5 }}>Register Now</button>
            <button onClick={() => setPage("Exhibitors")} style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)", padding: "14px 32px", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Book a Booth</button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: C.navy, padding: "16px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
          {[["1,000+", "Delegates"], ["70", "Exhibition Booths"], ["8", "EAC Partner States"], ["3", "Conference Days"], ["4", "Breakout Tracks"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: C.gold, fontSize: 22, fontWeight: 800 }}>{v}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
        {/* Themes */}
        <SectionTitle>Conference Themes</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginBottom: 48 }}>
          {[
            ["⚡", "Energy Security", "Strategic and sustainable exploitation of EAC oil & gas resources for regional energy security"],
            ["🌍", "Regional Economy", "Leveraging East African petroleum resources for enhanced regional economic development"],
            ["🤝", "Social Transformation", "Petroleum resources as a catalyst for social and economic transformation across EAC"],
            ["💡", "Investment & Partnership", "Accelerating FDI, B2B partnerships, and project development in the energy sector"],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ background: C.offWhite, borderRadius: 8, padding: 20, borderTop: `4px solid ${C.gold}` }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: C.navy, marginBottom: 6, fontSize: 14 }}>{title}</div>
              <div style={{ color: C.gray, fontSize: 13, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* Rwanda facts */}
        <SectionTitle>Why Rwanda?</SectionTitle>
        <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.green} 100%)`, borderRadius: 12, padding: "32px 24px", marginBottom: 48, color: "#fff" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {[
              ["🌐", "#1 in Africa", "for Ease of Doing Business (World Bank)"],
              ["✈️", "Well-Connected", "RwandAir hub — direct flights to 30+ African cities"],
              ["🏆", "MICE Destination", "Africa's leading meetings & conventions hub"],
              ["🔒", "Safe & Secure", "Consistently ranked among Africa's safest countries"],
              ["🌿", "Green City", "Kigali — Africa's cleanest and most livable city"],
              ["⛽", "Petroleum Potential", "Emerging upstream petroleum sector — Lake Albert basin & methane gas"],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.gold }}>{title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {[["📋 Register", "Secure your delegate pass", "Register", "#d4a017"], ["🏪 Exhibition", "Book your booth now", "Exhibitors", "#1a6b3a"], ["💼 Sponsorship", "Partner with EAPCE'27", "Sponsors", "#0a4275"], ["📍 Venue", "Kigali Convention Centre", "Venue", "#7a3b00"]].map(([title, sub, page, bg]) => (
            <button key={page} onClick={() => setPage(page)} style={{ background: bg, border: "none", borderRadius: 8, padding: "18px 16px", cursor: "pointer", textAlign: "left", transition: "opacity 0.2s" }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>{sub}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── AGENDA ─────────────────────────────────────────────────────────────────
function AgendaPage() {
  const days = Object.keys(AGENDA);
  const [active, setActive] = useState(days[0]);
  return (
    <PageWrap title="Conference Programme" subtitle="9–11 March 2027 · Kigali Convention Centre">
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {days.map(d => (
          <button key={d} onClick={() => setActive(d)}
            style={{ background: active === d ? C.navy : C.offWhite, color: active === d ? "#fff" : C.navy, border: `2px solid ${active === d ? C.navy : C.lightGray}`, padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            {d}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {AGENDA[active].map((item, i) => {
          const tc = tagColors[item.type] || tagColors.session;
          return (
            <div key={i} style={{ display: "flex", gap: 12, background: "#fff", borderRadius: 8, padding: "14px 16px", border: `1px solid ${C.lightGray}`, alignItems: "flex-start" }}>
              <div style={{ minWidth: 90, color: C.gray, fontSize: 12, fontWeight: 600, paddingTop: 2 }}>{item.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{item.title}</div>
                <div style={{ color: C.gray, fontSize: 12, marginTop: 4 }}>📍 {item.room}</div>
              </div>
              <span style={{ background: tc.bg, color: tc.text, padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", textTransform: "capitalize" }}>{item.type}</span>
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
        {Object.entries(tagColors).map(([k, v]) => (
          <span key={k} style={{ background: v.bg, color: v.text, padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>{k}</span>
        ))}
      </div>
    </PageWrap>
  );
}

// ─── REGISTER ────────────────────────────────────────────────────────────────
function RegisterPage() {
  const [step, setStep] = useState(1);
  const [regType, setRegType] = useState(REGISTRATION_TYPES[0]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", org: "", country: "", phone: "", dietary: "", hotel: "" });
  const [errors, setErrors] = useState({});
  const [paid, setPaid] = useState(false);
  const [badgeId] = useState(() => "EAPCE27-" + Math.random().toString(36).substr(2, 8).toUpperCase());
  const [registered, setRegistered] = useState(() => JSON.parse(sessionStorage.getItem("eapce_regs") || "[]"));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Valid email required";
    if (!form.org.trim()) e.org = "Required";
    if (!form.country.trim()) e.country = "Required";
    // duplicate check
    const dup = registered.find(r => r.email.toLowerCase() === form.email.toLowerCase());
    if (dup) e.email = "This email is already registered (ID: " + dup.id + ")";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (regType.price > 0) { setStep(2); return; }
    finalize();
  };

  const finalize = () => {
    const rec = { ...form, type: regType.label, price: regType.price, id: badgeId, ts: new Date().toISOString() };
    const updated = [...registered, rec];
    sessionStorage.setItem("eapce_regs", JSON.stringify(updated));
    setRegistered(updated);
    setStep(3);
  };

  const F = ({ label, name, type = "text", required }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>{label}{required && <span style={{ color: C.danger }}> *</span>}</label>
      <input type={type} value={form[name]} onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: "" })); }}
        style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${errors[name] ? C.danger : C.lightGray}`, borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
      {errors[name] && <div style={{ color: C.danger, fontSize: 11, marginTop: 3 }}>⚠ {errors[name]}</div>}
    </div>
  );

  return (
    <PageWrap title="Delegate Registration" subtitle="Register for EAPCE'27 — 9–11 March 2027, Kigali">
      {/* Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: 32, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.lightGray}` }}>
        {["1. Details", "2. Payment", "3. Confirmation"].map((s, i) => (
          <div key={s} style={{ flex: 1, padding: "10px 8px", background: step === i + 1 ? C.navy : step > i + 1 ? C.green : C.offWhite, color: step >= i + 1 ? "#fff" : C.gray, textAlign: "center", fontSize: 12, fontWeight: 600 }}>{step > i + 1 ? "✓ " : ""}{s}</div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: 24, border: `1px solid ${C.lightGray}` }}>
            <h3 style={{ margin: "0 0 16px", color: C.navy }}>Registration Type</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {REGISTRATION_TYPES.map(rt => (
                <label key={rt.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 6, border: `2px solid ${regType.id === rt.id ? C.navy : C.lightGray}`, cursor: "pointer", background: regType.id === rt.id ? "#f0f6ff" : "#fff" }}>
                  <input type="radio" name="regType" checked={regType.id === rt.id} onChange={() => setRegType(rt)} style={{ accentColor: C.navy }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{rt.label}</span>
                    <span style={{ float: "right", fontWeight: 700, color: rt.price === 0 ? C.green : C.navy }}>{rt.price === 0 ? "FREE" : `USD ${rt.price}`}</span>
                  </div>
                </label>
              ))}
            </div>
            <h3 style={{ margin: "0 0 16px", color: C.navy }}>Personal Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <F label="First Name" name="firstName" required />
              <F label="Last Name" name="lastName" required />
            </div>
            <F label="Email Address" name="email" type="email" required />
            <F label="Organisation / Company" name="org" required />
            <F label="Country" name="country" required />
            <F label="Phone Number" name="phone" />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>Dietary Requirements</label>
              <select value={form.dietary} onChange={e => setForm(f => ({ ...f, dietary: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14 }}>
                <option value="">None</option>
                <option>Vegetarian</option><option>Vegan</option><option>Halal</option><option>Gluten-Free</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>Hotel Preference</label>
              <select value={form.hotel} onChange={e => setForm(f => ({ ...f, hotel: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14 }}>
                <option value="">No preference / self-arranged</option>
                {HOTELS.map(h => <option key={h.name}>{h.name} ({h.rate})</option>)}
              </select>
            </div>
            <button onClick={handleSubmit} style={{ width: "100%", background: C.navy, color: "#fff", border: "none", padding: "14px", borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              {regType.price > 0 ? `Proceed to Payment — USD ${regType.price}` : "Complete Registration (Free)"}
            </button>
          </div>
          {/* Summary */}
          <div style={{ background: C.offWhite, borderRadius: 10, padding: 20, border: `1px solid ${C.lightGray}`, position: "sticky", top: 80 }}>
            <h4 style={{ margin: "0 0 12px", color: C.navy }}>Order Summary</h4>
            <div style={{ borderBottom: `1px solid ${C.lightGray}`, paddingBottom: 12, marginBottom: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{regType.label}</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>EAPCE'27 — Kigali, March 9–11, 2027</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13 }}>Registration Fee</span>
              <span style={{ fontWeight: 600 }}>{regType.price === 0 ? "FREE" : `USD ${regType.price}`}</span>
            </div>
            {regType.price > 0 && <>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, color: C.gray }}>
                <span style={{ fontSize: 13 }}>VAT (0% — Rwanda)</span>
                <span style={{ fontSize: 13 }}>USD 0</span>
              </div>
              <div style={{ borderTop: `2px solid ${C.navy}`, paddingTop: 10, marginTop: 10, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700 }}>Total</span>
                <span style={{ fontWeight: 700, color: C.navy, fontSize: 18 }}>USD {regType.price}</span>
              </div>
            </>}
            <div style={{ marginTop: 16, background: C.greenLight, borderRadius: 6, padding: 12, fontSize: 12 }}>
              <div style={{ fontWeight: 600, color: C.green, marginBottom: 4 }}>✓ What's Included</div>
              <div style={{ color: "#374151", lineHeight: 1.6 }}>• Access to all plenary sessions<br />• Exhibition floor access<br />• Conference materials & bag<br />• Daily lunches & coffee breaks<br />• Gala dinner ticket</div>
            </div>
            <div style={{ marginTop: 12, background: "#fff8f0", borderRadius: 6, padding: 12, fontSize: 12, color: "#92400e" }}>
              🔒 <strong>Secure Registration</strong><br />QR-coded badge will be generated upon confirmation.
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: 28, border: `1px solid ${C.lightGray}` }}>
            <h3 style={{ margin: "0 0 6px", color: C.navy }}>Secure Payment</h3>
            <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 6, padding: 10, marginBottom: 20, fontSize: 12, color: "#0369a1" }}>🔒 Demo mode — no real payment is processed</div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Card Number</label>
              <input defaultValue="4242 4242 4242 4242" style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Expiry</label><input defaultValue="12/28" style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14 }} /></div>
              <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>CVV</label><input defaultValue="123" type="password" style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14 }} /></div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Cardholder Name</label>
              <input defaultValue={`${form.firstName} ${form.lastName}`} style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: C.gray }}>Amount due:</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.navy }}>USD {regType.price}</div>
            </div>
            <button onClick={finalize} style={{ width: "100%", background: C.green, color: "#fff", border: "none", padding: "14px", borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>✓ Pay USD {regType.price}</button>
            <button onClick={() => setStep(1)} style={{ width: "100%", background: "transparent", color: C.gray, border: `1px solid ${C.lightGray}`, padding: "10px", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>← Back</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 40, border: `1px solid ${C.lightGray}` }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
            <h2 style={{ color: C.green, marginBottom: 8 }}>Registration Confirmed!</h2>
            <p style={{ color: C.gray, marginBottom: 24 }}>Welcome, {form.firstName}! Your registration for EAPCE'27 has been confirmed. A confirmation email has been sent to <strong>{form.email}</strong>.</p>
            {/* QR Badge Mock */}
            <div style={{ background: C.navy, color: "#fff", borderRadius: 12, padding: 24, marginBottom: 24, display: "inline-block", minWidth: 280 }}>
              <div style={{ background: C.gold, color: C.navyDark, borderRadius: 6, padding: "4px 12px", fontSize: 10, fontWeight: 800, letterSpacing: 2, marginBottom: 12, display: "inline-block" }}>OFFICIAL DELEGATE BADGE</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{form.firstName} {form.lastName}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 2 }}>{form.org}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>{form.country}</div>
              {/* QR mock */}
              <div style={{ background: "#fff", borderRadius: 8, padding: 10, display: "inline-block", marginBottom: 12 }}>
                <div style={{ width: 80, height: 80, background: "repeating-linear-gradient(0deg,#000 0px,#000 4px,#fff 4px,#fff 8px), repeating-linear-gradient(90deg,#000 0px,#000 4px,#fff 4px,#fff 8px)", backgroundBlendMode: "difference" }} />
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: 2 }}>{badgeId}</div>
              <div style={{ fontSize: 11, color: C.gold, marginTop: 4 }}>EAPCE'27 · KIGALI · MAR 9–11, 2027</div>
            </div>
            <div style={{ background: C.offWhite, borderRadius: 8, padding: 16, textAlign: "left", marginBottom: 24 }}>
              <div style={{ fontWeight: 700, color: C.navy, marginBottom: 8 }}>Your Registration Details</div>
              {[["ID", badgeId], ["Type", regType.label], ["Status", "✓ Confirmed"], ["Hotel", form.hotel || "Self-arranged"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4, borderBottom: `1px solid ${C.lightGray}`, paddingBottom: 4 }}>
                  <span style={{ color: C.gray }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 8, padding: 12, fontSize: 12, color: "#92400e", textAlign: "left" }}>
              📧 <strong>Confirmation email sent</strong> to {form.email} with your QR-coded badge, venue details, and pre-conference checklist.
            </div>
          </div>
        </div>
      )}
    </PageWrap>
  );
}

// ─── EXHIBITORS ───────────────────────────────────────────────────────────────
function ExhibitorsPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: "", pass: "" });
  const [view, setView] = useState("overview");

  if (!loggedIn) return (
    <PageWrap title="Exhibitor Portal" subtitle="Login to access your booth management dashboard">
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        {/* Public info */}
        <div style={{ background: C.navy, color: "#fff", borderRadius: 10, padding: 24, marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 12px", color: C.gold }}>Why Exhibit at EAPCE'27?</h3>
          {["Reach 1,000+ energy & mining executives", "70 exhibition booths across MHs & Concourse", "5 days of exhibition access", "B2B meeting facilitation", "Brand exposure to all 8 EAC Partner States"].map(b => (
            <div key={b} style={{ fontSize: 13, marginBottom: 6 }}>✓ {b}</div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 10, padding: 24, border: `1px solid ${C.lightGray}` }}>
          <h3 style={{ margin: "0 0 16px", color: C.navy }}>Exhibitor Login</h3>
          <div style={{ background: "#f0f9ff", borderRadius: 6, padding: 10, marginBottom: 16, fontSize: 12, color: "#0369a1" }}>Demo credentials: <strong>exhibitor@demo.com</strong> / <strong>eapce2027</strong></div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Email</label>
            <input value={loginForm.user} onChange={e => setLoginForm(f => ({ ...f, user: e.target.value }))} placeholder="exhibitor@demo.com" style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Password</label>
            <input type="password" value={loginForm.pass} onChange={e => setLoginForm(f => ({ ...f, pass: e.target.value }))} placeholder="eapce2027" style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14, boxSizing: "border-box" }} />
          </div>
          <button onClick={() => { if (loginForm.user && loginForm.pass) setLoggedIn(true); }} style={{ width: "100%", background: C.navy, color: "#fff", border: "none", padding: 12, borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Login to Portal</button>
        </div>
      </div>
    </PageWrap>
  );

  return (
    <PageWrap title="Exhibitor Dashboard" subtitle="TotalEnergies SE — Booth A-01 (Platinum)">
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {["overview", "booths", "upload", "logistics"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{ background: view === v ? C.navy : C.offWhite, color: view === v ? "#fff" : C.navy, border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, textTransform: "capitalize" }}>{v}</button>
        ))}
        <button onClick={() => setLoggedIn(false)} style={{ marginLeft: "auto", background: "transparent", color: C.danger, border: `1px solid ${C.danger}`, padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>Logout</button>
      </div>

      {view === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 24 }}>
            {[["A-01", "Your Booth", "#d4a017"], ["Platinum", "Tier", "#0a4275"], ["5", "Days Active", "#1a6b3a"], ["6", "Passes Included", "#7a3b00"]].map(([v, l, bg]) => (
              <div key={l} style={{ background: bg, color: "#fff", borderRadius: 8, padding: 18, textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800 }}>{v}</div>
                <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", borderRadius: 8, border: `1px solid ${C.lightGray}`, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ background: C.navy, color: "#fff", padding: "12px 16px", fontWeight: 700 }}>All Exhibitors</div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: C.offWhite }}>{["ID", "Company", "Booth", "Tier", "Status"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: C.gray, borderBottom: `1px solid ${C.lightGray}` }}>{h}</th>)}</tr></thead>
              <tbody>{EXHIBITORS_MOCK.map(e => (
                <tr key={e.id} style={{ borderBottom: `1px solid ${C.lightGray}` }}>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: C.gray }}>{e.id}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600 }}>{e.company}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13 }}>{e.booth}</td>
                  <td style={{ padding: "10px 14px" }}><span style={{ background: e.tier === "Platinum" ? "#f5e6c8" : e.tier === "Gold" ? "#fef3c7" : e.tier === "Silver" ? "#f3f4f6" : "#fde8d8", color: e.tier === "Platinum" ? "#7a5c00" : e.tier === "Gold" ? "#92400e" : e.tier === "Silver" ? "#374151" : "#9a3412", padding: "2px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{e.tier}</span></td>
                  <td style={{ padding: "10px 14px" }}><span style={{ color: e.status === "Confirmed" ? C.green : C.gold, fontWeight: 600, fontSize: 12 }}>{e.status === "Confirmed" ? "✓" : "⏳"} {e.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {view === "booths" && (
        <div>
          <h3 style={{ color: C.navy }}>Exhibition Floor Plan — KCC MHs & Concourse</h3>
          <div style={{ background: "#fff", border: `1px solid ${C.lightGray}`, borderRadius: 10, padding: 20, marginBottom: 20 }}>
            <div style={{ background: C.navy, color: "#fff", textAlign: "center", padding: "8px", borderRadius: 6, marginBottom: 12, fontSize: 13, fontWeight: 700 }}>AUDITORIUM (NORTH)</div>
            {["A", "B", "C", "D"].map(row => (
              <div key={row} style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: C.gray, minWidth: 16, fontWeight: 700 }}>{row}</span>
                {Array.from({ length: 10 }, (_, i) => {
                  const ex = EXHIBITORS_MOCK.find(e => e.booth === `${row}-${String(i + 1).padStart(2, "0")}`);
                  const isMine = ex?.booth === "A-01";
                  return (
                    <div key={i} style={{ flex: 1, minHeight: 36, borderRadius: 4, background: isMine ? C.gold : ex ? (ex.status === "Confirmed" ? "#bfdbfe" : "#fef3c7") : "#e5e7eb", border: `1px solid ${isMine ? C.gold : ex ? "#93c5fd" : "#d1d5db"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: isMine ? C.navyDark : ex ? "#1e3a5f" : "#9ca3af", title: ex ? ex.company : "Available" }}>
                      {row}{i + 1}
                    </div>
                  );
                })}
              </div>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
              {[["#bfdbfe", "Booked"], [C.gold, "Your Booth (A-01)"], ["#fef3c7", "Pending"], ["#e5e7eb", "Available"]].map(([bg, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.gray }}>
                  <div style={{ width: 16, height: 16, background: bg, borderRadius: 2, border: "1px solid #ccc" }} />{label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === "upload" && (
        <div>
          <h3 style={{ color: C.navy }}>Upload Branding Assets</h3>
          <div style={{ background: "#fff", borderRadius: 8, padding: 24, border: `1px solid ${C.lightGray}`, maxWidth: 560 }}>
            {[["Company Logo (PNG/SVG, min 300dpi)", "✓ Uploaded"], ["Backdrop Banner (5000×2000px)", "⏳ Pending"], ["Booth Artwork (3×3m print-ready)", "⏳ Pending"], ["Product Brochure (PDF)", "✓ Uploaded"]].map(([label, status]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.lightGray}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: 11, color: status.includes("✓") ? C.green : C.gold, marginTop: 2 }}>{status}</div>
                </div>
                <button style={{ background: C.offWhite, border: `1px solid ${C.lightGray}`, padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Upload</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "logistics" && (
        <div>
          <h3 style={{ color: C.navy }}>Booth Logistics</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {[
              { title: "Setup", items: ["Setup window: Mar 7–8 (08:00–18:00)", "Booth: A-01, Zone A Platinum", "Power: 3-phase 30A supplied", "Furniture: Included (table, 4 chairs)"] },
              { title: "During Conference", items: ["Booth open: Mar 9–11 (08:00–17:00)", "Catering: Coffee station included", "WiFi: SSID EAPCE27-EXH, key provided", "AV: Screen mount bracket provided"] },
              { title: "Dismantling", items: ["Dismantling: Mar 11 (17:00–20:00)", "Freight collection: Mar 12", "Security: 24hr on-site security", "Damaged property report by Mar 14"] },
            ].map(({ title, items }) => (
              <div key={title} style={{ background: "#fff", borderRadius: 8, padding: 18, border: `1px solid ${C.lightGray}` }}>
                <div style={{ fontWeight: 700, color: C.navy, marginBottom: 10 }}>{title}</div>
                {items.map(item => <div key={item} style={{ fontSize: 12, color: C.gray, marginBottom: 6 }}>• {item}</div>)}
              </div>
            ))}
          </div>
        </div>
      )}
    </PageWrap>
  );
}

// ─── SPONSORS ────────────────────────────────────────────────────────────────
function SponsorsPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  return (
    <PageWrap title="Sponsorship Opportunities" subtitle="Partner with EAPCE'27 — East Africa's Premier Energy Conference">
      {!loggedIn ? (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginBottom: 32 }}>
            {SPONSOR_TIERS.map(t => (
              <div key={t.tier} onClick={() => setSelectedTier(t.tier === selectedTier ? null : t.tier)}
                style={{ background: "#fff", borderRadius: 10, padding: 22, border: `2px solid ${selectedTier === t.tier ? t.color : C.lightGray}`, cursor: "pointer", transition: "border-color 0.2s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontWeight: 800, fontSize: 16, color: t.color, textTransform: "uppercase", letterSpacing: 1 }}>{t.tier}</span>
                  <span style={{ fontWeight: 700, color: C.navy, fontSize: 14 }}>{t.price}</span>
                </div>
                <div style={{ fontSize: 11, color: C.gray, marginBottom: 12 }}>{t.slots} slots available</div>
                {t.benefits.slice(0, 4).map(b => <div key={b} style={{ fontSize: 12, marginBottom: 4, color: "#374151" }}>✓ {b}</div>)}
                {t.benefits.length > 4 && <div style={{ fontSize: 12, color: C.gray }}>+{t.benefits.length - 4} more benefits</div>}
                {selectedTier === t.tier && (
                  <div style={{ marginTop: 12, padding: "10px 0", borderTop: `1px dashed ${C.lightGray}` }}>
                    {t.benefits.slice(4).map(b => <div key={b} style={{ fontSize: 12, marginBottom: 4, color: "#374151" }}>✓ {b}</div>)}
                  </div>
                )}
                <button onClick={e => { e.stopPropagation(); setLoggedIn(true); }} style={{ marginTop: 14, width: "100%", background: t.color, color: "#fff", border: "none", padding: "10px", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Select {t.tier}</button>
              </div>
            ))}
          </div>
          <div style={{ background: C.navy, borderRadius: 10, padding: 24, color: "#fff", textAlign: "center" }}>
            <h3 style={{ margin: "0 0 8px", color: C.gold }}>Custom Sponsorship Packages</h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginBottom: 16 }}>Looking for a tailored partnership? Contact us for naming rights, session sponsorships, or bespoke engagement packages.</p>
            <div style={{ fontSize: 13 }}>📧 sponsorship@eapce27.rw &nbsp;|&nbsp; 📞 +250 788 452 503</div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: 28, border: `1px solid ${C.lightGray}` }}>
            <div style={{ background: "#d1fae5", border: "1px solid #6ee7b7", borderRadius: 6, padding: 12, marginBottom: 20, fontSize: 13, color: "#065f46" }}>✓ Logged in as sponsor (demo)</div>
            <h3 style={{ color: C.navy, margin: "0 0 16px" }}>Sponsor Dashboard</h3>
            {[["Package Selected", "Gold Sponsor"], ["Status", "Application Under Review"], ["Invoice", "INV-EAPCE27-SP-004 (Pending)"], ["Contact", "partnerships@rcb.rw"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.lightGray}`, fontSize: 13 }}>
                <span style={{ color: C.gray }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <h4 style={{ color: C.navy, marginBottom: 10, marginTop: 20 }}>Your Deliverables Checklist</h4>
            {[["✓", "Contract signed", "green"], ["✓", "50% deposit paid", "green"], ["⏳", "Logo submitted (pending review)", "gold"], ["✗", "Backdrop artwork — due Jan 15", "gray"]].map(([ic, item, col]) => (
              <div key={item} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: col === "green" ? C.green : col === "gold" ? C.gold : C.gray, fontWeight: 700 }}>{ic}</span>
                <span style={{ color: C.text }}>{item}</span>
              </div>
            ))}
            <button onClick={() => setLoggedIn(false)} style={{ marginTop: 20, background: "transparent", color: C.danger, border: `1px solid ${C.danger}`, padding: "8px 20px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>Logout</button>
          </div>
        </div>
      )}
    </PageWrap>
  );
}

// ─── VENUE ───────────────────────────────────────────────────────────────────
function VenuePage() {
  return (
    <PageWrap title="Venue & Location" subtitle="Kigali Convention Centre (KCC) — Heart of Kigali, Rwanda">
      {/* Map placeholder */}
      <div style={{ background: `linear-gradient(135deg, #e8f4f8, #d6eaf8)`, borderRadius: 10, height: 220, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, border: `1px solid ${C.lightGray}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><rect fill=\"%23e8f4f8\" width=\"100\" height=\"100\"/><line x1=\"0\" y1=\"20\" x2=\"100\" y2=\"20\" stroke=\"%23cde\" stroke-width=\"1\"/><line x1=\"0\" y1=\"40\" x2=\"100\" y2=\"40\" stroke=\"%23cde\" stroke-width=\"1\"/><line x1=\"0\" y1=\"60\" x2=\"100\" y2=\"60\" stroke=\"%23cde\" stroke-width=\"1\"/><line x1=\"0\" y1=\"80\" x2=\"100\" y2=\"80\" stroke=\"%23cde\" stroke-width=\"1\"/><line x1=\"20\" y1=\"0\" x2=\"20\" y2=\"100\" stroke=\"%23cde\" stroke-width=\"1\"/><line x1=\"40\" y1=\"0\" x2=\"40\" y2=\"100\" stroke=\"%23cde\" stroke-width=\"1\"/><line x1=\"60\" y1=\"0\" x2=\"60\" y2=\"100\" stroke=\"%23cde\" stroke-width=\"1\"/><line x1=\"80\" y1=\"0\" x2=\"80\" y2=\"100\" stroke=\"%23cde\" stroke-width=\"1\"/></svg>')" }} />
        <div style={{ textAlign: "center", position: "relative" }}>
          <div style={{ fontSize: 40 }}>📍</div>
          <div style={{ fontWeight: 700, color: C.navy, fontSize: 16 }}>Kigali Convention Centre</div>
          <div style={{ color: C.gray, fontSize: 12 }}>KG 2 Roundabout, Kigali, Rwanda</div>
          <div style={{ fontSize: 11, color: "#0369a1", marginTop: 4 }}>-1.9441° S, 30.0619° E</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, marginBottom: 28 }}>
        <div style={{ background: "#fff", borderRadius: 8, padding: 20, border: `1px solid ${C.lightGray}` }}>
          <h4 style={{ color: C.navy, margin: "0 0 12px" }}>🏛 About KCC</h4>
          {["State-of-the-art convention centre opened 2016", "1,000+ seating auditorium", "Multiple meeting halls (MH1–MH4)", "Full AV, interpretation booths & fibre connectivity", "On-site catering & hospitality", "Ample parking & 24hr security"].map(f => <div key={f} style={{ fontSize: 12, color: C.gray, marginBottom: 6 }}>• {f}</div>)}
        </div>
        <div style={{ background: "#fff", borderRadius: 8, padding: 20, border: `1px solid ${C.lightGray}` }}>
          <h4 style={{ color: C.navy, margin: "0 0 12px" }}>✈️ Getting There</h4>
          {[["Kigali International Airport", "12 km · 20 min by road"], ["Radisson Blu (on-site)", "Adjacent to KCC"], ["City Centre Hotels", "5–15 min by taxi/Bolt"], ["From Nairobi (NBO)", "1h 15min flight"], ["From Dar es Salaam (DAR)", "1h 45min flight"], ["From Kampala (EBB)", "1h flight"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6, borderBottom: `1px solid ${C.lightGray}`, paddingBottom: 5 }}>
              <span style={{ fontWeight: 600, color: C.text }}>{k}</span><span style={{ color: C.gray }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <h3 style={{ color: C.navy }}>Official Partner Hotels</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {HOTELS.map(h => (
          <div key={h.name} style={{ background: "#fff", borderRadius: 8, padding: "14px 18px", border: `1px solid ${C.lightGray}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{"⭐".repeat(h.stars)} {h.name}</div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>📍 {h.distance} from KCC &nbsp;|&nbsp; Booking code: <strong>{h.code}</strong></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, color: C.navy }}>{h.rate}</div>
                <div style={{ fontSize: 11, color: h.rooms === "Limited" ? C.danger : C.green }}>{h.rooms === "Limited" ? "⚠ Limited" : "✓ Available"}</div>
              </div>
              <button style={{ background: C.navy, color: "#fff", border: "none", padding: "8px 16px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Book</button>
            </div>
          </div>
        ))}
      </div>
    </PageWrap>
  );
}

// ─── SPEAKERS ────────────────────────────────────────────────────────────────
function SpeakersPage() {
  const [selected, setSelected] = useState(null);
  return (
    <PageWrap title="Speakers & Resource Persons" subtitle="Distinguished experts, ministers, and industry leaders from across East Africa">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
        {SPEAKERS.map(s => (
          <div key={s.name} onClick={() => setSelected(selected?.name === s.name ? null : s)}
            style={{ background: "#fff", borderRadius: 10, padding: 20, border: `2px solid ${selected?.name === s.name ? s.color : C.lightGray}`, cursor: "pointer", textAlign: "center", transition: "border-color 0.2s" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: s.color, color: "#fff", fontSize: 22, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>{s.initials}</div>
            <div style={{ fontWeight: 700, color: C.text, fontSize: 14, marginBottom: 4 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: C.gray, marginBottom: 8, lineHeight: 1.4 }}>{s.role}</div>
            <span style={{ background: C.offWhite, color: C.navy, padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>🌍 {s.country}</span>
            {selected?.name === s.name && (
              <div style={{ marginTop: 14, textAlign: "left", borderTop: `1px solid ${C.lightGray}`, paddingTop: 12 }}>
                <div style={{ fontSize: 11, color: C.gray, marginBottom: 4 }}>Session</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.navy }}>{s.session}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, background: C.offWhite, borderRadius: 8, padding: 16, fontSize: 13, color: C.gray, textAlign: "center" }}>
        Speaker nominations & abstract submissions: <strong>abstracts@eapce27.rw</strong> &nbsp;|&nbsp; Deadline: Dec 31, 2026
      </div>
    </PageWrap>
  );
}

// ─── MEDIA ───────────────────────────────────────────────────────────────────
function MediaPage() {
  return (
    <PageWrap title="News & Media" subtitle="Press releases, media resources, and social outreach for EAPCE'27">
      {/* Notice proposal */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy}, #0d5c8a)`, borderRadius: 10, padding: 24, color: "#fff", marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ background: C.gold, color: C.navyDark, display: "inline-block", padding: "3px 12px", borderRadius: 12, fontSize: 11, fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>MEDIA NOTICE PROPOSAL</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 20 }}>EAPCE'27 — Official Media & PR Campaign Plan</h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>A multi-channel communications strategy designed to drive awareness, delegate registrations, and exhibitor sign-ups across East Africa and the global energy sector.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["📺 TV & Radio", "CNBC Africa, KBC, NTV, RBC TV"], ["📰 Print", "EAC Gazette, The East African, The New Times"], ["💻 Digital", "LinkedIn, X, Facebook, YouTube"], ["📧 Email Blasts", "50,000+ industry contacts"]].map(([ch, desc]) => (
                <div key={ch} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 6, padding: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{ch}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Press releases */}
      <h3 style={{ color: C.navy, marginBottom: 16 }}>Press Releases</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
        {PRESS_RELEASES.map(pr => (
          <div key={pr.title} style={{ background: "#fff", borderRadius: 8, padding: 20, border: `1px solid ${C.lightGray}` }}>
            <div style={{ fontSize: 11, color: C.gray, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>📅 {pr.date}</div>
            <h4 style={{ margin: "0 0 8px", color: C.navy, fontSize: 14 }}>{pr.title}</h4>
            <p style={{ margin: 0, fontSize: 13, color: C.gray, lineHeight: 1.6 }}>{pr.summary}</p>
            <button style={{ marginTop: 10, background: "transparent", border: `1px solid ${C.navy}`, color: C.navy, padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Read Full Release</button>
          </div>
        ))}
      </div>

      {/* Photo gallery placeholder */}
      <h3 style={{ color: C.navy, marginBottom: 16 }}>Photo Gallery (EAPCE'25 Highlights)</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 8, marginBottom: 24 }}>
        {["Opening Ceremony", "Exhibition Floor", "Ministerial Panel", "B2B Meetings", "Gala Dinner", "Field Excursion"].map((label, i) => (
          <div key={label} style={{ borderRadius: 8, height: 100, background: `hsl(${200 + i * 20}, 40%, ${80 + (i % 2) * 8}%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#4a5568", fontWeight: 600, textAlign: "center", padding: 8 }}>{label}</div>
        ))}
      </div>

      {/* Social */}
      <div style={{ background: C.offWhite, borderRadius: 8, padding: 20 }}>
        <h4 style={{ color: C.navy, margin: "0 0 12px" }}>Follow & Share</h4>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[["LinkedIn", "#0077b5"], ["X / Twitter", "#000"], ["Facebook", "#1877f2"], ["YouTube", "#ff0000"]].map(([platform, color]) => (
            <button key={platform} style={{ background: color, color: "#fff", border: "none", padding: "8px 20px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              {platform}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 13, color: C.gray }}>📢 Official hashtag: <strong>#EAPCE27</strong> &nbsp;|&nbsp; <strong>#EACEnergy</strong> &nbsp;|&nbsp; <strong>#KigaliEnergy2027</strong></div>
      </div>
    </PageWrap>
  );
}

// ─── ADMIN ───────────────────────────────────────────────────────────────────
function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const registered = JSON.parse(sessionStorage.getItem("eapce_regs") || "[]");

  if (!authed) return (
    <PageWrap title="Admin Dashboard" subtitle="Restricted — authorised personnel only">
      <div style={{ maxWidth: 360, margin: "0 auto", background: "#fff", borderRadius: 10, padding: 28, border: `1px solid ${C.lightGray}` }}>
        <div style={{ textAlign: "center", fontSize: 40, marginBottom: 12 }}>🔒</div>
        <div style={{ background: "#f0f9ff", borderRadius: 6, padding: 10, marginBottom: 16, fontSize: 12, color: "#0369a1", textAlign: "center" }}>Demo password: <strong>admin2027</strong></div>
        <input type="password" placeholder="Enter admin password" value={pw} onChange={e => setPw(e.target.value)} style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14, marginBottom: 12, boxSizing: "border-box" }} />
        <button onClick={() => { if (pw === "admin2027") setAuthed(true); }} style={{ width: "100%", background: C.navy, color: "#fff", border: "none", padding: 12, borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Access Dashboard</button>
      </div>
    </PageWrap>
  );

  return (
    <PageWrap title="Admin Dashboard" subtitle="EAPCE'27 — Live Analytics & Registration Management">
      <button onClick={() => setAuthed(false)} style={{ marginBottom: 16, background: "transparent", color: C.danger, border: `1px solid ${C.danger}`, padding: "6px 16px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>Logout</button>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 28 }}>
        {[["1,047", "Registered Delegates", C.navy], ["USD 889,950", "Total Revenue", C.green], ["68/70", "Booths Booked", C.gold], ["USD 50,000", "Sponsorship Raised", "#7a3b00"]].map(([v, l, c]) => (
          <div key={l} style={{ background: "#fff", borderRadius: 8, padding: "16px 18px", border: `1px solid ${C.lightGray}`, borderLeft: `4px solid ${c}` }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: c }}>{v}</div>
            <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        {/* Registration trend */}
        <div style={{ background: "#fff", borderRadius: 8, padding: 20, border: `1px solid ${C.lightGray}` }}>
          <div style={{ fontWeight: 700, color: C.navy, marginBottom: 14 }}>Registration Trend</div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={ANALYTICS_REG}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke={C.navy} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Revenue */}
        <div style={{ background: "#fff", borderRadius: 8, padding: 20, border: `1px solid ${C.lightGray}` }}>
          <div style={{ fontWeight: 700, color: C.navy, marginBottom: 14 }}>Revenue (USD)</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={ANALYTICS_REVENUE}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={v => ["$" + v.toLocaleString()]} />
              <Bar dataKey="revenue" fill={C.green} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        {/* Delegate type pie */}
        <div style={{ background: "#fff", borderRadius: 8, padding: 20, border: `1px solid ${C.lightGray}` }}>
          <div style={{ fontWeight: 700, color: C.navy, marginBottom: 14 }}>Delegate Breakdown</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <PieChart width={120} height={120}>
              <Pie data={ANALYTICS_PIE} cx={55} cy={55} innerRadius={30} outerRadius={55} dataKey="value">
                {ANALYTICS_PIE.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
            <div style={{ flex: 1 }}>
              {ANALYTICS_PIE.map(d => (
                <div key={d.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 10, height: 10, background: d.color, borderRadius: 2 }} />
                    <span>{d.name}</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Booth status */}
        <div style={{ background: "#fff", borderRadius: 8, padding: 20, border: `1px solid ${C.lightGray}` }}>
          <div style={{ fontWeight: 700, color: C.navy, marginBottom: 14 }}>Booth Sales</div>
          {ANALYTICS_BOOTHS.map(b => (
            <div key={b.zone} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{b.zone}</span>
                <span style={{ color: C.gray }}>{b.sold}/{b.total}</span>
              </div>
              <div style={{ background: C.lightGray, borderRadius: 4, height: 8 }}>
                <div style={{ background: b.sold === b.total ? C.green : C.gold, width: `${(b.sold / b.total) * 100}%`, height: "100%", borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registered users table */}
      <div style={{ background: "#fff", borderRadius: 8, border: `1px solid ${C.lightGray}`, overflow: "hidden" }}>
        <div style={{ background: C.navy, color: "#fff", padding: "12px 16px", fontWeight: 700 }}>
          Registrations ({registered.length > 0 ? registered.length : "Sample data"})
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: C.offWhite }}>{["ID", "Name", "Email", "Organisation", "Country", "Type", "Status"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.gray, borderBottom: `1px solid ${C.lightGray}`, whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
            <tbody>
              {registered.length > 0 ? registered.map(r => (
                <tr key={r.id} style={{ borderBottom: `1px solid ${C.lightGray}` }}>
                  <td style={{ padding: "9px 14px", fontSize: 11, color: C.gray, fontFamily: "monospace" }}>{r.id}</td>
                  <td style={{ padding: "9px 14px", fontSize: 13, fontWeight: 600 }}>{r.firstName} {r.lastName}</td>
                  <td style={{ padding: "9px 14px", fontSize: 12, color: C.gray }}>{r.email}</td>
                  <td style={{ padding: "9px 14px", fontSize: 12 }}>{r.org}</td>
                  <td style={{ padding: "9px 14px", fontSize: 12 }}>{r.country}</td>
                  <td style={{ padding: "9px 14px", fontSize: 11 }}><span style={{ background: "#dbeafe", color: "#1d4ed8", padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>{r.type.split("(")[0].trim()}</span></td>
                  <td style={{ padding: "9px 14px" }}><span style={{ color: C.green, fontWeight: 600, fontSize: 12 }}>✓ Active</span></td>
                </tr>
              )) : [
                { id: "EAPCE27-A1B2C3", firstName: "Amina", lastName: "Waceke", email: "a.waceke@eac.int", org: "EAC Secretariat", country: "Arusha", type: "Government Official", status: "Active" },
                { id: "EAPCE27-D4E5F6", firstName: "Robert", lastName: "Kasande", email: "r.kasande@pepd.go.ug", org: "PEPD Uganda", country: "Uganda", type: "Delegate (Full Access)", status: "Active" },
                { id: "EAPCE27-G7H8I9", firstName: "Fatuma", lastName: "Ndunguru", email: "f.ndunguru@tpdc.co.tz", org: "TPDC Tanzania", country: "Tanzania", type: "Delegate (Full Access)", status: "Active" },
              ].map(r => (
                <tr key={r.id} style={{ borderBottom: `1px solid ${C.lightGray}` }}>
                  <td style={{ padding: "9px 14px", fontSize: 11, color: C.gray, fontFamily: "monospace" }}>{r.id}</td>
                  <td style={{ padding: "9px 14px", fontSize: 13, fontWeight: 600 }}>{r.firstName} {r.lastName}</td>
                  <td style={{ padding: "9px 14px", fontSize: 12, color: C.gray }}>{r.email}</td>
                  <td style={{ padding: "9px 14px", fontSize: 12 }}>{r.org}</td>
                  <td style={{ padding: "9px 14px", fontSize: 12 }}>{r.country}</td>
                  <td style={{ padding: "9px 14px", fontSize: 11 }}><span style={{ background: "#dbeafe", color: "#1d4ed8", padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>{r.type}</span></td>
                  <td style={{ padding: "9px 14px" }}><span style={{ color: C.green, fontWeight: 600, fontSize: 12 }}>✓ Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageWrap>
  );
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return <h2 style={{ color: C.navy, fontSize: 20, fontWeight: 800, margin: "0 0 20px", paddingBottom: 8, borderBottom: `2px solid ${C.gold}` }}>{children}</h2>;
}

function PageWrap({ title, subtitle, children }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px" }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ margin: 0, color: C.navy, fontSize: "clamp(20px,4vw,30px)", fontWeight: 800 }}>{title}</h2>
        {subtitle && <p style={{ margin: "6px 0 0", color: C.gray, fontSize: 14 }}>{subtitle}</p>}
        <div style={{ width: 60, height: 3, background: C.gold, marginTop: 10, borderRadius: 2 }} />
      </div>
      {children}
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: C.navyDark, color: "rgba(255,255,255,0.7)", padding: "32px 20px 20px", marginTop: 60 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: C.gold, fontWeight: 800, fontSize: 16, marginBottom: 8 }}>EAPCE'27</div>
            <div style={{ fontSize: 12, lineHeight: 1.7 }}>12th East African Petroleum Conference & Exhibition<br />9–11 March 2027<br />Kigali Convention Centre, Rwanda</div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>Quick Links</div>
            {PAGES.slice(0, 5).map(p => <div key={p} onClick={() => setPage(p)} style={{ fontSize: 12, marginBottom: 5, cursor: "pointer", color: "rgba(255,255,255,0.6)" }}>{p}</div>)}
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>Contacts</div>
            <div style={{ fontSize: 12, lineHeight: 2 }}>
              📧 info@eapce27.rw<br />
              📧 sponsorship@eapce27.rw<br />
              📧 abstracts@eapce27.rw<br />
              📞 +250 788 452 503
            </div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 8, fontSize: 13 }}>Organisers</div>
            <div style={{ fontSize: 12, lineHeight: 2 }}>
              Rwanda Convention Bureau (RCB)<br />
              Rwanda Mines, Petroleum & Gas Board (RMB)<br />
              East African Community (EAC)
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
          © 2027 EAPCE'27 · Rwanda Convention Bureau · All rights reserved &nbsp;|&nbsp; #EAPCE27 #KigaliEnergy2027
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const content = { Home: <HomePage setPage={setPage} />, Agenda: <AgendaPage />, Register: <RegisterPage />, Exhibitors: <ExhibitorsPage />, Sponsors: <SponsorsPage />, Venue: <VenuePage />, Speakers: <SpeakersPage />, Media: <MediaPage />, Admin: <AdminPage /> };
  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: C.offWhite, minHeight: "100vh", color: C.text }}>
      <Nav page={page} setPage={setPage} />
      <main>{content[page]}</main>
      <Footer setPage={setPage} />
    </div>
  );
}
