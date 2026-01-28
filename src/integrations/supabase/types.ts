export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      inversionistas_leads: {
        Row: {
          acepta_habeas_data: boolean
          ciudad: string
          correo_electronico: string
          created_at: string
          departamento: string
          horario_contacto: string
          id: string
          mensaje: string | null
          monto_inversion: string | null
          nit: string | null
          nombre_completo: string | null
          numero_identificacion: string | null
          razon_social: string | null
          representante_legal: string | null
          telefono: string
          tipo_persona: string
          updated_at: string
        }
        Insert: {
          acepta_habeas_data?: boolean
          ciudad: string
          correo_electronico: string
          created_at?: string
          departamento: string
          horario_contacto: string
          id?: string
          mensaje?: string | null
          monto_inversion?: string | null
          nit?: string | null
          nombre_completo?: string | null
          numero_identificacion?: string | null
          razon_social?: string | null
          representante_legal?: string | null
          telefono: string
          tipo_persona: string
          updated_at?: string
        }
        Update: {
          acepta_habeas_data?: boolean
          ciudad?: string
          correo_electronico?: string
          created_at?: string
          departamento?: string
          horario_contacto?: string
          id?: string
          mensaje?: string | null
          monto_inversion?: string | null
          nit?: string | null
          nombre_completo?: string | null
          numero_identificacion?: string | null
          razon_social?: string | null
          representante_legal?: string | null
          telefono?: string
          tipo_persona?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoice_documents: {
        Row: {
          created_at: string
          file_name: string
          file_type: string | null
          file_url: string
          id: string
          request_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_type?: string | null
          file_url: string
          id?: string
          request_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_type?: string | null
          file_url?: string
          id?: string
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_documents_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "invoice_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_requests: {
        Row: {
          calculated_discount: number
          created_at: string
          days_to_maturity: number
          id: string
          invoice_amount: number
          invoice_number: string
          monthly_rate: number
          net_amount: number
          payer_name: string
          payer_nit: string
          status: Database["public"]["Enums"]["invoice_request_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          calculated_discount: number
          created_at?: string
          days_to_maturity?: number
          id?: string
          invoice_amount: number
          invoice_number: string
          monthly_rate?: number
          net_amount: number
          payer_name: string
          payer_nit: string
          status?: Database["public"]["Enums"]["invoice_request_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          calculated_discount?: number
          created_at?: string
          days_to_maturity?: number
          id?: string
          invoice_amount?: number
          invoice_number?: string
          monthly_rate?: number
          net_amount?: number
          payer_name?: string
          payer_nit?: string
          status?: Database["public"]["Enums"]["invoice_request_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      portfolio_capital_privado: {
        Row: {
          administrador: string
          created_at: string
          fecha_reporte: string
          gestor_profesional: string
          id: string
          name: string
          porcentaje_total: number
          total_disponible: number
          total_fondo: number
          total_invertido: number
          updated_at: string
        }
        Insert: {
          administrador?: string
          created_at?: string
          fecha_reporte?: string
          gestor_profesional?: string
          id?: string
          name?: string
          porcentaje_total?: number
          total_disponible?: number
          total_fondo?: number
          total_invertido?: number
          updated_at?: string
        }
        Update: {
          administrador?: string
          created_at?: string
          fecha_reporte?: string
          gestor_profesional?: string
          id?: string
          name?: string
          porcentaje_total?: number
          total_disponible?: number
          total_fondo?: number
          total_invertido?: number
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_compartimentos: {
        Row: {
          capital_privado_id: string | null
          created_at: string
          disponible: number
          id: string
          invertido: number
          name: string
          orden: number
          porcentaje_activos: number
          rentabilidad_180dias: number
          rentabilidad_30dias: number
          rentabilidad_365dias: number
          rentabilidad_60dias: number
          rentabilidad_90dias: number
          rentabilidad_dia: number
          total_activos: number
          updated_at: string
        }
        Insert: {
          capital_privado_id?: string | null
          created_at?: string
          disponible?: number
          id?: string
          invertido?: number
          name: string
          orden?: number
          porcentaje_activos?: number
          rentabilidad_180dias?: number
          rentabilidad_30dias?: number
          rentabilidad_365dias?: number
          rentabilidad_60dias?: number
          rentabilidad_90dias?: number
          rentabilidad_dia?: number
          total_activos?: number
          updated_at?: string
        }
        Update: {
          capital_privado_id?: string | null
          created_at?: string
          disponible?: number
          id?: string
          invertido?: number
          name?: string
          orden?: number
          porcentaje_activos?: number
          rentabilidad_180dias?: number
          rentabilidad_30dias?: number
          rentabilidad_365dias?: number
          rentabilidad_60dias?: number
          rentabilidad_90dias?: number
          rentabilidad_dia?: number
          total_activos?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_compartimentos_capital_privado_id_fkey"
            columns: ["capital_privado_id"]
            isOneToOne: false
            referencedRelation: "portfolio_capital_privado"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_fic: {
        Row: {
          administrador: string
          created_at: string
          fecha_reporte: string
          id: string
          name: string
          rentabilidad_ea_30dias: number
          rentabilidad_ea_365dias: number
          updated_at: string
          valor_fondo: number
          valor_unidad: number
        }
        Insert: {
          administrador?: string
          created_at?: string
          fecha_reporte?: string
          id?: string
          name?: string
          rentabilidad_ea_30dias?: number
          rentabilidad_ea_365dias?: number
          updated_at?: string
          valor_fondo?: number
          valor_unidad?: number
        }
        Update: {
          administrador?: string
          created_at?: string
          fecha_reporte?: string
          id?: string
          name?: string
          rentabilidad_ea_30dias?: number
          rentabilidad_ea_365dias?: number
          updated_at?: string
          valor_fondo?: number
          valor_unidad?: number
        }
        Relationships: []
      }
      portfolio_fic_historico: {
        Row: {
          ano_1_ea: number | null
          ano_2_ea: number | null
          ano_3_ea: number | null
          ano_corrido_ea: number | null
          created_at: string
          diaria_ea: number | null
          dias_180_ea: number | null
          dias_30_ea: number | null
          fic_id: string | null
          id: string
          nombre: string
          orden: number
          updated_at: string
        }
        Insert: {
          ano_1_ea?: number | null
          ano_2_ea?: number | null
          ano_3_ea?: number | null
          ano_corrido_ea?: number | null
          created_at?: string
          diaria_ea?: number | null
          dias_180_ea?: number | null
          dias_30_ea?: number | null
          fic_id?: string | null
          id?: string
          nombre: string
          orden?: number
          updated_at?: string
        }
        Update: {
          ano_1_ea?: number | null
          ano_2_ea?: number | null
          ano_3_ea?: number | null
          ano_corrido_ea?: number | null
          created_at?: string
          diaria_ea?: number | null
          dias_180_ea?: number | null
          dias_30_ea?: number | null
          fic_id?: string | null
          id?: string
          nombre?: string
          orden?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_fic_historico_fic_id_fkey"
            columns: ["fic_id"]
            isOneToOne: false
            referencedRelation: "portfolio_fic"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_fic_tipos: {
        Row: {
          comision_administracion: number
          created_at: string
          descripcion: string | null
          fic_id: string | null
          id: string
          inversion_minima: number
          nombre: string
          orden: number
          pacto_permanencia: number
          remuneracion_efectiva: number
          updated_at: string
        }
        Insert: {
          comision_administracion?: number
          created_at?: string
          descripcion?: string | null
          fic_id?: string | null
          id?: string
          inversion_minima?: number
          nombre: string
          orden?: number
          pacto_permanencia?: number
          remuneracion_efectiva?: number
          updated_at?: string
        }
        Update: {
          comision_administracion?: number
          created_at?: string
          descripcion?: string | null
          fic_id?: string | null
          id?: string
          inversion_minima?: number
          nombre?: string
          orden?: number
          pacto_permanencia?: number
          remuneracion_efectiva?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_fic_tipos_fic_id_fkey"
            columns: ["fic_id"]
            isOneToOne: false
            referencedRelation: "portfolio_fic"
            referencedColumns: ["id"]
          },
        ]
      }
      request_history: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          request_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          request_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          request_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "request_history_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "invoice_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_request: { Args: { req_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      invoice_request_status:
        | "pending"
        | "in_review"
        | "approved"
        | "rejected"
        | "disbursed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      invoice_request_status: [
        "pending",
        "in_review",
        "approved",
        "rejected",
        "disbursed",
      ],
    },
  },
} as const
