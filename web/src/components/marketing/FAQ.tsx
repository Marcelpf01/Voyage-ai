import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/common/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How does the AI trip generator work?",
    a: "You tell us your destination, budget, travel dates, style, and interests. Our AI — powered by Google Gemini — crafts a complete day-by-day itinerary with real places, realistic coordinates, cost estimates, weather tips, and hidden gems in under 30 seconds.",
  },
  {
    q: "Is Voyage AI free to use?",
    a: "Yes! The Explorer plan is free forever and lets you plan one trip per month with a full itinerary and budget breakdown. Upgrade to Voyager or Compass for unlimited trips, interactive maps, PDF exports, and the live travel concierge.",
  },
  {
    q: "Can I edit the itinerary after it's generated?",
    a: "Absolutely. You can ask our built-in travel concierge to swap a hotel, add an activity, change the schedule, find vegan restaurants, or suggest rainy-day alternatives — all in natural language.",
  },
  {
    q: "What destinations do you cover?",
    a: "Every country and nearly every city in the world. Our AI draws on up-to-date knowledge of over 190 countries, from major capitals to off-the-beaten-path villages.",
  },
  {
    q: "Can I export or print my itinerary?",
    a: "Yes. Voyager and Compass subscribers can export beautifully formatted PDFs or share a public link. Print-friendly styling is built in.",
  },
  {
    q: "How accurate are the maps and locations?",
    a: "We use real geographic coordinates for every place — hotels, restaurants, landmarks, and hidden gems. Distances and walking times are computed from actual coordinates, not estimates.",
  },
  {
    q: "Can I plan trips with friends or family?",
    a: "Yes. Tell us how many travelers, and we'll tailor every suggestion — from group-friendly activities to transportation logistics. Compass subscribers can share trip plans with their team.",
  },
  {
    q: "Is my data private?",
    a: "Your trips and preferences are stored securely. We never sell your data or use it to train AI models. You can delete your account and all data at any time.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-30" />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">FAQ</span>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold md:text-5xl">
              Everything you need to know
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Still have questions? Reach out — our concierge team responds within hours.
            </p>
          </div>
        </Reveal>

        <div className="mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="rounded-2xl border border-border bg-card px-6 data-[state=open]:luxe-shadow"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
