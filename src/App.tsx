import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenAuthProvider, useTokenAuth } from "./contexts/TokenAuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const TokenError = () => (
  <div className="min-h-screen bg-gradient-therapeutic flex items-center justify-center p-6">
    <div className="card-therapeutic card-glow max-w-sm w-full text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto text-destructive">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
      </div>
      <div className="space-y-2">
        <h2 className="font-heading text-2xl font-semibold text-foreground">Access Required</h2>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          Please enter the activity through the provided secure link. Your session token is missing or expired.
        </p>
      </div>
      <button
        onClick={() => window.location.href = "https://mantracare.com"}
        className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-body text-sm font-medium hover:bg-secondary/80 transition-all"
      >
        Go back to MantraCare
      </button>
    </div>
  </div>
);

const AppContent = () => {
  const { isLoading } = useTokenAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-therapeutic flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6 text-center animate-fade-card-in">
          <div className="w-16 h-16 rounded-3xl bg-white/40 backdrop-blur-md shadow-lg flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-3xl border-2 border-primary/20 animate-pulse" />
            <div className="w-8 h-8 rounded-full border-3 border-primary/10 border-t-primary animate-spin" />
          </div>
          <div className="space-y-2">
            <p className="font-heading text-xl font-semibold text-foreground/80">Getting things ready for you</p>
            <p className="font-body text-sm text-muted-foreground animate-pulse">Creating your calm space...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/reframe_ocd_thoughts">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/token" element={<TokenError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TokenAuthProvider>
      <AppContent />
    </TokenAuthProvider>
  </QueryClientProvider>
);

export default App;
