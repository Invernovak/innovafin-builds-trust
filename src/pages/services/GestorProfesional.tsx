import ServicePageLayout from '@/components/ServicePageLayout';
import { Briefcase } from 'lucide-react';

const GestorProfesional = () => {
  return (
    <ServicePageLayout
      icon={Briefcase}
      title="Gestor Profesional"
      description="Somos expertos en la administración de portafolios y en el manejo de los activos aceptables para invertir de acuerdo a lo establecido en el reglamento del Fondo de Capital Privado."
      extendedDescription="Analizamos las necesidades de nuestros grupos de interés, lo que permite aumentar la eficiencia y garantizar la entrega de servicios consistentes, rentables, innovadores y de calidad."
      featuresTitle="Nuestro enfoque incluye:"
      features={[
        { text: 'Administración profesional de portafolios de inversión' },
        { text: 'Gestión de activos bajo estándares regulatorios' },
        { text: 'Análisis continuo de necesidades de grupos de interés' },
        { text: 'Entrega de servicios consistentes y de alta calidad' },
      ]}
      accentColor="primary"
      nextService={{
        title: 'Valoración de Empresas',
        route: '/servicios/valoracion-empresas',
      }}
    />
  );
};

export default GestorProfesional;
