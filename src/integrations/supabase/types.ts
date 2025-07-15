export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      associes: {
        Row: {
          adresse: string | null
          created_at: string | null
          demande_id: string | null
          id: string
          nom: string
          pourcentage: number | null
          prenom: string
        }
        Insert: {
          adresse?: string | null
          created_at?: string | null
          demande_id?: string | null
          id?: string
          nom: string
          pourcentage?: number | null
          prenom: string
        }
        Update: {
          adresse?: string | null
          created_at?: string | null
          demande_id?: string | null
          id?: string
          nom?: string
          pourcentage?: number | null
          prenom?: string
        }
        Relationships: [
          {
            foreignKeyName: "associes_demande_id_fkey"
            columns: ["demande_id"]
            isOneToOne: false
            referencedRelation: "demandes_rcs"
            referencedColumns: ["id"]
          },
        ]
      }
      demandes_rcs: {
        Row: {
          activite: string | null
          adresse: string | null
          apport_nature: boolean | null
          capital_total: number | null
          created_at: string | null
          current_step: number | null
          email: string | null
          id: string
          nationalite: string | null
          nom: string | null
          nom_entreprise: string | null
          prenom: string | null
          status: string | null
          telephone: string | null
          type_entreprise: string | null
          updated_at: string | null
          user_id: string | null
          ville: string | null
        }
        Insert: {
          activite?: string | null
          adresse?: string | null
          apport_nature?: boolean | null
          capital_total?: number | null
          created_at?: string | null
          current_step?: number | null
          email?: string | null
          id?: string
          nationalite?: string | null
          nom?: string | null
          nom_entreprise?: string | null
          prenom?: string | null
          status?: string | null
          telephone?: string | null
          type_entreprise?: string | null
          updated_at?: string | null
          user_id?: string | null
          ville?: string | null
        }
        Update: {
          activite?: string | null
          adresse?: string | null
          apport_nature?: boolean | null
          capital_total?: number | null
          created_at?: string | null
          current_step?: number | null
          email?: string | null
          id?: string
          nationalite?: string | null
          nom?: string | null
          nom_entreprise?: string | null
          prenom?: string | null
          status?: string | null
          telephone?: string | null
          type_entreprise?: string | null
          updated_at?: string | null
          user_id?: string | null
          ville?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string | null
          demande_id: string | null
          form_id: string | null
          id: string
          type: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          demande_id?: string | null
          form_id?: string | null
          id?: string
          type?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          demande_id?: string | null
          form_id?: string | null
          id?: string
          type?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_demande_id_fkey"
            columns: ["demande_id"]
            isOneToOne: false
            referencedRelation: "demandes_rcs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "rcs_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      rcs_forms: {
        Row: {
          activity: string | null
          ape_code: string | null
          capital: number | null
          company_name: string | null
          created_at: string | null
          id: string
          status: string | null
          structure_type: string | null
          user_id: string | null
        }
        Insert: {
          activity?: string | null
          ape_code?: string | null
          capital?: number | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          structure_type?: string | null
          user_id?: string | null
        }
        Update: {
          activity?: string | null
          ape_code?: string | null
          capital?: number | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          structure_type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rcs_forms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
