import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Calendar,
  MoreHorizontal,
  Pencil,
  Copy,
  Archive,
  Trash2,
  Search,
  Filter,
  Grid3x3,
  List,
  Sparkles,
  Compass,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTripStore } from "@/store/tripStore";
import { formatDateRange, formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { TripStatus } from "@/types";

const STATUS_FILTERS: { label: string; value: TripStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Drafts", value: "draft" },
  { label: "Completed", value: "completed" },
  { label: "Archived", value: "archived" },
];

const TripsListPage = () => {
  const navigate = useNavigate();
  const trips = useTripStore((s) => s.trips);
  const toggleFavorite = useTripStore((s) => s.toggleFavorite);
  const duplicateTrip = useTripStore((s) => s.duplicateTrip);
  const deleteTrip = useTripStore((s) => s.deleteTrip);
  const setStatus = useTripStore((s) => s.setStatus);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TripStatus | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = trips
    .filter((t) => filter === "all" || t.status === filter)
    .filter((t) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.itinerary.destination.toLowerCase().includes(q) ||
        t.itinerary.country.toLowerCase().includes(q)
      );
    });

  const empty = filtered.length === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-3xl font-semibold">My trips</h1>
          <p className="mt-1 text-muted-foreground">{trips.length} trip(s) total</p>
        </div>
        <Button className="rounded-2xl" onClick={() => navigate("/plan")}>
          <Sparkles className="mr-2 h-4 w-4" />
          New trip
        </Button>
      </motion.div>

      {/* Search & filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search trips or destinations…"
            className="pl-10 h-11 rounded-2xl"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex rounded-2xl border border-border p-0.5">
          <button
            onClick={() => setView("grid")}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-xl transition-colors",
              view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
            aria-label="Grid view"
          >
            <Grid3x3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-xl transition-colors",
              view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Empty */}
      {empty && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-border bg-card p-12 text-center"
        >
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent/10">
            {search ? <Search className="h-8 w-8 text-accent" /> : <Compass className="h-8 w-8 text-accent" />}
          </div>
          <h3 className="font-display text-xl font-semibold">
            {search ? "No matching trips" : "No trips yet"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {search ? "Try a different search or filter." : "Create your first trip and let AI plan it for you."}
          </p>
          {!search && (
            <Button className="mt-4 rounded-2xl" onClick={() => navigate("/plan")}>
              <Sparkles className="mr-2 h-4 w-4" />
              Plan a trip
            </Button>
          )}
        </motion.div>
      )}

      {/* Grid view */}
      {!empty && view === "grid" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((trip, i) => (
            <motion.button
              key={trip.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/trips/${trip.id}`)}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card text-left luxe-shadow"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={trip.coverImage}
                  alt={trip.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {trip.favorite && (
                  <Star className="absolute right-3 top-3 h-5 w-5 fill-accent text-accent drop-shadow-lg" />
                )}
                <Badge className="absolute left-3 top-3 rounded-full bg-white/20 text-white backdrop-blur text-xs">
                  {trip.status}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold">{trip.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {trip.itinerary.destination}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDateRange(trip.request.startDate, trip.request.endDate)}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full text-xs">
                    {trip.request.style}
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-xs">
                    {formatCurrency(trip.request.budget, trip.request.currency)}
                  </Badge>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* List view */}
      {!empty && view === "list" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
          {filtered.map((trip, i) => (
            <motion.button
              key={trip.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ x: 4 }}
              onClick={() => navigate(`/trips/${trip.id}`)}
              className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-shadow hover:luxe-shadow"
            >
              <img
                src={trip.coverImage}
                alt={trip.name}
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold">{trip.name}</h3>
                  {trip.favorite && <Star className="h-3.5 w-3.5 fill-accent text-accent" />}
                </div>
                <p className="text-sm text-muted-foreground">
                  {trip.itinerary.destination}, {trip.itinerary.country} · {formatDateRange(trip.request.startDate, trip.request.endDate)}
                </p>
              </div>
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <Badge variant="secondary" className="rounded-full text-xs">{trip.request.style}</Badge>
                <Badge variant="outline" className="rounded-full text-xs">{trip.status}</Badge>
              </div>
              <span className="hidden text-sm font-semibold sm:inline">
                {formatCurrency(trip.request.budget, trip.request.currency)}
              </span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default TripsListPage;
