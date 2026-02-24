import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Originators from "./pages/Originators";
import FactoringWeb from "./pages/FactoringWeb";
import Investors from "./pages/Investors";
import Portfolio from "./pages/Portfolio";
import Admin from "./pages/Admin";
import AdminPortfolio from "./pages/AdminPortfolio";
import GestorProfesional from "./pages/services/GestorProfesional";
import ValoracionEmpresas from "./pages/services/ValoracionEmpresas";
import ConsultoriaFinanciera from "./pages/services/ConsultoriaFinanciera";
import EstructuracionNegocios from "./pages/services/EstructuracionNegocios";
import ReperfilamientoDeuda from "./pages/services/ReperfilamientoDeuda";
import AvatarShowcase from "./components/AvatarShowcase";

import { CookieConsent } from "@/components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CookieConsent />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/originators" element={<Originators />} />
          <Route path="/factoring" element={<FactoringWeb />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/portfolio" element={<AdminPortfolio />} />
          <Route path="/servicios/gestor-profesional" element={<GestorProfesional />} />
          <Route path="/servicios/valoracion-empresas" element={<ValoracionEmpresas />} />
          <Route path="/servicios/consultoria-financiera" element={<ConsultoriaFinanciera />} />
          <Route path="/servicios/estructuracion-negocios" element={<EstructuracionNegocios />} />
          <Route path="/servicios/reperfilamiento-deuda" element={<ReperfilamientoDeuda />} />
          <Route path="/avatar-showcase" element={<AvatarShowcase />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
