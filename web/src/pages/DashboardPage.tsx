import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Compass,
  Map,
  PiggyBank,
  Calendar,
  Star,
  ArrowRight,
  Sparkles,
  Plane,
  Clock,
  Play,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTripStore } from "@/store/tripStore";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency, formatDateRange, tripDurationDays } from "@/lib/format";
import { cn } from "@/lib/utils";

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isDemo = useAuthStore((s) => s.isDemo);
  const trips = useTripStore((s) => s.trips);
  const recentlyViewed = useTripStore((s) => s.recentlyViewed);
  const getTrip = useTripStore((s) => s.getTrip);

  const activeTrips = trips.filter((t) => t.status === "upcoming" || t.status === "draft");
  const completedTrips = trips.filter((t) => t.status === "completed");
  const favorited = trips.filter((t) => t.favorite);

  const totalBudget = trips.reduce((sum, t) => sum + t.request.budget, 0);
  const totalDays = trips.reduce((sum, t) => sum + tripDurationDays(t.request.startDate, t.request.endDate), 0);
  const countries = [...new Set(trips.map((t) => t.itinerary?.country).filter(Boolean))];

  const recentTrips = recentlyViewed
    .map((id) => getTrip(id))
    .filter(Boolean)
    .slice(0, 4);

  const stats = [
    { label: "Trips planned", value: trips.length, icon: Map, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Countries", value: countries.length, icon: Plane, color: "text-accent", bg: "bg-accent/10" },
    { label: "Days traveled", value: totalDays, icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Budget managed", value: formatCurrency(totalBudget), icon: PiggyBank, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const empty = trips.length === 0;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">
              {isDemo ? "Welcome, explorer" : `Welcome back${user?.name ? `, ${user.name.split(" ")[0]}` : ""}`}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {isDemo ? "This is a demo account with sample trips. Explore freely!" : "Your next adventure is a click away."}
            </p>
          </div>
          <Button className="rounded-2xl" onClick={() => navigate("/plan")}>
            <Sparkles className="mr-2 h-4 w-4" />Plan a trip
          </Button>
        </div>
      </motion.div>

      {/* Demo onboarding banner */}
      {isDemo && !empty && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="rounded-3xl border border-accent/30 bg-accent/5 p-5 flex flex-wrap items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/10">
            <Play className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">You're in demo mode</p>
            <p className="text-sm text-muted-foreground">Explore sample trips for Amalfi Coast, Tokyo, and Bali. Create your own account to save real trips.</p>
          </div>
          <Button variant="outline" className="rounded-2xl" onClick={() => navigate("/register")}>Create free account</Button>
        </motion.div>
      )}

      {/* Stats */}
      {!empty && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="rounded-3xl border-border">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 font-display text-2xl font-semibold">{stat.value}</p>
                  </div>
                  <div className={cn("grid h-10 w-10 place-items-center rounded-2xl", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Empty state */}
      {empty && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-12 text-center luxe-shadow">
          <div className="pointer-events-none absolute inset-0 bg-aurora opacity-40" />
          <div className="relative mx-auto max-w-md">
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-accent/10">
              <Compass className="h-10 w-10 text-accent" />
            </div>
            <h2 className="font-display text-2xl font-semibold">Your journey begins here</h2>
            <p className="mt-3 text-muted-foreground">
              Create your first trip and let our AI design a personalized itinerary — complete with maps, budgets, and hidden gems. Or jump into the demo to see what's possible.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button onClick={() => navigate("/plan")} size="lg" className="rounded-2xl">
                <Sparkles className="mr-2 h-4 w-4" />Plan your first trip
              </Button>
              {!isDemo && (
                <Button onClick={() => {
                  useAuthStore.getState().loginAsDemo();
                  useTripStore.getState().seedDemoTrips();
                  navigate("/dashboard");
                }} variant="outline" size="lg" className="rounded-2xl">
                  <Zap className="mr-2 h-4 w-4" />Try demo
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Active trips */}
      {activeTrips.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">
              {isDemo ? "Sample upcoming trips" : "Upcoming trips"}
            </h2>
            <Button variant="ghost" size="sm" className="rounded-full" onClick={() => navigate("/trips")}>
              View all<ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeTrips.slice(0, 3).map((trip, i) => (
              <motion.button key={trip.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }} whileHover={{ y: -4 }}
                onClick={() => navigate(`/trips/${trip.id}`)}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card text-left luxe-shadow">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={trip.coverImage} alt={trip.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {trip.favorite && <Star className="absolute right-3 top-3 h-5 w-5 fill-accent text-accent drop-shadow-lg" />}
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold">{trip.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {formatDateRange(trip.request.startDate, trip.request.endDate)} · {trip.request.travelers} traveler(s)
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full">{trip.request.style}</Badge>
                    <Badge variant="outline" className="rounded-full">{formatCurrency(trip.request.budget, trip.request.currency)}</Badge>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Completed trips */}
      {completedTrips.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Past journeys</h2>
            <Button variant="ghost" size="sm" className="rounded-full" onClick={() => navigate("/trips")}>
              View all<ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completedTrips.slice(0, 3).map((trip, i) => (
              <motion.button key={trip.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }} whileHover={{ y: -4 }}
                onClick={() => navigate(`/trips/${trip.id}`)}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card text-left luxe-shadow opacity-80 hover:opacity-100">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={trip.coverImage} alt={trip.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {trip.favorite && <Star className="absolute right-3 top-3 h-5 w-5 fill-accent text-accent drop-shadow-lg" />}
                  <Badge className="absolute left-3 top-3 rounded-full bg-white/20 text-white backdrop-blur text-xs">Completed</Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold">{trip.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{trip.itinerary?.country}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Continue planning — most recent draft */}
      {trips.some((t) => t.status === "draft") && (
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold">Continue planning</h2>
          <div className="rounded-3xl border border-border bg-card p-5 flex flex-wrap items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/10">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">
                {trips.filter((t) => t.status === "draft").length} draft trip(s) waiting
              </p>
              <p className="text-sm text-muted-foreground">Finish planning your saved drafts or start something new.</p>
            </div>
            <Button variant="outline" className="rounded-2xl" onClick={() => navigate("/trips")}>View drafts</Button>
          </div>
        </section>
      )}

      {/* Recent destinations */}
      {recentTrips.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold">Recently viewed</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentTrips.map((trip) => trip && (
              <motion.button key={trip.id} whileHover={{ y: -2 }} onClick={() => navigate(`/trips/${trip.id}`)}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-shadow hover:luxe-shadow">
                <img src={trip.coverImage} alt={trip.name} className="h-12 w-12 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{trip.name}</p>
                  <p className="text-xs text-muted-foreground">{trip.itinerary?.country}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Favorites */}
      {favorited.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold">Favorites</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorited.slice(0, 3).map((trip, i) => (
              <motion.button key={trip.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }} whileHover={{ y: -4 }}
                onClick={() => navigate(`/trips/${trip.id}`)}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card text-left luxe-shadow">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={trip.coverImage} alt={trip.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Star className="absolute right-3 top-3 h-5 w-5 fill-accent text-accent drop-shadow-lg" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold">{trip.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{trip.itinerary?.country}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardPage;
