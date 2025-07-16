import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ChoisirStatut from "./pages/ChoisirStatut";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Commencer from "./pages/Commencer";
import Coordonnees from "./pages/Coordonnees";
import Associes from "./pages/Associes";
import Capital from "./pages/Capital";
import Documents from "./pages/Documents";
import Paiement from "./pages/Paiement";
import MentionsLegales from "./pages/MentionsLegales";
import CGV from "./pages/CGV";
import PolitiqueRGPD from "./pages/PolitiqueRGPD";
import Cookies from "./pages/Cookies";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/choisir-statut" element={<ChoisirStatut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/commencer" element={<Commencer />} />
          <Route path="/coordonnees" element={<Coordonnees />} />
          <Route path="/associes" element={<Associes />} />
          <Route path="/capital" element={<Capital />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/paiement" element={<Paiement />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/politique-rgpd" element={<PolitiqueRGPD />} />
          <Route path="/cookies" element={<Cookies />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;