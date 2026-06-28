import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-md text-center"
      >
        <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-full bg-accent/10">
          <Compass className="h-12 w-12 animate-spin-slow text-accent" />
        </div>

        <h1 className="font-display text-7xl font-semibold text-primary">404</h1>
        <h2 className="mt-3 font-display text-2xl font-semibold">Lost in the clouds</h2>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. Let's get you back on course.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild variant="outline" className="rounded-2xl">
            <Link to="..">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back
            </Link>
          </Button>
          <Button asChild className="rounded-2xl">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
        </div>

        <p className="mt-12 text-xs text-muted-foreground">
          Need help? <a href="/" className="text-accent hover:underline">Contact our concierge</a>
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;
