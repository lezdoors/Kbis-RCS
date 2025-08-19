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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_analytics: {
        Row: {
          avg_processing_time_minutes: number | null
          created_at: string
          customer_satisfaction_score: number | null
          date: string
          id: string
          orders_count: number
          revenue_total: number
          updated_at: string
        }
        Insert: {
          avg_processing_time_minutes?: number | null
          created_at?: string
          customer_satisfaction_score?: number | null
          date: string
          id?: string
          orders_count?: number
          revenue_total?: number
          updated_at?: string
        }
        Update: {
          avg_processing_time_minutes?: number | null
          created_at?: string
          customer_satisfaction_score?: number | null
          date?: string
          id?: string
          orders_count?: number
          revenue_total?: number
          updated_at?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          activity_code: string | null
          activity_description: string | null
          address: string | null
          city: string | null
          company_name: string
          created_at: string
          id: string
          legal_form: string | null
          postal_code: string | null
          siren: string
          siret: string | null
          updated_at: string
        }
        Insert: {
          activity_code?: string | null
          activity_description?: string | null
          address?: string | null
          city?: string | null
          company_name: string
          created_at?: string
          id?: string
          legal_form?: string | null
          postal_code?: string | null
          siren: string
          siret?: string | null
          updated_at?: string
        }
        Update: {
          activity_code?: string | null
          activity_description?: string | null
          address?: string | null
          city?: string | null
          company_name?: string
          created_at?: string
          id?: string
          legal_form?: string | null
          postal_code?: string | null
          siren?: string
          siret?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      kbis_orders: {
        Row: {
          amount_paid: number
          billing_address: Json | null
          company_name: string
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          delivery_method: string
          documents_delivered: boolean | null
          id: string
          order_number: string
          service_type: string
          siren: string
          status: string
          stripe_payment_id: string | null
          updated_at: string
        }
        Insert: {
          amount_paid: number
          billing_address?: Json | null
          company_name: string
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          delivery_method?: string
          documents_delivered?: boolean | null
          id?: string
          order_number?: string
          service_type?: string
          siren: string
          status?: string
          stripe_payment_id?: string | null
          updated_at?: string
        }
        Update: {
          amount_paid?: number
          billing_address?: Json | null
          company_name?: string
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          delivery_method?: string
          documents_delivered?: boolean | null
          id?: string
          order_number?: string
          service_type?: string
          siren?: string
          status?: string
          stripe_payment_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          company_name: string
          contact_email: string
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          id: string
          legal_form: string | null
          notes: string | null
          siret: string | null
          status: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          company_name: string
          contact_email: string
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          legal_form?: string | null
          notes?: string | null
          siret?: string | null
          status?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          company_name?: string
          contact_email?: string
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          legal_form?: string | null
          notes?: string | null
          siret?: string | null
          status?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string
          created_at: string
          customer_email: string
          customer_name: string | null
          description: string
          id: string
          order_id: string | null
          priority: string
          resolution_notes: string | null
          resolved_at: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          category?: string
          created_at?: string
          customer_email: string
          customer_name?: string | null
          description: string
          id?: string
          order_id?: string | null
          priority?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          category?: string
          created_at?: string
          customer_email?: string
          customer_name?: string | null
          description?: string
          id?: string
          order_id?: string | null
          priority?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "kbis_orders"
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
      get_customer_order: {
        Args: { order_id: string }
        Returns: {
          company_name: string
          created_at: string
          documents_delivered: boolean
          id: string
          order_number: string
          service_type: string
          status: string
        }[]
      }
      get_customer_order_secure: {
        Args: { order_id: string }
        Returns: {
          company_name: string
          created_at: string
          documents_delivered: boolean
          id: string
          order_number: string
          service_type: string
          status: string
        }[]
      }
      get_customer_order_summary: {
        Args: Record<PropertyKey, never>
        Returns: {
          company_name: string
          created_at: string
          customer_email: string
          customer_name: string
          delivery_method: string
          documents_delivered: boolean
          id: string
          order_number: string
          service_type: string
          siren: string
          status: string
          updated_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_system_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "support" | "user"
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
      app_role: ["admin", "support", "user"],
    },
  },
} as const
