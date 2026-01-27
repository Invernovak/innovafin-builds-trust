import { useState } from 'react';
import { 
  TrendingUp, Shield, Users, CheckCircle, 
  ClipboardList, FileText, Send, ArrowRight,
  DollarSign, BarChart3, Calendar, User, LogIn
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

const beneficios = [
  {
    icon: TrendingUp,
    title: 'Rendimientos Competitivos',
    description: 'Accede a rentabilidades superiores al mercado tradicional con inversiones respaldadas por activos reales.',
  },
  {
    icon: Shield,
    title: 'Seguridad y Transparencia',
    description: 'Tu inversión está protegida por rigurosos procesos de análisis y una gestión profesional certificada.',
  },
  {
    icon: Users,
    title: 'Diversificación Inteligente',
    description: 'Distribuye tu capital en múltiples sectores y originadores para minimizar riesgos.',
  },
  {
    icon: BarChart3,
    title: 'Reportes Detallados',
    description: 'Acceso a reportes mensuales y trimestrales sobre el desempeño de sus inversiones.',
  },
];

const processSteps = [
  {
    icon: ClipboardList,
    title: '1. Registro',
    description: 'Complete el formulario de vinculación con su información personal o empresarial',
  },
  {
    icon: FileText,
    title: '2. Documentación',
    description: 'Envíe los documentos requeridos para validar su perfil como inversionista',
  },
  {
    icon: Users,
    title: '3. Análisis',
    description: 'Nuestro equipo revisa su aplicación y valida su perfil de inversionista',
  },
  {
    icon: CheckCircle,
    title: '4. Aprobación',
    description: 'Una vez aprobado, recibirá acceso a las oportunidades de inversión disponibles',
  },
  {
    icon: DollarSign,
    title: '5. Inversión',
    description: 'Seleccione el compartimento de su preferencia y realice su primera inversión',
  },
];

const requiredDocsNatural = [
  'Copia del documento de identidad',
  'Certificado de ingresos o declaración de renta',
  'Certificación bancaria',
  'Formulario de vinculación diligenciado',
];

const requiredDocsJuridica = [
  'Certificado de existencia y representación legal',
  'RUT actualizado',
  'Estados financieros últimos 2 años',
  'Copia del documento de identidad del representante legal',
  'Certificación bancaria de la empresa',
];

const Investors = () => {
  const [activeTab, setActiveTab] = useState('beneficios');
  const [tipoPersona, setTipoPersona] = useState<'natural' | 'juridica'>('natural');
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    numeroIdentificacion: '',
    correoElectronico: '',
    telefono: '',
    razonSocial: '',
    nit: '',
    representanteLegal: '',
    montoInversion: '',
    mensaje: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('El formulario se ha enviado con éxito. Un asesor se pondrá en contacto pronto.');
    setFormData({
      nombreCompleto: '',
      numeroIdentificacion: '',
      correoElectronico: '',
      telefono: '',
      razonSocial: '',
      nit: '',
      representanteLegal: '',
      montoInversion: '',
      mensaje: '',
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
          className="bg-gradient-to-br from-primary to-primary/80 py-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="container-narrow mx-auto px-4 relative">
            <div className={cn(
              "text-center transition-all duration-700",
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Portal de Inversionistas
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Haz Crecer tu Capital con <span className="text-secondary">InnovaFin</span>
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                Únete a nuestra comunidad de inversionistas y accede a oportunidades únicas en el mercado de financiamiento alternativo.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8"
                  onClick={() => setActiveTab('vinculacion')}
                >
                  <User className="w-5 h-5 mr-2" />
                  Vincularse Ahora
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full px-8"
                  onClick={() => setActiveTab('como-invertir')}
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Cómo Invertir
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
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rentabilidad EA</p>
                    <p className="text-2xl font-bold text-primary">Hasta 14%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inversión Mínima</p>
                    <p className="text-2xl font-bold">$50M COP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Plazos</p>
                    <p className="text-2xl font-bold">6 - 24 meses</p>
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
              <TabsTrigger value="como-invertir" className="text-sm">
                <ArrowRight className="w-4 h-4 mr-2" />
                Cómo Invertir
              </TabsTrigger>
              <TabsTrigger value="beneficios" className="text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Beneficios
              </TabsTrigger>
              <TabsTrigger value="vinculacion" className="text-sm">
                <FileText className="w-4 h-4 mr-2" />
                Vinculación
              </TabsTrigger>
            </TabsList>

            {/* Cómo Invertir Tab */}
            <TabsContent value="como-invertir" className="space-y-8">
              <Card className="border-2 border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                    Proceso de Vinculación
                  </CardTitle>
                  <CardDescription>Sigue estos pasos para convertirte en inversionista de InnovaFin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-primary-foreground" />
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
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Persona Natural
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {requiredDocsNatural.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Persona Jurídica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {requiredDocsJuridica.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 rounded-full px-8"
                  onClick={() => setActiveTab('vinculacion')}
                >
                  Comenzar Vinculación
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Beneficios Tab */}
            <TabsContent value="beneficios" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {beneficios.map((beneficio, index) => (
                  <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <beneficio.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {beneficio.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {beneficio.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    ¿Listo para hacer crecer tu capital?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Únete a nuestra red de inversionistas y accede a oportunidades exclusivas con rendimientos superiores al mercado tradicional.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 rounded-full px-8"
                    onClick={() => setActiveTab('vinculacion')}
                  >
                    Comenzar Ahora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vinculación Tab */}
            <TabsContent value="vinculacion">
              <Card className="border-2 border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    Formulario de Vinculación
                  </CardTitle>
                  <CardDescription>
                    Complete este formulario y un asesor se pondrá en contacto para continuar con el proceso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tipo de Persona */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Tipo de Persona</label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setTipoPersona('natural')}
                          className={cn(
                            "flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2",
                            tipoPersona === 'natural'
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          )}
                        >
                          <User className="w-5 h-5" />
                          Persona Natural
                        </button>
                        <button
                          type="button"
                          onClick={() => setTipoPersona('juridica')}
                          className={cn(
                            "flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2",
                            tipoPersona === 'juridica'
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          )}
                        >
                          <Users className="w-5 h-5" />
                          Persona Jurídica
                        </button>
                      </div>
                    </div>

                    {tipoPersona === 'natural' ? (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            Nombre Completo *
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Juan Pérez"
                            value={formData.nombreCompleto}
                            onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            Número de Identificación *
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="1234567890"
                            value={formData.numeroIdentificacion}
                            onChange={(e) => handleInputChange('numeroIdentificacion', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            Razón Social *
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Empresa S.A.S"
                            value={formData.razonSocial}
                            onChange={(e) => handleInputChange('razonSocial', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            NIT *
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="900.123.456-7"
                            value={formData.nit}
                            onChange={(e) => handleInputChange('nit', e.target.value)}
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            Representante Legal *
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Nombre del representante legal"
                            value={formData.representanteLegal}
                            onChange={(e) => handleInputChange('representanteLegal', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="correo@ejemplo.com"
                          value={formData.correoElectronico}
                          onChange={(e) => handleInputChange('correoElectronico', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="+57 300 123 4567"
                          value={formData.telefono}
                          onChange={(e) => handleInputChange('telefono', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Monto Aproximado de Inversión
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={formData.montoInversion}
                        onChange={(e) => handleInputChange('montoInversion', e.target.value)}
                      >
                        <option value="">Seleccione un rango</option>
                        <option value="50-100">$50 - $100 millones COP</option>
                        <option value="100-250">$100 - $250 millones COP</option>
                        <option value="250-500">$250 - $500 millones COP</option>
                        <option value="500+">Más de $500 millones COP</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Mensaje o Comentarios
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y min-h-[100px]"
                        placeholder="Cuéntenos sobre sus objetivos de inversión..."
                        value={formData.mensaje}
                        onChange={(e) => handleInputChange('mensaje', e.target.value)}
                      />
                    </div>

                    <div className="bg-muted/30 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground">
                        Al enviar este formulario, acepta que un asesor de InnovaFin se ponga en contacto para continuar con el proceso de vinculación.
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 rounded-xl"
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
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Investors;