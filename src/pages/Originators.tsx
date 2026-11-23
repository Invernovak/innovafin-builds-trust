import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { useLeadSubmission } from '@/hooks/useLeadSubmission';
import { CheckCircle, ClipboardList, Users, Search, BadgeCheck, Upload, Send, ArrowRight, Check, ChevronsUpDown, RefreshCw, Briefcase, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { LegalCheckboxes } from '@/components/LegalCheckboxes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import Header from '@/components/Header';
import TabsHint from '@/components/TabsHint';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';
import { colombiaDepartments, contactTimeSlots } from '@/data/colombiaLocations';

// Tipos de originación
const originationTypes = [
  { value: 'libranza-publica', label: 'Libranza Pública 🏛️' },
  { value: 'libranza-privada', label: 'Libranza Privada 🏢' },
  { value: 'libranza-vehiculo', label: 'Libranza Vehículo 🚗' },
  { value: 'libranza-educacion', label: 'Libranza Educación 🎓' },
  { value: 'credito-consumo', label: 'Crédito de Consumo Ordinario / Educativo 🏦' },
  { value: 'microcredito', label: 'Microcrédito 📈' },
  { value: 'credito-vivienda', label: 'Crédito de Vivienda / Hipotecario 🏠' },
];



// Beneficios que se muestran junto al proceso de vinculación
const originatorBenefits = [
  {
    icon: Briefcase,
    title: 'Financiamiento Ágil',
    description: 'Obtén capital de trabajo de manera rápida y eficiente para impulsar el crecimiento de tu empresa.',
  },
  {
    icon: BarChart3,
    title: 'Acompañamiento Integral',
    description: 'Te brindamos asesoría continua y herramientas para optimizar tu gestión financiera.',
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
  const location = useLocation();

  // Abre una pestaña y baja suavemente hasta ella
  const goToTab = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      document.getElementById('pestanas-originadores')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Abre la pestaña indicada en la URL (ej. /originators#vinculacion o #registro)
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    const tab = hash === 'registro' ? 'vinculacion' : hash;
    if (!['como-vincularse', 'vinculacion'].includes(tab)) return;
    setActiveTab(tab);
    const timer = setTimeout(() => {
      document.getElementById('pestanas-originadores')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [location.hash]);
  const [formData, setFormData] = useState({
    companyName: '',
    nit: '',
    contactName: '',
    email: '',
    phone: '',
    originationType: '',
    departamento: '',
    ciudad: '',
    horarioContacto: '',
    businessDescription: '',
    financingNeeds: '',
    aceptaHabeasData: false,
    aceptaTerminos: false,
  });
  const [departamentoOpen, setDepartamentoOpen] = useState(false);
  const [ciudadOpen, setCiudadOpen] = useState(false);

  const { submitLead, isSubmitting } = useLeadSubmission({
    type: 'originator',
    onSuccess: () => {
      setFormData({
        companyName: '',
        nit: '',
        contactName: '',
        email: '',
        phone: '',
        originationType: '',
        departamento: '',
        ciudad: '',
        horarioContacto: '',
        businessDescription: '',
        financingNeeds: '',
        aceptaHabeasData: false,
        aceptaTerminos: false,
      });
    }
  });

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  // Get cities based on selected department
  const availableCities = useMemo(() => {
    if (!formData.departamento) return [];
    const department = colombiaDepartments.find(d => d.name === formData.departamento);
    return department ? department.cities : [];
  }, [formData.departamento]);

  const handleDepartmentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      departamento: value,
      ciudad: '', // Reset city when department changes
    }));
    setDepartamentoOpen(false);
  };

  const handleCityChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      ciudad: value,
    }));
    setCiudadOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Additional validation for checkbox
    if (!formData.aceptaHabeasData) {
      toast.error('Debe aceptar la política de tratamiento de datos personales');
      return;
    }

    if (!formData.aceptaTerminos) {
      toast.error('Debe aceptar los términos y condiciones');
      return;
    }

    await submitLead({
      razon_social: formData.companyName,
      nit: formData.nit,
      nombre_contacto: formData.contactName,
      email: formData.email,
      telefono: formData.phone,
      tipo_originacion: formData.originationType,
      departamento: formData.departamento,
      ciudad: formData.ciudad,
      horario_contacto: formData.horarioContacto,
      descripcion_negocio: formData.businessDescription,
      necesidades_financiacion: formData.financingNeeds,
      acepta_datos: formData.aceptaHabeasData,
      acepta_terminos: formData.aceptaTerminos
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Portal de Originadores" 
        description="Potencia tu originación con Innovafin. Accede a fondeo eficiente y flexible para expandir tu operación de crédito."
      />
      <Header />

      <main className="pt-20">
        {/* Hero Section - Reduced padding */}
        <section
          ref={heroRef}
          className="bg-gradient-to-br from-secondary to-secondary/80 pt-8 pb-8 md:pt-10 md:pb-10 relative overflow-hidden"
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
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Portal de Originadores
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 text-center">
                Impulsa tu Empresa con <span className="text-white/90">Financiamiento Alternativo</span>
              </h1>
              <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto mb-8 text-center">
                Conectamos empresas con potencial de crecimiento con capital estratégico para impulsar su expansión.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all duration-300" onClick={() => goToTab('vinculacion')}>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Vincularse Ahora
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full px-8 backdrop-blur-sm transition-all duration-300" onClick={() => goToTab('como-vincularse')}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Cómo Funciona
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Tabs Section */}
        <section id="pestanas-originadores" className="container-narrow mx-auto px-4 py-8 scroll-mt-24">
          <Tabs value={activeTab} onValueChange={goToTab} className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
              <TabsHint />
              <TabsList className="grid w-full max-w-xl mx-auto md:mx-0 grid-cols-2">
                <TabsTrigger value="como-vincularse" className="text-xs md:text-sm">
                  <ArrowRight className="w-4 h-4 mr-1 md:mr-2" />
                  Cómo Vincularse
                </TabsTrigger>
                <TabsTrigger value="vinculacion" className="text-xs md:text-sm">
                  <ClipboardList className="w-4 h-4 mr-1 md:mr-2" />
                  Vinculación
                </TabsTrigger>

              </TabsList>
            </div>

            {/* Cómo Vincularse Tab */}
            <TabsContent value="como-vincularse" className="space-y-6">
              <Card className="border-2 border-secondary/10">
                <div className="grid lg:grid-cols-2 items-center">
                  {/* Pasos del proceso */}
                  <div>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-secondary" />
                        </div>
                        Proceso de Vinculación
                      </CardTitle>
                      <CardDescription>Siga estos pasos para convertirse en originador de InnovaFin</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      {processSteps.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                            <step.icon className="w-5 h-5 text-secondary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground text-sm">{step.title}</h3>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </div>

                  {/* Beneficios para originadores */}
                  <div className="grid sm:grid-cols-2 gap-4 px-6 pb-6 lg:pt-6 lg:pl-0">
                    {originatorBenefits.map((benefit) => (
                      <div
                        key={benefit.title}
                        className="bento-card text-center group hover:border-secondary/20 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-secondary/10 mx-auto mb-4 flex items-center justify-center group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-300">
                          <benefit.icon className="w-7 h-7 text-secondary" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Documentos Requeridos */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Upload className="w-4 h-4 text-secondary" />
                    Documentos Requeridos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-2">
                    {requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                        {doc}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  size="default"
                  className="bg-primary hover:bg-primary/90 rounded-full px-6"
                  onClick={() => goToTab('vinculacion')}
                >
                  Comenzar Vinculación
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </TabsContent>

            {/* Vinculación Tab */}
            <TabsContent value="vinculacion">
              <Card className="border-2 border-secondary/10">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <ClipboardList className="w-4 h-4 text-secondary" />
                    </div>
                    Formulario de Vinculación de Originadores
                  </CardTitle>
                  <CardDescription>
                    Complete este formulario y un asesor se pondrá en contacto para continuar con el proceso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="form-vinculacion-originadores" name="Vinculacion Originadores" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Nombre de la Empresa */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Razón Social *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                          placeholder="Empresa S.A.S"
                          name="company_name"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          required
                        />
                      </div>

                      {/* NIT */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          NIT *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                          placeholder="900.123.456-7"
                          value={formData.nit}
                          onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
                          required
                        />
                      </div>

                      {/* Nombre de Contacto */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Nombre de Contacto *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                          placeholder="Juan Pérez"
                          name="full_name"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          required
                        />
                      </div>

                      {/* Correo Electrónico */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                          placeholder="contacto@empresa.com"
                          name="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      {/* Teléfono */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                          placeholder="+57 300 123 4567"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>

                      {/* Tipo de Originación */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Tipo de Originación *
                        </label>
                        <Select
                          value={formData.originationType}
                          onValueChange={(value) => setFormData({ ...formData, originationType: value })}
                          required
                        >
                          <SelectTrigger className="w-full h-12 px-4 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary">
                            <SelectValue placeholder="Seleccione tipo de originación" />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            {originationTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* Hidden input for HTML5 validation */}
                        <input
                          type="text"
                          name="tipo_originacion"
                          value={formData.originationType}
                          onChange={() => { }}
                          required
                          className="sr-only"
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Departamento */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Departamento *
                        </label>
                        <Popover open={departamentoOpen} onOpenChange={setDepartamentoOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={departamentoOpen}
                              className="w-full h-12 px-4 rounded-xl border-2 border-border bg-white hover:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary justify-between font-normal"
                            >
                              {formData.departamento || "Seleccione departamento"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0 bg-white z-50" align="start">
                            <Command>
                              <CommandInput placeholder="Buscar departamento..." />
                              <CommandList>
                                <CommandEmpty>No se encontró el departamento.</CommandEmpty>
                                <CommandGroup className="max-h-64 overflow-y-auto">
                                  {colombiaDepartments.map((dept) => (
                                    <CommandItem
                                      key={dept.name}
                                      value={dept.name}
                                      onSelect={handleDepartmentChange}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          formData.departamento === dept.name ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {dept.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        {/* Hidden input for HTML5 validation */}
                        <input
                          type="text"
                          name="state"
                          value={formData.departamento}
                          onChange={() => { }}
                          required
                          className="sr-only"
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Ciudad */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Ciudad *
                        </label>
                        <Popover open={ciudadOpen} onOpenChange={setCiudadOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={ciudadOpen}
                              className="w-full h-12 px-4 rounded-xl border-2 border-border bg-white hover:bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary justify-between font-normal"
                              disabled={!formData.departamento}
                            >
                              {formData.ciudad || (formData.departamento ? "Seleccione ciudad" : "Primero seleccione departamento")}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0 bg-white z-50" align="start">
                            <Command>
                              <CommandInput placeholder="Buscar ciudad..." />
                              <CommandList>
                                <CommandEmpty>No se encontró la ciudad.</CommandEmpty>
                                <CommandGroup className="max-h-64 overflow-y-auto">
                                  {availableCities.map((city) => (
                                    <CommandItem
                                      key={city}
                                      value={city}
                                      onSelect={handleCityChange}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          formData.ciudad === city ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {city}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        {/* Hidden input for HTML5 validation */}
                        <input
                          type="text"
                          name="city"
                          value={formData.ciudad}
                          onChange={() => { }}
                          required
                          className="sr-only"
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Horario de Contacto */}
                      <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">
                          Horario de Contacto ⏰ *
                        </label>
                        <Select
                          value={formData.horarioContacto}
                          onValueChange={(value) => setFormData({ ...formData, horarioContacto: value })}
                          required
                        >
                          <SelectTrigger className="w-full h-12 px-4 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary">
                            <SelectValue placeholder="Seleccione horario preferido" />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            {contactTimeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* Hidden input for HTML5 validation */}
                        <input
                          type="text"
                          name="horario_contacto"
                          value={formData.horarioContacto}
                          onChange={() => { }}
                          required
                          className="sr-only"
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Descripción del Negocio */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Descripción del Negocio *
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-y min-h-[100px]"
                        placeholder="Describa brevemente su modelo de negocio y propuesta de valor..."
                        name="message"
                        value={formData.businessDescription}
                        onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                        required
                      />
                    </div>

                    {/* Necesidades de Financiación */}
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        Necesidades de Financiación *
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-y min-h-[100px]"
                        placeholder="Monto requerido y uso de los fondos..."
                        name="necesidades_financiacion"
                        value={formData.financingNeeds}
                        onChange={(e) => setFormData({ ...formData, financingNeeds: e.target.value })}
                        required
                      />
                    </div>

                    {/* Habeas Data Checkbox */}
                    {/* Legal Checkboxes */}
                    <div className="bg-white rounded-xl border border-border">
                      <LegalCheckboxes
                        authChecked={formData.aceptaHabeasData}
                        onAuthChange={(checked) => setFormData({ ...formData, aceptaHabeasData: checked })}
                        termsChecked={formData.aceptaTerminos} // @ts-expect-error - acceptsTerminos validation cast
                        onTermsChange={(checked) => setFormData({ ...formData, aceptaTerminos: checked })}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-secondary hover:bg-secondary/90 rounded-xl"
                      disabled={isSubmitting || !formData.aceptaHabeasData || !formData.aceptaTerminos}
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

export default Originators;
