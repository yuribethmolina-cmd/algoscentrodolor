import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AnimatedRoutes from "./components/AnimatedRoutes";
import AsistenteAlgos from "./components/AsistenteAlgos";
import MobileStickyCTA from "./components/MobileStickyCTA";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
        <AsistenteAlgos />
        <MobileStickyCTA />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
