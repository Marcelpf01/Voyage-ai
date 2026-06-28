import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RequireAuth } from "@/components/common/RequireAuth";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useSettingsStore } from "@/store/settingsStore";
import { useTripStore } from "@/store/tripStore";
import { useAuthStore } from "@/store/authStore";

import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import PlanPage from "./pages/PlanPage";
import TripDetailPage from "./pages/TripDetailPage";
import TripsListPage from "./pages/TripsListPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ThemeWatcher({ children }: { children: React.ReactNode }) {
  const theme = useSettingsStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
}

/** Seeds demo data if the user is a demo user with no trips yet. */
function DemoTripSeeder({ children }: { children: React.ReactNode }) {
  const isDemo = useAuthStore((s) => s.isDemo);
  const seedDemoTrips = useTripStore((s) => s.seedDemoTrips);

  useEffect(() => {
    if (isDemo) seedDemoTrips();
  }, [isDemo, seedDemoTrips]);

  return <>{children}</>;
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeWatcher>
        <TooltipProvider>
          <Toaster />
          <Sonner richColors closeButton />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <DemoTripSeeder>
              <Routes>
                {/* Public */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Protected — dashboard layout */}
                <Route
                  element={
                    <RequireAuth>
                      <DashboardLayout />
                    </RequireAuth>
                  }
                >
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/plan" element={<PlanPage />} />
                  <Route path="/trips" element={<TripsListPage />} />
                  <Route path="/trips/:id" element={<TripDetailPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DemoTripSeeder>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeWatcher>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
