import { Star } from "lucide-react";

import { Reveal } from "@/components/common/Reveal";

const TESTIMONIALS = [
  {
    quote:
      "It planned a 10-day Japan trip better than the travel agent I paid $400 for. The hidden gems alone were worth it.",
    name: "Sofia Andersen",
    role: "Photographer · Copenhagen",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    quote:
      "The budget tracker kept our honeymoon on plan to the dollar. And the concierge swapped a rainy-day activity in seconds.",
    name: "Marcus Reyes",
    role: "Product Designer · Austin",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    quote:
      "I travel for work constantly. Voyage AI turns a free afternoon into a perfectly mapped micro-adventure.",
    name: "Priya Nair",
    role: "Consultant · Singapore",
    avatar: "https://i.pravatar.cc/120?img=32",
  },
  {
    quote:
      "Genuinely the most beautiful travel app I've used. It feels expensive in the best way.",
    name: "Tom Whitfield",
    role: "Founder · London",
    avatar: "https://i.pravatar.cc/120?img=15",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
            ))}
          </div>
          <h2 className="text-balance font-display text-4xl font-semibold md:text-5xl">
            Loved by curious travelers worldwide
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 columns-1 gap-4 md:columns-2 lg:columns-2 [&>*]:mb-4">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.05}>
            <figure className="break-inside-avoid rounded-3xl border border-border bg-card p-7 luxe-shadow">
              <blockquote className="font-display text-xl leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" loading="lazy" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
