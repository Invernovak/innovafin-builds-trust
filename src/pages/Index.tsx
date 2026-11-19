import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import InvestorsSection from '@/components/InvestorsSection';
import OriginatorsSection from '@/components/OriginatorsSection';
import PortfolioSection from '@/components/PortfolioSection';
import FactoringSection from '@/components/FactoringSection';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();

  // Si llegamos con una sección en la URL (ej. /#servicios), bajar hasta ella
  useEffect(() => {
    if (!location.hash) return;
    const timer = setTimeout(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Inicio" 
        description="Bienvenido a Innovafin. Tu aliado estratégico en financiamiento alternativo y gestión de inversiones en Colombia."
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <InvestorsSection />
        <OriginatorsSection />
        <PortfolioSection />
        <FactoringSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;