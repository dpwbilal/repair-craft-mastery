import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Clock, Users, Zap, ArrowRight, Cpu, CircuitBoard, BriefcaseBusiness, Quote } from "lucide-react";
import { TIERS } from "@/components/landing/LandingPage";

type Tier = (typeof TIERS)[number];

export const Route = createFileRoute("/course/$slug")({
  head: ({ params }) => {
    const tier = TIERS.find((t) => t.slug === params.slug);
    return {
      meta: [
        {
          title: tier
            ? `${tier.title} — Nasir Tech Institute`
            : "Course — Nasir Tech Institute",
        },
        {
          name: "description",
          content: tier
            ? `${tier.title} · ${tier.duration}. Hands-on mobile repair training under Sir Nasir Awan.`
            : "Explore our mobile repairing course tiers at Nasir Tech Institute.",
        },
        { property: "og:title", content: tier ? `${tier.title} — Nasir Tech Institute` : "Course — Nasir Tech Institute" },
        {
          property: "og:description",
          content: tier
            ? `${tier.title} · ${tier.duration}. Hands-on mobile repair training under Sir Nasir Awan.`
            : "Explore our mobile repairing course tiers at Nasir Tech Institute.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: tier ? `${tier.title} — Nasir Tech Institute` : "Course — Nasir Tech Institute" },
        {
          name: "twitter:description",
          content: tier
            ? `${tier.title} · ${tier.duration}. Hands-on mobile repair training under Sir Nasir Awan.`
            : "Explore our mobile repairing course tiers at Nasir Tech Institute.",
        },
      ],
    };
  },
  loader: ({ params }): { tier: Tier } => {
    const tier = TIERS.find((t) => t.slug === params.slug);
    if (!tier) throw notFound();
    return { tier };
  },
  component: CoursePage,
});

function CoursePage() {
  const { tier } = Route.useLoaderData();
  const phases = [
    {
      label: "Phase 1",
      title: "Component Fundamentals",
      body: "Mastering safe housing separation, precision glass extraction, and core diagnostic tools.",
      icon: Cpu,
    },
    {
      label: "Phase 2",
      title: "Advanced Schematic & Micro-Soldering",
      body: "Deep-dive logic tracing using Borneo Schematics, BGA IC Reballing, and advanced interfaces (UFI box / JCID).",
      icon: CircuitBoard,
    },
    {
      label: "Phase 3",
      title: "Real Market Diagnostics",
      body: "Hands-on hardware error resolution, double-board swapping, and commercial launch strategies.",
      icon: BriefcaseBusiness,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section
        data-reveal
        className="relative overflow-hidden border-b border-border pb-20 pt-28 sm:pt-32"
        style={{
          background: `radial-gradient(60% 60% at 50% 0%, ${tier.accent}22, transparent 70%)`,
        }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Institute
          </Link>

          <div
            className="mt-8"
          >
            <span
              className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black"
              style={{ backgroundColor: tier.accent }}
            >
              {tier.badge} Level · {tier.tier}
            </span>
            <h1
              className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              style={{ color: tier.accent }}
            >
              {tier.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              A complete, hands-on training program engineered on Main Hall Road, Lahore —
              taught personally by Sir Nasir Awan.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <InfoChip icon={<Clock className="h-4 w-4" />} label="Duration" value={tier.duration} accent={tier.accent} />
              <InfoChip icon={<Users className="h-4 w-4" />} label="Best For" value={tier.bestFor} accent={tier.accent} />
              <InfoChip icon={<Zap className="h-4 w-4" />} label="Format" value="100% Practical" accent={tier.accent} />
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section data-reveal className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-10">
        <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: tier.accent }}>
          What you'll master
        </div>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Curriculum breakdown
        </h2>

        <div className="mt-10 space-y-4">
          {tier.features.map((f: string, i: number) => (
            <div
              key={f}
              className="premium-lift group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-[color:var(--fg)]"
              style={{ ["--fg" as string]: `${tier.accent}66` }}
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold"
                style={{ backgroundColor: `${tier.accent}22`, color: tier.accent }}
              >
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="font-semibold text-foreground">{f}</div>
              </div>
              <Check className="mt-1 h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" style={{ color: tier.accent }} />
            </div>
          ))}
        </div>
      </section>

      <section data-reveal="slow" className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div
            className="max-w-2xl"
          >
            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: tier.accent }}>The learning path</div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">From first tool to market-ready mastery.</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <article
                  key={phase.label}
                  className="premium-lift relative overflow-hidden rounded-2xl border border-border bg-card p-6"
                  style={{ borderTopColor: tier.accent, borderTopWidth: 3 }}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ backgroundColor: `${tier.accent}20`, color: tier.accent }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="mt-5 text-[10px] font-bold uppercase tracking-widest" style={{ color: tier.accent }}>{phase.label}</div>
                  <h3 className="mt-2 font-display text-xl font-bold">{phase.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{phase.body}</p>
                </article>
              );
            })}
          </div>

          <blockquote
            className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-card p-7 sm:p-10"
          >
            <Quote className="h-9 w-9" style={{ color: tier.accent }} />
            <p className="mt-5 max-w-4xl font-display text-xl font-semibold leading-relaxed sm:text-2xl">
              “True mastery isn't just about replacing parts; it's about understanding the architecture of the board and executing repairs with surgical precision.”
            </p>
            <footer className="mt-5 text-sm font-semibold" style={{ color: tier.accent }}>Sir Nasir's Philosophy</footer>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section data-reveal="zoom" className="border-t border-border bg-surface py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to enroll?</h2>
          <p className="mt-3 text-muted-foreground">
            Seats are personally allocated. Speak with the institute to secure your batch.
          </p>
          <Link
            to="/"
            hash="contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-black transition-all hover:scale-[1.02]"
            style={{
              background: `linear-gradient(90deg, ${tier.accent}, var(--power))`,
              boxShadow: `0 20px 60px -16px ${tier.accent}88`,
            }}
          >
            Apply for {tier.badge} Level <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function InfoChip({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-sm"
      style={{ borderColor: `${accent}55` }}
    >
      <span
        className="grid h-8 w-8 place-items-center rounded-full"
        style={{ backgroundColor: `${accent}22`, color: accent }}
      >
        {icon}
      </span>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm font-bold text-foreground">{value}</div>
      </div>
    </div>
  );
}
