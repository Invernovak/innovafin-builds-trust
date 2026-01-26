import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesSidebar from '@/components/ServicesSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GestorProfesional = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-narrow mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/#servicios')}
            className="mb-8 group lg:hidden"
          >
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver a Servicios
          </Button>

          <div className="flex gap-12">
            <ServicesSidebar />
            
            <div className="flex-1 max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Gestor Profesional
                </h1>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Somos expertos en la administración de portafolios y en el manejo de los activos aceptables para invertir de acuerdo a lo establecido en el reglamento del Fondo de Capital Privado.
                </p>
                
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Analizamos las necesidades de nuestros grupos de interés, lo que permite aumentar la eficiencia y garantizar la entrega de servicios consistentes, rentables, innovadores y de calidad.
                </p>

                <div className="bg-gradient-to-br from-primary/5 to-navy-light/5 rounded-2xl p-8 mt-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">Nuestro enfoque incluye:</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span>Administración profesional de portafolios de inversión</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span>Gestión de activos bajo estándares regulatorios</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span>Análisis continuo de necesidades de grupos de interés</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span>Entrega de servicios consistentes y de alta calidad</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GestorProfesional;
