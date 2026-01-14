import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import GestorProfesionalSection from '@/components/GestorProfesionalSection';
import ServicesSection from '@/components/ServicesSection';
import FintechSection from '@/components/FintechSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <GestorProfesionalSection />
        <ServicesSection />
        <FintechSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;