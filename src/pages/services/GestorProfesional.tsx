import ServicePageLayout from '@/components/ServicePageLayout';
import { Briefcase } from 'lucide-react';

const GestorProfesional = () => {
  return (
    <ServicePageLayout
      icon={Briefcase}
      title="Gestión de Activos Alternativos"
      description="En Innovafin no solo gestionamos Fondos de Capital Privado: los diseñamos. Estructuramos el fondo y su reglamento, y gestionamos los activos aptos para inversión con rigor profesional y bajo estándares ajustados a los diferentes perfiles de riesgo."
      extendedDescription="Escuchamos a nuestros grupos de interés para operar con mayor eficiencia y entregar servicios consistentes, rentables e innovadores."
      featuresTitle="Nuestro enfoque incluye:"
      features={[
        { text: 'Diseño y estructuración del Fondo de Capital Privado y su reglamento' },
        { text: 'Administración profesional de portafolios de inversión' },
        { text: 'Selección de activos aptos para inversión bajo criterios establecidos en los reglamentos que son aprobados por la junta directiva de la sociedad administradora' },
        { text: 'Análisis permanente de las necesidades de nuestros grupos de interés' },
        { text: 'Servicios consistentes, rentables y de alta calidad' },
      ]}
      accentColor="primary"
      nextService={{
        title: 'Estructuración de Negocios',
        route: '/servicios/estructuracion-negocios',
      }}
    />
  );
};

export default GestorProfesional;
