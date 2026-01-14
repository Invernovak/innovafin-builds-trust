import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Upload, CheckCircle, Clock, 
  DollarSign, Building2, Calendar, TrendingUp,
  Calculator, Send, Download, Eye, Filter,
  CreditCard, AlertCircle, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import logoInnovafin from '@/assets/logo-innovafin.png';

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

const FactoringWeb = () => {
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoicesData[0] | null>(null);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedDocs([...uploadedDocs, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Factura enviada para análisis. Recibirá una respuesta en las próximas 24 horas.');
    setShowNewInvoice(false);
    setFormData({ clientName: '', clientNit: '', invoiceNumber: '', invoiceAmount: '', dueDate: '', description: '' });
    setUploadedDocs([]);
  };

  const calculateDiscount = () => {
    const amount = parseFloat(calculatorData.invoiceAmount.replace(/[,.]/g, '')) || 0;
    const days = parseInt(calculatorData.daysToMaturity) || 30;
    const rate = parseFloat(calculatorData.rate) || 1.8;
    const discount = amount * (rate / 100) * (days / 30);
    return {
      grossAmount: amount,
      discount: discount,
      netAmount: amount - discount,
    };
  };

  const calculation = calculateDiscount();

  // Stats
  const totalPending = invoicesData.filter(i => i.status === 'Pendiente' || i.status === 'En Revisión').reduce((sum, i) => sum + i.amount, 0);
  const totalApproved = invoicesData.filter(i => i.status === 'Aprobada').reduce((sum, i) => sum + i.amount, 0);
  const totalDisbursed = invoicesData.filter(i => i.status === 'Desembolsada').reduce((sum, i) => sum + i.amount, 0);

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
            <div>
              <h1 className="text-xl font-semibold text-foreground">Factoring WEB</h1>
              <p className="text-xs text-muted-foreground">Portal de Factoring InnovaFin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver al Inicio
              </Link>
            </Button>
            <Button onClick={() => setShowNewInvoice(true)}>
              <FileText className="w-4 h-4 mr-2" />
              Nueva Factura
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* New Invoice Modal */}
        {showNewInvoice && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Cargar Nueva Factura</CardTitle>
                <CardDescription>Complete la información de la factura para solicitar el descuento</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nombre del Pagador</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={formData.invoiceAmount}
                        onChange={(e) => setFormData({...formData, invoiceAmount: e.target.value})}
                        placeholder="50.000.000"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Fecha de Vencimiento</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Descripción</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Bienes o servicios facturados"
                      />
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Documentos Requeridos</h3>
                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
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
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
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
                    <Button type="button" variant="outline" onClick={() => setShowNewInvoice(false)} className="flex-1">
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Factura
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
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
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">En Proceso</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalPending)}</p>
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
                  <p className="text-sm text-muted-foreground">Aprobadas</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalApproved)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Desembolsado</p>
                  <p className="text-2xl font-bold">{formatCurrency(totalDisbursed)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="invoices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="invoices">Mis Facturas</TabsTrigger>
            <TabsTrigger value="calculator">Calculadora</TabsTrigger>
            <TabsTrigger value="guide">Guía de Uso</TabsTrigger>
          </TabsList>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Facturas Cargadas</CardTitle>
                    <CardDescription>Historial de facturas enviadas para descuento</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </Button>
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
                          <td className="py-3 px-4 text-sm font-medium">{invoice.id}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm font-medium">{invoice.client}</p>
                              <p className="text-xs text-muted-foreground">{invoice.nit}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(invoice.amount)}</td>
                          <td className="py-3 px-4 text-sm text-center">{invoice.discountRate}%</td>
                          <td className="py-3 px-4 text-sm text-right font-bold text-secondary">{formatCurrency(invoice.netAmount)}</td>
                          <td className="py-3 px-4 text-sm text-center">{new Date(invoice.dueDate).toLocaleDateString('es-CO')}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
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

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Calculadora de Descuento
                  </CardTitle>
                  <CardDescription>Simule el valor a recibir por su factura</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Valor de la Factura (COP)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg"
                      value={calculatorData.invoiceAmount}
                      onChange={(e) => setCalculatorData({...calculatorData, invoiceAmount: e.target.value})}
                      placeholder="100.000.000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Días al Vencimiento</label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                    <label className="text-sm font-medium mb-2 block">Tasa Mensual (%)</label>
                    <select
                      className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={calculatorData.rate}
                      onChange={(e) => setCalculatorData({...calculatorData, rate: e.target.value})}
                    >
                      <option value="1.5">1.5%</option>
                      <option value="1.8">1.8%</option>
                      <option value="2.0">2.0%</option>
                      <option value="2.2">2.2%</option>
                      <option value="2.5">2.5%</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle>Resultado del Cálculo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="text-muted-foreground">Valor Bruto</span>
                    <span className="text-xl font-bold">{formatCurrency(calculation.grossAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="text-muted-foreground">Descuento</span>
                    <span className="text-xl font-bold text-red-500">- {formatCurrency(calculation.discount)}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg border-2 border-secondary/30">
                    <span className="font-semibold">Valor a Recibir</span>
                    <span className="text-2xl font-bold text-secondary">{formatCurrency(calculation.netAmount)}</span>
                  </div>
                  <Button className="w-full" onClick={() => setShowNewInvoice(true)}>
                    Cargar Factura
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Guide Tab */}
          <TabsContent value="guide" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>¿Cómo Funciona el Factoring?</CardTitle>
                <CardDescription>Guía paso a paso para descontar sus facturas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Cargue su Factura</h3>
                    <p className="text-sm text-muted-foreground">Suba la factura electrónica y documentos de soporte</p>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Análisis</h3>
                    <p className="text-sm text-muted-foreground">Evaluamos la factura y el riesgo del pagador</p>
                  </div>
                  <div className="text-center p-6 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Aprobación</h3>
                    <p className="text-sm text-muted-foreground">Reciba la propuesta de descuento en 24 horas</p>
                  </div>
                  <div className="text-center p-6 bg-secondary/10 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-secondary">4</span>
                    </div>
                    <h3 className="font-semibold mb-2">Desembolso</h3>
                    <p className="text-sm text-muted-foreground">Reciba el dinero en su cuenta en 24-48 horas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Beneficios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                      <span>Liquidez inmediata sin endeudarse</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                      <span>Tasas competitivas desde 1.5% mensual</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                      <span>Proceso 100% digital</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                      <span>Desembolso en 24-48 horas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5" />
                      <span>Sin impacto en centrales de riesgo</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Requisitos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary mt-0.5" />
                      <span>Factura electrónica vigente</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary mt-0.5" />
                      <span>Pagador con buen historial crediticio</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary mt-0.5" />
                      <span>Documento de aceptación del pagador</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary mt-0.5" />
                      <span>Orden de compra o contrato</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-primary mt-0.5" />
                      <span>Certificación bancaria</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Invoice Detail Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Detalle de Factura</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedInvoice(null)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">ID</span>
                  <span className="font-bold">{selectedInvoice.id}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Pagador</span>
                  <span className="font-medium">{selectedInvoice.client}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Valor Bruto</span>
                  <span className="font-bold">{formatCurrency(selectedInvoice.amount)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Tasa de Descuento</span>
                  <span className="font-medium">{selectedInvoice.discountRate}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                  <span className="font-medium">Valor Neto</span>
                  <span className="font-bold text-secondary">{formatCurrency(selectedInvoice.netAmount)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Vencimiento</span>
                  <span className="font-medium">{new Date(selectedInvoice.dueDate).toLocaleDateString('es-CO')}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-muted-foreground">Estado</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedInvoice.status)}`}>
                    {selectedInvoice.status}
                  </span>
                </div>
                <Button className="w-full" onClick={() => setSelectedInvoice(null)}>
                  Cerrar
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default FactoringWeb;
