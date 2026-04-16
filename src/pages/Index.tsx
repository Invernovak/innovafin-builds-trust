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

const Index = () => {
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