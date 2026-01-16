import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, FileText, CheckCircle, TrendingUp,
  ClipboardList, Users, Search, BadgeCheck, Banknote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import logoInnovafin from '@/assets/logo-innovafin.png';

// Datos de originadores activos
const originatorsData = [
  {
    id: 1,
    name: 'Tech Solutions S.A.S',
    sector: 'Tecnología',
    status: 'Activo',
    description: 'Empresa líder en soluciones de software empresarial con presencia en 5 países.',
    financingReceived: '$2.5M',
    growth: '+45% YoY',
  },
  {
    id: 2,
    name: 'AgroExport Colombia',
    sector: 'Agroindustria',
    status: 'Activo',
    description: 'Exportador de productos agrícolas orgánicos certificados a mercados internacionales.',
    financingReceived: '$1.8M',
    growth: '+32% YoY',
  },
  {
    id: 3,
    name: 'Energía Verde S.A',
    sector: 'Energías Renovables',
    status: 'Activo',
    description: 'Desarrollo y operación de proyectos de energía solar y eólica.',
    financingReceived: '$5M',
    growth: '+28% YoY',
  },
  {
    id: 4,
    name: 'Salud Digital',
    sector: 'Salud',
    status: 'En Evaluación',
    description: 'Plataforma de telemedicina con más de 50,000 usuarios activos.',
    financingReceived: '$800K',
    growth: '+65% YoY',
  },
];

const requiredDocuments = [
  'Estados financieros últimos 3 años',
  'Plan de negocios',
  'Certificado de existencia y representación legal',
  'Referencias comerciales',
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

const benefits = [
  'Acceso a capital flexible y competitivo',
  'Asesoría estratégica y acompañamiento continuo',
  'Red de contactos y oportunidades de negocio',
  'Estructuras de financiación personalizadas',
  'Procesos ágiles y transparentes',
];

const Originators = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Solicitud enviada exitosamente. Nos pondremos en contacto pronto.');
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
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1a365d] to-[#2d4a7c] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <Link to="/" className="inline-block mb-6">
            <img src={logoInnovafin} alt="Innovafin" className="h-12 mx-auto" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Portal de Originadores</h1>
          <p className="text-lg text-white/80">
            Conectamos empresas con potencial de crecimiento con capital estratégico
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="vinculacion" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50">
            <TabsTrigger 
              value="vinculacion" 
              className="py-3 text-base data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Vinculación
            </TabsTrigger>
            <TabsTrigger 
              value="originadores" 
              className="py-3 text-base data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Originadores Activos
            </TabsTrigger>
            <TabsTrigger 
              value="proceso" 
              className="py-3 text-base data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Proceso
            </TabsTrigger>
          </TabsList>

          {/* Vinculación Tab */}
          <TabsContent value="vinculacion">
            <Card className="border-border/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  Formulario de Vinculación de Originadores
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Nombre de la Empresa
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Empresa S.A.S"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        NIT
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="900.123.456-7"
                        value={formData.nit}
                        onChange={(e) => setFormData({...formData, nit: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Nombre de Contacto
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Juan Pérez"
                        value={formData.contactName}
                        onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="contacto@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="+57 300 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Sector
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Tecnología, Salud, etc."
                        value={formData.sector}
                        onChange={(e) => setFormData({...formData, sector: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Descripción del Negocio
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y min-h-[100px]"
                      placeholder="Describa brevemente su modelo de negocio y propuesta de valor..."
                      value={formData.businessDescription}
                      onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      Necesidades de Financiación
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y min-h-[100px]"
                      placeholder="Monto requerido y uso de los fondos..."
                      value={formData.financingNeeds}
                      onChange={(e) => setFormData({...formData, financingNeeds: e.target.value})}
                      required
                    />
                  </div>

                  {/* Documentos Requeridos */}
                  <div className="bg-muted/30 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Upload className="w-5 h-5 text-foreground" />
                      <h3 className="font-semibold text-foreground">Documentos Requeridos</h3>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {requiredDocuments.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-muted-foreground">•</span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="w-full py-3 border-2 border-dashed border-border rounded-lg flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors bg-white"
                    >
                      <Upload className="w-5 h-5" />
                      Adjuntar Documentos
                    </button>
                  </div>

                  <Button type="submit" className="bg-[#1a365d] hover:bg-[#2d4a7c] text-white px-8">
                    Enviar Solicitud
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Originadores Activos Tab */}
          <TabsContent value="originadores">
            <div className="grid md:grid-cols-2 gap-6">
              {originatorsData.map((originator) => (
                <Card key={originator.id} className="border-border/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{originator.name}</h3>
                        <p className="text-sm text-muted-foreground">{originator.sector}</p>
                      </div>
                      <Badge 
                        variant={originator.status === 'Activo' ? 'default' : 'secondary'}
                        className={originator.status === 'Activo' 
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-100'
                        }
                      >
                        {originator.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6">
                      {originator.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
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

                    <Button variant="outline" className="w-full">
                      Ver Información Completa
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Proceso Tab */}
          <TabsContent value="proceso" className="space-y-8">
            <Card className="border-border/50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Proceso de Vinculación
                </h2>
                
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1a365d] flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-muted/30">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Beneficios para Originadores
                </h2>
                
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#1a365d] flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Originators;
