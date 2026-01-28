import { useState, useMemo } from 'react';
import { TrendingUp, Shield, Users, CheckCircle, ClipboardList, FileText, Send, ArrowRight, DollarSign, BarChart3, Calendar, User, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';
import { colombiaDepartments, contactTimeSlots } from '@/data/colombiaLocations';
import { supabase } from '@/integrations/supabase/client';

const beneficios = [{
  icon: TrendingUp,
  title: 'Rendimientos Competitivos',
  description: 'Accede a rentabilidades superiores al mercado tradicional con inversiones respaldadas por activos reales.'
}, {
  icon: Shield,
  title: 'Seguridad y Transparencia',
  description: 'Tu inversión está protegida por rigurosos procesos de análisis y una gestión profesional certificada.'
}, {
  icon: Users,
  title: 'Diversificación Inteligente',
  description: 'Distribuye tu capital en múltiples sectores y originadores para minimizar riesgos.'
}, {
  icon: BarChart3,
  title: 'Reportes Detallados',
  description: 'Acceso a reportes mensuales y trimestrales sobre el desempeño de sus inversiones.'
}];

const processSteps = [{
  icon: ClipboardList,
  title: '1. Registro',
  description: 'Complete el formulario de la ventana de vinculación con su información personal o empresarial'
}, {
  icon: FileText,
  title: '2. Documentación',
  description: 'Envíe los documentos requeridos para validar su perfil como inversionista'
}, {
  icon: Users,
  title: '3. Análisis',
  description: 'Nuestro equipo revisa su aplicación y valida su perfil de inversionista'
}, {
  icon: CheckCircle,
  title: '4. Aprobación',
  description: 'Una vez aprobado, recibirá acceso a las oportunidades de inversión disponibles'
}, {
  icon: DollarSign,
  title: '5. Inversión',
  description: 'Seleccione el compartimento de su preferencia y realice su primera inversión'
}];

const requiredDocsNatural = ['Copia del documento de identidad', 'Certificado de ingresos o declaración de renta', 'Certificación bancaria', 'Formulario de vinculación diligenciado'];
const requiredDocsJuridica = ['Certificado de existencia y representación legal', 'RUT actualizado', 'Estados financieros últimos 2 años', 'Copia del documento de identidad del representante legal', 'Certificación bancaria de la empresa'];

const Investors = () => {
  const [activeTab, setActiveTab] = useState('como-invertir');
  const [tipoPersona, setTipoPersona] = useState<'natural' | 'juridica'>('natural');
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    numeroIdentificacion: '',
    correoElectronico: '',
    telefono: '',
    razonSocial: '',
    nit: '',
    representanteLegal: '',
    departamento: '',
    ciudad: '',
    horarioContacto: '',
    montoInversion: '',
    mensaje: '',
    aceptaHabeasData: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openTimeSlot, setOpenTimeSlot] = useState(false);

  const {
    ref: heroRef,
    isVisible: heroVisible
  } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1
  });

  const {
    ref: statsRef,
    isVisible: statsVisible
  } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2
  });

  const availableCities = useMemo(() => {
    const department = colombiaDepartments.find(d => d.name === formData.departamento);
    return department?.cities || [];
  }, [formData.departamento]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'departamento' ? { ciudad: '' } : {})
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceptaHabeasData) {
      toast.error('Debe aceptar la política de tratamiento de datos personales.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('inversionistas_leads' as any).insert({
        tipo_persona: tipoPersona,
        nombre_completo: tipoPersona === 'natural' ? formData.nombreCompleto : null,
        numero_identificacion: tipoPersona === 'natural' ? formData.numeroIdentificacion : null,
        razon_social: tipoPersona === 'juridica' ? formData.razonSocial : null,
        nit: tipoPersona === 'juridica' ? formData.nit : null,
        representante_legal: tipoPersona === 'juridica' ? formData.representanteLegal : null,
        correo_electronico: formData.correoElectronico,
        telefono: formData.telefono,
        departamento: formData.departamento,
        ciudad: formData.ciudad,
        horario_contacto: formData.horarioContacto,
        monto_inversion: formData.montoInversion || null,
        mensaje: formData.mensaje || null,
        acepta_habeas_data: formData.aceptaHabeasData
      } as any);

      if (error) throw error;

      toast.success('El formulario se ha enviado con éxito. Un asesor se pondrá en contacto pronto.');
      setFormData({
        nombreCompleto: '',
        numeroIdentificacion: '',
        correoElectronico: '',
        telefono: '',
        razonSocial: '',
        nit: '',
        representanteLegal: '',
        departamento: '',
        ciudad: '',
        horarioContacto: '',
        montoInversion: '',
        mensaje: '',
        aceptaHabeasData: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Hubo un error al enviar el formulario. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section - Reduced padding */}
        <section ref={heroRef} className="bg-gradient-to-br from-primary to-primary/80 py-8 md:py-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="container-narrow mx-auto px-4 relative">
            <div className={cn("text-center transition-all duration-700", heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Portal de Inversionistas
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                Haz Crecer tu Capital con <span className="text-secondary">InnovaFin</span>
              </h1>
              <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto mb-5">
                Únete a nuestra comunidad de inversionistas y accede a oportunidades únicas en el mercado de financiamiento alternativo.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="default" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-6" onClick={() => setActiveTab('vinculacion')}>
                  <User className="w-4 h-4 mr-2" />
                  Vincularse Ahora
                </Button>
                <Button size="default" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full px-6" onClick={() => setActiveTab('como-invertir')}>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Cómo Invertir
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards with hover effect */}
        <section className="container-narrow mx-auto px-4 -mt-6 relative z-10">
          <div ref={statsRef} className={cn("grid md:grid-cols-3 gap-4 transition-all duration-700", statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rentabilidad EA</p>
                    <p className="text-xl font-bold text-primary">Hasta 14%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Inversión Mínima</p>
                    <p className="text-xl font-bold">$10.000.000 COP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Plazos</p>
                    <p className="text-xl font-bold">6 - 24 meses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Tabs Section */}
        <section className="container-narrow mx-auto px-4 py-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3 h-11">
              <TabsTrigger value="como-invertir" className="text-xs md:text-sm">
                <ArrowRight className="w-4 h-4 mr-1 md:mr-2" />
                Cómo Invertir
              </TabsTrigger>
              <TabsTrigger value="beneficios" className="text-xs md:text-sm">
                <TrendingUp className="w-4 h-4 mr-1 md:mr-2" />
                Beneficios
              </TabsTrigger>
              <TabsTrigger value="vinculacion" className="text-xs md:text-sm">
                <FileText className="w-4 h-4 mr-1 md:mr-2" />
                Vinculación
              </TabsTrigger>
            </TabsList>

            {/* Cómo Invertir Tab */}
            <TabsContent value="como-invertir" className="space-y-6">
              <Card className="border-2 border-primary/10">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                    Proceso de Vinculación
                  </CardTitle>
                  <CardDescription>Sigue estos pasos para convertirte en inversionista de InnovaFin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-sm">{step.title}</h3>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Documentos Requeridos */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Persona Natural
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {requiredDocsNatural.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Persona Jurídica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {requiredDocsJuridica.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button size="default" className="bg-primary hover:bg-primary/90 rounded-full px-6" onClick={() => setActiveTab('vinculacion')}>
                  Comenzar Vinculación
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Beneficios Tab */}
            <TabsContent value="beneficios" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {beneficios.map((beneficio, index) => (
                  <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                        <beneficio.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-2">
                        {beneficio.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {beneficio.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    ¿Listo para hacer crecer tu capital?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-xl mx-auto">
                    Únete a nuestra red de inversionistas y accede a oportunidades exclusivas con rendimientos superiores al mercado tradicional.
                  </p>
                  <Button size="default" className="bg-primary hover:bg-primary/90 rounded-full px-6" onClick={() => setActiveTab('vinculacion')}>
                    Comenzar Ahora
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vinculación Tab */}
            <TabsContent value="vinculacion">
              <Card className="border-2 border-primary/10">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    Formulario de Vinculación
                  </CardTitle>
                  <CardDescription>
                    Complete este formulario y un asesor se pondrá en contacto para continuar con el proceso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Tipo de Persona */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tipo de Persona *</label>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setTipoPersona('natural')} className={cn("flex-1 py-2.5 px-3 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2 text-sm", tipoPersona === 'natural' ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50")}>
                          <User className="w-4 h-4" />
                          Persona Natural
                        </button>
                        <button type="button" onClick={() => setTipoPersona('juridica')} className={cn("flex-1 py-2.5 px-3 rounded-xl border-2 font-medium transition-all flex items-center justify-center gap-2 text-sm", tipoPersona === 'juridica' ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/50")}>
                          <Users className="w-4 h-4" />
                          Persona Jurídica
                        </button>
                      </div>
                    </div>

                    {/* Identification Fields */}
                    {tipoPersona === 'natural' ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            Nombre Completo *
                          </label>
                          <input type="text" className="w-full px-3 py-2.5 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder="Juan Pérez" value={formData.nombreCompleto} onChange={e => handleInputChange('nombreCompleto', e.target.value)} required />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            Número de Identificación *
                          </label>
                          <input type="text" className="w-full px-3 py-2.5 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder="1234567890" value={formData.numeroIdentificacion} onChange={e => handleInputChange('numeroIdentificacion', e.target.value)} required />
                        </div>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            Razón Social *
                          </label>
                          <input type="text" className="w-full px-3 py-2.5 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder="Empresa S.A.S" value={formData.razonSocial} onChange={e => handleInputChange('razonSocial', e.target.value)} required />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            NIT *
                          </label>
                          <input type="text" className="w-full px-3 py-2.5 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder="900.123.456-7" value={formData.nit} onChange={e => handleInputChange('nit', e.target.value)} required />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm font-medium text-muted-foreground mb-2 block">
                            Representante Legal *
                          </label>
                          <input type="text" className="w-full px-3 py-2.5 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder="Nombre del representante legal" value={formData.representanteLegal} onChange={e => handleInputChange('representanteLegal', e.target.value)} required />
                        </div>
                      </div>
                    )}

                    {/* Contact Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Correo Electrónico *
                        </label>
                        <input type="email" className="w-full px-3 py-2.5 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder="correo@ejemplo.com" value={formData.correoElectronico} onChange={e => handleInputChange('correoElectronico', e.target.value)} required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Teléfono *
                        </label>
                        <input type="tel" className="w-full px-3 py-2.5 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" placeholder="+57 300 123 4567" value={formData.telefono} onChange={e => handleInputChange('telefono', e.target.value)} required />
                      </div>
                    </div>

                    {/* Location Fields - NEW */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Department */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Departamento *
                        </label>
                        <Popover open={openDepartment} onOpenChange={setOpenDepartment}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openDepartment}
                              className="w-full justify-between rounded-xl border-2 border-border bg-white hover:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm h-auto py-2.5 font-normal"
                            >
                              <span className={cn("flex items-center gap-2", !formData.departamento && "text-muted-foreground")}>
                                <MapPin className="w-4 h-4" />
                                {formData.departamento || "Seleccionar departamento"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0 bg-white z-50" align="start">
                            <Command>
                              <CommandInput placeholder="Buscar departamento..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No se encontró el departamento.</CommandEmpty>
                                <CommandGroup className="max-h-[200px] overflow-auto">
                                  {colombiaDepartments.map((dept) => (
                                    <CommandItem
                                      key={dept.name}
                                      value={dept.name}
                                      onSelect={() => {
                                        handleInputChange('departamento', dept.name);
                                        setOpenDepartment(false);
                                      }}
                                    >
                                      {dept.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* City */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Ciudad *
                        </label>
                        <Popover open={openCity} onOpenChange={setOpenCity}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCity}
                              disabled={!formData.departamento}
                              className="w-full justify-between rounded-xl border-2 border-border bg-white hover:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm h-auto py-2.5 font-normal disabled:opacity-50"
                            >
                              <span className={cn("flex items-center gap-2", !formData.ciudad && "text-muted-foreground")}>
                                <MapPin className="w-4 h-4" />
                                {formData.ciudad || "Seleccionar ciudad"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0 bg-white z-50" align="start">
                            <Command>
                              <CommandInput placeholder="Buscar ciudad..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No se encontró la ciudad.</CommandEmpty>
                                <CommandGroup className="max-h-[200px] overflow-auto">
                                  {availableCities.map((city) => (
                                    <CommandItem
                                      key={city}
                                      value={city}
                                      onSelect={() => {
                                        handleInputChange('ciudad', city);
                                        setOpenCity(false);
                                      }}
                                    >
                                      {city}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Contact Time */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Horario de Contacto *
                        </label>
                        <Popover open={openTimeSlot} onOpenChange={setOpenTimeSlot}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openTimeSlot}
                              className="w-full justify-between rounded-xl border-2 border-border bg-white hover:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm h-auto py-2.5 font-normal"
                            >
                              <span className={cn("flex items-center gap-2", !formData.horarioContacto && "text-muted-foreground")}>
                                <Clock className="w-4 h-4" />
                                {formData.horarioContacto || "Seleccionar horario"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[250px] p-0 bg-white z-50" align="start">
                            <Command>
                              <CommandList>
                                <CommandGroup>
                                  {contactTimeSlots.map((slot) => (
                                    <CommandItem
                                      key={slot}
                                      value={slot}
                                      onSelect={() => {
                                        handleInputChange('horarioContacto', slot);
                                        setOpenTimeSlot(false);
                                      }}
                                    >
                                      {slot}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Investment Fields */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Monto Aproximado de Inversión
                      </label>
                      <select className="w-full px-3 py-2.5 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm" value={formData.montoInversion} onChange={e => handleInputChange('montoInversion', e.target.value)}>
                        <option value="">Seleccione un rango</option>
                        <option value="10-50">$10 - $50 millones COP</option>
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
                      <textarea className="w-full px-3 py-2.5 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y min-h-[80px] text-sm" placeholder="Cuéntenos sobre sus objetivos de inversión..." value={formData.mensaje} onChange={e => handleInputChange('mensaje', e.target.value)} />
                    </div>

                    {/* Habeas Data Checkbox */}
                    <div className="flex items-start space-x-3 bg-muted/30 rounded-xl p-4">
                      <Checkbox
                        id="habeasData"
                        checked={formData.aceptaHabeasData}
                        onCheckedChange={(checked) => handleInputChange('aceptaHabeasData', checked as boolean)}
                        className="mt-0.5"
                        required
                      />
                      <label htmlFor="habeasData" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                        Autorizo de manera previa, expresa e informada a InnovaFin para el tratamiento de mis datos personales, de acuerdo con su{' '}
                        <a href="#" className="text-primary underline hover:text-primary/80">
                          Política de Tratamiento de Datos Personales
                        </a>
                        . *
                      </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 rounded-xl" disabled={isSubmitting || !formData.aceptaHabeasData}>
                      {isSubmitting ? (
                        <>Enviando...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
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
