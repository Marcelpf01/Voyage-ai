import { motion } from "framer-motion";
import { Bot, CalendarRange, Map, PiggyBank, ShieldCheck, Sparkles } from "lucide-react";

import { Reveal } from "@/components/common/Reveal";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI itinerary generation",
    desc: "Describe your style and budget — Gemini composes a polished day-by-day plan in seconds.",
    span: "md:col-span-2",
    accent: true,
  },
  {
    icon: Map,
    title: "Interactive maps",
    desc: "Every hotel, restaurant and landmark pinned with walking times and directions.",
  },
  {
    icon: PiggyBank,
    title: "Smart budget tracking",
    desc: "Live breakdowns across flights, stays, food and more with beautiful charts.",
  },
  {
    icon: Bot,
    title: "Live travel concierge",
    desc: "Ask to swap a hotel, find vegan spots or move everything a day later — instantly.",
  },
  {
    icon: CalendarRange,
    title: "Save, share & export",
    desc: "Keep every trip in one place. Export to PDF or share a public link.",
    span: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Local intelligence",
    desc: "Weather tips, packing lists, safety advice and hidden gems for every destination.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-60" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Everything included</span>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold md:text-5xl">
              A private travel studio, reimagined by AI
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The thoughtful details of a luxury concierge, with the speed and precision of intelligent software.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05} className={f.span}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`group relative h-full overflow-hidden rounded-3xl border p-7 transition-shadow hover:luxe-shadow ${
                  f.accent
                    ? "border-transparent bg-emerald-deep text-primary-foreground"
                    : "border-border bg-card"
                }`}
              >
                {f.accent && <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />}
                <span
                  className={`relative grid h-12 w-12 place-items-center rounded-2xl ${
                    f.accent ? "bg-accent/20 text-accent" : "bg-secondary text-primary"
                  }`}
                >
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 font-display text-xl font-semibold">{f.title}</h3>
                <p className={`relative mt-2 text-sm leading-relaxed ${f.accent ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {f.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
