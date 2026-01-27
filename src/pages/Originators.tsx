import { useState } from 'react';
import { 
  Briefcase, CheckCircle, ClipboardList, Users, Search, 
  BadgeCheck, Banknote, Upload, Send, ArrowRight, MapPin, Building2, TrendingUp, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';

// Datos de originadores activos
const originatorsData = [
  {
    id: 1,
    name: 'Tech Solutions S.A.S',
    sector: 'Tecnología',
    status: 'Activo',
    description: 'Empresa líder en soluciones de software empresarial con presencia en 5 países.',
    location: 'Bogotá, Colombia',
    logo: 'TS',
    financingReceived: '$2.5M',
    growth: '+45%',
  },
  {
    id: 2,
    name: 'AgroExport Colombia',
    sector: 'Agroindustria',
    status: 'Activo',
    description: 'Exportador de productos agrícolas orgánicos certificados a mercados internacionales.',
    location: 'Medellín, Colombia',
    logo: 'AE',
    financingReceived: '$1.8M',
    growth: '+32%',
  },
  {
    id: 3,
    name: 'Energía Verde S.A',
    sector: 'Energías Renovables',
    status: 'Activo',
    description: 'Desarrollo y operación de proyectos de energía solar y eólica.',
    location: 'Cali, Colombia',
    logo: 'EV',
    financingReceived: '$5M',
    growth: '+28%',
  },
  {
    id: 4,
    name: 'Salud Digital',
    sector: 'Salud',
    status: 'Activo',
    description: 'Plataforma de telemedicina con más de 50,000 usuarios activos.',
    location: 'Barranquilla, Colombia',
    logo: 'SD',
    financingReceived: '$800K',
    growth: '+65%',
  },
];

const processSteps = [
  {
    icon: ClipboardList,
    title: '1. Aplicación',
    description: 'Complete el formulario de vinculación con la información de su empresa',
  },
  {
    icon: Users,
    title: '2. Evaluación Inicial',
    description: 'Nuestro equipo revisa su aplicación y documentación',
  },
  {
    icon: Search,
    title: '3. Due Diligence',
    description: 'Análisis detallado de su modelo de negocio y proyecciones',
  },
  {
    icon: BadgeCheck,
    title: '4. Aprobación',
    description: 'Decisión del comité de inversión y estructuración del financiamiento',
  },
  {
    icon: Banknote,
    title: '5. Desembolso',
    description: 'Firma de documentos y desembolso de los fondos',
  },
];

const requiredDocuments = [
  'Estados financieros últimos 3 años',
  'Plan de negocios',
  'Certificado de existencia y representación legal',
  'Referencias comerciales',
  'RUT actualizado',
  'Copia del documento de identidad del representante legal',
];

const Originators = () => {
  const [activeTab, setActiveTab] = useState('como-vincularse');
  const [formData, setFormData] = useState({
    companyName: '',
    nit: '',
    contactName: '',
    email: '',
    phone: '',
    sector: '',
    businessDescription: '',
    financingNeeds: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('El formulario se ha enviado con éxito. Un asesor se pondrá en contacto pronto.');
    setFormData({
      companyName: '',
      nit: '',
      contactName: '',
      email: '',
      phone: '',
      sector: '',
      businessDescription: '',
      financingNeeds: '',
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="bg-gradient-to-br from-secondary to-secondary/80 py-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="container-narrow mx-auto px-4 relative">
            <div className={cn(
              "text-center transition-all duration-700",
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Portal de Originadores
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Impulsa tu Empresa con <span className="text-white/90">Financiamiento Alternativo</span>
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                Conectamos empresas con potencial de crecimiento con capital estratégico para impulsar su expansión.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-secondary hover:bg-white/90 rounded-full px-8"
                  onClick={() => setActiveTab('vinculacion')}
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  Vincularse Ahora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full px-8"
                  onClick={() => setActiveTab('originadores-activos')}
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  Ver Originadores
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="container-narrow mx-auto px-4 -mt-8 relative z-10">
          <div 
            ref={statsRef}
            className={cn(
              "grid md:grid-cols-3 gap-4 transition-all duration-700",
              statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Originadores Activos</p>
                    <p className="text-2xl font-bold text-secondary">{originatorsData.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Banknote className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Financiamiento Total</p>
                    <p className="text-2xl font-bold">$10.1M USD</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Crecimiento Promedio</p>
                    <p className="text-2xl font-bold text-green-600">+42%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Tabs Section */}
        <section className="container-narrow mx-auto px-4 py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3 h-12">
              <TabsTrigger value="como-vincularse" className="text-sm">
                <ArrowRight className="w-4 h-4 mr-2" />
                Cómo Vincularse
              </TabsTrigger>
              <TabsTrigger value="vinculacion" className="text-sm">
                <ClipboardList className="w-4 h-4 mr-2" />
                Vinculación
              </TabsTrigger>
              <TabsTrigger value="originadores-activos" className="text-sm">
                <Building2 className="w-4 h-4 mr-2" />
                Originadores
              </TabsTrigger>
            </TabsList>

            {/* Cómo Vincularse Tab */}
            <TabsContent value="como-vincularse" className="space-y-8">
              <Card className="border-2 border-secondary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-secondary" />
                    </div>
                    Proceso de Vinculación
                  </CardTitle>
                  <CardDescription>Sigue estos pasos para convertirte en originador de InnovaFin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-secondary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Documentos Requeridos */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Upload className="w-5 h-5 text-secondary" />
                    Documentos Requeridos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                        {doc}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 rounded-full px-8"
                  onClick={() => setActiveTab('vinculacion')}
                >
                  Comenzar Vinculación
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Vinculación Tab */}
            <TabsContent value="vinculacion">
              <Card className="border-2 border-secondary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <ClipboardList className="w-5 h-5 text-secondary" />
                    </div>
                    Formulario de Vinculación de Originadores
                  </CardTitle>
                  <CardDescription>
                    Complete este formulario y un asesor se pondrá en contacto para continuar con el proceso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Nombre de la Empresa *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                          placeholder="Empresa S.A.S"
                          value={formData.companyName}
                          onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          NIT *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                          placeholder="900.123.456-7"
                          value={formData.nit}
                          onChange={(e) => setFormData({...formData, nit: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Nombre de Contacto *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                          placeholder="Juan Pérez"
                          value={formData.contactName}
                          onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                          placeholder="contacto@empresa.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                          placeholder="+57 300 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Sector *
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                          value={formData.sector}
                          onChange={(e) => setFormData({...formData, sector: e.target.value})}
                          required
                        >
                          <option value="">Seleccione un sector</option>
                          <option value="tecnologia">Tecnología</option>
                          <option value="agroindustria">Agroindustria</option>
                          <option value="energia">Energía</option>
                          <option value="salud">Salud</option>
                          <option value="manufactura">Manufactura</option>
                          <option value="servicios">Servicios</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Descripción del Negocio *
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-y min-h-[100px]"
                        placeholder="Describa brevemente su modelo de negocio y propuesta de valor..."
                        value={formData.businessDescription}
                        onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Necesidades de Financiación *
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-y min-h-[100px]"
                        placeholder="Monto requerido y uso de los fondos..."
                        value={formData.financingNeeds}
                        onChange={(e) => setFormData({...formData, financingNeeds: e.target.value})}
                        required
                      />
                    </div>

                    <div className="bg-muted/30 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground">
                        Al enviar este formulario, acepta que un asesor de InnovaFin se ponga en contacto para continuar con el proceso de vinculación como originador.
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full bg-secondary hover:bg-secondary/90 rounded-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Enviando...</>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Solicitud de Vinculación
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Originadores Activos Tab */}
            <TabsContent value="originadores-activos" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Originadores Activos</h2>
                <p className="text-muted-foreground">Empresas que actualmente forman parte de la red InnovaFin</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {originatorsData.map((originator) => (
                  <Card key={originator.id} className="border-border/50 hover:shadow-lg transition-all hover:border-secondary/30">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Logo placeholder */}
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0">
                          <span className="text-xl font-bold text-white">{originator.logo}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-foreground">{originator.name}</h3>
                              <p className="text-sm text-muted-foreground">{originator.sector}</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                              {originator.status}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4">
                            {originator.description}
                          </p>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <MapPin className="w-4 h-4" />
                            {originator.location}
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Financiación Recibida</p>
                              <p className="text-lg font-bold text-foreground">{originator.financingReceived}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Crecimiento</p>
                              <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {originator.growth}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-primary/5">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-secondary mb-4">
                    ¿Quieres ser parte de nuestra red?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Únete a empresas exitosas que ya están creciendo con el apoyo de InnovaFin.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 rounded-full px-8"
                    onClick={() => setActiveTab('vinculacion')}
                  >
                    Aplicar Ahora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Originators;