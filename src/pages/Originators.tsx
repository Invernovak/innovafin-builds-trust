import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Building2, TrendingUp, PieChart, FileText, 
  Calendar, DollarSign, Users, BarChart3, LineChart,
  Upload, CheckCircle, AlertCircle, ChevronDown, ChevronUp,
  Briefcase, Target, Clock, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import logoInnovafin from '@/assets/logo-innovafin.png';

// Datos de ejemplo de originadores
const originatorsData = [
  {
    id: 1,
    name: 'Cooperativa ABC',
    type: 'Cooperativa',
    status: 'Activo',
    totalPortfolio: 2500000000,
    activeCredits: 1250,
    avgTicket: 2000000,
    mora30: 3.2,
    mora60: 1.8,
    mora90: 0.9,
    recovery: 94.5,
    vintageData: [
      { month: 'Ene 2024', disbursed: 450000000, current: 425000000, delinquent30: 18000000, delinquent60: 5400000, delinquent90: 1800000 },
      { month: 'Feb 2024', disbursed: 520000000, current: 494000000, delinquent30: 20800000, delinquent60: 4160000, delinquent90: 1040000 },
      { month: 'Mar 2024', disbursed: 480000000, current: 460800000, delinquent30: 14400000, delinquent60: 3840000, delinquent90: 960000 },
      { month: 'Abr 2024', disbursed: 550000000, current: 533500000, delinquent30: 11000000, delinquent60: 4400000, delinquent90: 1100000 },
      { month: 'May 2024', disbursed: 500000000, current: 490000000, delinquent30: 7500000, delinquent60: 2000000, delinquent90: 500000 },
    ],
    financialInfo: {
      revenue: 15000000000,
      assets: 8500000000,
      equity: 3200000000,
      roae: 18.5,
      roaa: 2.8,
      cartera: 6800000000,
      provisiones: 340000000,
      cubrimiento: 145,
    },
    documents: ['Estados Financieros 2024', 'Certificado Cámara de Comercio', 'RUT Actualizado'],
    contactPerson: 'María González',
    phone: '+57 318 555 1234',
    email: 'mgonzalez@cooperativaabc.com',
    joinDate: '2023-05-15',
  },
  {
    id: 2,
    name: 'Fintech Solutions SAS',
    type: 'Fintech',
    status: 'Activo',
    totalPortfolio: 1800000000,
    activeCredits: 3200,
    avgTicket: 562500,
    mora30: 4.1,
    mora60: 2.2,
    mora90: 1.1,
    recovery: 92.8,
    vintageData: [
      { month: 'Ene 2024', disbursed: 320000000, current: 300000000, delinquent30: 12800000, delinquent60: 5120000, delinquent90: 2080000 },
      { month: 'Feb 2024', disbursed: 380000000, current: 357000000, delinquent30: 15200000, delinquent60: 6080000, delinquent90: 1720000 },
      { month: 'Mar 2024', disbursed: 350000000, current: 332500000, delinquent30: 12250000, delinquent60: 4200000, delinquent90: 1050000 },
      { month: 'Abr 2024', disbursed: 400000000, current: 380000000, delinquent30: 14000000, delinquent60: 4800000, delinquent90: 1200000 },
      { month: 'May 2024', disbursed: 350000000, current: 336000000, delinquent30: 10500000, delinquent60: 2800000, delinquent90: 700000 },
    ],
    financialInfo: {
      revenue: 8500000000,
      assets: 4200000000,
      equity: 1500000000,
      roae: 22.3,
      roaa: 3.2,
      cartera: 3100000000,
      provisiones: 186000000,
      cubrimiento: 138,
    },
    documents: ['Estados Financieros 2024', 'Certificado SFC', 'Políticas de Crédito'],
    contactPerson: 'Carlos Rodríguez',
    phone: '+57 315 444 5678',
    email: 'crodriguez@fintechsolutions.co',
    joinDate: '2024-01-20',
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const Originators = () => {
  const [selectedOriginator, setSelectedOriginator] = useState<typeof originatorsData[0] | null>(null);
  const [expandedVintage, setExpandedVintage] = useState<number | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    nit: '',
    contactName: '',
    email: '',
    phone: '',
    portfolioSize: '',
  });
  const [uploadedDocs, setUploadedDocs] = useState<File[]>([]);

  const requiredDocuments = [
    'Estados Financieros últimos 3 años',
    'Certificado de Cámara de Comercio (no mayor a 30 días)',
    'RUT Actualizado',
    'Políticas de originación de crédito',
    'Manual de cobranza',
    'Informe de cosecha últimos 12 meses',
    'Composición de cartera por producto',
    'Estructura organizacional',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedDocs([...uploadedDocs, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Solicitud enviada exitosamente. Nos pondremos en contacto pronto.');
    setShowRegistration(false);
    setFormData({ companyName: '', nit: '', contactName: '', email: '', phone: '', portfolioSize: '' });
    setUploadedDocs([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logoInnovafin} alt="Innovafin" className="h-10" />
            </Link>
            <span className="text-muted-foreground">|</span>
            <h1 className="text-xl font-semibold text-foreground">Portal Originadores</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver al Inicio
              </Link>
            </Button>
            <Button onClick={() => setShowRegistration(true)}>
              Registrar Originador
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Registration Form Modal */}
        {showRegistration && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Registro de Nuevo Originador</CardTitle>
                <CardDescription>Complete la información para iniciar el proceso de vinculación</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nombre de la Empresa</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">NIT</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={formData.nit}
                        onChange={(e) => setFormData({...formData, nit: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nombre del Contacto</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={formData.contactName}
                        onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Correo Electrónico</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Teléfono</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tamaño de Cartera (COP)</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={formData.portfolioSize}
                        onChange={(e) => setFormData({...formData, portfolioSize: e.target.value})}
                        placeholder="Ej: 5.000.000.000"
                        required
                      />
                    </div>
                  </div>

                  {/* Required Documents */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Documentos Requeridos</h3>
                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                      <ul className="space-y-2">
                        {requiredDocuments.map((doc, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Arrastre sus documentos aquí o</p>
                      <label className="cursor-pointer">
                        <span className="text-primary hover:underline font-medium">seleccione archivos</span>
                        <input 
                          type="file" 
                          multiple 
                          className="hidden" 
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx,.xls,.xlsx"
                        />
                      </label>
                      {uploadedDocs.length > 0 && (
                        <div className="mt-4 text-left">
                          <p className="text-sm font-medium mb-2">Archivos cargados:</p>
                          {uploadedDocs.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-secondary" />
                              {file.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setShowRegistration(false)} className="flex-1">
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1">
                      Enviar Solicitud
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        {selectedOriginator ? (
          /* Detailed View */
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" onClick={() => setSelectedOriginator(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Lista
              </Button>
              <h2 className="text-2xl font-bold">{selectedOriginator.name}</h2>
              <Badge variant={selectedOriginator.status === 'Activo' ? 'default' : 'secondary'}>
                {selectedOriginator.status}
              </Badge>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">Información General</TabsTrigger>
                <TabsTrigger value="financial">Info Financiera</TabsTrigger>
                <TabsTrigger value="portfolio">Cartera de Créditos</TabsTrigger>
                <TabsTrigger value="vintage">Cosecha</TabsTrigger>
              </TabsList>

              {/* General Info Tab */}
              <TabsContent value="general" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tipo</p>
                          <p className="font-semibold">{selectedOriginator.type}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fecha Vinculación</p>
                          <p className="font-semibold">{new Date(selectedOriginator.joinDate).toLocaleDateString('es-CO')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Contacto</p>
                          <p className="font-semibold">{selectedOriginator.contactPerson}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cartera Total</p>
                          <p className="font-semibold">{formatCurrency(selectedOriginator.totalPortfolio)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Información de Contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Persona de Contacto</p>
                      <p className="font-medium">{selectedOriginator.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Teléfono</p>
                      <p className="font-medium">{selectedOriginator.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{selectedOriginator.email}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Documentos en Archivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-3">
                      {selectedOriginator.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Financial Info Tab */}
              <TabsContent value="financial" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Ingresos Totales</p>
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold text-primary">{formatCurrency(selectedOriginator.financialInfo.revenue)}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Activos Totales</p>
                        <Briefcase className="w-5 h-5 text-secondary" />
                      </div>
                      <p className="text-2xl font-bold text-secondary">{formatCurrency(selectedOriginator.financialInfo.assets)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Patrimonio</p>
                        <Shield className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-bold">{formatCurrency(selectedOriginator.financialInfo.equity)}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Cartera Bruta</p>
                        <PieChart className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <p className="text-2xl font-bold">{formatCurrency(selectedOriginator.financialInfo.cartera)}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Indicadores de Rentabilidad</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">ROAE</span>
                          <span className="text-sm font-bold text-secondary">{formatPercent(selectedOriginator.financialInfo.roae)}</span>
                        </div>
                        <Progress value={selectedOriginator.financialInfo.roae} max={30} className="h-3" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">ROAA</span>
                          <span className="text-sm font-bold text-primary">{formatPercent(selectedOriginator.financialInfo.roaa)}</span>
                        </div>
                        <Progress value={selectedOriginator.financialInfo.roaa * 10} max={50} className="h-3" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Calidad de Cartera</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">Provisiones</span>
                        <span className="font-bold">{formatCurrency(selectedOriginator.financialInfo.provisiones)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                        <span className="text-sm font-medium">Cubrimiento</span>
                        <span className="font-bold text-secondary">{formatPercent(selectedOriginator.financialInfo.cubrimiento)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Target className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Créditos Activos</p>
                          <p className="text-2xl font-bold">{selectedOriginator.activeCredits.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Ticket Promedio</p>
                          <p className="text-2xl font-bold">{formatCurrency(selectedOriginator.avgTicket)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Recuperación</p>
                          <p className="text-2xl font-bold text-green-600">{formatPercent(selectedOriginator.recovery)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <LineChart className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cartera Total</p>
                          <p className="text-2xl font-bold">{formatCurrency(selectedOriginator.totalPortfolio)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Indicadores de Mora</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-yellow-50 rounded-xl">
                        <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">Mora 30 días</p>
                        <p className="text-3xl font-bold text-yellow-600">{formatPercent(selectedOriginator.mora30)}</p>
                      </div>
                      <div className="text-center p-6 bg-orange-50 rounded-xl">
                        <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">Mora 60 días</p>
                        <p className="text-3xl font-bold text-orange-600">{formatPercent(selectedOriginator.mora60)}</p>
                      </div>
                      <div className="text-center p-6 bg-red-50 rounded-xl">
                        <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">Mora 90 días</p>
                        <p className="text-3xl font-bold text-red-600">{formatPercent(selectedOriginator.mora90)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Vintage Tab */}
              <TabsContent value="vintage" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Análisis de Cosecha
                    </CardTitle>
                    <CardDescription>Comportamiento de la cartera por mes de originación</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedOriginator.vintageData.map((vintage, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <button
                            className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                            onClick={() => setExpandedVintage(expandedVintage === index ? null : index)}
                          >
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">{vintage.month}</span>
                              <Badge variant="outline">Desembolso: {formatCurrency(vintage.disbursed)}</Badge>
                            </div>
                            {expandedVintage === index ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                          {expandedVintage === index && (
                            <div className="p-4 grid md:grid-cols-4 gap-4 bg-white">
                              <div className="text-center p-3 bg-green-50 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Al Día</p>
                                <p className="font-bold text-green-600">{formatCurrency(vintage.current)}</p>
                                <p className="text-xs text-green-600">{formatPercent((vintage.current / vintage.disbursed) * 100)}</p>
                              </div>
                              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Mora 30</p>
                                <p className="font-bold text-yellow-600">{formatCurrency(vintage.delinquent30)}</p>
                                <p className="text-xs text-yellow-600">{formatPercent((vintage.delinquent30 / vintage.disbursed) * 100)}</p>
                              </div>
                              <div className="text-center p-3 bg-orange-50 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Mora 60</p>
                                <p className="font-bold text-orange-600">{formatCurrency(vintage.delinquent60)}</p>
                                <p className="text-xs text-orange-600">{formatPercent((vintage.delinquent60 / vintage.disbursed) * 100)}</p>
                              </div>
                              <div className="text-center p-3 bg-red-50 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Mora 90+</p>
                                <p className="font-bold text-red-600">{formatCurrency(vintage.delinquent90)}</p>
                                <p className="text-xs text-red-600">{formatPercent((vintage.delinquent90 / vintage.disbursed) * 100)}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Originadores Activos</h2>
                <p className="text-muted-foreground">Gestione y consulte la información de los originadores vinculados</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {originatorsData.map((originator) => (
                <Card key={originator.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedOriginator(originator)}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{originator.name}</h3>
                          <p className="text-sm text-muted-foreground">{originator.type}</p>
                        </div>
                      </div>
                      <Badge variant={originator.status === 'Activo' ? 'default' : 'secondary'}>
                        {originator.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Cartera</p>
                        <p className="font-semibold text-sm">{formatCurrency(originator.totalPortfolio)}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Créditos</p>
                        <p className="font-semibold text-sm">{originator.activeCredits.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Mora 30</p>
                        <p className="font-semibold text-sm">{formatPercent(originator.mora30)}</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Ver Información Completa
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Originators;
