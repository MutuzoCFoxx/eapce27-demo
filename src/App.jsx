import { useState, useEffect, useRef, createContext, useContext } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── LANGUAGE CONTEXT ────────────────────────────────────────────────────────
const LangContext = createContext("en");

const TR = {
  en: {
    navHome:"Home", navAbout:"About", navAgenda:"Agenda", navRegister:"Register",
    navExhibition:"Exhibition", navSponsors:"Sponsors", navSpeakers:"Speakers",
    navVenue:"Venue", navMedia:"Media", navContact:"Contact", navAdmin:"Admin",
    registerNow:"Register Now",
    heroTag:"East African Community · Official Event",
    heroDate:"9–11 March 2027", heroVenue:"Kigali Convention Centre, Rwanda",
    heroTheme:'"Strategic and Sustainable Oil and Gas Resources Exploitation for Energy Security in EAC"',
    cta1:"Register Now", cta2:"Book a Booth", cta3:"Become a Sponsor",
    statDelegates:"Expected Delegates", statBooths:"Exhibition Booths",
    statStates:"EAC Partner States", statDays:"Conference Days",
    statDeals:"Projected Deals", statTracks:"Breakout Tracks",
    expectLabel:"What to Expect", expectTitle:"East Africa's Premier Energy Forum",
    e1:"High-Level Plenaries", e1d:"Heads of State, Ministers and CEOs address strategic energy priorities across the EAC region",
    e2:"B2B Deal Meetings", e2d:"Structured one-on-one investor and operator meetings facilitated across all 8 partner states",
    e3:"Exhibition Floor", e3d:"70 booths showcasing upstream, midstream, downstream and services across KCC halls",
    e4:"Country Licensing Rounds", e4d:"National oil companies present new acreage and investment opportunities to global majors",
    e5:"Gala Dinner & Awards", e5d:"Networking dinner celebrating East African energy excellence and project milestones",
    e6:"Technical Sessions", e6d:"Peer-reviewed papers on upstream regulation, data management, refining and energy transition",
    e7:"Media & Press Centre", e7d:"Dedicated media hub with live streaming, press briefings and social content studio",
    e8:"Field Excursions", e8d:"Curated site visits to Rwanda's petroleum and methane gas development sites",
    speakersLabel:"Confirmed Speakers", speakersTitle:"Distinguished Voices from Across East Africa",
    speakersNote:"Speaker nominations:", speakersDeadline:"Deadline 31 December 2026",
    progLabel:"Programme", progTitle:"Conference Agenda at a Glance", viewFull:"View Full Programme",
    sponsorsLabel:"Partners & Sponsors", sponsorsTitle:"Supporting EAPCE'27",
    whyLabel:"Host Country", whyTitle:"Why Rwanda & Kigali?",
    w1:"#1 in Africa", w1d:"Ease of Doing Business (World Bank)",
    w2:"Well-Connected Hub", w2d:"RwandAir — direct flights to 30+ African cities",
    w3:"MICE Leader", w3d:"Africa's leading meetings & conventions destination",
    w4:"Safe & Secure", w4d:"Consistently ranked among Africa's safest nations",
    w5:"Green City", w5d:"Kigali — Africa's cleanest and most livable city",
    w6:"Petroleum Potential", w6d:"Emerging upstream sector — Lake Albert basin & methane gas",
    newsLabel:"News & Media", newsTitle:"Latest Updates", readMore:"Read More",
    organisedBy:"Organised by",
    footerLinks:"Quick Links", footerContact:"Contact", footerOrg:"Organisers",
    days:"Days", hours:"Hours", mins:"Mins", secs:"Secs",
    agendaTitle:"Conference Programme", agendaSubtitle:"9–11 March 2027 · Kigali Convention Centre, Rwanda",
    regTitle:"Delegate Registration", regSubtitle:"Secure your place at EAPCE'27 — 9–11 March 2027, Kigali",
    exhibTitle:"Exhibition & Booth Booking", exhibSubtitle:"70 booths across KCC halls — Platinum, Gold, Silver and Bronze zones",
    spTitle:"Sponsorship Opportunities", spSubtitle:"Partner with East Africa's premier energy conference — EAPCE'27",
    spkTitle:"Speakers & Resource Persons", spkSubtitle:"Distinguished experts, ministers and industry leaders from across East Africa and beyond",
    venueTitle:"Venue & Accommodation", venueSubtitle:"Kigali Convention Centre (KCC) — Heart of Kigali, Rwanda",
    mediaTitle:"News & Media Centre", mediaSubtitle:"Press releases, media accreditation and communications for EAPCE'27",
    contactTitle:"Contact Us", contactSubtitle:"Get in touch with the EAPCE'27 team — we're here to help",
    aboutTag:"About the Conference",
    step1:"1. Your Details", step2:"2. Payment", step3:"3. Confirmation",
    regTypeLabel:"Registration Type", personalInfo:"Personal Information",
    fName:"First Name", lName:"Last Name", emailLbl:"Email Address",
    orgLbl:"Organisation / Company", countryLbl:"Country", phoneLbl:"Phone Number",
    dietaryLbl:"Dietary Requirements", hotelLbl:"Hotel Preference",
    submitPay:"Proceed to Payment", submitFree:"Complete Registration (Free)",
    orderSum:"Order Summary",
    contactForm:"Send Us a Message", fullName:"Full Name", subjectLbl:"Subject", messageLbl:"Message",
    sendBtn:"Send Message", sentTitle:"Message Sent!",
    adminTitle:"Admin Dashboard", adminSubtitle:"EAPCE'27 — Live Analytics & Registration Management",
  },
  fr: {
    navHome:"Accueil", navAbout:"À propos", navAgenda:"Programme", navRegister:"Inscription",
    navExhibition:"Exposition", navSponsors:"Sponsors", navSpeakers:"Conférenciers",
    navVenue:"Lieu", navMedia:"Médias", navContact:"Contact", navAdmin:"Admin",
    registerNow:"S'inscrire",
    heroTag:"Communauté d'Afrique de l'Est · Événement officiel",
    heroDate:"9–11 mars 2027", heroVenue:"Centre des congrès de Kigali, Rwanda",
    heroTheme:'"Exploitation stratégique et durable des ressources pétrolières pour la sécurité énergétique en EAC"',
    cta1:"S'inscrire", cta2:"Réserver un stand", cta3:"Devenir sponsor",
    statDelegates:"Délégués attendus", statBooths:"Stands d'exposition",
    statStates:"États partenaires EAC", statDays:"Jours de conférence",
    statDeals:"Transactions prévues", statTracks:"Sessions parallèles",
    expectLabel:"À quoi s'attendre", expectTitle:"Le premier forum énergétique d'Afrique de l'Est",
    e1:"Plénières de haut niveau", e1d:"Chefs d'État, ministres et PDG abordent les priorités énergétiques stratégiques de la région EAC",
    e2:"Réunions B2B", e2d:"Réunions individuelles entre investisseurs et opérateurs dans les 8 États partenaires",
    e3:"Salon d'exposition", e3d:"70 stands présentant les services pétroliers en amont, intermédiaires et en aval au KCC",
    e4:"Tours de licences nationales", e4d:"Les compagnies pétrolières nationales présentent de nouvelles opportunités d'investissement",
    e5:"Dîner de gala & Prix", e5d:"Dîner de networking célébrant l'excellence énergétique est-africaine",
    e6:"Sessions techniques", e6d:"Communications sur la réglementation pétrolière et la transition énergétique",
    e7:"Centre médias & presse", e7d:"Hub médias avec streaming en direct, briefings de presse et studio de contenu",
    e8:"Excursions sur le terrain", e8d:"Visites guidées des sites de développement pétrolier du Rwanda",
    speakersLabel:"Conférenciers confirmés", speakersTitle:"Voix distinguées d'Afrique de l'Est",
    speakersNote:"Nominations:", speakersDeadline:"Date limite: 31 décembre 2026",
    progLabel:"Programme", progTitle:"Programme de la conférence", viewFull:"Voir le programme complet",
    sponsorsLabel:"Partenaires & Sponsors", sponsorsTitle:"Soutenir EAPCE'27",
    whyLabel:"Pays hôte", whyTitle:"Pourquoi le Rwanda & Kigali?",
    w1:"N°1 en Afrique", w1d:"Facilité de faire des affaires (Banque mondiale)",
    w2:"Hub bien connecté", w2d:"RwandAir — vols directs vers 30+ villes africaines",
    w3:"Leader MICE", w3d:"Destination de réunions et congrès leader en Afrique",
    w4:"Sûr & sécurisé", w4d:"Classé parmi les nations les plus sûres d'Afrique",
    w5:"Ville verte", w5d:"Kigali — la ville la plus propre et vivable d'Afrique",
    w6:"Potentiel pétrolier", w6d:"Secteur amont émergent — bassin du lac Albert & gaz méthane",
    newsLabel:"Actualités & Médias", newsTitle:"Dernières mises à jour", readMore:"Lire plus",
    organisedBy:"Organisé par",
    footerLinks:"Liens rapides", footerContact:"Contact", footerOrg:"Organisateurs",
    days:"Jours", hours:"Heures", mins:"Min", secs:"Sec",
    agendaTitle:"Programme de la conférence", agendaSubtitle:"9–11 mars 2027 · Centre des congrès de Kigali, Rwanda",
    regTitle:"Inscription des délégués", regSubtitle:"Réservez votre place à EAPCE'27 — 9–11 mars 2027, Kigali",
    exhibTitle:"Exposition & Réservation de stands", exhibSubtitle:"70 stands dans les salles KCC — zones Platine, Or, Argent et Bronze",
    spTitle:"Opportunités de sponsoring", spSubtitle:"Partenaire de la première conférence énergétique d'Afrique de l'Est — EAPCE'27",
    spkTitle:"Conférenciers & Intervenants", spkSubtitle:"Experts, ministres et leaders de l'industrie d'Afrique de l'Est et au-delà",
    venueTitle:"Lieu & Hébergement", venueSubtitle:"Centre des congrès de Kigali (KCC) — Cœur de Kigali, Rwanda",
    mediaTitle:"Centre d'actualités & Médias", mediaSubtitle:"Communiqués de presse, accréditation médias et communications pour EAPCE'27",
    contactTitle:"Contactez-nous", contactSubtitle:"Contactez l'équipe EAPCE'27 — nous sommes là pour vous aider",
    aboutTag:"À propos de la conférence",
    step1:"1. Vos informations", step2:"2. Paiement", step3:"3. Confirmation",
    regTypeLabel:"Type d'inscription", personalInfo:"Informations personnelles",
    fName:"Prénom", lName:"Nom", emailLbl:"Adresse e-mail",
    orgLbl:"Organisation / Entreprise", countryLbl:"Pays", phoneLbl:"Numéro de téléphone",
    dietaryLbl:"Régimes alimentaires", hotelLbl:"Préférence d'hôtel",
    submitPay:"Procéder au paiement", submitFree:"Finaliser l'inscription (Gratuit)",
    orderSum:"Récapitulatif de commande",
    contactForm:"Envoyez-nous un message", fullName:"Nom complet", subjectLbl:"Sujet", messageLbl:"Message",
    sendBtn:"Envoyer le message", sentTitle:"Message envoyé!",
    adminTitle:"Tableau de bord Admin", adminSubtitle:"EAPCE'27 — Analyses et gestion des inscriptions",
  },
  sw: {
    navHome:"Nyumbani", navAbout:"Kuhusu", navAgenda:"Ratiba", navRegister:"Jiandikishe",
    navExhibition:"Maonyesho", navSponsors:"Wadhamini", navSpeakers:"Wasemaji",
    navVenue:"Mahali", navMedia:"Habari", navContact:"Wasiliana", navAdmin:"Msimamizi",
    registerNow:"Jiandikishe Sasa",
    heroTag:"Jumuiya ya Afrika Mashariki · Tukio Rasmi",
    heroDate:"9–11 Machi 2027", heroVenue:"Kituo cha Mikutano cha Kigali, Rwanda",
    heroTheme:'"Unyonyaji wa Kimkakati na Endelevu wa Rasilimali za Mafuta kwa Usalama wa Nishati katika JAM"',
    cta1:"Jiandikishe Sasa", cta2:"Hifadhi Banda", cta3:"Kuwa Mdhamini",
    statDelegates:"Wawakilishi Watarajiwa", statBooths:"Vibanda vya Maonyesho",
    statStates:"Nchi Wanachama JAM", statDays:"Siku za Mkutano",
    statDeals:"Mikataba Inayotarajiwa", statTracks:"Vipindi vya Kikundi",
    expectLabel:"Nini cha Kutarajia", expectTitle:"Jukwaa Kuu la Nishati la Afrika Mashariki",
    e1:"Vikao vya Ngazi ya Juu", e1d:"Wakuu wa Nchi, Mawaziri na Wakurugenzi wanashughulikia vipaumbele vya nishati katika JAM",
    e2:"Mikutano ya B2B", e2d:"Mikutano ya ana kwa ana kati ya wawekezaji na waendeshaji katika nchi wanachama wote 8",
    e3:"Sakafu ya Maonyesho", e3d:"Vibanda 70 vinavyoonyesha huduma za mafuta kutoka KCC",
    e4:"Raundi za Leseni za Nchi", e4d:"Makampuni ya mafuta yanawasilisha fursa mpya za uwekezaji kwa makampuni makubwa",
    e5:"Chakula cha Sherehe & Tuzo", e5d:"Chakula cha usiku kinachoadhimisha ubora wa nishati ya Afrika Mashariki",
    e6:"Vikao vya Kiufundi", e6d:"Makala kuhusu udhibiti wa mafuta na mpito wa nishati",
    e7:"Kituo cha Habari & Vyombo vya Habari", e7d:"Kitovu cha habari chenye utiririshaji moja kwa moja na mikutano ya habari",
    e8:"Ziara za Uwanjani", e8d:"Ziara zilizopangwa katika maeneo ya maendeleo ya mafuta ya Rwanda",
    speakersLabel:"Wasemaji Waliothibitishwa", speakersTitle:"Sauti Maarufu kutoka Afrika Mashariki",
    speakersNote:"Nomino:", speakersDeadline:"Mwisho: 31 Desemba 2026",
    progLabel:"Mpango", progTitle:"Muhtasari wa Ratiba ya Mkutano", viewFull:"Angalia Mpango Kamili",
    sponsorsLabel:"Washirika & Wadhamini", sponsorsTitle:"Kusaidia EAPCE'27",
    whyLabel:"Nchi Mwenyeji", whyTitle:"Kwa Nini Rwanda & Kigali?",
    w1:"Nambari 1 Afrika", w1d:"Urahisi wa Kufanya Biashara (Benki ya Dunia)",
    w2:"Kitovu Kilichounganishwa", w2d:"RwandAir — ndege za moja kwa moja hadi miji 30+ ya Afrika",
    w3:"Kiongozi wa MICE", w3d:"Marudio bora ya mikutano na makongamano barani Afrika",
    w4:"Salama & Usalama", w4d:"Imeorodheshwa kati ya mataifa salama zaidi Afrika",
    w5:"Mji wa Kijani", w5d:"Kigali — mji safi zaidi na unaofaa kuishi barani Afrika",
    w6:"Uwezekano wa Mafuta", w6d:"Sekta ya awali inayokua — bonde la Ziwa Albert & gesi methane",
    newsLabel:"Habari & Vyombo vya Habari", newsTitle:"Masasisho ya Hivi Karibuni", readMore:"Soma Zaidi",
    organisedBy:"Imepangwa na",
    footerLinks:"Viungo vya Haraka", footerContact:"Mawasiliano", footerOrg:"Waandaaji",
    days:"Siku", hours:"Masaa", mins:"Dak", secs:"Sek",
    agendaTitle:"Mpango wa Mkutano", agendaSubtitle:"9–11 Machi 2027 · Kituo cha Mikutano cha Kigali, Rwanda",
    regTitle:"Usajili wa Wawakilishi", regSubtitle:"Hifadhi nafasi yako katika EAPCE'27 — 9–11 Machi 2027, Kigali",
    exhibTitle:"Maonyesho & Uhifadhi wa Banda", exhibSubtitle:"Vibanda 70 katika kumbi za KCC — maeneo ya Platinamu, Dhahabu, Fedha na Shaba",
    spTitle:"Fursa za Udhamini", spSubtitle:"Shirika na mkutano wa nishati wa Afrika Mashariki — EAPCE'27",
    spkTitle:"Wasemaji & Wataalamu", spkSubtitle:"Wataalamu, mawaziri na viongozi wa sekta kutoka Afrika Mashariki",
    venueTitle:"Mahali & Malazi", venueSubtitle:"Kituo cha Mikutano cha Kigali (KCC) — Moyo wa Kigali, Rwanda",
    mediaTitle:"Kituo cha Habari & Vyombo vya Habari", mediaSubtitle:"Taarifa za vyombo vya habari na mawasiliano ya EAPCE'27",
    contactTitle:"Wasiliana Nasi", contactSubtitle:"Wasiliana na timu ya EAPCE'27 — tuko hapa kusaidia",
    aboutTag:"Kuhusu Mkutano",
    step1:"1. Maelezo Yako", step2:"2. Malipo", step3:"3. Uthibitisho",
    regTypeLabel:"Aina ya Usajili", personalInfo:"Taarifa za Kibinafsi",
    fName:"Jina la Kwanza", lName:"Jina la Familia", emailLbl:"Anwani ya Barua pepe",
    orgLbl:"Shirika / Kampuni", countryLbl:"Nchi", phoneLbl:"Nambari ya Simu",
    dietaryLbl:"Mahitaji ya Chakula", hotelLbl:"Upendeleo wa Hoteli",
    submitPay:"Endelea na Malipo", submitFree:"Kamilisha Usajili (Bure)",
    orderSum:"Muhtasari wa Agizo",
    contactForm:"Tutumie Ujumbe", fullName:"Jina Kamili", subjectLbl:"Mada", messageLbl:"Ujumbe",
    sendBtn:"Tuma Ujumbe", sentTitle:"Ujumbe Umetumwa!",
    adminTitle:"Dashibodi ya Msimamizi", adminSubtitle:"EAPCE'27 — Takwimu za Moja kwa Moja na Usimamizi wa Usajili",
  },
};

