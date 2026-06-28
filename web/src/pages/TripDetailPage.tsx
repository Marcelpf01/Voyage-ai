import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Star,
  Download,
  Share2,
  Copy,
  Trash2,
  Pencil,
  ChevronLeft,
  Sun,
  Moon,
  CloudRain,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  Gem,
  UtensilsCrossed,
  Clock,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Wand2,
  ArrowDown,
  ArrowUp,
  Coffee,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTripStore } from "@/store/tripStore";
import { formatCurrency, formatDateRange, CATEGORY_META } from "@/lib/format";
import { ItinerarySkeleton } from "@/components/common/Skeleton";
import { toast } from "sonner";
import type { ItineraryDay, ChatMessage, GeneratedItinerary } from "@/types";
import type { ChatRole } from "@/lib/ai";

/* ─── AI Action types ─── */
type AiAction = "cheaper" | "luxury" | "relaxed" | "regenerate";

const TripDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getTrip = useTripStore((s) => s.getTrip);
  const renameTrip = useTripStore((s) => s.renameTrip);
  const duplicateTrip = useTripStore((s) => s.duplicateTrip);
  const deleteTrip = useTripStore((s) => s.deleteTrip);
  const toggleFavorite = useTripStore((s) => s.toggleFavorite);
  const markViewed = useTripStore((s) => s.markViewed);
  const updateItinerary = useTripStore((s) => s.updateItinerary);

  const [activeDay, setActiveDay] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiActionLoading, setAiActionLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const trip = id ? getTrip(id) : undefined;

  useEffect(() => {
    if (id) markViewed(id);
    // Simulate short loading for polish
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [id, markViewed]);

  if (loading) return <ItinerarySkeleton />;

  if (!trip) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent/10">
          <Compass className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-semibold">Trip not found</h2>
        <p className="mt-2 text-muted-foreground">This trip may have been deleted or the link is broken.</p>
        <Button variant="outline" className="mt-6 rounded-2xl" onClick={() => navigate("/dashboard")}>
          <ChevronLeft className="mr-2 h-4 w-4" />Back to dashboard
        </Button>
      </div>
    );
  }

  const { itinerary, request } = trip;
  const days = itinerary.days;
  const currentDay = days[activeDay];

  const handleChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const question = chatInput.trim();
    setChatInput("");
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: question, createdAt: Date.now() };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatLoading(true);
    try {
      const { askAssistant } = await import("@/services/tripService");
      const history: ChatRole[] = chatMessages.map((m) => ({ role: m.role, content: m.content }));
      const reply = await askAssistant(itinerary, history, question);
      setChatMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: reply, createdAt: Date.now() }]);
    } catch {
      toast.error("Couldn't reach the travel concierge. Try again.");
    } finally {
      setChatLoading(false);
    }
  };

  const handleAiAction = async (action: AiAction) => {
    setAiActionLoading(true);
    const actionLabels: Record<AiAction, string> = {
      cheaper: "Finding budget-friendly alternatives…",
      luxury: "Upgrading to a more luxurious experience…",
      relaxed: "Making your itinerary more relaxed…",
      regenerate: "Regenerating this day…",
    };
    toast.info(actionLabels[action]);

    try {
      const { askAssistant } = await import("@/services/tripService");
      const prompt = action === "cheaper"
        ? "Suggest 3 specific budget-friendly alternatives for today's activities and restaurants that maintain the experience but cost less. Be specific with names and prices."
        : action === "luxury"
        ? "Suggest 3 premium upgrades for today's activities — better restaurants, exclusive experiences, or luxury alternatives."
        : action === "relaxed"
        ? "Suggest how to make today's schedule more relaxed — remove 1-2 items and suggest a slower-paced alternative."
        : "Suggest fresh ideas for today — different restaurants, a new activity, or a unique experience nearby.";

      const history: ChatRole[] = [{ role: "system", content: `You are Voyage AI's concierge. Today's itinerary day: ${JSON.stringify(currentDay)}` }];
      const reply = await askAssistant(itinerary, history, prompt);
      setChatMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "user", content: actionLabels[action].replace("…", ""), createdAt: Date.now() },
        { id: crypto.randomUUID(), role: "assistant", content: reply, createdAt: Date.now() },
      ]);
      setChatOpen(true);
      toast.success("AI suggestions ready! Check the concierge below.");
    } catch {
      toast.error("Couldn't generate suggestions. Try again.");
    } finally {
      setAiActionLoading(false);
    }
  };

  const handleDuplicate = () => {
    const copy = duplicateTrip(trip.id);
    if (copy) { toast.success("Trip duplicated!"); navigate(`/trips/${copy.id}`); }
  };

  const handleDelete = () => {
    deleteTrip(trip.id);
    toast.success("Trip deleted.");
    navigate("/dashboard");
  };

  const handleExportPDF = () => {
    toast.success("PDF export ready! (Print to save as PDF)");
    window.print();
  };

  const handleShare = () => {
    setShowShare(true);
    setCopied(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => toast.error("Couldn't copy link."));
  };

  const handleCopyItinerary = () => {
    const text = days.map(d =>
      `Day ${d.day} — ${d.title}\n` +
      `Morning: ${d.morning.title} — ${d.morning.summary}\n` +
      `Afternoon: ${d.afternoon.title} — ${d.afternoon.summary}\n` +
      `Evening: ${d.evening.title} — ${d.evening.summary}`
    ).join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Itinerary copied to clipboard!");
    }).catch(() => toast.error("Couldn't copy."));
  };

  const handleRename = () => {
    if (nameInput.trim()) {
      renameTrip(trip.id, nameInput.trim());
      toast.success("Trip renamed!");
      setEditingName(false);
    }
  };

  const budgetTotal = itinerary.budget ? Object.values(itinerary.budget).reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="space-y-8">
      {/* Back & actions */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" className="rounded-full" onClick={() => navigate("/dashboard")}>
          <ChevronLeft className="mr-1 h-4 w-4" />Dashboard
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleCopyItinerary} aria-label="Copy itinerary"><Copy className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleExportPDF} aria-label="Export PDF"><Download className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleShare} aria-label="Share"><Share2 className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => toggleFavorite(trip.id)} aria-label={trip.favorite ? "Unfavorite" : "Favorite"}>
          <Star className={cn("h-4 w-4", trip.favorite && "fill-accent text-accent")} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleDuplicate} aria-label="Duplicate"><Copy className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setChatOpen((v) => !v)} aria-label="Chat"><MessageCircle className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="rounded-full text-destructive hover:text-destructive" onClick={() => setConfirmDelete(true)} aria-label="Delete"><Trash2 className="h-4 w-4" /></Button>
      </motion.div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="relative overflow-hidden rounded-3xl">
          <div className="aspect-[21/9] overflow-hidden">
            <img src={trip.coverImage} alt={trip.name} className="h-full w-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  {editingName ? (
                    <div className="flex items-center gap-2">
                      <input value={nameInput} onChange={(e) => setNameInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleRename(); if (e.key === "Escape") setEditingName(false); }}
                        className="rounded-xl bg-white/20 px-3 py-1 text-xl font-semibold text-white placeholder:text-white/50 outline-none backdrop-blur" autoFocus />
                      <button onClick={handleRename} className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-foreground"><CheckCircle2 className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <>
                      <h1 className="font-display text-3xl font-semibold md:text-4xl">{trip.name}</h1>
                      <button onClick={() => { setNameInput(trip.name); setEditingName(true); }}
                        className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 opacity-60 transition hover:opacity-100"><Pencil className="h-3.5 w-3.5" /></button>
                    </>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/70">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{itinerary.destination}, {itinerary.country}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDateRange(request.startDate, request.endDate)}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" />{request.travelers} traveler(s)</span>
                  <span className="inline-flex items-center gap-1"><DollarSign className="h-4 w-4" />{formatCurrency(request.budget, request.currency)}</span>
                </div>
              </div>
              <Badge className="shrink-0 rounded-full bg-white/20 text-white backdrop-blur">{request.style}</Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Action buttons */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleAiAction("cheaper")} disabled={aiActionLoading}>
          <ArrowDown className="mr-1.5 h-3.5 w-3.5" />Make cheaper
        </Button>
        <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleAiAction("luxury")} disabled={aiActionLoading}>
          <ArrowUp className="mr-1.5 h-3.5 w-3.5" />More luxury
        </Button>
        <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleAiAction("relaxed")} disabled={aiActionLoading}>
          <Coffee className="mr-1.5 h-3.5 w-3.5" />More relaxed
        </Button>
        <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleAiAction("regenerate")} disabled={aiActionLoading}>
          <Wand2 className="mr-1.5 h-3.5 w-3.5" />Regenerate day
        </Button>
        {aiActionLoading && <span className="flex items-center gap-1 text-xs text-muted-foreground py-2"><span className="h-3 w-3 animate-spin rounded-full border-2 border-accent border-r-transparent" />Thinking…</span>}
      </motion.div>

      {/* Overview */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-3xl border border-border bg-card p-6">
        <p className="leading-relaxed text-foreground">{itinerary.overview}</p>
      </motion.div>

      {/* Budget summary */}
      {budgetTotal > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-3xl border border-border bg-card p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">Budget breakdown</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {Object.entries(itinerary.budget!).map(([key, val]) => (
              <div key={key} className="rounded-2xl bg-secondary p-3 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{key}</p>
                <p className="mt-1 font-semibold">{formatCurrency(val, request.currency)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Day-by-day itinerary */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="mb-4 font-display text-xl font-semibold">Day-by-day itinerary</h3>
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {days.map((day, i) => (
            <button key={day.day} onClick={() => setActiveDay(i)}
              className={cn("shrink-0 rounded-2xl px-4 py-2.5 text-sm font-medium transition-all",
                activeDay === i ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground")}>
              Day {day.day}<span className="ml-1.5 block text-[10px] opacity-60">{day.date}</span>
            </button>
          ))}
        </div>

        {currentDay && (
          <AnimatePresence mode="wait">
            <motion.div key={currentDay.day} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <div className="mb-3">
                <h4 className="font-display text-2xl font-semibold">{currentDay.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">Estimated cost: {formatCurrency(currentDay.estimatedCost, request.currency)}</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {(["morning", "afternoon", "evening"] as const).map((segment) => {
                  const seg = currentDay[segment];
                  const Icon = segment === "morning" ? Sun : segment === "afternoon" ? Sun : Moon;
                  const segColors = segment === "morning" ? "bg-amber-500/10 text-amber-500" : segment === "afternoon" ? "bg-blue-500/10 text-blue-500" : "bg-indigo-500/10 text-indigo-500";
                  return (
                    <div key={segment} className="rounded-3xl border border-border bg-card p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <div className={cn("grid h-8 w-8 place-items-center rounded-xl", segColors)}><Icon className="h-4 w-4" /></div>
                        <div><h5 className="text-sm font-semibold capitalize">{segment}</h5><p className="text-xs text-muted-foreground">{seg.title}</p></div>
                      </div>
                      <p className="mb-3 text-sm text-muted-foreground">{seg.summary}</p>
                      <div className="space-y-2">
                        {seg.places.map((place, pi) => (
                          <div key={pi} className="flex items-start gap-3 rounded-2xl bg-secondary p-3">
                            <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm" style={{ backgroundColor: `${CATEGORY_META[place.category]?.color ?? "#888"}20` }}>
                              {CATEGORY_META[place.category]?.emoji ?? "📍"}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold">{place.name}</p>
                              <p className="text-xs text-muted-foreground">{place.description}</p>
                              <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-muted-foreground">
                                {place.estimatedCost > 0 && <span>{formatCurrency(place.estimatedCost, request.currency)}</span>}
                                <span>{place.durationMinutes} min</span>
                                {place.travelTimeFromPrevious && <span>{place.travelTimeFromPrevious}</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Tips sections */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="grid gap-4 md:grid-cols-2">
        <TipCard icon={<CloudRain className="h-5 w-5" />} title="Weather tips" items={itinerary.weatherTips} />
        <TipCard icon={<ShieldCheck className="h-5 w-5" />} title="Safety advice" items={itinerary.safetyAdvice} />
        <TipCard icon={<Lightbulb className="h-5 w-5" />} title="Travel hacks" items={itinerary.travelHacks} />
        <TipCard icon={<Gem className="h-5 w-5" />} title="Hidden gems" items={itinerary.hiddenGems} />
      </motion.div>

      {/* Packing */}
      {itinerary.packingSuggestions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-3xl border border-border bg-card p-6">
          <h3 className="mb-4 font-display text-lg font-semibold">Packing suggestions</h3>
          <div className="flex flex-wrap gap-2">
            {itinerary.packingSuggestions.map((item, i) => (
              <span key={i} className="rounded-full border border-border px-3 py-1.5 text-sm">{item}</span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Chat sidebar */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div initial={{ opacity: 0, y: 30, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: 30, height: 0 }} className="overflow-hidden">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold">Travel concierge</h3>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setChatOpen(false)}><X className="h-4 w-4" /></Button>
              </div>
              <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[80%] rounded-2xl px-4 py-2.5 text-sm", msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground")}>{msg.content}</div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start"><div className="rounded-2xl bg-secondary px-4 py-3"><span className="inline-flex gap-1"><span className="h-2 w-2 animate-pulse rounded-full bg-accent" /><span className="h-2 w-2 animate-pulse rounded-full bg-accent delay-100" /><span className="h-2 w-2 animate-pulse rounded-full bg-accent delay-200" /></span></div></div>
                )}
              </div>
              <div className="flex gap-2">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleChat()}
                  placeholder="Can I swap this hotel?" className="flex-1 rounded-2xl border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                <Button onClick={handleChat} disabled={chatLoading} size="sm" className="rounded-2xl"><ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share modal */}
      <AnimatePresence>
        {showShare && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6" onClick={() => setShowShare(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl bg-card p-6">
              <h3 className="font-display text-xl font-semibold">Share this trip</h3>
              <p className="mt-2 text-sm text-muted-foreground">Copy the link below to share your itinerary.</p>
              <div className="mt-4 flex items-center gap-2">
                <input readOnly value={window.location.href} className="flex-1 rounded-2xl border border-input bg-background px-3 py-2 text-sm" />
                <Button size="sm" className="rounded-2xl" onClick={handleCopyLink}>
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" className="flex-1 rounded-2xl" onClick={() => setShowShare(false)}>Close</Button>
                <Button className="flex-1 rounded-2xl" onClick={handleExportPDF}><Download className="mr-2 h-4 w-4" />Export PDF</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6" onClick={() => setConfirmDelete(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-3xl bg-card p-6 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-destructive/10"><Trash2 className="h-6 w-6 text-destructive" /></div>
              <h3 className="font-display text-xl font-semibold">Delete trip?</h3>
              <p className="mt-2 text-sm text-muted-foreground">This action cannot be undone.</p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="flex-1 rounded-2xl" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                <Button variant="destructive" className="flex-1 rounded-2xl" onClick={handleDelete}>Delete</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Tip card ─── */
function TipCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-xl bg-accent/10 text-accent">{icon}</div>
        <h4 className="font-display font-semibold">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Re-export for typing */
import { Compass } from "lucide-react";

export default TripDetailPage;
