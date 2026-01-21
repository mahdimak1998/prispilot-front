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
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          password_hash: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          password_hash: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          password_hash?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      bank_plans: {
        Row: {
          effective_rate: string | null
          id: number
          loan_type: string | null
          logo_url: string | null
          monthly_payment: string | null
          provider: string | null
          url: string | null
        }
        Insert: {
          effective_rate?: string | null
          id?: number
          loan_type?: string | null
          logo_url?: string | null
          monthly_payment?: string | null
          provider?: string | null
          url?: string | null
        }
        Update: {
          effective_rate?: string | null
          id?: number
          loan_type?: string | null
          logo_url?: string | null
          monthly_payment?: string | null
          provider?: string | null
          url?: string | null
        }
        Relationships: []
      }
      cleaning_services: {
        Row: {
          created_at: string | null
          equipment_included: boolean | null
          frequency_options: string[] | null
          hourly_rate: number
          id: string
          location: string | null
          logo_url: string | null
          provider: string
          rating: number | null
          service_areas: string[] | null
          service_name: string
          service_type: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          equipment_included?: boolean | null
          frequency_options?: string[] | null
          hourly_rate: number
          id?: string
          location?: string | null
          logo_url?: string | null
          provider: string
          rating?: number | null
          service_areas?: string[] | null
          service_name: string
          service_type: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          equipment_included?: boolean | null
          frequency_options?: string[] | null
          hourly_rate?: number
          id?: string
          location?: string | null
          logo_url?: string | null
          provider?: string
          rating?: number | null
          service_areas?: string[] | null
          service_name?: string
          service_type?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      handymen_services: {
        Row: {
          certification: boolean | null
          created_at: string | null
          hourly_rate: number
          id: string
          location: string | null
          logo_url: string | null
          provider: string
          rating: number | null
          service_name: string
          service_type: string
          specialties: string[] | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          certification?: boolean | null
          created_at?: string | null
          hourly_rate: number
          id?: string
          location?: string | null
          logo_url?: string | null
          provider: string
          rating?: number | null
          service_name: string
          service_type: string
          specialties?: string[] | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          certification?: boolean | null
          created_at?: string | null
          hourly_rate?: number
          id?: string
          location?: string | null
          logo_url?: string | null
          provider?: string
          rating?: number | null
          service_name?: string
          service_type?: string
          specialties?: string[] | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      home_security_plans: {
        Row: {
          alarm_types: string[] | null
          app_control: boolean | null
          contract_months: number | null
          created_at: string | null
          equipment_included: string[] | null
          id: string
          installation_included: boolean | null
          installation_type: string | null
          logo_url: string | null
          monitoring_24_7: boolean | null
          monthly_price: number
          plan_type: string
          product_name: string
          provider: string
          response_service: string | null
          response_time_minutes: number | null
          setup_fee: number | null
          smart_features: string[] | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          alarm_types?: string[] | null
          app_control?: boolean | null
          contract_months?: number | null
          created_at?: string | null
          equipment_included?: string[] | null
          id?: string
          installation_included?: boolean | null
          installation_type?: string | null
          logo_url?: string | null
          monitoring_24_7?: boolean | null
          monthly_price: number
          plan_type: string
          product_name: string
          provider: string
          response_service?: string | null
          response_time_minutes?: number | null
          setup_fee?: number | null
          smart_features?: string[] | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          alarm_types?: string[] | null
          app_control?: boolean | null
          contract_months?: number | null
          created_at?: string | null
          equipment_included?: string[] | null
          id?: string
          installation_included?: boolean | null
          installation_type?: string | null
          logo_url?: string | null
          monitoring_24_7?: boolean | null
          monthly_price?: number
          plan_type?: string
          product_name?: string
          provider?: string
          response_service?: string | null
          response_time_minutes?: number | null
          setup_fee?: number | null
          smart_features?: string[] | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      insurance_plans: {
        Row: {
          age_limit: number | null
          coverage_amount: number | null
          created_at: string | null
          features: string[] | null
          id: string
          insurance_type: string
          logo_url: string | null
          monthly_premium: number
          product_name: string
          provider: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          age_limit?: number | null
          coverage_amount?: number | null
          created_at?: string | null
          features?: string[] | null
          id?: string
          insurance_type: string
          logo_url?: string | null
          monthly_premium: number
          product_name: string
          provider: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          age_limit?: number | null
          coverage_amount?: number | null
          created_at?: string | null
          features?: string[] | null
          id?: string
          insurance_type?: string
          logo_url?: string | null
          monthly_premium?: number
          product_name?: string
          provider?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      internet_plans: {
        Row: {
          connection_type: string | null
          id: number
          logo_url: string | null
          plan: string | null
          price: number | null
          provider: string | null
          speed: number | null
          url: string | null
        }
        Insert: {
          connection_type?: string | null
          id?: number
          logo_url?: string | null
          plan?: string | null
          price?: number | null
          provider?: string | null
          speed?: number | null
          url?: string | null
        }
        Update: {
          connection_type?: string | null
          id?: number
          logo_url?: string | null
          plan?: string | null
          price?: number | null
          provider?: string | null
          speed?: number | null
          url?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          antall_ansatte: string | null
          bransje: string | null
          brukertype: string
          created_at: string
          epost: string | null
          id: string
          leverandor: string | null
          melding: string | null
          navn: string
          organisasjonsnummer: string | null
          samtykke: boolean
          telefon: string
          tjeneste: string | null
          updated_at: string
        }
        Insert: {
          antall_ansatte?: string | null
          bransje?: string | null
          brukertype: string
          created_at?: string
          epost?: string | null
          id?: string
          leverandor?: string | null
          melding?: string | null
          navn: string
          organisasjonsnummer?: string | null
          samtykke?: boolean
          telefon: string
          tjeneste?: string | null
          updated_at?: string
        }
        Update: {
          antall_ansatte?: string | null
          bransje?: string | null
          brukertype?: string
          created_at?: string
          epost?: string | null
          id?: string
          leverandor?: string | null
          melding?: string | null
          navn?: string
          organisasjonsnummer?: string | null
          samtykke?: boolean
          telefon?: string
          tjeneste?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      mobile_plans: {
        Row: {
          category: string
          created_at: string | null
          data_gb: number | null
          data_included_mb: number
          data_per_kroner: number | null
          data_rollover: boolean | null
          id: string
          info: string | null
          is_unlimited_sms: boolean | null
          is_unlimited_talk: boolean | null
          last_updated: string | null
          logo_url: string | null
          minutes_included: number
          mms_included: number
          monthly_rate: number
          operator: string
          price_nok: number
          product_name: string
          sms_included: number
          source_id: string | null
          speed: number | null
          tech: string | null
          url: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          data_gb?: number | null
          data_included_mb: number
          data_per_kroner?: number | null
          data_rollover?: boolean | null
          id?: string
          info?: string | null
          is_unlimited_sms?: boolean | null
          is_unlimited_talk?: boolean | null
          last_updated?: string | null
          logo_url?: string | null
          minutes_included: number
          mms_included: number
          monthly_rate: number
          operator: string
          price_nok: number
          product_name: string
          sms_included: number
          source_id?: string | null
          speed?: number | null
          tech?: string | null
          url?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          data_gb?: number | null
          data_included_mb?: number
          data_per_kroner?: number | null
          data_rollover?: boolean | null
          id?: string
          info?: string | null
          is_unlimited_sms?: boolean | null
          is_unlimited_talk?: boolean | null
          last_updated?: string | null
          logo_url?: string | null
          minutes_included?: number
          mms_included?: number
          monthly_rate?: number
          operator?: string
          price_nok?: number
          product_name?: string
          sms_included?: number
          source_id?: string | null
          speed?: number | null
          tech?: string | null
          url?: string | null
        }
        Relationships: []
      }
      power_deals: {
        Row: {
          additional_fees: number | null
          contract_length: string | null
          grid_id: string | null
          id: number
          logo_url: string | null
          municipality_name: string | null
          municipality_number: number | null
          price: number | null
          price_unit: string | null
          product_name: string | null
          supplier_name: string | null
          total_price: number | null
          url: string | null
        }
        Insert: {
          additional_fees?: number | null
          contract_length?: string | null
          grid_id?: string | null
          id?: number
          logo_url?: string | null
          municipality_name?: string | null
          municipality_number?: number | null
          price?: number | null
          price_unit?: string | null
          product_name?: string | null
          supplier_name?: string | null
          total_price?: number | null
          url?: string | null
        }
        Update: {
          additional_fees?: number | null
          contract_length?: string | null
          grid_id?: string | null
          id?: number
          logo_url?: string | null
          municipality_name?: string | null
          municipality_number?: number | null
          price?: number | null
          price_unit?: string | null
          product_name?: string | null
          supplier_name?: string | null
          total_price?: number | null
          url?: string | null
        }
        Relationships: []
      }
      providers: {
        Row: {
          beskrivelse: string | null
          created_at: string
          id: number
          kategori: string | null
          log_url: string | null
          navn: string
        }
        Insert: {
          beskrivelse?: string | null
          created_at?: string
          id?: number
          kategori?: string | null
          log_url?: string | null
          navn: string
        }
        Update: {
          beskrivelse?: string | null
          created_at?: string
          id?: number
          kategori?: string | null
          log_url?: string | null
          navn?: string
        }
        Relationships: []
      }
      tv_packages: {
        Row: {
          channels_count: number | null
          created_at: string | null
          id: number
          logo_url: string | null
          monthly_price: number
          package_name: string
          premium_channels: boolean | null
          provider: string
          sports_channels: boolean | null
          streaming_included: boolean | null
          url: string | null
        }
        Insert: {
          channels_count?: number | null
          created_at?: string | null
          id?: number
          logo_url?: string | null
          monthly_price: number
          package_name: string
          premium_channels?: boolean | null
          provider: string
          sports_channels?: boolean | null
          streaming_included?: boolean | null
          url?: string | null
        }
        Update: {
          channels_count?: number | null
          created_at?: string | null
          id?: number
          logo_url?: string | null
          monthly_price?: number
          package_name?: string
          premium_channels?: boolean | null
          provider?: string
          sports_channels?: boolean | null
          streaming_included?: boolean | null
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_municipalities: {
        Args: Record<PropertyKey, never>
        Returns: {
          municipality_name: string
        }[]
      }
      get_unique_municipalities: {
        Args: Record<PropertyKey, never>
        Returns: {
          municipality_name: string
        }[]
      }
      refresh_unique_municipalities: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
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
