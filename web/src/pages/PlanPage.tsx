import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  Compass,
  Plane,
  Footprints,
  Car,
  Bus,
  Train,
  Bike,
  Building,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTripStore } from "@/store/tripStore";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";
import { generateItinerary } from "@/services/tripService";
import { toast } from "sonner";
import type { TravelStyle, Interest, Transportation, HotelLevel, WalkingDistance } from "@/types";

/* ─── Schema ─── */
const planSchema = z.object({
  destination: z.string().min(2, "Where are you heading?"),
  startDate: z.string().min(1, "Pick a start date"),
  endDate: z.string().min(1, "Pick an end date"),
  travelers: z.coerce.number().min(1, "At least 1 traveler").max(20, "Max 20 travelers"),
  budget: z.coerce.number().min(1, "Set a budget — even $100 is fine"),
  style: z.string(),
  interests: z.array(z.string()),
  walkingDistance: z.string(),
  transportation: z.string(),
  hotelLevel: z.string(),
});

type PlanForm = z.infer<typeof planSchema>;

/* ─── Options ─── */
const TRAVEL_STYLES: { id: TravelStyle; icon: typeof Compass; label: string; desc: string }[] = [
  { id: "Adventure", icon: Compass, label: "Adventure", desc: "Thrill & exploration" },
  { id: "Luxury", icon: Star, label: "Luxury", desc: "5-star indulgence" },
  { id: "Family", icon: Users, label: "Family", desc: "Kid-friendly fun" },
  { id: "Business", icon: Building, label: "Business", desc: "Efficient & polished" },
  { id: "Romantic", icon: Sparkles, label: "Romantic", desc: "Couples' escape" },
  { id: "Food", icon: Compass, label: "Food", desc: "Culinary tour" },
  { id: "Beach", icon: Plane, label: "Beach", desc: "Sun & sand" },
  { id: "Backpacking", icon: Footprints, label: "Backpacking", desc: "Budget adventure" },
];

const INTERESTS: { id: Interest; emoji: string; label: string }[] = [
  { id: "Museums", emoji: "🏛️", label: "Museums" },
  { id: "Nightlife", emoji: "🌃", label: "Nightlife" },
  { id: "Nature", emoji: "🌿", label: "Nature" },
  { id: "Restaurants", emoji: "🍽️", label: "Restaurants" },
  { id: "Shopping", emoji: "🛍️", label: "Shopping" },
  { id: "History", emoji: "🏰", label: "History" },
  { id: "Culture", emoji: "🎭", label: "Culture" },
  { id: "Sports", emoji: "⚽", label: "Sports" },
];

const TRANSPORT_OPTIONS: { id: Transportation; icon: typeof Train; label: string }[] = [
  { id: "Walking", icon: Footprints, label: "Walking" },
  { id: "Public Transit", icon: Train, label: "Public Transit" },
  { id: "Rental Car", icon: Car, label: "Rental Car" },
  { id: "Rideshare", icon: Car, label: "Rideshare" },
  { id: "Mixed", icon: Bus, label: "Mixed" },
];

const HOTEL_LEVELS: { id: HotelLevel; label: string; desc: string }[] = [
  { id: "Hostel", label: "Hostel", desc: "Budget social" },
  { id: "3-Star", label: "3-Star", desc: "Comfortable value" },
  { id: "4-Star", label: "4-Star", desc: "Upscale quality" },
  { id: "5-Star", label: "5-Star", desc: "Luxury experience" },
  { id: "Boutique", label: "Boutique", desc: "Unique & charming" },
];

const WALKING_OPTIONS: { id: WalkingDistance; label: string }[] = [
  { id: "Minimal", label: "Minimal" },
  { id: "Moderate", label: "Moderate" },
  { id: "Plenty", label: "Plenty" },
];

