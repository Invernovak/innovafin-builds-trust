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
  // Minimum 6 digits for flexibility with Colombian landlines
  const phoneRegex = /^[\d\s\-\(\)\+]{6,20}$/;
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

interface OriginatorLeadInput {
  razon_social: string;
  nit: string;
  nombre_contacto: string;
  correo_electronico: string;
  telefono: string;
  tipo_originacion: string;
  departamento: string;
  ciudad: string;
  horario_contacto: string;
  descripcion_negocio: string;
  necesidades_financiacion: string;
  acepta_habeas_data: boolean;
}

function validateInput(data: OriginatorLeadInput): { valid: boolean; error?: string } {
  // Required fields
  if (!data.razon_social || data.razon_social.length < 2 || data.razon_social.length > 200) {
    return { valid: false, error: 'Razón social inválida' };
  }
  
  if (!data.nit || data.nit.length < 5 || data.nit.length > 30) {
    return { valid: false, error: 'NIT inválido' };
  }
  
  if (!data.nombre_contacto || data.nombre_contacto.length < 2 || data.nombre_contacto.length > 200) {
    return { valid: false, error: 'Nombre de contacto inválido' };
  }
  
  if (!data.correo_electronico || !isValidEmail(data.correo_electronico)) {
    return { valid: false, error: 'Correo electrónico inválido' };
  }
  
  if (!data.telefono || !isValidPhone(data.telefono)) {
    return { valid: false, error: 'Número de teléfono inválido' };
  }
  
  if (!data.tipo_originacion || data.tipo_originacion.length > 100) {
    return { valid: false, error: 'Tipo de originación inválido' };
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
  
  if (!data.descripcion_negocio || data.descripcion_negocio.length < 3 || data.descripcion_negocio.length > 2000) {
    return { valid: false, error: 'Descripción del negocio inválida (mínimo 3 caracteres)' };
  }
  
  if (!data.necesidades_financiacion || data.necesidades_financiacion.length < 3 || data.necesidades_financiacion.length > 2000) {
    return { valid: false, error: 'Necesidades de financiación inválidas (mínimo 3 caracteres)' };
  }
  
  if (data.acepta_habeas_data !== true) {
    return { valid: false, error: 'Debe aceptar la política de tratamiento de datos' };
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
    const body = await req.json() as OriginatorLeadInput;
    
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
      razon_social: sanitizeString(body.razon_social, 200)!,
      nit: sanitizeString(body.nit, 30)!,
      nombre_contacto: sanitizeString(body.nombre_contacto, 200)!,
      correo_electronico: body.correo_electronico.toLowerCase().trim(),
      telefono: sanitizeString(body.telefono, 20)!,
      tipo_originacion: sanitizeString(body.tipo_originacion, 100)!,
      departamento: sanitizeString(body.departamento, 100)!,
      ciudad: sanitizeString(body.ciudad, 100)!,
      horario_contacto: sanitizeString(body.horario_contacto, 50)!,
      descripcion_negocio: sanitizeString(body.descripcion_negocio, 2000)!,
      necesidades_financiacion: sanitizeString(body.necesidades_financiacion, 2000)!,
      acepta_habeas_data: true,
    };

    // Create Supabase client pointing to EXTERNAL Supabase project (InnovaFin)
    const externalUrl = Deno.env.get('EXTERNAL_SUPABASE_URL');
    const externalKey = Deno.env.get('EXTERNAL_SUPABASE_SERVICE_KEY');
    
    if (!externalUrl || !externalKey) {
      console.error('External Supabase credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Configuración de base de datos externa incompleta' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Connect directly to external Supabase - NO data stored in Lovable Cloud
    const supabase = createClient(externalUrl, externalKey);

    // Insert into originadores_leads table in external database
    const { data, error } = await supabase
      .from('originadores_leads')
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
