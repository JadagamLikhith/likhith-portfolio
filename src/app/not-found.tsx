import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-content-primary flex flex-col justify-between selection:bg-brand-indigo/30 selection:text-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <Badge variant="indigo" size="md" className="mx-auto">
            <Compass className="w-3.5 h-3.5 mr-1" />
            404 / Route Unresolved
          </Badge>

          <h1 className="text-4xl sm:text-5xl font-display font-bold text-content-primary tracking-tight">
            Page Not Found
          </h1>

          <p className="text-sm text-content-muted leading-relaxed">
            The page or project route you are attempting to access does not exist or may have been relocated.
          </p>

          <div className="pt-2">
            <Link href="/">
              <Button variant="primary" size="md" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Overview</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