const QUICK_STARTS = [
  { dest: "Amalfi Coast, Italy", label: "Amalfi Coast", emoji: "🍋" },
  { dest: "Tokyo, Japan", label: "Tokyo", emoji: "🍣" },
  { dest: "Paris, France", label: "Paris", emoji: "🥐" },
  { dest: "Bali, Indonesia", label: "Bali", emoji: "🌴" },
  { dest: "New York, USA", label: "New York", emoji: "🗽" },
  { dest: "Santorini, Greece", label: "Santorini", emoji: "🏛️" },
];

const STEPS = [
  { label: "Destination", icon: MapPin },
  { label: "Dates & travelers", icon: Calendar },
  { label: "Style", icon: Sparkles },
  { label: "Interests", icon: Compass },
  { label: "Preferences", icon: Star },
];

/* ─── Page ─── */
const PlanPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addTrip = useTripStore((s) => s.addTrip);
  const defaultCurrency = useSettingsStore((s) => s.defaultCurrency);
  const markViewed = useTripStore((s) => s.markViewed);
  const isDemo = useAuthStore((s) => s.isDemo);

  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [quickStartOpen, setQuickStartOpen] = useState(true);

  const prefilledDest = searchParams.get("dest");

  const form = useForm<PlanForm>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      destination: prefilledDest ?? "",
      startDate: "",
      endDate: "",
      travelers: 2,
      budget: 2000,
      style: "Adventure",
      interests: [],
      walkingDistance: "Moderate",
      transportation: "Mixed",
      hotelLevel: "4-Star",
    },
    mode: "onChange",
  });

  // Prefill from URL query param
  useEffect(() => {
    if (prefilledDest) {
      form.setValue("destination", prefilledDest);
      setQuickStartOpen(false);
    }
  }, [prefilledDest, form]);

  const { watch, setValue, formState } = form;
  const interests = watch("interests");
  const style = watch("style");
  const walkingDistance = watch("walkingDistance");
  const transportation = watch("transportation");
  const hotelLevel = watch("hotelLevel");
  const destination = watch("destination");

  const canNext = (s: number): boolean => {
    switch (s) {
      case 0: return watch("destination").trim().length >= 2;
      case 1: return watch("startDate") !== "" && watch("endDate") !== "" && watch("travelers") > 0 && watch("budget") > 0;
      default: return true;
    }
  };

  const toggleInterest = (id: Interest) => {
    const next = interests.includes(id) ? interests.filter((i) => i !== id) : [...interests, id];
    setValue("interests", next, { shouldValidate: true });
  };

  const quickFill = (dest: string) => {
    setValue("destination", dest);
    setQuickStartOpen(false);
    if (dest === "Amalfi Coast, Italy") {
      setValue("style", "Luxury");
      setValue("interests", ["Restaurants", "Nature", "Culture"]);
    } else if (dest === "Tokyo, Japan") {
      setValue("style", "Food");
      setValue("interests", ["Restaurants", "Culture", "Shopping"]);
    } else if (dest === "Bali, Indonesia") {
      setValue("style", "Beach");
      setValue("interests", ["Nature", "Restaurants", "Culture"]);
    }
    toast.success(`${dest} pre-filled! Adjust anything below.`);
  };

  const onSubmit = async (data: PlanForm) => {
    setGenerating(true);
    setGenProgress(0);

    const progressTimer = setInterval(() => {
      setGenProgress((p) => Math.min(p + Math.random() * 15, 90));
    }, 400);

    try {
      const itinerary = await generateItinerary({
        destination: data.destination,
        budget: data.budget,
        currency: defaultCurrency,
        startDate: data.startDate,
        endDate: data.endDate,
        travelers: data.travelers,
        style: data.style as TravelStyle,
        interests: data.interests as Interest[],
        walkingDistance: data.walkingDistance as WalkingDistance,
        transportation: data.transportation as Transportation,
        hotelLevel: data.hotelLevel as HotelLevel,
      });

      clearInterval(progressTimer);
      setGenProgress(100);

      const status = data.budget === 0 ? "draft" : "upcoming";
      const trip = addTrip(
        {
          destination: data.destination,
          budget: data.budget,
          currency: defaultCurrency,
          startDate: data.startDate,
          endDate: data.endDate,
          travelers: data.travelers,
          style: data.style as TravelStyle,
          interests: data.interests as Interest[],
          walkingDistance: data.walkingDistance as WalkingDistance,
          transportation: data.transportation as Transportation,
          hotelLevel: data.hotelLevel as HotelLevel,
        },
        itinerary,
        undefined,
        status,
      );

      markViewed(trip.id);
      toast.success("Your itinerary is ready!");
      navigate(`/trips/${trip.id}`);
    } catch (e) {
      clearInterval(progressTimer);
      toast.error(e instanceof Error ? e.message : "Generation failed. Try again.");
      setGenerating(false);
    }
  };

  /* ─── Generating overlay ─── */
  if (generating) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-8 grid h-24 w-24 place-items-center rounded-full bg-accent/10"
        >
          <Compass className="h-12 w-12 animate-spin-slow text-accent" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-semibold"
        >
          Crafting your itinerary…
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-muted-foreground"
        >
          Our AI is mapping out your perfect trip to{" "}
          <span className="font-semibold text-foreground">{watch("destination")}</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 w-full max-w-md"
        >
          <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-accent"
              animate={{ width: `${genProgress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {genProgress < 30 && "Analyzing your preferences…"}
            {genProgress >= 30 && genProgress < 60 && "Finding hidden gems…"}
            {genProgress >= 60 && genProgress < 90 && "Building your day-by-day plan…"}
            {genProgress >= 90 && genProgress < 100 && "Almost ready…"}
            {genProgress === 100 && "Done!"}
          </p>
        </motion.div>
      </div>
    );
  }

  /* ─── Step content ─── */
  return (
    <div className="mx-auto max-w-2xl">
      {/* Quick-start bar */}
      <AnimatePresence>
        {quickStartOpen && step === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mb-8"
          >
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <p className="text-sm font-semibold">Quick-start your trip</p>
                {isDemo && (
                  <span className="ml-auto rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">Demo</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
                {QUICK_STARTS.map((qs) => (
                  <button
                    key={qs.dest}
                    onClick={() => quickFill(qs.dest)}
                    className="flex items-center gap-1.5 rounded-2xl border border-border px-3 py-2.5 text-xs font-medium transition-all hover:border-accent/40 hover:bg-accent/5"
                  >
                    <span className="text-sm">{qs.emoji}</span>
                    {qs.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => i < step && setStep(i)}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full text-xs font-semibold transition-all",
                  i < step
                    ? "bg-accent text-accent-foreground"
                    : i === step
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-secondary text-muted-foreground",
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden text-[10px] font-medium sm:block",
                  i <= step ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Destination */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold">Where to?</h2>
              <p className="mt-2 text-muted-foreground">Tell us your dream destination.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-accent" />
                <Input
                  id="destination"
                  placeholder="Kyoto, Japan"
                  className="h-14 rounded-2xl pl-12 text-lg"
                  {...form.register("destination")}
                />
              </div>
              {formState.errors.destination && (
                <p className="text-xs text-destructive">{formState.errors.destination.message}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 1: Dates & travelers */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold">When & who?</h2>
              <p className="mt-2 text-muted-foreground">Dates, travelers, and budget.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start date</Label>
                <Input id="startDate" type="date" className="h-12 rounded-2xl" {...form.register("startDate")} />
                {formState.errors.startDate && <p className="text-xs text-destructive">{formState.errors.startDate.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End date</Label>
                <Input id="endDate" type="date" className="h-12 rounded-2xl" {...form.register("endDate")} />
                {formState.errors.endDate && <p className="text-xs text-destructive">{formState.errors.endDate.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="travelers">Travelers</Label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => { const v = watch("travelers"); if (v > 1) setValue("travelers", v - 1); }}
                  className="grid h-12 w-12 place-items-center rounded-2xl border border-border hover:bg-secondary"
                >-</button>
                <span className="font-display text-2xl font-semibold">{watch("travelers")}</span>
                <button
                  type="button"
                  onClick={() => { const v = watch("travelers"); if (v < 20) setValue("travelers", v + 1); }}
                  className="grid h-12 w-12 place-items-center rounded-2xl border border-border hover:bg-secondary"
                >+</button>
              </div>
              {formState.errors.travelers && <p className="text-xs text-destructive">{formState.errors.travelers.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Total budget ({defaultCurrency})</Label>
              <Input id="budget" type="number" placeholder="2500" className="h-12 rounded-2xl" {...form.register("budget")} />
              {formState.errors.budget && <p className="text-xs text-destructive">{formState.errors.budget.message}</p>}
            </div>
          </motion.div>
        )}

        {/* Step 2-4: (same pattern, condensed) */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold">Travel vibe</h2>
              <p className="mt-2 text-muted-foreground">What kind of experience are you after?</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TRAVEL_STYLES.map((s) => (
                <motion.button key={s.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button"
                  onClick={() => setValue("style", s.id, { shouldValidate: true })}
                  className={cn("flex flex-col items-center gap-3 rounded-2xl border p-5 transition-all",
                    style === s.id ? "border-accent bg-accent/10 text-foreground luxe-shadow" : "border-border bg-card text-muted-foreground hover:border-accent/40")}>
                  <s.icon className={cn("h-7 w-7", style === s.id && "text-accent")} />
                  <div><p className="text-sm font-semibold">{s.label}</p><p className="text-xs opacity-60">{s.desc}</p></div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold">What moves you?</h2>
              <p className="mt-2 text-muted-foreground">Select all that appeal.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {INTERESTS.map((int) => {
                const active = interests.includes(int.id);
                return (
                  <motion.button key={int.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} type="button"
                    onClick={() => toggleInterest(int.id)}
                    className={cn("flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all",
                      active ? "border-accent bg-accent/10 text-foreground" : "border-border bg-card text-muted-foreground hover:border-accent/40")}>
                    <span className="text-2xl">{int.emoji}</span>
                    <span className="text-xs font-medium">{int.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold">Fine-tune</h2>
              <p className="mt-2 text-muted-foreground">Set your travel preferences.</p>
            </div>
            <div className="space-y-3">
              <Label>Transportation preference</Label>
              <div className="flex flex-wrap gap-2">
                {TRANSPORT_OPTIONS.map((o) => (
                  <button key={o.id} type="button" onClick={() => setValue("transportation", o.id as Transportation)}
                    className={cn("flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      transportation === o.id ? "border-accent bg-accent/10 text-foreground" : "border-border text-muted-foreground hover:border-accent/40")}>
                    <o.icon className="h-4 w-4" />{o.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <Label>Accommodation level</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {HOTEL_LEVELS.map((o) => (
                  <button key={o.id} type="button" onClick={() => setValue("hotelLevel", o.id as HotelLevel)}
                    className={cn("flex flex-col items-center gap-1 rounded-2xl border p-4 transition-all",
                      hotelLevel === o.id ? "border-accent bg-accent/10 text-foreground" : "border-border text-muted-foreground hover:border-accent/40")}>
                    <span className="text-sm font-semibold">{o.label}</span>
                    <span className="text-xs opacity-60">{o.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <Label>Walking tolerance</Label>
              <div className="flex gap-2">
                {WALKING_OPTIONS.map((o) => (
                  <button key={o.id} type="button" onClick={() => setValue("walkingDistance", o.id as WalkingDistance)}
                    className={cn("flex-1 rounded-2xl border py-4 text-center text-sm font-medium transition-all",
                      walkingDistance === o.id ? "border-accent bg-accent/10 text-foreground" : "border-border text-muted-foreground hover:border-accent/40")}>
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={form.handleSubmit(onSubmit)} size="lg" className="w-full h-14 rounded-2xl text-lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Generate my itinerary
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="rounded-2xl">
          <ChevronLeft className="mr-1 h-4 w-4" />Back
        </Button>
        {step < 4 ? (
          <Button onClick={() => setStep((s) => Math.min(4, s + 1))} disabled={!canNext(step)} className="rounded-2xl">
            Next<ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (<div />)}
      </div>
    </div>
  );
};

export default PlanPage;
