import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  User,
  Moon,
  Sun,
  Bell,
  BellOff,
  Globe,
  Shield,
  Trash2,
  LogOut,
  ChevronRight,
  Mail,
  Camera,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";
import { toast } from "sonner";

const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "INR", "BRL", "MXN"];

const SettingsPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const deleteAccount = useAuthStore((s) => s.deleteAccount);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const theme = useSettingsStore((s) => s.theme);
  const toggleTheme = useSettingsStore((s) => s.toggleTheme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const emailNotifications = useSettingsStore((s) => s.emailNotifications);
  const tripReminders = useSettingsStore((s) => s.tripReminders);
  const priceAlerts = useSettingsStore((s) => s.priceAlerts);
  const setPreference = useSettingsStore((s) => s.setPreference);
  const defaultCurrency = useSettingsStore((s) => s.defaultCurrency);
  const setCurrency = useSettingsStore((s) => s.setCurrency);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
    toast.success("Logged out. See you soon!");
  };

  const handleDelete = () => {
    deleteAccount();
    navigate("/", { replace: true });
    toast.success("Account deleted. We're sorry to see you go.");
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    await new Promise((r) => setTimeout(r, 400));
    updateProfile({ name, email });
    setSavingProfile(false);
    toast.success("Profile updated!");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-semibold">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your account and preferences.</p>
      </motion.div>

      {/* Profile */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-3xl border border-border bg-card p-6"
      >
        <h3 className="mb-5 font-display text-lg font-semibold">Profile</h3>
        <div className="flex items-start gap-5">
          <div className="relative">
            <Avatar className="h-16 w-16 ring-4 ring-secondary">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-accent/20 text-accent font-display text-xl">
                {user?.name?.charAt(0) ?? "?"}
              </AvatarFallback>
            </Avatar>
            <button
              className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90"
              aria-label="Change avatar"
              onClick={() => toast.success("Avatar updated! (demo)")}
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">Name</Label>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-2xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-2xl"
              />
            </div>
          </div>
        </div>
        <Button
          onClick={handleSaveProfile}
          disabled={savingProfile}
          className="mt-5 rounded-2xl"
        >
          {savingProfile ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
              Saving…
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4" />
              Save changes
            </span>
          )}
        </Button>
      </motion.section>

      {/* Appearance */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl border border-border bg-card p-6"
      >
        <h3 className="mb-5 font-display text-lg font-semibold">Appearance</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "dark" ? (
              <Moon className="h-5 w-5 text-indigo-400" />
            ) : (
              <Sun className="h-5 w-5 text-amber-500" />
            )}
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">{theme === "dark" ? "Dark mode" : "Light mode"}</p>
            </div>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={() => toggleTheme()} />
        </div>
      </motion.section>

      {/* Preferences */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-3xl border border-border bg-card p-6"
      >
        <h3 className="mb-5 font-display text-lg font-semibold">Preferences</h3>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">Default currency</p>
                <p className="text-sm text-muted-foreground">Used for all budget displays</p>
              </div>
            </div>
            <select
              value={defaultCurrency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-2xl border border-input bg-background px-3 py-2 text-sm"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {emailNotifications ? (
                <Bell className="h-5 w-5 text-accent" />
              ) : (
                <BellOff className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium">Email notifications</p>
                <p className="text-sm text-muted-foreground">Trip updates and reminders</p>
              </div>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={(v) => setPreference("emailNotifications", v)} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">Trip reminders</p>
                <p className="text-sm text-muted-foreground">Before your trip starts</p>
              </div>
            </div>
            <Switch checked={tripReminders} onCheckedChange={(v) => setPreference("tripReminders", v)} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium">Price alerts</p>
                <p className="text-sm text-muted-foreground">When costs change significantly</p>
              </div>
            </div>
            <Switch checked={priceAlerts} onCheckedChange={(v) => setPreference("priceAlerts", v)} />
          </div>
        </div>
      </motion.section>

      {/* Account */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl border border-border bg-card p-6"
      >
        <h3 className="mb-5 font-display text-lg font-semibold">Account</h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-between rounded-2xl h-12"
            onClick={handleLogout}
          >
            <span className="inline-flex items-center gap-3">
              <LogOut className="h-4 w-4" />
              Sign out
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="w-full justify-between rounded-2xl h-12 text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/5"
            onClick={() => setConfirmDelete(true)}
          >
            <span className="inline-flex items-center gap-3">
              <Trash2 className="h-4 w-4" />
              Delete account
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.section>

      {/* Delete confirm */}
      {confirmDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
          onClick={() => setConfirmDelete(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-card p-6 text-center"
          >
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="font-display text-xl font-semibold">Delete account?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All your trips, settings, and data will be permanently removed. This cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1 rounded-2xl" onClick={() => setConfirmDelete(false)}>
                Cancel
              </Button>
              <Button variant="destructive" className="flex-1 rounded-2xl" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SettingsPage;
