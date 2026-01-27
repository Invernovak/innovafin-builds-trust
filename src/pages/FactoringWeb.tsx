import { useState, useEffect } from 'react';
import { 
  FileText, Upload, CheckCircle, Clock, 
  DollarSign, Calculator, Send, Download, Eye, Filter,
  CreditCard, AlertCircle, ArrowRight, X, TrendingUp
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';

// Datos de ejemplo de facturas
const invoicesData = [
  {
    id: 'FAC-2024-001',
    client: 'Empresa XYZ SAS',
    nit: '900123456-1',
    amount: 45000000,
    discountRate: 1.8,
    netAmount: 44190000,
    dueDate: '2024-02-15',
    status: 'Aprobada',
    createdAt: '2024-01-10',
  },
  {
    id: 'FAC-2024-002',
    client: 'Corporación ABC',
    nit: '800987654-2',
    amount: 120000000,
    discountRate: 1.5,
    netAmount: 118200000,
    dueDate: '2024-02-28',
    status: 'En Revisión',
    createdAt: '2024-01-12',
  },
  {
    id: 'FAC-2024-003',
    client: 'Industrias DEF',
    nit: '900456789-3',
    amount: 75000000,
    discountRate: 2.0,
    netAmount: 73500000,
    dueDate: '2024-03-10',
    status: 'Pendiente',
    createdAt: '2024-01-14',
  },
  {
    id: 'FAC-2024-004',
    client: 'Comercializadora GHI',
    nit: '800111222-4',
    amount: 28000000,
    discountRate: 1.8,
    netAmount: 27496000,
    dueDate: '2024-02-20',
    status: 'Desembolsada',
    createdAt: '2024-01-08',
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

const formatNumber = (value: string) => {
  const num = value.replace(/\D/g, '');
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const parseNumber = (value: string) => {
  return parseInt(value.replace(/\./g, '')) || 0;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Aprobada': return 'bg-green-100 text-green-700 border-green-200';
    case 'En Revisión': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Pendiente': return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'Desembolsada': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Rechazada': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Aprobada': return <CheckCircle className="w-4 h-4" />;
    case 'En Revisión': return <Clock className="w-4 h-4" />;
    case 'Desembolsada': return <DollarSign className="w-4 h-4" />;
    default: return null;
  }
};

const FactoringWeb = () => {
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoicesData[0] | null>(null);
  const [activeTab, setActiveTab] = useState('calculadora');
  const [calculatorData, setCalculatorData] = useState({
    invoiceAmount: '',
    daysToMaturity: '30',
    rate: '1.8',
  });
  const [formData, setFormData] = useState({
    clientName: '',
    clientNit: '',
    invoiceNumber: '',
    invoiceAmount: '',
    dueDate: '',
    description: '',
  });
  const [uploadedDocs, setUploadedDocs] = useState<File[]>([]);

  // Animation refs
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  // Handle URL hash on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#calculadora') setActiveTab('calculadora');
    else if (hash === '#solicitud') {
      setActiveTab('calculadora');
      setShowNewInvoice(true);
    }
    else if (hash === '#historial') setActiveTab('historial');
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedDocs([...uploadedDocs, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('El formulario se ha enviado con éxito', {
      description: 'Recibirá una respuesta en las próximas 24 horas.',
    });
    setShowNewInvoice(false);
    setFormData({ clientName: '', clientNit: '', invoiceNumber: '', invoiceAmount: '', dueDate: '', description: '' });
    setUploadedDocs([]);
  };

  const handleCalculatorAmountChange = (value: string) => {
    const formatted = formatNumber(value);
    setCalculatorData({ ...calculatorData, invoiceAmount: formatted });
  };

  const calculateDiscount = () => {
    const amount = parseNumber(calculatorData.invoiceAmount);
    const days = parseInt(calculatorData.daysToMaturity) || 30;
    const rate = parseFloat(calculatorData.rate) || 1.8;
    const discount = amount * (rate / 100) * (days / 30);
    return {
      grossAmount: amount,
      discount: discount,
      netAmount: amount - discount,
      effectiveRate: (rate * days / 30).toFixed(2),
    };
  };

  const calculation = calculateDiscount();

  // Stats
  const totalPending = invoicesData.filter(i => i.status === 'Pendiente' || i.status === 'En Revisión').reduce((sum, i) => sum + i.amount, 0);
  const totalApproved = invoicesData.filter(i => i.status === 'Aprobada').reduce((sum, i) => sum + i.amount, 0);
  const totalDisbursed = invoicesData.filter(i => i.status === 'Desembolsada').reduce((sum, i) => sum + i.amount, 0);

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
                Portal Factoring
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Convierte tus <span className="text-secondary">Facturas</span> en Liquidez
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
                Obtén capital de trabajo inmediato descontando tus facturas por cobrar con las mejores condiciones del mercado.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8"
                  onClick={() => setShowNewInvoice(true)}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Nueva Solicitud
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full px-8"
                  onClick={() => setActiveTab('calculadora')}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Simular Descuento
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
              "grid md:grid-cols-4 gap-4 transition-all duration-700",
              statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Facturas</p>
                    <p className="text-2xl font-bold">{invoicesData.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">En Proceso</p>
                    <p className="text-xl font-bold">{formatCurrency(totalPending)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Aprobadas</p>
                    <p className="text-xl font-bold">{formatCurrency(totalApproved)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Desembolsado</p>
                    <p className="text-xl font-bold">{formatCurrency(totalDisbursed)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content */}
        <section className="container-narrow mx-auto px-4 py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 h-12">
              <TabsTrigger value="calculadora" className="text-sm">
                <Calculator className="w-4 h-4 mr-2" />
                Calculadora
              </TabsTrigger>
              <TabsTrigger value="historial" className="text-sm">
                <FileText className="w-4 h-4 mr-2" />
                Historial
              </TabsTrigger>
              <TabsTrigger value="guia" className="text-sm">
                <CreditCard className="w-4 h-4 mr-2" />
                Guía
              </TabsTrigger>
            </TabsList>

            {/* Calculator Tab */}
            <TabsContent value="calculadora" id="calculadora" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-2 border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-primary" />
                      </div>
                      Calculadora de Descuento
                    </CardTitle>
                    <CardDescription>Simule el valor a recibir por su factura</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Valor de la Factura (COP)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <input
                          type="text"
                          className="w-full pl-8 pr-4 py-4 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-xl font-bold transition-all"
                          value={calculatorData.invoiceAmount}
                          onChange={(e) => handleCalculatorAmountChange(e.target.value)}
                          placeholder="100.000.000"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Días al Vencimiento</label>
                        <select
                          className="w-full px-4 py-3 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          value={calculatorData.daysToMaturity}
                          onChange={(e) => setCalculatorData({...calculatorData, daysToMaturity: e.target.value})}
                        >
                          <option value="30">30 días</option>
                          <option value="45">45 días</option>
                          <option value="60">60 días</option>
                          <option value="90">90 días</option>
                          <option value="120">120 días</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tasa Mensual</label>
                        <select
                          className="w-full px-4 py-3 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          value={calculatorData.rate}
                          onChange={(e) => setCalculatorData({...calculatorData, rate: e.target.value})}
                        >
                          <option value="1.2">1.2%</option>
                          <option value="1.5">1.5%</option>
                          <option value="1.8">1.8%</option>
                          <option value="2.0">2.0%</option>
                          <option value="2.2">2.2%</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Resultado del Cálculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Valor Bruto de la Factura</span>
                      </div>
                      <span className="text-2xl font-bold">{formatCurrency(calculation.grossAmount)}</span>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Costo del Descuento ({calculation.effectiveRate}%)</span>
                      </div>
                      <span className="text-2xl font-bold text-red-500">- {formatCurrency(calculation.discount)}</span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-xl p-5 border-2 border-secondary/30">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-foreground">Valor a Recibir</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary font-medium">
                          En 24-48h
                        </span>
                      </div>
                      <span className="text-3xl font-bold text-secondary">{formatCurrency(calculation.netAmount)}</span>
                    </div>
                    
                    <Button className="w-full h-12 text-base rounded-xl" onClick={() => setShowNewInvoice(true)}>
                      Solicitar Descuento
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="historial" id="historial" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Historial de Facturas</CardTitle>
                      <CardDescription>Seguimiento de facturas enviadas para descuento</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtrar
                      </Button>
                      <Button size="sm" onClick={() => setShowNewInvoice(true)}>
                        <FileText className="w-4 h-4 mr-2" />
                        Nueva
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Pagador</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Valor Bruto</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Tasa</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Valor Neto</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Vencimiento</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Estado</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoicesData.map((invoice) => (
                          <tr key={invoice.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-4 text-sm font-medium">{invoice.id}</td>
                            <td className="py-4 px-4">
                              <div>
                                <p className="text-sm font-medium">{invoice.client}</p>
                                <p className="text-xs text-muted-foreground">{invoice.nit}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm text-right font-medium">{formatCurrency(invoice.amount)}</td>
                            <td className="py-4 px-4 text-sm text-center">{invoice.discountRate}%</td>
                            <td className="py-4 px-4 text-sm text-right font-bold text-secondary">{formatCurrency(invoice.netAmount)}</td>
                            <td className="py-4 px-4 text-sm text-center">{new Date(invoice.dueDate).toLocaleDateString('es-CO')}</td>
                            <td className="py-4 px-4 text-center">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                                {getStatusIcon(invoice.status)}
                                {invoice.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Button variant="ghost" size="sm" onClick={() => setSelectedInvoice(invoice)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Guide Tab */}
            <TabsContent value="guia" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>¿Cómo Funciona el Factoring?</CardTitle>
                  <CardDescription>Guía paso a paso para descontar sus facturas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-6">
                    {[
                      { step: 1, title: 'Cargue su Factura', desc: 'Suba la factura electrónica y documentos de soporte', color: 'primary' },
                      { step: 2, title: 'Análisis', desc: 'Evaluamos la factura y el riesgo del pagador', color: 'primary' },
                      { step: 3, title: 'Aprobación', desc: 'Reciba la propuesta de descuento en 24 horas', color: 'primary' },
                      { step: 4, title: 'Desembolso', desc: 'Reciba el dinero en su cuenta en 24-48 horas', color: 'secondary' },
                    ].map((item) => (
                      <div key={item.step} className={cn(
                        "text-center p-6 rounded-2xl transition-all duration-300 hover:scale-105",
                        item.color === 'secondary' ? "bg-secondary/10" : "bg-muted/50"
                      )}>
                        <div className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4",
                          item.color === 'secondary' ? "bg-secondary/20" : "bg-primary/10"
                        )}>
                          <span className={cn(
                            "text-xl font-bold",
                            item.color === 'secondary' ? "text-secondary" : "text-primary"
                          )}>{item.step}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary" />
                      Beneficios
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        'Liquidez inmediata sin endeudarse',
                        'Tasas competitivas desde 1.2% mensual',
                        'Proceso 100% digital',
                        'Desembolso en 24-48 horas',
                        'Sin impacto en centrales de riesgo',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <CheckCircle className="w-5 h-5 text-secondary mt-0.5 group-hover:scale-110 transition-transform" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      Requisitos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        'Factura electrónica vigente',
                        'Pagador con buen historial crediticio',
                        'Documento de aceptación del pagador',
                        'Orden de compra o contrato',
                        'Certificación bancaria',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <FileText className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* New Invoice Modal */}
        {showNewInvoice && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" id="solicitud">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Nueva Solicitud de Factoring</CardTitle>
                    <CardDescription>Complete la información de la factura para solicitar el descuento</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowNewInvoice(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nombre del Pagador</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={formData.clientName}
                        onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                        placeholder="Nombre de la empresa pagadora"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">NIT del Pagador</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={formData.clientNit}
                        onChange={(e) => setFormData({...formData, clientNit: e.target.value})}
                        placeholder="900123456-1"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Número de Factura</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={formData.invoiceNumber}
                        onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                        placeholder="FAC-001"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Valor de la Factura (COP)</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={formData.invoiceAmount}
                        onChange={(e) => setFormData({...formData, invoiceAmount: formatNumber(e.target.value)})}
                        placeholder="50.000.000"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Fecha de Vencimiento</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Descripción</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Bienes o servicios facturados"
                      />
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Documentos Requeridos</h3>
                    <div className="bg-muted/50 rounded-xl p-4 mb-4">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <FileText className="w-4 h-4 text-primary mt-0.5" />
                          <span>Factura electrónica (PDF)</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <FileText className="w-4 h-4 text-primary mt-0.5" />
                          <span>Orden de compra o contrato</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <FileText className="w-4 h-4 text-primary mt-0.5" />
                          <span>Acta de entrega o recibo a satisfacción</span>
                        </li>
                      </ul>
                    </div>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-2">Arrastre sus documentos aquí o</p>
                      <label className="cursor-pointer">
                        <span className="text-primary hover:underline font-medium">seleccione archivos</span>
                        <input 
                          type="file" 
                          multiple 
                          className="hidden" 
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
                        />
                      </label>
                      {uploadedDocs.length > 0 && (
                        <div className="mt-4 text-left bg-muted/50 rounded-lg p-3">
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

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowNewInvoice(false)} className="flex-1 h-12 rounded-xl">
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1 h-12 rounded-xl">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Solicitud
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Invoice Detail Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Detalle de Factura</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedInvoice(null)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'ID', value: selectedInvoice.id },
                  { label: 'Pagador', value: selectedInvoice.client },
                  { label: 'NIT', value: selectedInvoice.nit },
                  { label: 'Valor Bruto', value: formatCurrency(selectedInvoice.amount) },
                  { label: 'Tasa de Descuento', value: `${selectedInvoice.discountRate}%` },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-xl">
                  <span className="font-medium">Valor Neto</span>
                  <span className="font-bold text-xl text-secondary">{formatCurrency(selectedInvoice.netAmount)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <span className="text-muted-foreground">Vencimiento</span>
                  <span className="font-medium">{new Date(selectedInvoice.dueDate).toLocaleDateString('es-CO')}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <span className="text-muted-foreground">Estado</span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedInvoice.status)}`}>
                    {getStatusIcon(selectedInvoice.status)}
                    {selectedInvoice.status}
                  </span>
                </div>
                <Button className="w-full h-12 rounded-xl mt-4" onClick={() => setSelectedInvoice(null)}>
                  Cerrar
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default FactoringWeb;
