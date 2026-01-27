import Header from '@/components/Header';
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