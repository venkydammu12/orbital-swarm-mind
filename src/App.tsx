import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SpaceBackground from "./components/SpaceBackground";

// Main Pages
import Landing from "./pages/Landing";
import Problem from "./pages/Problem";
import Swarm from "./pages/Swarm";
import Mothership from "./pages/Mothership";
import Features from "./pages/Features";
import Demo from "./pages/Demo";
import SdgMdg from "./pages/SdgMdg";
import Ideas from "./pages/Ideas";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Feature Pages
import Detection from "./pages/features/Detection";
import Storage from "./pages/features/Storage";
import Coordination from "./pages/features/Coordination";
import Monitoring from "./pages/features/Monitoring";
import AiAlgorithms from "./pages/features/AiAlgorithms";
import Capture from "./pages/features/Capture";
import Recycling from "./pages/features/Recycling";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="dark min-h-screen">
          <SpaceBackground />
          <Navigation />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/problem" element={<Problem />} />
            <Route path="/swarm" element={<Swarm />} />
            <Route path="/mothership" element={<Mothership />} />
            <Route path="/features" element={<Features />} />
            <Route path="/features/detection" element={<Detection />} />
            <Route path="/features/storage" element={<Storage />} />
            <Route path="/features/coordination" element={<Coordination />} />
            <Route path="/features/monitoring" element={<Monitoring />} />
            <Route path="/features/ai" element={<AiAlgorithms />} />
            <Route path="/features/capture" element={<Capture />} />
            <Route path="/features/recycling" element={<Recycling />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/sdg-mdg" element={<SdgMdg />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;