import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Reveal } from "@/components/common/Reveal";
import { useAuthStore } from "@/store/authStore";

const DESTINATIONS = [
  { name: "Maldives", country: "Indian Ocean", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80&auto=format&fit=crop", tag: "Beach", dest: "Maldives" },
  { name: "Kyoto", country: "Japan", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80", tag: "Culture", dest: "Kyoto, Japan" },
  { name: "Santorini", country: "Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=80", tag: "Romantic", dest: "Santorini, Greece" },
  { name: "Marrakech", country: "Morocco", img: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=900&q=80", tag: "Adventure", dest: "Marrakech, Morocco" },
  { name: "Banff", country: "Canada", img: "https://images.unsplash.com/photo-1561134643-668f9057cce4?w=900&q=80", tag: "Nature", dest: "Banff, Canada" },
  { name: "Dubai", country: "UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80", tag: "Luxury", dest: "Dubai, UAE" },
];

export function Destinations() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const handleClick = (dest: string) => {
    if (user) {
      navigate(`/plan?dest=${encodeURIComponent(dest)}`);
    } else {
      navigate(`/register?dest=${encodeURIComponent(dest)}`);
    }
  };

  return (
    <section id="destinations" className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Wanderlist</span>
            <h2 className="mt-3 max-w-xl text-balance font-display text-4xl font-semibold md:text-5xl">
              Destinations our travelers adore
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            A few favorites to spark ideas. Pick one — or describe somewhere entirely your own.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {DESTINATIONS.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.06}>
            <motion.button
              whileHover={{ y: -6 }}
              onClick={() => handleClick(d.dest)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl luxe-shadow"
            >
              <img
                src={d.img}
                alt={`${d.name}, ${d.country}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {d.tag}
              </span>
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-left text-white">
                <div>
                  <div className="font-display text-2xl font-semibold">{d.name}</div>
                  <div className="text-sm text-white/70">{d.country}</div>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
