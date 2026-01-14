import { Target, Eye } from 'lucide-react';

const teamMembers = [
  {
    name: 'María Teresa González',
    role: 'Socia Fundadora',
    initials: 'MTG',
  },
  {
    name: 'Edison Cerón',
    role: 'Socio Fundador',
    initials: 'EC',
  },
  {
    name: 'Adolfo León Vélez',
    role: 'Director de Riesgos',
    initials: 'ALV',
  },
  {
    name: 'Nathalia Sandoval Herrera',
    role: 'Directora FCP',
    initials: 'NSH',
  },
  {
    name: 'Paola Andrea García',
    role: 'Directora Administrativa',
    initials: 'PAG',
  },
];

const AboutSection = () => {
  return (
    <section id="nosotros" className="section-padding bg-background">
      <div className="container-narrow mx-auto">
        {/* Mission & Vision */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Misión y Visión
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 text-left">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Nuestra Misión
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Brindar servicios financieros de alta calidad que construyan valor y generen confianza para nuestros clientes, impulsando el crecimiento sostenible de sus negocios.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8 text-left">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-secondary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Nuestra Visión 2026
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Seremos reconocidos en el 2026 como el mejor Gestor Profesional en Colombia, ofreciendo servicios disruptivos y confiables.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Nuestro Equipo
            </h3>
            <p className="text-muted-foreground text-lg">
              Profesionales con amplia experiencia en el sector financiero colombiano
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-card rounded-xl p-6 text-center shadow-card card-hover border border-border"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-navy-light mx-auto mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="text-xl font-semibold text-primary-foreground">
                    {member.initials}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  {member.name}
                </h4>
                <p className="text-muted-foreground text-xs">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
