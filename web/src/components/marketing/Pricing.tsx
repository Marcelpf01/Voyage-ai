import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Explorer",
    tagline: "For spontaneous getaways",
    price: "Free",
    period: "forever",
    features: [
      "1 trip per month",
      "Day-by-day itinerary",
      "Basic budget breakdown",
      "3 destination saves",
    ],
    cta: "Start free",
    href: "/register",
    featured: false,
  },
  {
    name: "Voyager",
    tagline: "For passionate travelers",
    price: "$12",
    period: "/month",
    features: [
      "Unlimited trips",
      "AI trip generator",
      "Interactive maps",
      "Full budget tracker",
      "PDF export",
      "Live travel concierge",
      "Weather & packing tips",
      "Priority AI generation",
    ],
    cta: "Start Voyager",
    href: "/register?plan=voyager",
    featured: true,
  },
  {
    name: "Compass",
    tagline: "For travel teams & pros",
    price: "$29",
    period: "/month",
    features: [
      "Everything in Voyager",
      "Unlimited travelers",
      "Advanced budget charts",
      "Shared trip planning",
      "Custom branding exports",
      "API access",
      "Dedicated support",
      "Early feature access",
    ],
    cta: "Go Compass",
    href: "/register?plan=compass",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Simple pricing
            </span>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold md:text-5xl">
              One plan. Infinite journeys.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free, upgrade when you're ready to travel seriously.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-8 luxe-shadow h-full",
                  tier.featured
                    ? "border-transparent bg-emerald-deep text-primary-foreground"
                    : "border-border bg-card",
                )}
              >
                {tier.featured && (
                  <>
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-accent-foreground">
                        <Sparkles className="h-3 w-3" />
                        Most popular
                      </span>
                    </div>
                  </>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-2xl font-semibold">{tier.name}</h3>
                  <p className={cn("mt-1 text-sm", tier.featured ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {tier.tagline}
                  </p>
                </div>

                <div className="mb-8">
                  <span className="font-display text-5xl font-semibold">{tier.price}</span>
                  <span className={cn("ml-1 text-sm", tier.featured ? "text-primary-foreground/60" : "text-muted-foreground")}>
                    {tier.period}
                  </span>
                </div>

                <ul className="mb-8 flex-1 space-y-3.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className={cn("mt-0.5 h-5 w-5 shrink-0", tier.featured ? "text-accent" : "text-accent")} />
                      <span className={cn("text-sm leading-relaxed", tier.featured ? "text-primary-foreground/80" : "text-foreground")}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "w-full rounded-2xl group",
                    tier.featured ? "bg-accent text-accent-foreground hover:bg-accent/90" : "",
                  )}
                >
                  <Link to={tier.href}>
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
