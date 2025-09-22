import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SpaceBackground from "./components/SpaceBackground";
import Landing from "./pages/Landing";
import Visualization from "./pages/Visualization";
import Features from "./pages/Features";
import Detection from "./pages/features/Detection";
import Storage from "./pages/features/Storage";
import Coordination from "./pages/features/Coordination";
import Technology from "./pages/Technology";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SpaceBackground />
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features/detection" element={<Detection />} />
          <Route path="/features/storage" element={<Storage />} />
          <Route path="/features/coordination" element={<Coordination />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
