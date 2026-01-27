import ServicePageLayout from '@/components/ServicePageLayout';
import { Building2 } from 'lucide-react';

const EstructuracionNegocios = () => {
  return (
    <ServicePageLayout
      icon={Building2}
      title="Estructuración de Negocios"
      description="Apoyamos a nuestros clientes mediante un enfoque innovador, con experiencia, conocimiento, habilidades, metodologías y herramientas que tenemos a disposición."
      extendedDescription="Contribuimos a la estructuración de servicios como Fondos de capital privado, Negocios a través de vehículos financieros (fideicomisos) y Titularizaciones."
      featuresTitle="Áreas de estructuración:"
      features={[
        { text: 'Fondos de capital privado' },
        { text: 'Vehículos financieros (fideicomisos)' },
        { text: 'Titularizaciones' },
        { text: 'Estructuras corporativas complejas' },
      ]}
      accentColor="violet"
      prevService={{
        title: 'Consultoría Financiera',
        route: '/servicios/consultoria-financiera',
      }}
      nextService={{
        title: 'Re-perfilamiento de Deuda',
        route: '/servicios/reperfilamiento-deuda',
      }}
    />
  );
};

export default EstructuracionNegocios;
