import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";

// Eager load critical pages
import Index from "./pages/Index";

// Lazy load non-critical pages
const NotFound = lazy(() => import("./pages/NotFound"));
const Originators = lazy(() => import("./pages/Originators"));
const FactoringWeb = lazy(() => import("./pages/FactoringWeb"));
const Investors = lazy(() => import("./pages/Investors"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminPortfolio = lazy(() => import("./pages/AdminPortfolio"));
const GestorProfesional = lazy(() => import("./pages/services/GestorProfesional"));
const ValoracionEmpresas = lazy(() => import("./pages/services/ValoracionEmpresas"));
const ConsultoriaFinanciera = lazy(() => import("./pages/services/ConsultoriaFinanciera"));
const EstructuracionNegocios = lazy(() => import("./pages/services/EstructuracionNegocios"));
const ReperfilamientoDeuda = lazy(() => import("./pages/services/ReperfilamientoDeuda"));
const AvatarShowcase = lazy(() => import("./components/AvatarShowcase"));

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
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
