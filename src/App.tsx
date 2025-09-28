import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

// Main Pages
import Landing from "./pages/Landing";
import MissionControl from "./pages/MissionControl";
import SolutionLoop from "./components/SolutionLoop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="dark min-h-screen bg-black">
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/mission-control" element={<MissionControl />} />
            <Route path="/solution-loop" element={<div className="pt-20"><SolutionLoop /></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;