// ─── PALETTE ────────────────────────────────────────────────────────────────
const C = {
  navy: "#0c1f35",
  navyMid: "#122944",
  blue: "#1a4a6e",
  gold: "#c9a84c",
  goldLight: "#f5ecd4",
  green: "#1a6b3a",
  greenLight: "#e8f5ee",
  white: "#ffffff",
  offWhite: "#f7f8fa",
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

const PAGES = ["Home", "About", "Agenda", "Register", "Exhibition", "Sponsors", "Speakers", "Venue", "Media", "Contact", "Admin"];

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────
function Countdown({ dark }) {
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  const target = new Date("2027-03-09T08:00:00");
  const [diff, setDiff] = useState(target - Date.now());
  useEffect(() => { const t = setInterval(() => setDiff(target - Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, Math.floor(diff / 86400000));
  const h = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const m = Math.max(0, Math.floor((diff % 3600000) / 60000));
  const s = Math.max(0, Math.floor((diff % 60000) / 1000));
  const Box = ({ v, label }) => (
    <div style={{ textAlign: "center" }}>
      <div style={{ background: dark ? "rgba(255,255,255,0.08)" : C.navy, borderRadius: 6, padding: "14px 22px", fontSize: 38, fontWeight: 900, color: "#fff", letterSpacing: 3, fontVariantNumeric: "tabular-nums", minWidth: 80, border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "transparent"}` }}>{String(v).padStart(2, "0")}</div>
      <div style={{ color: dark ? "rgba(255,255,255,0.45)" : C.gray, fontSize: 9.5, marginTop: 7, textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 600 }}>{label}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
      <Box v={d} label={T.days} /><Box v={h} label={T.hours} /><Box v={m} label={T.mins} /><Box v={s} label={T.secs} />
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const { lang, setLang } = useContext(LangContext);
  const T = TR[lang];
  const navKeys = ["Home","About","Agenda","Register","Exhibition","Sponsors","Speakers","Venue","Media","Contact"];
  const navKeyMap = { Home:"navHome", About:"navAbout", Agenda:"navAgenda", Register:"navRegister", Exhibition:"navExhibition", Sponsors:"navSponsors", Speakers:"navSpeakers", Venue:"navVenue", Media:"navMedia", Contact:"navContact" };
  const langLabels = { en: "EN · English", fr: "FR · Français", sw: "SW · Kiswahili" };
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 200 }}>
      {/* Top utility bar — language switcher */}
      <div style={{ background: "#060e1c", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "flex-end", alignItems: "center", height: 36, gap: 4 }}>
          {["en","fr","sw"].map(l => (
            <button key={l} onClick={() => setLang(l)}
              style={{ background: lang === l ? C.gold : "transparent", color: lang === l ? C.navy : "rgba(255,255,255,0.45)", border: `1px solid ${lang === l ? C.gold : "rgba(255,255,255,0.12)"}`, padding: "3px 12px", borderRadius: 3, cursor: "pointer", fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", transition: "all 0.15s" }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      {/* Main nav */}
      <nav style={{ background: C.navy, boxShadow: "0 2px 20px rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 62 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", flexShrink: 0 }} onClick={() => setPage("Home")}>
            <div style={{ width: 36, height: 36, borderRadius: 5, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: C.navy }}>EAC</div>
            <div>
              <div style={{ color: "#ffffff", fontWeight: 800, fontSize: 14 }}>EAPCE<span style={{ color: C.gold }}>'27</span></div>
              <div style={{ color: "rgba(255,255,255,0.32)", fontSize: 8.5, letterSpacing: 1.5, textTransform: "uppercase" }}>Kigali · 9–11 March 2027</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap", justifyContent: "center" }}>
            {navKeys.map(p => (
              <button key={p} onClick={() => setPage(p)}
                style={{ background: "transparent", color: page === p ? "#ffffff" : "rgba(255,255,255,0.5)", border: "none", padding: "6px 10px", cursor: "pointer", fontSize: 11.5, fontWeight: page === p ? 700 : 400, borderBottom: page === p ? `2px solid ${C.gold}` : "2px solid transparent", whiteSpace: "nowrap" }}>
                {T[navKeyMap[p]]}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button onClick={() => setPage("Register")} style={{ background: C.gold, color: C.navy, border: "none", padding: "8px 18px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 800, whiteSpace: "nowrap" }}>{T.registerNow}</button>
            <button onClick={() => setPage("Admin")} style={{ background: "transparent", color: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.1)", padding: "7px 10px", borderRadius: 4, cursor: "pointer", fontSize: 11 }}>{T.navAdmin}</button>
          </div>
        </div>
      </nav>
    </div>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  return (
    <div>
      {/* HERO */}
      <div style={{ background: `linear-gradient(170deg, #050c18 0%, #0c1f35 45%, #0a2a1e 100%)`, padding: "100px 24px 90px", textAlign: "center", position: "relative", overflow: "hidden", minHeight: 680, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 15% 70%, rgba(12,90,45,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 25%, rgba(201,168,76,0.08) 0%, transparent 50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 880, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 4, padding: "7px 20px", marginBottom: 36 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.gold, display: "inline-block", flexShrink: 0 }} />
            <span style={{ color: C.gold, fontSize: 10.5, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase" }}>{T.heroTag}</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(32px,5.8vw,62px)", fontWeight: 900, margin: "0 0 14px", lineHeight: 1.07, letterSpacing: -1.5 }}>
            12th East African<br />Petroleum Conference<br /><span style={{ color: C.gold }}>&amp; Exhibition</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 14, fontStyle: "italic", margin: "20px 0 14px", letterSpacing: 0.2 }}>{T.heroTheme}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, margin: "22px 0 40px", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: 500, letterSpacing: 0.3 }}>{T.heroDate}</span>
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.18)" }} />
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, fontWeight: 500, letterSpacing: 0.3 }}>{T.heroVenue}</span>
          </div>
          <Countdown dark />
          <div style={{ marginTop: 44, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("Register")} style={{ background: C.gold, color: C.navy, border: "none", padding: "17px 40px", borderRadius: 5, fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: 0.3 }}>{T.cta1}</button>
            <button onClick={() => setPage("Exhibition")} style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", padding: "17px 36px", borderRadius: 5, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{T.cta2}</button>
            <button onClick={() => setPage("Sponsors")} style={{ background: "transparent", color: C.gold, border: `2px solid rgba(201,168,76,0.38)`, padding: "17px 36px", borderRadius: 5, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>{T.cta3}</button>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ background: C.navyMid, borderBottom: `3px solid ${C.gold}`, padding: "28px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
          {[["1,000+", T.statDelegates], ["70", T.statBooths], ["8", T.statStates], ["3", T.statDays], ["USD 2B+", T.statDeals], ["4", T.statTracks]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: C.gold, fontSize: 26, fontWeight: 900, letterSpacing: -0.5 }}>{v}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT TO EXPECT */}
      <div style={{ background: C.offWhite, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>{T.expectLabel}</SectionLabel>
          <SectionTitle>{T.expectTitle}</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 22, marginTop: 44 }}>
            {[
              ["01", T.e1, T.e1d], ["02", T.e2, T.e2d], ["03", T.e3, T.e3d], ["04", T.e4, T.e4d],
              ["05", T.e5, T.e5d], ["06", T.e6, T.e6d], ["07", T.e7, T.e7d], ["08", T.e8, T.e8d],
            ].map(([num, title, desc]) => (
              <div key={title} style={{ background: "#fff", borderRadius: 10, padding: "28px 24px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", borderTop: `3px solid ${C.gold}` }}>
                <div style={{ fontSize: 13, fontWeight: 900, color: C.gold, letterSpacing: 1, marginBottom: 14 }}>{num}</div>
                <div style={{ fontWeight: 700, color: C.text, fontSize: 15, marginBottom: 10 }}>{title}</div>
                <div style={{ color: C.gray, fontSize: 13, lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED SPEAKERS */}
      <div style={{ background: C.navy, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel light>{T.speakersLabel}</SectionLabel>
          <SectionTitle light>{T.speakersTitle}</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 20, marginTop: 48 }}>
            {SPEAKERS.map(s => (
              <div key={s.name} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "28px 20px", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
                <div style={{ width: 86, height: 86, borderRadius: "50%", background: s.color, color: "#fff", fontSize: 24, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", border: `3px solid ${C.gold}` }}>{s.initials}</div>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 6 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, marginBottom: 12 }}>{s.role}</div>
                <span style={{ background: "rgba(201,168,76,0.12)", color: C.gold, padding: "4px 12px", borderRadius: 4, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.5 }}>{s.country}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            {T.speakersNote} <strong style={{ color: "rgba(255,255,255,0.55)" }}>abstracts@eapce27.rw</strong> · {T.speakersDeadline}
          </div>
        </div>
      </div>

      {/* AGENDA PREVIEW */}
      <div style={{ background: "#fff", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>{T.progLabel}</SectionLabel>
          <SectionTitle>{T.progTitle}</SectionTitle>
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
            <button onClick={() => {}} style={{ background: C.navy, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{T.viewFull} →</button>
          </div>
        </div>
      </div>

      {/* SPONSORS */}
      <div style={{ background: C.offWhite, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>{T.sponsorsLabel}</SectionLabel>
          <SectionTitle>{T.sponsorsTitle}</SectionTitle>
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
      <div style={{ background: `linear-gradient(160deg, #071525 0%, ${C.navy} 55%, #081e12 100%)`, padding: "88px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel light>{T.whyLabel}</SectionLabel>
          <SectionTitle light>{T.whyTitle}</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24, marginTop: 48 }}>
            {[
              [T.w1, T.w1d], [T.w2, T.w2d], [T.w3, T.w3d],
              [T.w4, T.w4d], [T.w5, T.w5d], [T.w6, T.w6d],
            ].map(([title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold, flexShrink: 0, marginTop: 6 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#ffffff" }}>{title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.52)", marginTop: 5, lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEWS */}
      <div style={{ background: "#fff", padding: "88px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>{T.newsLabel}</SectionLabel>
          <SectionTitle>{T.newsTitle}</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 36 }}>
            {PRESS_RELEASES.map((pr, i) => (
              <div key={pr.title} style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
                <div style={{ height: 110, background: `linear-gradient(135deg, hsl(${210 + i * 25},60%,${16 + i * 3}%) 0%, hsl(${140 + i * 20},50%,${13 + i * 3}%) 100%)`, display: "flex", alignItems: "flex-end", padding: "14px 18px" }}>
                  <span style={{ background: C.gold, color: C.navy, padding: "4px 12px", borderRadius: 4, fontSize: 10, fontWeight: 800, letterSpacing: 0.5 }}>{pr.tag}</span>
                </div>
                <div style={{ padding: "22px 24px", background: "#fff" }}>
                  <div style={{ fontSize: 10.5, color: C.gray, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 600 }}>{pr.date}</div>
                  <div style={{ fontWeight: 800, color: C.text, fontSize: 15, marginBottom: 10, lineHeight: 1.4 }}>{pr.title}</div>
                  <div style={{ fontSize: 13, color: C.gray, lineHeight: 1.7, marginBottom: 18 }}>{pr.summary.slice(0, 110)}…</div>
                  <button style={{ background: "transparent", border: `1.5px solid ${C.navy}`, color: C.navy, padding: "8px 18px", borderRadius: 5, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{T.readMore}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ORGANIZERS */}
      <div style={{ background: C.offWhite, padding: "36px 24px", borderTop: `1px solid ${C.lightGray}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: C.gray, textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>{T.organisedBy}</div>
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
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  const days = Object.keys(AGENDA);
  const [active, setActive] = useState(days[0]);
  return (
    <PageWrap title={T.agendaTitle} subtitle={T.agendaSubtitle}>
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
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  const [step, setStep] = useState(1);
  const [regType, setRegType] = useState(REGISTRATION_TYPES[0]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", org: "", country: "", phone: "", dietary: "", hotel: "" });
  const [errors, setErrors] = useState({});
  const [registered, setRegistered] = useState(() => JSON.parse(sessionStorage.getItem("eapce_regs") || "[]"));
  const [badgeId] = useState(() => "EAPCE27-" + Math.random().toString(36).substr(2, 8).toUpperCase());
  const [accredDone, setAccredDone] = useState(false);

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
    <PageWrap title={T.regTitle} subtitle={T.regSubtitle}>
      <div style={{ display: "flex", gap: 0, marginBottom: 36, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.lightGray}` }}>
        {[T.step1, T.step2, T.step3].map((s, i) => (
          <div key={s} style={{ flex: 1, padding: "12px 8px", background: step === i + 1 ? C.navy : step > i + 1 ? C.green : C.offWhite, color: step >= i + 1 ? "#fff" : C.gray, textAlign: "center", fontSize: 12, fontWeight: 700, borderRight: i < 2 ? `1px solid ${C.lightGray}` : "none" }}>
            {step > i + 1 ? "✓ " : ""}{s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 28, border: `1px solid ${C.lightGray}` }}>
            <h3 style={{ margin: "0 0 20px", color: C.navy, fontSize: 16 }}>{T.regTypeLabel}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              {REGISTRATION_TYPES.map(rt => (
                <label key={rt.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, border: `2px solid ${regType.id === rt.id ? C.navy : C.lightGray}`, cursor: "pointer", background: regType.id === rt.id ? "#f0f6ff" : "#fff" }}>
                  <input type="radio" name="regType" checked={regType.id === rt.id} onChange={() => setRegType(rt)} style={{ accentColor: C.navy }} />
                  <span style={{ flex: 1, fontWeight: 600, fontSize: 13 }}>{rt.label}</span>
                  <span style={{ fontWeight: 800, color: rt.price === 0 ? C.green : C.navy }}>{rt.price === 0 ? "FREE" : `USD ${rt.price}`}</span>
                </label>
              ))}
            </div>
            <h3 style={{ margin: "0 0 20px", color: C.navy, fontSize: 16 }}>{T.personalInfo}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <F label={T.fName} name="firstName" required /><F label={T.lName} name="lastName" required />
            </div>
            <F label={T.emailLbl} name="email" type="email" required />
            <F label={T.orgLbl} name="org" required />
            <F label={T.countryLbl} name="country" required />
            <F label={T.phoneLbl} name="phone" />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{T.dietaryLbl}</label>
              <select value={form.dietary} onChange={e => setForm(f => ({ ...f, dietary: e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14 }}>
                <option value="">None</option><option>Vegetarian</option><option>Vegan</option><option>Halal</option><option>Gluten-Free</option>
              </select>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{T.hotelLbl}</label>
              <select value={form.hotel} onChange={e => setForm(f => ({ ...f, hotel: e.target.value }))} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.lightGray}`, borderRadius: 6, fontSize: 14 }}>
                <option value="">No preference / self-arranged</option>
                {HOTELS.map(h => <option key={h.name}>{h.name} ({h.rate})</option>)}
              </select>
            </div>
            <button onClick={handleSubmit} style={{ width: "100%", background: C.navy, color: "#fff", border: "none", padding: "15px", borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
              {regType.price > 0 ? `${T.submitPay} — USD ${regType.price} →` : `${T.submitFree} →`}
            </button>
          </div>
          <div style={{ background: C.navy, borderRadius: 12, padding: 24, position: "sticky", top: 80 }}>
            <h4 style={{ margin: "0 0 16px", color: C.gold, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>{T.orderSum}</h4>
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
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 48, border: `1px solid ${C.lightGray}`, marginBottom: 20 }}>
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

          {/* Accreditation CTA */}
          <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #0d3d2a 100%)`, borderRadius: 12, padding: "36px 40px", textAlign: "center" }}>
            <div style={{ display: "inline-block", background: C.gold, color: C.navy, borderRadius: 4, padding: "4px 14px", fontSize: 10, fontWeight: 900, letterSpacing: 2, textTransform: "uppercase", marginBottom: 18 }}>Next Step</div>
            <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 10px" }}>Complete Your Event Accreditation</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.7, marginBottom: 28, maxWidth: 440, margin: "0 auto 28px" }}>
              Your registration is confirmed. To receive your official event badge and access credentials, please proceed to the EAPCE'27 accreditation system.
            </p>
            {!accredDone ? (
              <>
                <a
                  href="https://app.eventpass.rw/register/event/DP9GdOp95zBxPY05sb77cHKKCfYCqx3zWiSSnSD5ZKgKApzSvUMktcDgHRDqKqjl"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", background: C.gold, color: C.navy, padding: "15px 40px", borderRadius: 5, fontSize: 15, fontWeight: 900, textDecoration: "none", letterSpacing: 0.3 }}>
                  Proceed to Accreditation →
                </a>
                <div style={{ marginTop: 20 }}>
                  <button onClick={() => setAccredDone(true)} style={{ background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.15)", padding: "9px 24px", borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                    I have completed my accreditation ✓
                  </button>
                </div>
                <div style={{ marginTop: 12, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                  Powered by EventPass · app.eventpass.rw
                </div>
              </>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 10, padding: "28px 32px", marginTop: 8 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.gold, color: C.navy, fontSize: 22, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>✓</div>
                <h4 style={{ color: C.gold, fontSize: 17, fontWeight: 800, margin: "0 0 10px" }}>Accreditation Complete!</h4>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.8, margin: "0 0 14px" }}>
                  Thank you, <strong style={{ color: "#fff" }}>{form.firstName}</strong>. Your accreditation has been received.
                </p>
                <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 8, padding: "16px 20px" }}>
                  <div style={{ color: C.gold, fontWeight: 800, fontSize: 13, marginBottom: 6 }}>Badge Collection</div>
                  <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.8 }}>
                    Your official delegate badge will be available for collection at the<br />
                    <strong style={{ color: "#fff" }}>Registration Desk — Kigali Convention Centre Foyer</strong><br />
                    from <strong style={{ color: "#fff" }}>Sunday 8 March 2027, 08:00 EAT</strong> onwards.<br />
                    Please bring a valid photo ID and your confirmation ID: <strong style={{ color: C.gold }}>{badgeId}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </PageWrap>
  );
}

// ─── EXHIBITION PAGE ──────────────────────────────────────────────────────────
function ExhibitionPage() {
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: "", pass: "" });
  const [view, setView] = useState("overview");

  if (!loggedIn) return (
    <PageWrap title={T.exhibTitle} subtitle={T.exhibSubtitle}>
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
    <PageWrap title={T.exhibTitle} subtitle="TotalEnergies SE — Booth A-01 (Platinum)">
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
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  const [applied, setApplied] = useState(false);
  return (
    <PageWrap title={T.spTitle} subtitle={T.spSubtitle}>
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
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  const [selected, setSelected] = useState(null);
  return (
    <PageWrap title={T.spkTitle} subtitle={T.spkSubtitle}>
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
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  return (
    <PageWrap title={T.venueTitle} subtitle={T.venueSubtitle}>
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
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  return (
    <PageWrap title={T.mediaTitle} subtitle={T.mediaSubtitle}>
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
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const registered = JSON.parse(sessionStorage.getItem("eapce_regs") || "[]");
  if (!authed) return (
    <PageWrap title={T.adminTitle} subtitle="Restricted — authorised personnel only">
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
    <PageWrap title={T.adminTitle} subtitle={T.adminSubtitle}>
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

// ─── ABOUT PAGE ──────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(160deg, #050c18 0%, ${C.navy} 55%, #081e12 100%)`, padding: "80px 24px 72px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 40%, rgba(201,168,76,0.08) 0%, transparent 55%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", borderRadius: 24, padding: "6px 18px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "inline-block" }} />
            <span style={{ color: C.gold, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{T.aboutTag}</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(24px,4.5vw,46px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: -0.5 }}>
            12th East African Petroleum<br />Conference &amp; Exhibition
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
            The East African Petroleum Conference and Exhibition (EAPCE) is the premier intergovernmental energy forum for the East African Community, convening Heads of State, Ministers, industry CEOs and investors to shape the future of petroleum and energy in the region.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px" }}>

        {/* What is EAPCE */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 64, alignItems: "center" }}>
          <div>
            <SectionLabel>Background</SectionLabel>
            <SectionTitle>What is EAPCE'27?</SectionTitle>
            <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.8, marginTop: 16, marginBottom: 16 }}>
              The East African Petroleum Conference and Exhibition (EAPCE) is organised under the auspices of the East African Community (EAC) and held every two years in one of the EAC Partner States. It is the only conference on the continent that brings together all eight EAC Partner States under one roof to discuss petroleum exploration, production, refining, and energy transition.
            </p>
            <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              The 12th edition — <strong style={{ color: C.navy }}>EAPCE'27</strong> — will be hosted by the Republic of Rwanda through the Rwanda Mines, Petroleum and Gas Board (RMB) and the Rwanda Convention Bureau (RCB), at the Kigali Convention Centre from <strong style={{ color: C.navy }}>9–11 March 2027</strong>.
            </p>
            <button onClick={() => setPage("Register")} style={{ background: C.gold, color: C.navy, border: "none", padding: "12px 28px", borderRadius: 6, fontSize: 13, fontWeight: 800, cursor: "pointer" }}>Register to Attend →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["1994", "Year EAPCE was founded"], ["12th", "Edition in 2027"], ["8", "EAC Partner States"], ["1,000+", "Expected delegates"], ["70", "Exhibition booths"], ["3", "Conference days"]].map(([v, l]) => (
              <div key={l} style={{ background: C.offWhite, borderRadius: 10, padding: "18px 16px", border: `1px solid ${C.lightGray}`, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: C.navy }}>{v}</div>
                <div style={{ fontSize: 11, color: C.gray, marginTop: 4, lineHeight: 1.4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #0d3d2a 100%)`, borderRadius: 14, padding: "40px 36px", marginBottom: 64, color: "#fff" }}>
          <SectionLabel light>Conference Theme</SectionLabel>
          <h2 style={{ color: C.gold, fontSize: "clamp(16px,2.5vw,24px)", fontWeight: 800, margin: "8px 0 16px", lineHeight: 1.3, fontStyle: "italic" }}>
            "Strategic and Sustainable Oil and Gas Resources Exploitation for Energy Security in EAC"
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.8, maxWidth: 700, marginBottom: 28 }}>
            This theme reflects the EAC region's commitment to harnessing its abundant petroleum resources responsibly — balancing economic development, energy security, environmental stewardship, and the global energy transition.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {[
              ["⚡", "Energy Security", "Ensuring affordable, reliable energy across all 8 EAC Partner States"],
              ["🌍", "Regional Economy", "Leveraging petroleum revenues for sustainable economic growth"],
              ["🤝", "Investment & FDI", "Attracting global capital into EAC upstream and midstream projects"],
              ["🌱", "Energy Transition", "Balancing hydrocarbon development with climate commitments"],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "18px 16px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: C.gold, fontSize: 13, marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Organisers */}
        <div style={{ marginBottom: 64 }}>
          <SectionLabel>Organisers</SectionLabel>
          <SectionTitle>Who Organises EAPCE'27?</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 28 }}>
            {[
              { name: "East African Community (EAC)", short: "EAC", desc: "The EAC is the regional intergovernmental organisation of the Republics of Burundi, DRC, Kenya, Rwanda, Somalia, South Sudan, Tanzania, and Uganda. It provides the mandate and institutional framework for EAPCE.", role: "Patron & Mandate", color: C.navy },
              { name: "Rwanda Mines, Petroleum & Gas Board", short: "RMB", desc: "RMB is the national regulatory body overseeing Rwanda's mineral, petroleum, and gas sector. As host nation regulator, RMB leads the technical programme and government coordination for EAPCE'27.", role: "Host & Technical Lead", color: C.green },
              { name: "Rwanda Convention Bureau", short: "RCB", desc: "RCB is Rwanda's national body for attracting and facilitating international meetings, conferences and exhibitions. RCB manages logistics, venue, hospitality, sponsorship and marketing for EAPCE'27.", role: "Events & Operations", color: "#7a3b00" },
            ].map(org => (
              <div key={org.name} style={{ background: "#fff", borderRadius: 12, border: `1px solid ${C.lightGray}`, overflow: "hidden" }}>
                <div style={{ background: org.color, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#fff" }}>{org.short}</div>
                  <div>
                    <div style={{ color: C.gold, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{org.role}</div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginTop: 2 }}>{org.name}</div>
                  </div>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.7, margin: 0 }}>{org.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past editions */}
        <div>
          <SectionLabel>History</SectionLabel>
          <SectionTitle>Past EAPCE Editions</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 24 }}>
            {[
              ["EAPCE'25", "11th Edition", "Kampala, Uganda", "2025"],
              ["EAPCE'23", "10th Edition", "Mombasa, Kenya", "2023"],
              ["EAPCE'21", "9th Edition", "Dar es Salaam, Tanzania", "2021"],
              ["EAPCE'19", "8th Edition", "Bujumbura, Burundi", "2019"],
              ["EAPCE'17", "7th Edition", "Nairobi, Kenya", "2017"],
            ].map(([name, edition, location, year]) => (
              <div key={name} style={{ background: "#fff", borderRadius: 8, padding: "14px 20px", border: `1px solid ${C.lightGray}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", align: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 8, background: C.offWhite, border: `1px solid ${C.lightGray}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 10, color: C.navy, textAlign: "center", lineHeight: 1.2 }}>{name.replace("EAPCE", "EAP\nCE")}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{name} — {edition}</div>
                    <div style={{ fontSize: 12, color: C.gray, marginTop: 3 }}>📍 {location}</div>
                  </div>
                </div>
                <span style={{ background: C.offWhite, color: C.navy, padding: "4px 12px", borderRadius: 12, fontSize: 12, fontWeight: 700, border: `1px solid ${C.lightGray}` }}>{year}</span>
              </div>
            ))}
            <div style={{ background: `linear-gradient(135deg, ${C.navy}, #0d3d2a)`, borderRadius: 8, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 8, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 10, color: C.navy, textAlign: "center", lineHeight: 1.3 }}>NEXT</div>
                <div>
                  <div style={{ fontWeight: 800, color: C.gold, fontSize: 14 }}>EAPCE'27 — 12th Edition</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>📍 Kigali Convention Centre, Rwanda</div>
                </div>
              </div>
              <button onClick={() => setPage("Register")} style={{ background: C.gold, color: C.navy, border: "none", padding: "9px 20px", borderRadius: 6, fontSize: 12, fontWeight: 800, cursor: "pointer" }}>Register Now →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  const [form, setForm] = useState({ name: "", email: "", org: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Valid email required";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => { if (validate()) setSent(true); };

  const F = ({ label, name, required, textarea }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}{required && <span style={{ color: C.danger }}> *</span>}</label>
      {textarea
        ? <textarea value={form[name]} onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: "" })); }} rows={5} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${errors[name] ? C.danger : C.lightGray}`, borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit" }} />
        : <input value={form[name]} onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: "" })); }} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${errors[name] ? C.danger : C.lightGray}`, borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box", background: errors[name] ? "#fff5f5" : "#fff" }} />}
      {errors[name] && <div style={{ color: C.danger, fontSize: 11, marginTop: 4 }}>⚠ {errors[name]}</div>}
    </div>
  );

  return (
    <PageWrap title={T.contactTitle} subtitle={T.contactSubtitle}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }}>

        {/* Contact form */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: `1px solid ${C.lightGray}` }}>
          {!sent ? (
            <>
              <h3 style={{ color: C.navy, margin: "0 0 20px", fontSize: 17 }}>{T.contactForm}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                <F label={T.fullName} name="name" required />
                <F label={T.emailLbl} name="email" required />
              </div>
              <F label={T.orgLbl} name="org" />
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{T.subjectLbl} <span style={{ color: C.danger }}>*</span></label>
                <select value={form.subject} onChange={e => { setForm(f => ({ ...f, subject: e.target.value })); setErrors(er => ({ ...er, subject: "" })); }}
                  style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${errors.subject ? C.danger : C.lightGray}`, borderRadius: 6, fontSize: 14, background: "#fff" }}>
                  <option value="">Select a subject…</option>
                  <option>General Enquiry</option>
                  <option>Registration Assistance</option>
                  <option>Exhibition & Booth Booking</option>
                  <option>Sponsorship Packages</option>
                  <option>Speaker / Abstract Submission</option>
                  <option>Media & Press Accreditation</option>
                  <option>Venue & Accommodation</option>
                  <option>Other</option>
                </select>
                {errors.subject && <div style={{ color: C.danger, fontSize: 11, marginTop: 4 }}>⚠ {errors.subject}</div>}
              </div>
              <F label={T.messageLbl} name="message" required textarea />
              <button onClick={handleSubmit} style={{ width: "100%", background: C.navy, color: "#fff", border: "none", padding: "15px", borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: "pointer" }}>{T.sendBtn} →</button>
              <div style={{ marginTop: 12, fontSize: 11, color: C.gray, textAlign: "center" }}>We aim to respond within 1 business day.</div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.green, color: "#fff", fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>✓</div>
              <h3 style={{ color: C.green, marginBottom: 8 }}>{T.sentTitle}</h3>
              <p style={{ color: C.gray, fontSize: 14, marginBottom: 20 }}>Thank you, <strong>{form.name}</strong>. We'll get back to you at <strong>{form.email}</strong> within 1 business day.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", org: "", subject: "", message: "" }); }} style={{ background: C.navy, color: "#fff", border: "none", padding: "10px 24px", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Send Another Message</button>
            </div>
          )}
        </div>

        {/* Contact details sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Departments */}
          {[
            { icon: "📋", dept: "Registration & Delegate Services", email: "registration@eapce27.rw", phone: "+250 788 452 503", hours: "Mon–Fri, 08:00–17:00 EAT" },
            { icon: "🏭", dept: "Exhibition & Booth Booking", email: "exhibition@eapce27.rw", phone: "+250 788 452 504", hours: "Mon–Fri, 08:00–17:00 EAT" },
            { icon: "💼", dept: "Sponsorship & Partnerships", email: "sponsorship@eapce27.rw", phone: "+250 788 452 505", hours: "Mon–Fri, 08:00–17:00 EAT" },
            { icon: "🎤", dept: "Speaker & Abstract Submissions", email: "abstracts@eapce27.rw", phone: "", hours: "Deadline: 31 Dec 2026" },
            { icon: "📰", dept: "Media & Press Accreditation", email: "media@eapce27.rw", phone: "+250 788 452 506", hours: "Mon–Fri, 08:00–17:00 EAT" },
          ].map(c => (
            <div key={c.dept} style={{ background: "#fff", borderRadius: 10, padding: "16px 18px", border: `1px solid ${C.lightGray}` }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{c.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: C.navy, fontSize: 13, marginBottom: 5 }}>{c.dept}</div>
                  <div style={{ fontSize: 12, color: C.gold, fontWeight: 600, marginBottom: 2 }}>📧 {c.email}</div>
                  {c.phone && <div style={{ fontSize: 12, color: C.gray, marginBottom: 2 }}>📞 {c.phone}</div>}
                  <div style={{ fontSize: 11, color: C.gray }}>{c.hours}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Address */}
          <div style={{ background: C.navy, borderRadius: 10, padding: "18px 20px", color: "#fff" }}>
            <div style={{ fontWeight: 700, color: C.gold, fontSize: 13, marginBottom: 10 }}>🏢 Secretariat Address</div>
            <div style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(255,255,255,0.75)" }}>
              Rwanda Convention Bureau<br />
              KG 9 Ave, Kigali<br />
              P.O. Box 6239, Kigali, Rwanda<br />
              <br />
              <span style={{ color: C.gold, fontWeight: 600 }}>info@eapce27.rw</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div style={{ marginTop: 40, background: "linear-gradient(135deg, #e8f4f8, #d6eaf8)", borderRadius: 12, height: 180, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.lightGray}` }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 36 }}>📍</div>
          <div style={{ fontWeight: 700, color: C.navy, fontSize: 15, marginTop: 8 }}>Kigali Convention Centre</div>
          <div style={{ color: C.gray, fontSize: 12 }}>KG 2 Roundabout, Kigali, Rwanda &nbsp;·&nbsp; -1.9441° S, 30.0619° E</div>
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
    <div>
      <div style={{ background: `linear-gradient(160deg, #060e1c 0%, ${C.navy} 100%)`, padding: "56px 24px 52px", borderBottom: `3px solid ${C.gold}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: C.gold, textTransform: "uppercase", letterSpacing: 3, marginBottom: 12 }}>EAPCE&#39;27</div>
          <h1 style={{ margin: 0, color: "#ffffff", fontSize: "clamp(24px,4vw,42px)", fontWeight: 900, letterSpacing: -0.5 }}>{title}</h1>
          {subtitle && <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{subtitle}</p>}
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 72px" }}>
        {children}
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  const { lang } = useContext(LangContext);
  const T = TR[lang];
  return (
    <footer style={{ background: "#060c16", color: "rgba(255,255,255,0.45)", padding: "60px 24px 32px", marginTop: 0, borderTop: `3px solid ${C.gold}` }}>
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
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 14, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{T.footerLinks}</div>
            {[["Home","navHome"],["Agenda","navAgenda"],["Register","navRegister"],["Exhibition","navExhibition"],["Sponsors","navSponsors"],["Speakers","navSpeakers"],["Venue","navVenue"],["Media","navMedia"]].map(([p, k]) => (
              <div key={p} onClick={() => setPage(p)} style={{ fontSize: 12, marginBottom: 8, cursor: "pointer", color: "rgba(255,255,255,0.45)" }}>{T[k]}</div>
            ))}
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 14, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{T.footerContact}</div>
            <div style={{ fontSize: 12, lineHeight: 2.2 }}>
              📧 info@eapce27.rw<br />📧 sponsorship@eapce27.rw<br />📧 abstracts@eapce27.rw<br />📞 +250 788 452 503
            </div>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, marginBottom: 14, fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{T.footerOrg}</div>
            <div style={{ fontSize: 12, lineHeight: 2 }}>Rwanda Convention Bureau<br />Rwanda Mines, Petroleum<br />&amp; Gas Board (RMB)<br />East African Community (EAC)</div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          © 2027 EAPCE'27 · Planet Events Group · All rights reserved &nbsp;·&nbsp; #EAPCE27 #KigaliEnergy2027
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");
  const [lang, setLang] = useState("en");
  useEffect(() => { window.scrollTo(0, 0); }, [page]);
  const pages = { Home: <HomePage setPage={setPage} />, About: <AboutPage setPage={setPage} />, Agenda: <AgendaPage />, Register: <RegisterPage />, Exhibition: <ExhibitionPage />, Sponsors: <SponsorsPage />, Speakers: <SpeakersPage />, Venue: <VenuePage />, Media: <MediaPage />, Contact: <ContactPage />, Admin: <AdminPage /> };
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: C.offWhite, minHeight: "100vh", color: C.text }}>
        <Nav page={page} setPage={setPage} />
        <main>{pages[page]}</main>
        <Footer setPage={setPage} />
      </div>
    </LangContext.Provider>
  );
}
