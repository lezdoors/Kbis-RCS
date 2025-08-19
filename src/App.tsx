import { Component, ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LeadCaptureProvider } from "@/components/LeadCapture/LeadCaptureProvider";
import { GlobalErrorBoundary } from "@/components/GlobalErrorBoundary";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import { ServiceSelection } from "./pages/ServiceSelection";
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
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import MentionsLegales from "./pages/MentionsLegales";
import CGV from "./pages/CGV";
import PolitiqueRGPD from "./pages/PolitiqueRGPD";
import Cookies from "./pages/Cookies";

// Create QueryClient instance outside of component to avoid HMR issues
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Error boundary to catch HMR-related errors
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipPrimitive.Provider>
          <Toaster />
          <Sonner />
          <LeadCaptureProvider>
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/recherche" element={<SearchResults />} />
              <Route path="/service-selection/:siren" element={<ServiceSelection />} />
              <Route path="/payment" element={<Payment />} />
               <Route path="/payment-success" element={<PaymentSuccess />} />
               <Route path="/admin" element={<AdminDashboard />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
            </BrowserRouter>
          </LeadCaptureProvider>
        </TooltipPrimitive.Provider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}

export default App;