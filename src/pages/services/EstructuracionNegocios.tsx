import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesSidebar from '@/components/ServicesSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EstructuracionNegocios = () => {
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
                <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-violet-600" strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Estructuración de Negocios
                </h1>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Apoyamos a nuestros clientes mediante un enfoque innovador, con experiencia, conocimiento, habilidades, metodologías y herramientas que tenemos a disposición.
                </p>
                
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Contribuimos a la estructuración de servicios como Fondos de capital privado, Negocios a través de vehículos financieros (fideicomisos) y Titularizaciones.
                </p>

                <div className="bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-2xl p-8 mt-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">Áreas de estructuración:</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-violet-600 mt-2 flex-shrink-0"></span>
                      <span>Fondos de capital privado</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-violet-600 mt-2 flex-shrink-0"></span>
                      <span>Vehículos financieros (fideicomisos)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-violet-600 mt-2 flex-shrink-0"></span>
                      <span>Titularizaciones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-violet-600 mt-2 flex-shrink-0"></span>
                      <span>Estructuras corporativas complejas</span>
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

export default EstructuracionNegocios;
