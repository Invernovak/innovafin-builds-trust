import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Simple in-memory rate limiting (per IP, resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 submissions per window
const RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

// Validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function isValidPhone(phone: string): boolean {
  // Allow digits, spaces, dashes, parentheses, plus sign
  const phoneRegex = /^[\d\s\-\(\)\+]{7,20}$/;
  return phoneRegex.test(phone);
}

function sanitizeString(str: string | null | undefined, maxLength: number): string | null {
  if (!str) return null;
  // Remove potential XSS vectors and trim
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>"'&]/g, '') // Remove dangerous characters
    .trim()
    .substring(0, maxLength);
}

interface InvestorLeadInput {
  tipo_persona: string;
  nombre_completo?: string;
  numero_identificacion?: string;
  razon_social?: string;
  nit?: string;
  representante_legal?: string;
  correo_electronico: string;
  telefono: string;
  departamento: string;
  ciudad: string;
  horario_contacto: string;
  monto_inversion?: string;
  mensaje?: string;
  acepta_habeas_data: boolean;
}

function validateInput(data: InvestorLeadInput): { valid: boolean; error?: string } {
  // Required fields
  if (!data.tipo_persona || !['natural', 'juridica'].includes(data.tipo_persona)) {
    return { valid: false, error: 'Tipo de persona inválido' };
  }
  
  if (!data.correo_electronico || !isValidEmail(data.correo_electronico)) {
    return { valid: false, error: 'Correo electrónico inválido' };
  }
  
  if (!data.telefono || !isValidPhone(data.telefono)) {
    return { valid: false, error: 'Número de teléfono inválido' };
  }
  
  if (!data.departamento || data.departamento.length > 100) {
    return { valid: false, error: 'Departamento inválido' };
  }
  
  if (!data.ciudad || data.ciudad.length > 100) {
    return { valid: false, error: 'Ciudad inválida' };
  }
  
  if (!data.horario_contacto || data.horario_contacto.length > 50) {
    return { valid: false, error: 'Horario de contacto inválido' };
  }
  
  if (data.acepta_habeas_data !== true) {
    return { valid: false, error: 'Debe aceptar la política de tratamiento de datos' };
  }
  
  // Conditional required fields based on tipo_persona
  if (data.tipo_persona === 'natural') {
    if (!data.nombre_completo || data.nombre_completo.length < 2 || data.nombre_completo.length > 200) {
      return { valid: false, error: 'Nombre completo inválido' };
    }
  } else if (data.tipo_persona === 'juridica') {
    if (!data.razon_social || data.razon_social.length < 2 || data.razon_social.length > 200) {
      return { valid: false, error: 'Razón social inválida' };
    }
    if (!data.nit || data.nit.length < 5 || data.nit.length > 20) {
      return { valid: false, error: 'NIT inválido' };
    }
  }
  
  return { valid: true };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown';
    
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Demasiadas solicitudes. Intente nuevamente más tarde.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body
    const body = await req.json() as InvestorLeadInput;
    
    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Sanitize all string inputs
    const sanitizedData = {
      tipo_persona: body.tipo_persona,
      nombre_completo: sanitizeString(body.nombre_completo, 200),
      numero_identificacion: sanitizeString(body.numero_identificacion, 50),
      razon_social: sanitizeString(body.razon_social, 200),
      nit: sanitizeString(body.nit, 20),
      representante_legal: sanitizeString(body.representante_legal, 200),
      correo_electronico: body.correo_electronico.toLowerCase().trim(),
      telefono: sanitizeString(body.telefono, 20)!,
      departamento: sanitizeString(body.departamento, 100)!,
      ciudad: sanitizeString(body.ciudad, 100)!,
      horario_contacto: sanitizeString(body.horario_contacto, 50)!,
      monto_inversion: sanitizeString(body.monto_inversion, 50),
      mensaje: sanitizeString(body.mensaje, 1000),
      acepta_habeas_data: true,
    };

    // Create Supabase client with service role for insert
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert into database
    const { data, error } = await supabase
      .from('inversionistas_leads')
      .insert(sanitizedData)
      .select('id')
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Error al procesar la solicitud' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
