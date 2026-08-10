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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          metadata: Json | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      appointment_notification_log: {
        Row: {
          appointment_id: string | null
          channel: string
          created_at: string
          error_message: string | null
          id: string
          kind: string
          metadata: Json | null
          recipient: string | null
          status: string
        }
        Insert: {
          appointment_id?: string | null
          channel: string
          created_at?: string
          error_message?: string | null
          id?: string
          kind: string
          metadata?: Json | null
          recipient?: string | null
          status: string
        }
        Update: {
          appointment_id?: string | null
          channel?: string
          created_at?: string
          error_message?: string | null
          id?: string
          kind?: string
          metadata?: Json | null
          recipient?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointment_notification_log_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointment_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      appointment_requests: {
        Row: {
          condition: string | null
          created_at: string
          device: string | null
          email: string | null
          has_studies: string | null
          id: string
          internal_notes: string | null
          name: string
          notes: string | null
          phone: string
          preferred_date: string | null
          preferred_shift: string | null
          source_section: string | null
          status: Database["public"]["Enums"]["appointment_status"]
          status_updated_at: string | null
          status_updated_by: string | null
        }
        Insert: {
          condition?: string | null
          created_at?: string
          device?: string | null
          email?: string | null
          has_studies?: string | null
          id?: string
          internal_notes?: string | null
          name: string
          notes?: string | null
          phone: string
          preferred_date?: string | null
          preferred_shift?: string | null
          source_section?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          status_updated_at?: string | null
          status_updated_by?: string | null
        }
        Update: {
          condition?: string | null
          created_at?: string
          device?: string | null
          email?: string | null
          has_studies?: string | null
          id?: string
          internal_notes?: string | null
          name?: string
          notes?: string | null
          phone?: string
          preferred_date?: string | null
          preferred_shift?: string | null
          source_section?: string | null
          status?: Database["public"]["Enums"]["appointment_status"]
          status_updated_at?: string | null
          status_updated_by?: string | null
        }
        Relationships: []
      }
      conversion_events: {
        Row: {
          condition: string | null
          created_at: string
          device: string | null
          event_type: string
          has_studies: string | null
          id: string
          label: string | null
          path: string | null
          referrer: string | null
          section: string | null
          source: string | null
        }
        Insert: {
          condition?: string | null
          created_at?: string
          device?: string | null
          event_type: string
          has_studies?: string | null
          id?: string
          label?: string | null
          path?: string | null
          referrer?: string | null
          section?: string | null
          source?: string | null
        }
        Update: {
          condition?: string | null
          created_at?: string
          device?: string | null
          event_type?: string
          has_studies?: string | null
          id?: string
          label?: string | null
          path?: string | null
          referrer?: string | null
          section?: string | null
          source?: string | null
        }
        Relationships: []
      }
      doctors: {
        Row: {
          active: boolean
          bio: string | null
          created_at: string
          credentials: string[]
          cv_filename: string | null
          cv_url: string | null
          display_order: number
          id: string
          is_director: boolean
          languages: string[]
          name: string
          note: string | null
          photo_position: string | null
          photo_url: string | null
          schedule: string
          slug: string
          specialty: string
          specialty_slug: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          bio?: string | null
          created_at?: string
          credentials?: string[]
          cv_filename?: string | null
          cv_url?: string | null
          display_order?: number
          id?: string
          is_director?: boolean
          languages?: string[]
          name: string
          note?: string | null
          photo_position?: string | null
          photo_url?: string | null
          schedule?: string
          slug: string
          specialty: string
          specialty_slug: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          bio?: string | null
          created_at?: string
          credentials?: string[]
          cv_filename?: string | null
          cv_url?: string | null
          display_order?: number
          id?: string
          is_director?: boolean
          languages?: string[]
          name?: string
          note?: string | null
          photo_position?: string | null
          photo_url?: string | null
          schedule?: string
          slug?: string
          specialty?: string
          specialty_slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      lead_messages: {
        Row: {
          body: string
          created_at: string
          created_by: string | null
          direction: string
          id: string
          lead_id: string
          occurred_at: string
          ref_code: string | null
        }
        Insert: {
          body: string
          created_at?: string
          created_by?: string | null
          direction?: string
          id?: string
          lead_id: string
          occurred_at?: string
          ref_code?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          created_by?: string | null
          direction?: string
          id?: string
          lead_id?: string
          occurred_at?: string
          ref_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_messages_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_settings: {
        Row: {
          email_enabled: boolean
          email_recipients: string[]
          id: number
          telegram_bot_token: string | null
          telegram_chat_id: string | null
          telegram_enabled: boolean
          twilio_account_sid: string | null
          twilio_auth_token: string | null
          twilio_enabled: boolean
          twilio_from: string | null
          twilio_to: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          email_enabled?: boolean
          email_recipients?: string[]
          id?: number
          telegram_bot_token?: string | null
          telegram_chat_id?: string | null
          telegram_enabled?: boolean
          twilio_account_sid?: string | null
          twilio_auth_token?: string | null
          twilio_enabled?: boolean
          twilio_from?: string | null
          twilio_to?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          email_enabled?: boolean
          email_recipients?: string[]
          id?: number
          telegram_bot_token?: string | null
          telegram_chat_id?: string | null
          telegram_enabled?: boolean
          twilio_account_sid?: string | null
          twilio_auth_token?: string | null
          twilio_enabled?: boolean
          twilio_from?: string | null
          twilio_to?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          count: number
          ip_hash: string
          window_key: string
        }
        Insert: {
          count?: number
          ip_hash: string
          window_key: string
        }
        Update: {
          count?: number
          ip_hash?: string
          window_key?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_leads: {
        Row: {
          assigned_at: string | null
          assigned_email: string | null
          assigned_to: string | null
          created_at: string
          cta_label: string | null
          device: string | null
          id: string
          internal_notes: string | null
          path: string | null
          patient_name: string | null
          patient_phone: string | null
          reason: string | null
          referrer: string | null
          section: string | null
          section_label: string | null
          source_code: string
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_email?: string | null
          assigned_to?: string | null
          created_at?: string
          cta_label?: string | null
          device?: string | null
          id?: string
          internal_notes?: string | null
          path?: string | null
          patient_name?: string | null
          patient_phone?: string | null
          reason?: string | null
          referrer?: string | null
          section?: string | null
          section_label?: string | null
          source_code: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_email?: string | null
          assigned_to?: string | null
          created_at?: string
          cta_label?: string | null
          device?: string | null
          id?: string
          internal_notes?: string | null
          path?: string | null
          patient_name?: string | null
          patient_phone?: string | null
          reason?: string | null
          referrer?: string | null
          section?: string | null
          section_label?: string | null
          source_code?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_rate_limits: { Args: never; Returns: undefined }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      get_chat_funnel: { Args: { days_back?: number }; Returns: Json }
      get_conversion_summary: { Args: { days_back?: number }; Returns: Json }
      list_lead_assignees: {
        Args: never
        Returns: {
          email: string
          user_id: string
        }[]
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      upsert_rate_limit: {
        Args: { p_ip_hash: string; p_window_key: string }
        Returns: number
      }
    }
    Enums: {
      appointment_status:
        | "pendiente"
        | "contactado"
        | "agendado"
        | "asistio"
        | "no_asistio"
        | "realizado"
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
      appointment_status: [
        "pendiente",
        "contactado",
        "agendado",
        "asistio",
        "no_asistio",
        "realizado",
      ],
    },
  },
} as const
