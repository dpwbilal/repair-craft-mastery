import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Wrench,
  Cpu,
  Zap,
  ShieldCheck,
  Sparkles,
  Check,
  ChevronRight,
  Award,
  Circle,
  Headphones,
  Cog,
  Unlock,
  Smartphone,
  Database,
  KeyRound,
  Wifi,
  ShieldOff,
  Facebook,
  Youtube,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import motherboardImg from "@/assets/motherboard.webp";
import instructorAsset from "@/assets/instructor-new.webp.asset.json";
import diplomaAsset from "@/assets/diploma-new.webp.asset.json";

function StatCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return (
    <div className="premium-lift rounded-xl border border-border bg-card p-4 hover:border-[var(--tech)]/60">
      <div className="font-display text-2xl font-bold">
        {value.toLocaleString()}
        {suffix}
      </div>
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Utility bits                                                              */
/* -------------------------------------------------------------------------- */

function SplitReveal({ text, className = "" }: { text: string; className?: string }) {
  return <span className={className}>{text}</span>;
}

function MagneticButton({
  children,
  className = "",
  variant = "primary",
  href,
  onClick,
  pulse = false,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  pulse?: boolean;
}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    setPos({ x: dx * 0.25, y: dy * 0.25 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors will-change-transform";
  const variants: Record<string, string> = {
    primary:
      "bg-foreground text-background hover:bg-[var(--tech)] hover:text-white",
    secondary:
      "border border-border bg-transparent text-foreground hover:border-[var(--tech)]",
    ghost: "text-foreground hover:text-[var(--tech)]",
  };

  const Inner = (
    <span className="inline-flex items-center gap-2">
      {children}
    </span>
  );

  const props = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    onClick,
    className: `${base} ${variants[variant]} ${pulse ? "animate-pulse-soft" : ""} ${className}`,
  };

  if (href) {
    return (
      <a href={href} {...(props as React.HTMLAttributes<HTMLAnchorElement>)}>
        {Inner}
      </a>
    );
  }
  return <button type="button" {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{Inner}</button>;
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

const NAV = [
  { label: "Home", href: "#home" },
  { label: "The Master", href: "#master" },
  { label: "Course Levels", href: "#curriculum" },
  { label: "Software", href: "#lab" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-10">
        <a href="#home" className="flex min-w-0 items-center gap-2 font-display font-bold tracking-tight">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-foreground text-background">
            <Wrench className="h-4 w-4" />
          </span>
          <span className="truncate whitespace-nowrap text-sm sm:text-base">
            NASIR <span className="text-[var(--tech)]">TECH</span>
            <span className="hidden sm:inline"> INSTITUTE</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="relative z-10">{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background/60 transition-colors hover:border-[var(--tech)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-9 sm:w-9"
          >
            <span className="grid place-items-center">
                {theme === "light" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </span>
          </button>

          <MagneticButton
            href="#contact"
            pulse
            className="mobile-enroll min-h-11 whitespace-nowrap px-4 py-2 text-sm sm:h-auto sm:min-h-0 sm:px-6 sm:py-3"
          >
            Enroll Now <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </MagneticButton>

          <button
            className="lg:hidden grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-9 sm:w-9"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
          <div className="lg:hidden overflow-hidden border-t border-border bg-background">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero() {
  const wrap = useRef<HTMLDivElement | null>(null);
  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-16 lg:pb-24">
      <div className="absolute inset-0 bg-radial-tech pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] pointer-events-none" />
      <div
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[var(--tech)]/10 blur-3xl pointer-events-none"
      />
      <div
        className="absolute top-40 -left-24 h-80 w-80 rounded-full bg-[var(--power)]/10 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-10">
        {/* Left */}
        <div className="hero-in flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-[var(--power)] animate-pulse" />
            <span className="text-gradient-shimmer font-semibold uppercase tracking-widest">
              Punjab's Premier Mobile Repairing Academy
            </span>
          </div>

          <h1 className="mt-6 font-sans text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold leading-[1.02] tracking-tight">
            <span className="text-hero-mono">Nasir Awan</span>
            <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--tech), var(--power))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              Training Center
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            Punjab's most advanced facility for comprehensive mobile repair training.
            Build your career with hands-on, expert-led courses and real-world diagnostics.
          </p>

          <blockquote className="mt-8 relative rounded-2xl border border-border glass-card p-5 sm:p-6">
            <span className="absolute -top-3 left-6 rounded-full bg-[var(--power)] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
              Master's Philosophy
            </span>
            <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
              "In today's world, a real skill in your hands is more powerful than any degree."
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">— Sir Nasir Awan</footer>
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton href="#curriculum" pulse>
              Explore Course <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Contact Now <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--tech)]" /> Kuwait Trained</div>
            <div className="flex items-center gap-2"><Cpu className="h-4 w-4 text-[var(--power)]" /> China Sourced Rigs</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Main Hall Road, Lahore</div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61591323549533"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Nasir Tech Institute on Facebook"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border glass-card text-[#1877F2] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-[#1877F2] hover:text-[#1877F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@mobilereparingcours"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch Nasir Tech Institute on YouTube"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border glass-card text-[#FF0000] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-[#FF0000] hover:text-[#FF0000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Right — interactive tilt motherboard */}
        <div
          ref={wrap}
          className="hero-in relative flex items-center justify-center [perspective:1200px]"
        >
          <div
            className="relative aspect-square w-full max-w-[520px] rounded-3xl border border-border glass-card overflow-hidden [transform-style:preserve-3d]"
          >
            <img
              src={motherboardImg}
              alt="Smartphone motherboard with glowing traces"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1200}
              height={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--tech)]/30 via-transparent to-[var(--power)]/25 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
            <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
            {/* scan line */}
            <div className="pointer-events-none absolute inset-x-0 h-[3px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--tech)] to-transparent shadow-[0_0_20px_2px_color-mix(in_oklab,var(--tech)_60%,transparent)] animate-scan" />
            {/* floating hotspots */}
            {[
              { top: "18%", left: "78%", label: "CPU" },
              { top: "22%", left: "48%", label: "UFS" },
              { top: "58%", left: "50%", label: "LPDDR5X" },
            ].map((h, i) => (
              <div key={i} className="absolute" style={{ top: h.top, left: h.left, transform: "translateZ(40px)" }}>
                <div className="relative">
                  <span className="absolute inset-0 -m-2 rounded-full bg-[var(--tech)]/30 blur-md" />
                  <span className="relative flex items-center gap-2 rounded-full border border-[var(--tech)]/60 bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--tech)]">
                    <Circle className="h-2 w-2 fill-[var(--tech)] text-[var(--tech)]" />
                    {h.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Floating spec chips */}
          <div className="absolute left-1 sm:-left-6 bottom-3 sm:bottom-8 rounded-2xl glass-card px-3 py-2 shadow-lg sm:px-4 sm:py-3">
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">Micro-Soldering</div>
            <div className="font-display text-sm font-bold sm:text-lg">0.4 mm precision</div>
          </div>
          <div className="absolute right-1 sm:-right-6 top-2 sm:top-8 rounded-2xl glass-card px-3 py-2 shadow-lg sm:px-4 sm:py-3">
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">Success Rate</div>
            <div className="font-display text-sm font-bold text-[var(--power)] sm:text-lg">98.6%</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                   */
/* -------------------------------------------------------------------------- */

function Marquee() {
  const items = [
    "Micro-Soldering",
    "eMMC / UFS Upgrade",
    "CPU Reballing",
    "Face ID Repair",
    "Firmware Flashing",
    "Pattern Unlocking",
    "Dead Boot Recovery",
    "Motherboard Tracing",
    "Double-Decker CPU Repair",
    "Dead Boot Repair",
    "Schematics Tracing",
    "Short Circuit Finding",
    "Baseband Repair",
    "OCA Lamination",
    "Water Damage Restoration",
  ];
  return (
    <div className="border-y border-border bg-surface overflow-hidden">
      <div className="flex w-max gap-12 py-4 whitespace-nowrap animate-[marquee_60s_linear_infinite]">
        {[...items, ...items].map((s, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-4 w-4 text-[var(--tech)]" />
            {s}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Meet the Master                                                           */
/* -------------------------------------------------------------------------- */

function Master() {
  const cards = [
    {
      tag: "1993",
      titleParts: [
        { text: "Electronics Course", highlight: true },
        { text: " — Friends College, Lahore" },
      ],
      body: "Where the journey began — foundational electronics theory, hands-on component work, and the discipline that defines every repair since.",
      icon: <ShieldCheck className="h-5 w-5" />,
      accent: "var(--tech)",
    },
    {
      tag: "2001",
      titleParts: [
        { text: "Mobile Phone Complete Course — " },
        { text: "Kuwait", highlight: true },
      ],
      body: "Years abroad drilling deep-level micro-soldering principles and disciplined workshop craft that most local trainers never touch.",
      icon: <Cpu className="h-5 w-5" />,
      accent: "var(--power)",
    },
    {
      tag: "2013 – 2018",
      titleParts: [
        { text: "Multiple " },
        { text: "Professional", highlight: true },
        { text: " Visits to " },
        { text: "China", highlight: true },
      ],
      body: "Frequent trips to Shenzhen's hardware bazaars — sourcing the newest diagnostic rigs, flashing boxes, and repair techniques straight from the source.",
      icon: <MapPin className="h-5 w-5" />,
      accent: "var(--tech)",
    },
  ];

  return (
    <section id="master" className="content-section relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div
          className="mb-0 pb-0 max-w-2xl"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--tech)]">Meet the Instructor</div>
          <h2 className="mt-1 mb-0 pb-0 text-4xl sm:text-5xl font-bold leading-tight">
            <SplitReveal text="A three-country journey" />
            <br />
            <SplitReveal text="into one Lahore classroom." className="text-gradient-tech" />
          </h2>
        </div>

        <div className="mt-2 pt-0 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 items-start">
          {/* Portrait */}
          <div
            className="content-section relative group mt-0 pt-0"
          >
            {/* Premium ambient studio backlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.35),rgba(0,102,255,0.22)_45%,transparent_75%)] blur-[60px]"
            />
            <div
              className="pointer-events-none absolute -inset-3 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--tech) 55%, transparent), color-mix(in oklab, var(--power) 45%, transparent))",
              }}
            />
            <div className="content-section relative overflow-hidden rounded-3xl border border-border transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_30px_80px_-20px_rgba(0,229,255,0.35)] will-change-transform">
              <img
                src={instructorAsset.url}
                alt="Sir Nasir Awan"
                className="h-full w-full object-cover object-top aspect-[4/5]"
                loading="lazy"
                width={1008}
                height={1200}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white">
                <div className="flex flex-col gap-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--tech)]">
                    Founder & Principal
                  </div>
                  <div className="font-display text-2xl font-bold leading-tight">Sir Nasir Awan</div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--power)]/60 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--power)]">
                    <Award className="h-3.5 w-3.5" /> 33+ Years Experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline cards */}
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--tech)] via-border to-[var(--power)]" />
            <div className="space-y-6">
              {cards.map((c, i) => (
                <article
                  key={c.tag}
                  className="content-section relative pl-12"
                >
                  <span
                    className="absolute left-0 top-4 grid h-9 w-9 place-items-center rounded-full text-white shadow-md"
                    style={{ backgroundColor: c.accent }}
                  >
                    {c.icon}
                  </span>
                  <div className="premium-lift rounded-2xl border border-border bg-card p-6">
                    <div
                      className="text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color: c.accent }}
                    >
                      {c.tag}
                    </div>
                    <h3 className="mt-1 font-display text-2xl font-bold">
                      {c.titleParts.map((p, idx) =>
                        p.highlight ? (
                          <span key={idx} className="font-extrabold" style={{ color: c.accent }}>
                            {p.text}
                          </span>
                        ) : (
                          <span key={idx}>{p.text}</span>
                        )
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Curriculum (Bento)                                                        */
/* -------------------------------------------------------------------------- */

function Curriculum() {
  return <CurriculumInner />;
}

function CurriculumInner() {
  const tiers = TIERS;

  return (
    <section id="curriculum" className="content-section relative py-24 lg:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--power)]">Choose Your Path</div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            <SplitReveal text="Course Level" className="text-gradient-tech" />
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[var(--tech)] to-[var(--power)]" />
          <h3 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
            <span className="text-gradient-tech">OUR PLANS</span>
          </h3>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Select the best mobile repairing course level and learn from basic to master level with hands-on practice.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
          {tiers.map((t, i) => (
            <TierCard key={t.slug} tier={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const TIERS = [
  {
    slug: "basic",
    tier: "Tier 01",
    title: "Basic Level",
    accent: "#FFC300",
    badge: "Basic",
    duration: "1 Month",
    bestFor: "Beginners & Job Seekers",
    features: [
      "Glass separator machine",
      "OCA machine",
      "Debubbler machine",
      "Mobile housing",
      "Mobile opening and closing",
      "OCA glass change",
      "Basic Multimeter introduction",
      "Basic tool guide and more",
    ],
  },
  {
    slug: "advance",
    tier: "Tier 02",
    title: "Advance Level",
    accent: "#FF7A00",
    badge: "Advance",
    duration: "1 to 1.5 Months",
    bestFor: "Technicians ready to go chip-level",
    features: [
      "Includes All Basic Level Training +",
      "Advance Checking through Digital Multimeter",
      "Resistors & Capacitors (Polar / Non-Polar Identification & Checking)",
      "Diodes (Zener, Rectifier, Signal, LED, Power)",
      "Transistors (NPN, PNP), FET & MOSFET (Working, Identification, Replacement)",
      "Inductors (Boost / Buck Coil) & Fuses (Working, Use, Checking)",
      "RTC & RF Crystals (Types, Working, Faults, and Location)",
      "And many more advanced diagnostic modules…",
    ],
  },
  {
    slug: "master",
    tier: "Tier 03",
    title: "Master Level",
    accent: "#00A3FF",
    badge: "Master",
    duration: "2 to 3 Months",
    bestFor: "Professionals & Experienced Technicians",
    features: [
      "Includes All Basic + Advance + Master",
      "IC Reballing",
      "Fault tracing",
      "IC Handling: Charging, Network, Power, PA, and Wifi ICs",
      "SIM section",
      "Audio section",
      "Signal section",
      "Hands-on work on New Mobile & boards",
      "Basic to Double Board Swiping",
      "Battery section",
    ],
  },
] as const;

export type Tier = (typeof TIERS)[number];

function TierCard({ tier: t, index }: { tier: Tier; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 10 });
  };
  const reset = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div
      className="[perspective:1200px] h-full"
    >
      <article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 [transform-style:preserve-3d] transition-shadow duration-500 hover:shadow-2xl"
        style={{
          borderTop: `4px solid ${t.accent}`,
          boxShadow: `0 -4px 22px -6px ${t.accent}55`,
          backgroundImage: `linear-gradient(180deg, transparent 55%, ${t.accent}18 100%)`,
        }}
      >
        {/* neon glow on hover */}
        <div
          className="pointer-events-none absolute -inset-1 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: `radial-gradient(60% 50% at 50% 0%, ${t.accent}, transparent 70%)` }}
        />
        {/* Schematic bg on hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, ${t.accent}22 0%, transparent 40%),
              linear-gradient(to right, ${t.accent}12 1px, transparent 1px),
              linear-gradient(to bottom, ${t.accent}12 1px, transparent 1px)`,
            backgroundSize: "100% 100%, 32px 32px, 32px 32px",
          }}
        />

        <div className="content-section relative flex flex-1 flex-col" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-black"
              style={{ backgroundColor: t.accent }}
            >
              {t.badge} Level
            </span>
            <span className="font-display text-xs font-bold text-muted-foreground">{t.tier}</span>
          </div>

          <h3 className="mt-6 font-display text-2xl sm:text-3xl font-bold leading-tight">
            {t.title}
          </h3>
          <div
            className="mt-2 h-[2px] w-14 rounded-full"
            style={{ background: `linear-gradient(90deg, ${t.accent}, transparent)`, boxShadow: `0 0 10px ${t.accent}` }}
          />

          <div className="mt-4 grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-[10px] uppercase tracking-widest opacity-70">Duration</span>
              <span className="font-semibold text-foreground">{t.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-[10px] uppercase tracking-widest opacity-70">Best For</span>
              <span className="font-semibold text-foreground">{t.bestFor}</span>
            </div>
          </div>

          <ul className="mt-5 mb-6 space-y-3">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-foreground/85">
                <span
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: `${t.accent}22`, color: t.accent }}
                >
                  <Check className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <Link
            to="/course/$slug"
            params={{ slug: t.slug }}
            className="group/btn mt-auto min-h-11 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ backgroundColor: t.accent, boxShadow: `0 8px 24px -8px ${t.accent}` }}
          >
            Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </article>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Lab Simulator                                                             */
/* -------------------------------------------------------------------------- */

function Lab() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const labRef = useRef<HTMLElement | null>(null);
  const [labInView, setLabInView] = useState(false);

  useEffect(() => {
    const el = labRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLabInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setLabInView(entries.some((e) => e.isIntersecting)),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!labInView) return;
    let raf = 0;
    let start = 0;
    let lastPaint = 0;
    const loop = (t: number) => {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const cycle = elapsed % 5;
      const p = Math.min(100, (cycle / 4) * 100);
      // Throttle React state updates to ~15fps; the bar is animated in CSS.
      if (t - lastPaint > 66) {
        lastPaint = t;
        setProgress(p);
        setDone(cycle > 4.1);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [labInView]);

  const logs = [
    "> Connecting to device (MTK 6789)…",
    "> Auth handshake OK",
    "> Reading partition table…",
    "> Writing firmware chunk 12/12",
    "> Verifying checksum…",
  ];

  const softwareTools = [
    { name: "iPhone Flashing", desc: "iTunes, 3uTools, iMazing restore & IPSW pipelines.", icon: <Smartphone className="h-5 w-5" />, accent: "var(--tech)" },
    { name: "iCloud Bypass", desc: "Checkra1n, Palera1n & signal-preserving bypass flows.", icon: <Unlock className="h-5 w-5" />, accent: "var(--power)" },
    { name: "FRP Unlocking", desc: "Samsung, Xiaomi, Vivo & Oppo Google-account removal.", icon: <ShieldOff className="h-5 w-5" />, accent: "var(--tech)" },
    { name: "China Unlock", desc: "MTK / SPD / Qualcomm processor flashing with UnlockTool.", icon: <KeyRound className="h-5 w-5" />, accent: "var(--power)" },
    { name: "Firmware Repair", desc: "Odin, QFIL, MiFlash, SP Flash Tool — full boot recovery.", icon: <Database className="h-5 w-5" />, accent: "var(--tech)" },
    { name: "Network Repair", desc: "Baseband, IMEI, and country/society-code correction.", icon: <Wifi className="h-5 w-5" />, accent: "var(--power)" },
    { name: "Dead Boot Recovery", desc: "Reviving dead phones via ISP, EDL & test-point flashing.", icon: <Zap className="h-5 w-5" />, accent: "var(--tech)" },
    { name: "Pattern Unlock", desc: "Screen lock, pin & pattern removal without data wipe.", icon: <ShieldCheck className="h-5 w-5" />, accent: "var(--power)" },
  ];

  return (
    <section ref={labRef} id="lab" className="content-section relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div
          className="mx-auto max-w-3xl text-center"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--tech)]">Software Lab</div>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
            <span className="text-gradient-tech">SOFTWARE</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[var(--tech)] to-[var(--power)]" />
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground">
            Master mobile software repair with professional training in phone flashing, device unlocking, and dead phone recovery using industry-standard tools. The course covers Samsung, Oppo, Vivo, Xiaomi, Infinix, Tecno, and iPhone.
          </p>
        </div>

        {/* Compact software tool grid: 2 cols mobile / 4 cols desktop */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {softwareTools.map((s, i) => (
            <div
              key={s.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-5 transition-transform hover:-translate-y-1"
              style={{ boxShadow: `0 4px 18px -12px color-mix(in oklab, ${s.accent} 55%, transparent)` }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-70"
                style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }}
              />
              <span
                className="grid h-10 w-10 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `color-mix(in oklab, ${s.accent} 18%, transparent)`, color: s.accent }}
              >
                {s.icon}
              </span>
              <div className="mt-3 font-display text-sm sm:text-base font-bold leading-tight">{s.name}</div>
              <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Simulator */}
        <div
          className="content-section relative mx-auto mt-12 max-w-3xl rounded-3xl border border-[#2a2a30] bg-[#0B0B0C] p-5 sm:p-6 shadow-2xl"
        >
          {/* window chrome */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-3 text-[11px] uppercase tracking-widest text-white/50 font-mono">
              awantech.flash — /dev/ttyUSB0
            </span>
          </div>

          <div className="mt-4 rounded-xl bg-black/70 p-4 font-mono text-[12px] text-emerald-300 min-h-[220px]">
            {logs.map((l, i) => (
              <div
                key={i}
                className="transform-gpu"
              >
                {l}
              </div>
            ))}
            <div className="mt-3 flex items-center gap-2 text-white/80">
              <span className="text-[var(--tech)]">›</span>
              Flashing firmware…
              <span className="ml-auto text-white/60">{Math.floor(progress)}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-[width] duration-100"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #00E5FF, #FF5500)",
                }}
              />
            </div>
              {done && (
                <div
                  className="mt-3 flex items-center gap-2 text-emerald-400"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20">
                    <Check className="h-3 w-3" />
                  </span>
                  Firmware flashed successfully.
                </div>
              )}
          </div>

          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-tr from-[#00E5FF]/25 via-transparent to-[#FF5500]/25 blur-2xl" />
        </div>
      </div>
    </section>
  );
}


function DiplomaShowcase() {

  return (
    <section id="diploma" className="content-section relative py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <div
          className="mb-8 text-center"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--power)]">
            Class of 2026
          </div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            2026 Diploma Ceremony
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">
            Certified graduates from the Nasir Tech Institute — ready to lead the next generation of mobile hardware experts.
          </p>
        </div>

        <div
          className="relative mx-auto max-w-5xl"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(255,176,32,0.35),rgba(0,229,255,0.18)_50%,transparent_78%)] blur-[70px]"
          />
          <div
            className="group relative overflow-hidden rounded-3xl border border-[var(--power)]/40 bg-card shadow-[0_30px_80px_-30px_rgba(255,176,32,0.5)] will-change-transform"
          >
            <img
              src={diplomaAsset.url}
              alt="Nasir Tech Institute — 2026 Mobile Repairing Diploma Ceremony with Sir Nasir Awan and graduating students"
              className="h-full w-full object-cover aspect-[16/9]"
              loading="lazy"
              decoding="async"
              width={1536}
              height={864}
            />
            {/* Overlay caption — hidden on mobile so image is fully visible */}
            <div className="hidden sm:block absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 sm:p-7 text-white">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--power)]">
                    Diploma Day 2026
                  </div>
                  <div className="mt-1 font-display text-xl sm:text-2xl font-bold">
                    Graduating Batch — Mobile Repairing
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--power)]/60 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--power)]">
                  <Award className="h-3.5 w-3.5" /> Certified
                </span>
              </div>
            </div>
          </div>
          {/* Mobile-only caption below image */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--power)]/30 bg-card px-4 py-3 sm:hidden">
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--power)]">
                Diploma Day 2026
              </div>
              <div className="mt-0.5 font-display text-sm font-bold leading-tight">
                Graduating Batch — Mobile Repairing
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--power)]/60 bg-[var(--power)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--power)]">
              <Award className="h-3 w-3" /> Certified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Stats — visually detached from Software                                   */
/* -------------------------------------------------------------------------- */

function StatsBand() {
  const stats = [
    { k: "Experience in this field", v: 33, suffix: "+ Years" },
    { k: "Students taught", v: 1000, suffix: "+" },
    { k: "Board sessions / student", v: 80, suffix: "+" },
    { k: "Batch size (max)", v: 10, suffix: "" },
  ];
  return (
    <section className="content-section relative py-20 lg:py-24">
      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto mb-14 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-[var(--tech)]/60 to-transparent" />
        <div
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--power)]">By the Numbers</div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">A track record built in the bench.</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.k} label={s.k} value={s.v} suffix={s.suffix} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Value props                                                               */
/* -------------------------------------------------------------------------- */

function ValueProps() {
  return (
    <section className="content-section relative py-24 lg:py-32 bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        {/* Certificate */}
        <div
          className="content-section relative overflow-hidden rounded-3xl border border-border bg-card p-8 lg:p-10"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--power)]">The Certificate</div>
          <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
            Launch with authority.
          </h3>
          <p className="mt-3 text-muted-foreground max-w-md">
            Every graduate receives an official certificate personally signed by Sir Nasir Awan — the badge that opens
            shops, jobs, and premium clients.
          </p>

          <div
            className="relative mx-auto mt-10 aspect-[4/3] w-full max-w-sm rounded-2xl border-4 border-[#d4b46a] bg-gradient-to-br from-[#fdf6e3] to-[#f2e7c8] p-6 text-[#3a2a10] shadow-2xl [transform-style:preserve-3d]"
          >
            <div className="text-center font-display text-[10px] uppercase tracking-[0.35em] text-[#8a6b1e]">
              Certificate of Mastery
            </div>
            <div className="mt-3 text-center font-display text-lg font-bold">
              Awan Tech Institute
            </div>
            <div className="mt-4 border-y border-[#c9a94f]/60 py-3 text-center text-[10px] uppercase tracking-widest text-[#6b5220]">
              This certifies mastery in Advanced Mobile Repair & Micro-Soldering
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#8a6b1e]">Signed</div>
                <div className="font-display italic text-sm">Nasir Awan</div>
              </div>
              <div className="relative">
                <div
                  className="grid h-14 w-14 place-items-center rounded-full text-[9px] font-bold uppercase text-[#8a6b1e]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #f5d97a, #b8860b, #f5d97a, #b8860b, #f5d97a)",
                    boxShadow: "0 0 20px rgba(212,180,106,0.6)",
                  }}
                >
                  Master
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div
          className="content-section relative overflow-hidden rounded-3xl border border-border bg-card p-8 lg:p-10"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--tech)]">Location Advantage</div>
          <h3 className="mt-3 font-display text-3xl font-bold leading-tight">
            Learn in the capital of mobile commerce.
          </h3>
          <p className="mt-3 text-muted-foreground max-w-md">
            Situated on Main Hall Road — the largest mobile market in Punjab. You train right where the industry moves
            millions daily.
          </p>

          <a
            href="https://maps.app.goo.gl/UgDqfVGAs2Nts2Ye7"
            target="_blank"
            rel="noopener noreferrer"
            className="premium-lift group mt-6 inline-flex items-center gap-3 rounded-full border border-[var(--tech)]/50 bg-background/60 px-6 py-3 text-sm font-semibold text-[var(--tech)]-md hover:border-[var(--tech)] hover:bg-[var(--tech)] hover:text-white"
          >
            <MapPin className="h-4 w-4 transition-transform group-hover:-rotate-12" />
            Click to Get the Location
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Stylized map */}
          <div className="content-section relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-background">
            <svg viewBox="0 0 400 300" className="h-full w-full">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
                </pattern>
              </defs>
              <rect width="400" height="300" fill="url(#grid)" />
              {/* roads */}
              <path d="M0,180 C120,150 220,220 400,150" stroke="currentColor" className="text-muted-foreground" strokeWidth="6" fill="none" opacity="0.35" />
              <path d="M60,0 C90,120 140,180 180,300" stroke="currentColor" className="text-muted-foreground" strokeWidth="4" fill="none" opacity="0.25" />
              <path d="M300,0 L280,300" stroke="currentColor" className="text-muted-foreground" strokeWidth="3" fill="none" opacity="0.2" />
              {/* Hall Road highlight */}
              <path d="M20,190 C130,160 240,210 390,140" stroke="#0066FF" strokeWidth="3" fill="none" strokeDasharray="6 6">
                <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.5s" repeatCount="indefinite" />
              </path>
              {/* pin */}
              <g transform="translate(210,175)">
                <circle r="24" fill="#FF6600" opacity="0.2">
                  <animate attributeName="r" values="18;30;18" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle r="10" fill="#FF6600" />
                <circle r="4" fill="#fff" />
              </g>
              <text x="230" y="170" className="fill-current text-foreground" fontSize="11" fontWeight="700" fontFamily="Space Grotesk">
                Main Hall Road
              </text>
              <text x="230" y="184" className="fill-current text-muted-foreground" fontSize="9" fontFamily="Plus Jakarta Sans">
                Awan Tech Institute
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Contact / Footer                                                          */
/* -------------------------------------------------------------------------- */

function ContactFooter() {
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    },
    []
  );

  const copy = async (value: string, label: string) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${label} copied to clipboard`);
    } catch {
      setToast("Copy failed — long-press to copy");
    }
    toastTimer.current = window.setTimeout(() => setToast(null), 2000);
  };


  return (
    <section id="contact" className="content-section relative pt-24 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-8 lg:gap-14">
          {/* Column 2 — contact cards parallel to the form */}
          <div
            className="transform-gpu lg:sticky lg:top-24"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--tech)]/40 bg-[var(--tech)]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--tech)]">
              <Sparkles className="h-3 w-3" />
              Click to copy number
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => copy("0335-3590008", "Primary phone")}
                className="group relative w-full overflow-hidden rounded-2xl border border-border bg-card px-5 py-5 text-left transition-colors hover:border-[var(--tech)]"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--tech)] to-transparent opacity-70" />
                <span className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: "radial-gradient(50% 40% at 50% 0%, var(--tech), transparent 70%)" }}
                />
                <span className="relative flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--tech)]/15 text-[var(--tech)] transition-transform duration-300 group-hover:scale-110">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
                      Primary — Call / WhatsApp
                    </span>
                    <span className="block font-display text-xl font-extrabold leading-tight tracking-tight text-[var(--tech)]">
                      0335-3590008
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </button>

              <button
                onClick={() => copy("0301-4692771", "Support line")}
                className="group relative w-full overflow-hidden rounded-2xl border border-border bg-card px-5 py-5 text-left transition-colors hover:border-[var(--power)]"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--power)] to-transparent opacity-70" />
                <span className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: "radial-gradient(50% 40% at 50% 0%, var(--power), transparent 70%)" }}
                />
                <span className="relative flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--power)]/15 text-[var(--power)] transition-transform duration-300 group-hover:scale-110">
                    <Headphones className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
                      Support — Admissions Desk
                    </span>
                    <span className="block font-display text-xl font-extrabold leading-tight tracking-tight text-[var(--power)]">
                      0301-4692771
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </button>

              <button
                onClick={() => copy("bmsaadnasir@gmail.com", "Email")}
                className="premium-lift group inline-flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-left hover:border-[var(--power)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--power)]/10 text-[var(--power)]">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
                    Email Admissions
                  </span>
                  <span className="block font-display text-lg font-bold">bmsaadnasir@gmail.com</span>
                </span>
                <ChevronRight className="ml-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Fees, seat availability, and batch schedules are handled personally by the institute. Tap any option above —
              it copies instantly.
            </p>
          </div>
        </div>

        {/* animated divider */}
        <div className="content-section relative my-16 h-px w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--tech)] to-transparent opacity-60" />
          <div className="absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-[var(--tech)] via-[var(--power)] to-transparent blur-[2px] animate-[slide_5s_linear_infinite]" />
          <style>{`@keyframes slide { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }`}</style>
        </div>

        <footer className="flex flex-col items-start justify-between gap-4 pb-10 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="grid h-6 w-6 place-items-center rounded bg-foreground text-background">
              <Wrench className="h-3 w-3" />
            </span>
            © {new Date().getFullYear()} Nasir Tech Institute — All rights reserved.
          </div>
          <div className="text-xs text-muted-foreground">Crafted with precision on Main Hall Road.</div>
        </footer>
      </div>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-[101] -translate-x-1/2 rounded-full border border-border bg-foreground px-4 py-2 text-sm font-medium text-background shadow-xl">
          {toast}
        </div>
      ) : null}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Root                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * One shared IntersectionObserver for every [data-reveal] element.
 * - No scroll listeners, so the main thread stays free.
 * - Hidden state is only armed once JS runs (html.reveal-ready), so content
 *   can never be permanently invisible if JS fails.
 * - A 3s failsafe reveals anything still pending.
 */
function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    els.forEach((el) => io.observe(el));

    const failsafe = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("is-revealed"));
      io.disconnect();
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}

export default function LandingPage() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[var(--tech)]/30">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Master />
        <Curriculum />
        <DiplomaShowcase />
        <Lab />
        <StatsBand />
        <ValueProps />
        <ContactFooter />
      </main>
    </div>
  );
}
