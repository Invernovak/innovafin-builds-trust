-- Tabla para datos del Fondo de Capital Privado
CREATE TABLE public.portfolio_capital_privado (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'FCP Alternativos Plus',
  administrador text NOT NULL DEFAULT 'AVAL Fiduciaria - Asset Management',
  gestor_profesional text NOT NULL DEFAULT 'InnovaFin',
  fecha_reporte date NOT NULL DEFAULT CURRENT_DATE,
  total_fondo numeric NOT NULL DEFAULT 0,
  total_disponible numeric NOT NULL DEFAULT 0,
  total_invertido numeric NOT NULL DEFAULT 0,
  porcentaje_total numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabla para compartimentos del Capital Privado
CREATE TABLE public.portfolio_compartimentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  capital_privado_id uuid REFERENCES public.portfolio_capital_privado(id) ON DELETE CASCADE,
  name text NOT NULL,
  total_activos numeric NOT NULL DEFAULT 0,
  disponible numeric NOT NULL DEFAULT 0,
  invertido numeric NOT NULL DEFAULT 0,
  porcentaje_activos numeric NOT NULL DEFAULT 0,
  rentabilidad_dia numeric NOT NULL DEFAULT 0,
  rentabilidad_30dias numeric NOT NULL DEFAULT 0,
  rentabilidad_60dias numeric NOT NULL DEFAULT 0,
  rentabilidad_90dias numeric NOT NULL DEFAULT 0,
  rentabilidad_180dias numeric NOT NULL DEFAULT 0,
  rentabilidad_365dias numeric NOT NULL DEFAULT 0,
  orden integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabla para datos del FIC 180 Plus
CREATE TABLE public.portfolio_fic (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'FIC Alternativos 180 Plus',
  administrador text NOT NULL DEFAULT 'AVAL Fiduciaria - Asset Management',
  fecha_reporte date NOT NULL DEFAULT CURRENT_DATE,
  valor_unidad numeric NOT NULL DEFAULT 0,
  valor_fondo numeric NOT NULL DEFAULT 0,
  rentabilidad_ea_30dias numeric NOT NULL DEFAULT 0,
  rentabilidad_ea_365dias numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabla para tipos de participación del FIC
CREATE TABLE public.portfolio_fic_tipos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fic_id uuid REFERENCES public.portfolio_fic(id) ON DELETE CASCADE,
  nombre text NOT NULL,
  inversion_minima numeric NOT NULL DEFAULT 0,
  comision_administracion numeric NOT NULL DEFAULT 0,
  pacto_permanencia integer NOT NULL DEFAULT 180,
  remuneracion_efectiva numeric NOT NULL DEFAULT 0,
  descripcion text,
  orden integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabla para comportamiento histórico del FIC
CREATE TABLE public.portfolio_fic_historico (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fic_id uuid REFERENCES public.portfolio_fic(id) ON DELETE CASCADE,
  nombre text NOT NULL,
  ano_corrido_ea numeric,
  diaria_ea numeric,
  dias_30_ea numeric,
  dias_180_ea numeric,
  ano_1_ea numeric,
  ano_2_ea numeric,
  ano_3_ea numeric,
  orden integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_capital_privado ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_compartimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_fic ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_fic_tipos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_fic_historico ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (cualquiera puede ver el portafolio)
CREATE POLICY "Anyone can view capital privado" ON public.portfolio_capital_privado FOR SELECT USING (true);
CREATE POLICY "Anyone can view compartimentos" ON public.portfolio_compartimentos FOR SELECT USING (true);
CREATE POLICY "Anyone can view fic" ON public.portfolio_fic FOR SELECT USING (true);
CREATE POLICY "Anyone can view fic tipos" ON public.portfolio_fic_tipos FOR SELECT USING (true);
CREATE POLICY "Anyone can view fic historico" ON public.portfolio_fic_historico FOR SELECT USING (true);

-- Políticas de escritura solo para admins
CREATE POLICY "Admins can insert capital privado" ON public.portfolio_capital_privado FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update capital privado" ON public.portfolio_capital_privado FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete capital privado" ON public.portfolio_capital_privado FOR DELETE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert compartimentos" ON public.portfolio_compartimentos FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update compartimentos" ON public.portfolio_compartimentos FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete compartimentos" ON public.portfolio_compartimentos FOR DELETE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert fic" ON public.portfolio_fic FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update fic" ON public.portfolio_fic FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete fic" ON public.portfolio_fic FOR DELETE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert fic tipos" ON public.portfolio_fic_tipos FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update fic tipos" ON public.portfolio_fic_tipos FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete fic tipos" ON public.portfolio_fic_tipos FOR DELETE USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert fic historico" ON public.portfolio_fic_historico FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update fic historico" ON public.portfolio_fic_historico FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete fic historico" ON public.portfolio_fic_historico FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Triggers para updated_at
CREATE TRIGGER update_portfolio_capital_privado_updated_at BEFORE UPDATE ON public.portfolio_capital_privado FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_compartimentos_updated_at BEFORE UPDATE ON public.portfolio_compartimentos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_fic_updated_at BEFORE UPDATE ON public.portfolio_fic FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_fic_tipos_updated_at BEFORE UPDATE ON public.portfolio_fic_tipos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_fic_historico_updated_at BEFORE UPDATE ON public.portfolio_fic_historico FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();