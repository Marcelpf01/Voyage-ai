import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Search, Sparkles, Star, Play, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const STATS = [
  { value: "2M+", label: "Itineraries crafted" },
  { value: "190+", label: "Countries covered" },
  { value: "4.9", label: "Average rating" },
];

const QUICK_TRIPS = [
  { label: "Amalfi Coast", dest: "Amalfi Coast, Italy" },
  { label: "Tokyo", dest: "Tokyo, Japan" },
  { label: "Paris", dest: "Paris, France" },
  { label: "Bali", dest: "Bali, Indonesia" },
  { label: "New York", dest: "New York, USA" },
  { label: "Santorini", dest: "Santorini, Greece" },
];

const ITINERARY_PREVIEW = [
  { day: 1, title: "Arrival & Oia Sunset", activity: "Private transfer to your caldera suite" },
  { day: 2, title: "Caldera Cruise", activity: "Hot springs, volcanic isles & swim" },
  { day: 3, title: "Wine & Whitewashed", activity: "Cliffside wineries & Pyrgos village" },
];

export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [imgError, setImgError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const go = () => navigate(`/register${query ? `?dest=${encodeURIComponent(query)}` : ""}`);
  const goDemo = () => navigate("/login?demo=1");

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* Parallax background with fallback gradient */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {!imgError ? (
          <img
            src="https://images.unsplash.com/photo-1758146928286-eb515c0c5968?w=2000&q=80&auto=format&fit=crop"
            alt="Santorini, Greece — whitewashed buildings cascading down the caldera cliffs above the deep blue Aegean Sea"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-blue-900 to-amber-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-background" />
        <div className="absolute inset-0 bg-aurora animate-aurora mix-blend-soft-light" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 pt-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass-dark mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Powered by Gemini · Your AI Travel Companion
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-balance font-display text-5xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl"
        >
          Plan unforgettable
          <br />
          trips with AI.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-balance text-lg text-white/80"
        >
          Voyage AI creates personalized itineraries, budgets, maps, and travel
          recommendations in seconds. Describe your dream trip and let AI handle the rest.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button onClick={go} size="lg" className="group h-14 rounded-2xl px-8 text-base">
            <Search className="mr-2 h-4 w-4" />
            Start planning
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button onClick={goDemo} variant="outline" size="lg" className="h-14 rounded-2xl border-white/20 bg-white/10 px-8 text-base text-white backdrop-blur hover:bg-white/20 hover:text-white">
            <Play className="mr-2 h-4 w-4" />
            View demo
          </Button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass mt-10 w-full max-w-2xl rounded-[1.6rem] p-2 luxe-shadow-lg"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 px-4 py-3">
              <MapPin className="h-5 w-5 shrink-0 text-accent" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && go()}
                placeholder="Where to? Try 'Kyoto in spring'"
                className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                aria-label="Destination"
              />
            </div>
            <Button onClick={go} size="lg" className="group h-14 rounded-2xl px-7 text-base">
              <Search className="mr-1 h-4 w-4" />
              Plan my trip
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>

        {/* Popular quick-start */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-sm text-white/60">Popular:</span>
          {QUICK_TRIPS.map((s) => (
            <button
              key={s.label}
              onClick={() => setQuery(s.dest)}
              className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur transition hover:border-accent hover:text-white"
            >
              {s.label}
            </button>
          ))}
        </motion.div>

        {/* Demo itinerary preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-dark mt-10 hidden w-full max-w-2xl rounded-2xl p-6 text-left md:block"
        >
          <div className="mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-white/80">Santorini, Greece</span>
            <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent">Romantic</span>
          </div>
          <p className="text-xs text-white/60">5-day sample itinerary · Santorini</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {ITINERARY_PREVIEW.map((day) => (
              <div key={day.day} className="rounded-xl bg-white/10 p-3 backdrop-blur">
                <div className="text-xs font-semibold text-accent">Day {day.day}</div>
                <div className="mt-1 text-sm font-medium text-white">{day.title}</div>
                <div className="mt-0.5 text-xs text-white/60">{day.activity}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/login?demo=1")}
            className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
          >
            Explore full itinerary <ChevronRight className="h-3 w-3" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-14 flex items-center gap-8"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="flex items-center justify-center gap-1 font-display text-3xl font-semibold text-white">
                {s.label === "Average rating" && <Star className="h-5 w-5 fill-accent text-accent" />}
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/60">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
