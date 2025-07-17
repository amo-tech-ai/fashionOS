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
      accounts: {
        Row: {
          account_owner_id: string | null
          account_status: string | null
          account_team: string[] | null
          account_tier: string | null
          account_type: string | null
          annual_revenue_range: string | null
          became_customer_date: string | null
          churn_date: string | null
          company_name: string
          company_size: string | null
          created_at: string | null
          credit_limit: number | null
          first_contact_date: string | null
          headquarters_address: string | null
          headquarters_city: string | null
          headquarters_country: string | null
          health_score: number | null
          id: string
          industry: string | null
          legal_name: string | null
          notes: string | null
          operating_regions: string[] | null
          outstanding_balance: number | null
          payment_terms: string | null
          renewal_date: string | null
          sub_industry: string | null
          tags: string[] | null
          total_revenue_generated: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          account_owner_id?: string | null
          account_status?: string | null
          account_team?: string[] | null
          account_tier?: string | null
          account_type?: string | null
          annual_revenue_range?: string | null
          became_customer_date?: string | null
          churn_date?: string | null
          company_name: string
          company_size?: string | null
          created_at?: string | null
          credit_limit?: number | null
          first_contact_date?: string | null
          headquarters_address?: string | null
          headquarters_city?: string | null
          headquarters_country?: string | null
          health_score?: number | null
          id?: string
          industry?: string | null
          legal_name?: string | null
          notes?: string | null
          operating_regions?: string[] | null
          outstanding_balance?: number | null
          payment_terms?: string | null
          renewal_date?: string | null
          sub_industry?: string | null
          tags?: string[] | null
          total_revenue_generated?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          account_owner_id?: string | null
          account_status?: string | null
          account_team?: string[] | null
          account_tier?: string | null
          account_type?: string | null
          annual_revenue_range?: string | null
          became_customer_date?: string | null
          churn_date?: string | null
          company_name?: string
          company_size?: string | null
          created_at?: string | null
          credit_limit?: number | null
          first_contact_date?: string | null
          headquarters_address?: string | null
          headquarters_city?: string | null
          headquarters_country?: string | null
          health_score?: number | null
          id?: string
          industry?: string | null
          legal_name?: string | null
          notes?: string | null
          operating_regions?: string[] | null
          outstanding_balance?: number | null
          payment_terms?: string | null
          renewal_date?: string | null
          sub_industry?: string | null
          tags?: string[] | null
          total_revenue_generated?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_account_owner_id_fkey"
            columns: ["account_owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string | null
          changes: Json | null
          created_at: string | null
          id: string
          record_id: string | null
          table_name: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          changes?: Json | null
          created_at?: string | null
          id?: string
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          changes?: Json | null
          created_at?: string | null
          id?: string
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company: string | null
          contact_type: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          contact_type?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          contact_type?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      dashboard_preferences: {
        Row: {
          created_at: string | null
          id: string
          layout_config: Json | null
          notification_settings: Json | null
          theme: string | null
          updated_at: string | null
          user_id: string | null
          widget_preferences: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          layout_config?: Json | null
          notification_settings?: Json | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
          widget_preferences?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          layout_config?: Json | null
          notification_settings?: Json | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
          widget_preferences?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      designer_profiles: {
        Row: {
          awards: Json | null
          brand_name: string | null
          created_at: string | null
          id: string
          portfolio_url: string | null
          signature_style: string | null
          style_focus: string[] | null
          user_id: string | null
          years_experience: number | null
        }
        Insert: {
          awards?: Json | null
          brand_name?: string | null
          created_at?: string | null
          id?: string
          portfolio_url?: string | null
          signature_style?: string | null
          style_focus?: string[] | null
          user_id?: string | null
          years_experience?: number | null
        }
        Update: {
          awards?: Json | null
          brand_name?: string | null
          created_at?: string | null
          id?: string
          portfolio_url?: string | null
          signature_style?: string | null
          style_focus?: string[] | null
          user_id?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "designer_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_analytics: {
        Row: {
          conversion_rate: number | null
          created_at: string | null
          date: string | null
          event_id: number | null
          id: number
          page_views: number | null
          registrations: number | null
          revenue: number | null
          top_referrers: Json | null
        }
        Insert: {
          conversion_rate?: number | null
          created_at?: string | null
          date?: string | null
          event_id?: number | null
          id?: number
          page_views?: number | null
          registrations?: number | null
          revenue?: number | null
          top_referrers?: Json | null
        }
        Update: {
          conversion_rate?: number | null
          created_at?: string | null
          date?: string | null
          event_id?: number | null
          id?: number
          page_views?: number | null
          registrations?: number | null
          revenue?: number | null
          top_referrers?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "event_analytics_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_categories: {
        Row: {
          color: string | null
          created_at: string | null
          icon: string | null
          id: number
          name: string
          parent_id: number | null
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: number
          name: string
          parent_id?: number | null
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: number
          name?: string
          parent_id?: number | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "event_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      event_models: {
        Row: {
          booking_status: string | null
          call_time: string | null
          created_at: string | null
          event_id: number | null
          fitting_completed: boolean | null
          id: string
          measurements_confirmed: boolean | null
          model_id: string | null
          model_role: string | null
          outfit_count: number | null
          payment_status: string | null
          rate_amount: number | null
          rate_type: string | null
          rehearsal_time: string | null
          show_time: string | null
          special_requirements: string | null
          total_compensation: number | null
          updated_at: string | null
          wrap_time: string | null
        }
        Insert: {
          booking_status?: string | null
          call_time?: string | null
          created_at?: string | null
          event_id?: number | null
          fitting_completed?: boolean | null
          id?: string
          measurements_confirmed?: boolean | null
          model_id?: string | null
          model_role?: string | null
          outfit_count?: number | null
          payment_status?: string | null
          rate_amount?: number | null
          rate_type?: string | null
          rehearsal_time?: string | null
          show_time?: string | null
          special_requirements?: string | null
          total_compensation?: number | null
          updated_at?: string | null
          wrap_time?: string | null
        }
        Update: {
          booking_status?: string | null
          call_time?: string | null
          created_at?: string | null
          event_id?: number | null
          fitting_completed?: boolean | null
          id?: string
          measurements_confirmed?: boolean | null
          model_id?: string | null
          model_role?: string | null
          outfit_count?: number | null
          payment_status?: string | null
          rate_amount?: number | null
          rate_type?: string | null
          rehearsal_time?: string | null
          show_time?: string | null
          special_requirements?: string | null
          total_compensation?: number | null
          updated_at?: string | null
          wrap_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_models_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_models_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "model_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_planning: {
        Row: {
          allocated_budget: number | null
          contingency_plans: Json | null
          created_at: string | null
          event_id: number | null
          id: string
          lead_organizer_id: string | null
          marketing_budget: number | null
          marketing_deadline: string | null
          model_budget: number | null
          model_coordinator_id: string | null
          model_deadline: string | null
          models_confirmed: number | null
          models_needed: number | null
          planning_notes: string | null
          planning_start_date: string | null
          planning_status: string | null
          risk_factors: Json | null
          sponsor_manager_id: string | null
          sponsors_confirmed: number | null
          sponsors_target: number | null
          total_budget: number | null
          updated_at: string | null
          vendor_budget: number | null
          vendor_deadline: string | null
          vendor_manager_id: string | null
          vendors_confirmed: number | null
          vendors_needed: number | null
          venue_budget: number | null
          venue_coordinator_id: string | null
          venue_deadline: string | null
          venues_confirmed: number | null
          venues_needed: number | null
        }
        Insert: {
          allocated_budget?: number | null
          contingency_plans?: Json | null
          created_at?: string | null
          event_id?: number | null
          id?: string
          lead_organizer_id?: string | null
          marketing_budget?: number | null
          marketing_deadline?: string | null
          model_budget?: number | null
          model_coordinator_id?: string | null
          model_deadline?: string | null
          models_confirmed?: number | null
          models_needed?: number | null
          planning_notes?: string | null
          planning_start_date?: string | null
          planning_status?: string | null
          risk_factors?: Json | null
          sponsor_manager_id?: string | null
          sponsors_confirmed?: number | null
          sponsors_target?: number | null
          total_budget?: number | null
          updated_at?: string | null
          vendor_budget?: number | null
          vendor_deadline?: string | null
          vendor_manager_id?: string | null
          vendors_confirmed?: number | null
          vendors_needed?: number | null
          venue_budget?: number | null
          venue_coordinator_id?: string | null
          venue_deadline?: string | null
          venues_confirmed?: number | null
          venues_needed?: number | null
        }
        Update: {
          allocated_budget?: number | null
          contingency_plans?: Json | null
          created_at?: string | null
          event_id?: number | null
          id?: string
          lead_organizer_id?: string | null
          marketing_budget?: number | null
          marketing_deadline?: string | null
          model_budget?: number | null
          model_coordinator_id?: string | null
          model_deadline?: string | null
          models_confirmed?: number | null
          models_needed?: number | null
          planning_notes?: string | null
          planning_start_date?: string | null
          planning_status?: string | null
          risk_factors?: Json | null
          sponsor_manager_id?: string | null
          sponsors_confirmed?: number | null
          sponsors_target?: number | null
          total_budget?: number | null
          updated_at?: string | null
          vendor_budget?: number | null
          vendor_deadline?: string | null
          vendor_manager_id?: string | null
          vendors_confirmed?: number | null
          vendors_needed?: number | null
          venue_budget?: number | null
          venue_coordinator_id?: string | null
          venue_deadline?: string | null
          venues_confirmed?: number | null
          venues_needed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_planning_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_planning_lead_organizer_id_fkey"
            columns: ["lead_organizer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_planning_model_coordinator_id_fkey"
            columns: ["model_coordinator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_planning_sponsor_manager_id_fkey"
            columns: ["sponsor_manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_planning_vendor_manager_id_fkey"
            columns: ["vendor_manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_planning_venue_coordinator_id_fkey"
            columns: ["venue_coordinator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_schedule: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          end_time: string | null
          event_id: number | null
          id: number
          location: string | null
          speaker_name: string | null
          start_time: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          event_id?: number | null
          id?: number
          location?: string | null
          speaker_name?: string | null
          start_time?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          event_id?: number | null
          id?: number
          location?: string | null
          speaker_name?: string | null
          start_time?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_schedule_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_sponsors: {
        Row: {
          amount_paid: number | null
          booth_location: string | null
          created_at: string | null
          event_id: number | null
          id: number
          notes: string | null
          package_id: number | null
          sponsor_id: string | null
        }
        Insert: {
          amount_paid?: number | null
          booth_location?: string | null
          created_at?: string | null
          event_id?: number | null
          id?: number
          notes?: string | null
          package_id?: number | null
          sponsor_id?: string | null
        }
        Update: {
          amount_paid?: number | null
          booth_location?: string | null
          created_at?: string | null
          event_id?: number | null
          id?: number
          notes?: string | null
          package_id?: number | null
          sponsor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_sponsors_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_sponsors_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "sponsor_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_sponsors_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      event_vendors: {
        Row: {
          booking_status: string | null
          breakdown_complete: string | null
          created_at: string | null
          deposit_paid: boolean | null
          deposit_required: number | null
          event_id: number | null
          final_price: number | null
          id: string
          performance_notes: string | null
          performance_rating: number | null
          quoted_price: number | null
          service_description: string | null
          service_end: string | null
          service_start: string | null
          service_type: string | null
          setup_start: string | null
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          booking_status?: string | null
          breakdown_complete?: string | null
          created_at?: string | null
          deposit_paid?: boolean | null
          deposit_required?: number | null
          event_id?: number | null
          final_price?: number | null
          id?: string
          performance_notes?: string | null
          performance_rating?: number | null
          quoted_price?: number | null
          service_description?: string | null
          service_end?: string | null
          service_start?: string | null
          service_type?: string | null
          setup_start?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          booking_status?: string | null
          breakdown_complete?: string | null
          created_at?: string | null
          deposit_paid?: boolean | null
          deposit_required?: number | null
          event_id?: number | null
          final_price?: number | null
          id?: string
          performance_notes?: string | null
          performance_rating?: number | null
          quoted_price?: number | null
          service_description?: string | null
          service_end?: string | null
          service_start?: string | null
          service_type?: string | null
          setup_start?: string | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_vendors_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_vendors_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_venues: {
        Row: {
          additional_services_cost: number | null
          booking_date: string | null
          booking_status: string | null
          breakdown_time: string | null
          contract_signed: boolean | null
          contract_url: string | null
          created_at: string | null
          deposit_amount: number | null
          deposit_paid: boolean | null
          equipment_needed: string[] | null
          event_id: number | null
          event_time: string | null
          id: string
          rental_cost: number | null
          setup_time: string | null
          space_configuration: string | null
          special_requirements: string | null
          staff_needed: number | null
          updated_at: string | null
          venue_id: string | null
        }
        Insert: {
          additional_services_cost?: number | null
          booking_date?: string | null
          booking_status?: string | null
          breakdown_time?: string | null
          contract_signed?: boolean | null
          contract_url?: string | null
          created_at?: string | null
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          equipment_needed?: string[] | null
          event_id?: number | null
          event_time?: string | null
          id?: string
          rental_cost?: number | null
          setup_time?: string | null
          space_configuration?: string | null
          special_requirements?: string | null
          staff_needed?: number | null
          updated_at?: string | null
          venue_id?: string | null
        }
        Update: {
          additional_services_cost?: number | null
          booking_date?: string | null
          booking_status?: string | null
          breakdown_time?: string | null
          contract_signed?: boolean | null
          contract_url?: string | null
          created_at?: string | null
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          equipment_needed?: string[] | null
          event_id?: number | null
          event_time?: string | null
          id?: string
          rental_cost?: number | null
          setup_time?: string | null
          space_configuration?: string | null
          special_requirements?: string | null
          staff_needed?: number | null
          updated_at?: string | null
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_venues_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_venues_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venue_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity_breakdown: Json | null
          category_id: number | null
          created_at: string | null
          current_attendance: number | null
          description: string | null
          dress_code: string | null
          end_time: string | null
          event_date: string
          event_type: string | null
          featured_image: string | null
          id: number
          live_streaming: boolean | null
          organizer_id: string | null
          slug: string
          special_requirements_enabled: boolean | null
          start_time: string
          status: string | null
          target_attendance: number | null
          theme: string | null
          title: string
          venue_id: number | null
        }
        Insert: {
          capacity_breakdown?: Json | null
          category_id?: number | null
          created_at?: string | null
          current_attendance?: number | null
          description?: string | null
          dress_code?: string | null
          end_time?: string | null
          event_date: string
          event_type?: string | null
          featured_image?: string | null
          id?: never
          live_streaming?: boolean | null
          organizer_id?: string | null
          slug: string
          special_requirements_enabled?: boolean | null
          start_time: string
          status?: string | null
          target_attendance?: number | null
          theme?: string | null
          title: string
          venue_id?: number | null
        }
        Update: {
          capacity_breakdown?: Json | null
          category_id?: number | null
          created_at?: string | null
          current_attendance?: number | null
          description?: string | null
          dress_code?: string | null
          end_time?: string | null
          event_date?: string
          event_type?: string | null
          featured_image?: string | null
          id?: never
          live_streaming?: boolean | null
          organizer_id?: string | null
          slug?: string
          special_requirements_enabled?: boolean | null
          start_time?: string
          status?: string | null
          target_attendance?: number | null
          theme?: string | null
          title?: string
          venue_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "events_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "event_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      interactions: {
        Row: {
          account_id: string | null
          attachments: Json | null
          attendees: string[] | null
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          direction: string | null
          duration_minutes: number | null
          event_id: number | null
          follow_up_date: string | null
          follow_up_notes: string | null
          follow_up_required: boolean | null
          id: string
          interaction_date: string | null
          interaction_type: string | null
          opportunity_id: string | null
          outcome: string | null
          sentiment: string | null
          subject: string | null
        }
        Insert: {
          account_id?: string | null
          attachments?: Json | null
          attendees?: string[] | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          direction?: string | null
          duration_minutes?: number | null
          event_id?: number | null
          follow_up_date?: string | null
          follow_up_notes?: string | null
          follow_up_required?: boolean | null
          id?: string
          interaction_date?: string | null
          interaction_type?: string | null
          opportunity_id?: string | null
          outcome?: string | null
          sentiment?: string | null
          subject?: string | null
        }
        Update: {
          account_id?: string | null
          attachments?: Json | null
          attendees?: string[] | null
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          direction?: string | null
          duration_minutes?: number | null
          event_id?: number | null
          follow_up_date?: string | null
          follow_up_notes?: string | null
          follow_up_required?: boolean | null
          id?: string
          interaction_date?: string | null
          interaction_type?: string | null
          opportunity_id?: string | null
          outcome?: string | null
          sentiment?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_scoring_history: {
        Row: {
          behavioral_score: number | null
          contact_id: string | null
          demographic_score: number | null
          engagement_score: number | null
          firmographic_score: number | null
          id: string
          previous_score: number | null
          score: number
          score_change: number | null
          score_reason: string | null
          scored_at: string | null
          scored_by: string | null
          scoring_factors: Json | null
        }
        Insert: {
          behavioral_score?: number | null
          contact_id?: string | null
          demographic_score?: number | null
          engagement_score?: number | null
          firmographic_score?: number | null
          id?: string
          previous_score?: number | null
          score: number
          score_change?: number | null
          score_reason?: string | null
          scored_at?: string | null
          scored_by?: string | null
          scoring_factors?: Json | null
        }
        Update: {
          behavioral_score?: number | null
          contact_id?: string | null
          demographic_score?: number | null
          engagement_score?: number | null
          firmographic_score?: number | null
          id?: string
          previous_score?: number | null
          score?: number
          score_change?: number | null
          score_reason?: string | null
          scored_at?: string | null
          scored_by?: string | null
          scoring_factors?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_scoring_history_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_sources: {
        Row: {
          campaign_budget: number | null
          campaign_end_date: string | null
          campaign_name: string | null
          campaign_start_date: string | null
          cost_per_lead: number | null
          created_at: string | null
          deals_won: number | null
          id: string
          is_active: boolean | null
          opportunities_created: number | null
          qualified_leads: number | null
          revenue_generated: number | null
          roi_percentage: number | null
          source_channel: string | null
          source_name: string
          source_type: string | null
          total_leads: number | null
          updated_at: string | null
        }
        Insert: {
          campaign_budget?: number | null
          campaign_end_date?: string | null
          campaign_name?: string | null
          campaign_start_date?: string | null
          cost_per_lead?: number | null
          created_at?: string | null
          deals_won?: number | null
          id?: string
          is_active?: boolean | null
          opportunities_created?: number | null
          qualified_leads?: number | null
          revenue_generated?: number | null
          roi_percentage?: number | null
          source_channel?: string | null
          source_name: string
          source_type?: string | null
          total_leads?: number | null
          updated_at?: string | null
        }
        Update: {
          campaign_budget?: number | null
          campaign_end_date?: string | null
          campaign_name?: string | null
          campaign_start_date?: string | null
          cost_per_lead?: number | null
          created_at?: string | null
          deals_won?: number | null
          id?: string
          is_active?: boolean | null
          opportunities_created?: number | null
          qualified_leads?: number | null
          revenue_generated?: number | null
          roi_percentage?: number | null
          source_channel?: string | null
          source_name?: string
          source_type?: string | null
          total_leads?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      media_profiles: {
        Row: {
          articles_published: number | null
          audience_demographics: Json | null
          audience_size: number | null
          content_types: string[] | null
          coverage_regions: string[] | null
          created_at: string | null
          engagement_rate: number | null
          events_covered: number | null
          fashion_categories: string[] | null
          id: string
          lead_time_days: number | null
          media_name: string | null
          media_type: string | null
          press_credentials: Json | null
          professional_associations: string[] | null
          publishing_frequency: string | null
          total_reach: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          articles_published?: number | null
          audience_demographics?: Json | null
          audience_size?: number | null
          content_types?: string[] | null
          coverage_regions?: string[] | null
          created_at?: string | null
          engagement_rate?: number | null
          events_covered?: number | null
          fashion_categories?: string[] | null
          id?: string
          lead_time_days?: number | null
          media_name?: string | null
          media_type?: string | null
          press_credentials?: Json | null
          professional_associations?: string[] | null
          publishing_frequency?: string | null
          total_reach?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          articles_published?: number | null
          audience_demographics?: Json | null
          audience_size?: number | null
          content_types?: string[] | null
          coverage_regions?: string[] | null
          created_at?: string | null
          engagement_rate?: number | null
          events_covered?: number | null
          fashion_categories?: string[] | null
          id?: string
          lead_time_days?: number | null
          media_name?: string | null
          media_type?: string | null
          press_credentials?: Json | null
          professional_associations?: string[] | null
          publishing_frequency?: string | null
          total_reach?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      model_profiles: {
        Row: {
          availability_schedule: Json | null
          created_at: string | null
          experience_level: string | null
          height_cm: number | null
          id: string
          measurements: Json | null
          portfolio_images: string[] | null
          specialties: string[] | null
          stage_name: string | null
          user_id: string | null
        }
        Insert: {
          availability_schedule?: Json | null
          created_at?: string | null
          experience_level?: string | null
          height_cm?: number | null
          id?: string
          measurements?: Json | null
          portfolio_images?: string[] | null
          specialties?: string[] | null
          stage_name?: string | null
          user_id?: string | null
        }
        Update: {
          availability_schedule?: Json | null
          created_at?: string | null
          experience_level?: string | null
          height_cm?: number | null
          id?: string
          measurements?: Json | null
          portfolio_images?: string[] | null
          specialties?: string[] | null
          stage_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "model_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          account_id: string | null
          amount: number | null
          campaign_id: string | null
          closed_date: string | null
          competitive_situation: string | null
          competitors: string[] | null
          created_at: string | null
          created_by: string | null
          description: string | null
          expected_close_date: string | null
          fiscal_period: string | null
          id: string
          lead_source: string | null
          next_step: string | null
          next_step_date: string | null
          opportunity_name: string
          opportunity_type: string | null
          owner_id: string | null
          primary_contact_id: string | null
          probability_to_close: number | null
          stage: string | null
          updated_at: string | null
          win_loss_notes: string | null
          win_loss_reason: string | null
        }
        Insert: {
          account_id?: string | null
          amount?: number | null
          campaign_id?: string | null
          closed_date?: string | null
          competitive_situation?: string | null
          competitors?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expected_close_date?: string | null
          fiscal_period?: string | null
          id?: string
          lead_source?: string | null
          next_step?: string | null
          next_step_date?: string | null
          opportunity_name: string
          opportunity_type?: string | null
          owner_id?: string | null
          primary_contact_id?: string | null
          probability_to_close?: number | null
          stage?: string | null
          updated_at?: string | null
          win_loss_notes?: string | null
          win_loss_reason?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number | null
          campaign_id?: string | null
          closed_date?: string | null
          competitive_situation?: string | null
          competitors?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expected_close_date?: string | null
          fiscal_period?: string | null
          id?: string
          lead_source?: string | null
          next_step?: string | null
          next_step_date?: string | null
          opportunity_name?: string
          opportunity_type?: string | null
          owner_id?: string | null
          primary_contact_id?: string | null
          probability_to_close?: number | null
          stage?: string | null
          updated_at?: string | null
          win_loss_notes?: string | null
          win_loss_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "opportunities_primary_contact_id_fkey"
            columns: ["primary_contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number | null
          created_at: string | null
          currency: string
          id: string
          payment_method: string | null
          reference_id: string | null
          reference_type: string | null
          status: string
          stripe_payment_id: string | null
          type: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          currency?: string
          id?: string
          payment_method?: string | null
          reference_id?: string | null
          reference_type?: string | null
          status?: string
          stripe_payment_id?: string | null
          type?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          currency?: string
          id?: string
          payment_method?: string | null
          reference_id?: string | null
          reference_type?: string | null
          status?: string
          stripe_payment_id?: string | null
          type?: string | null
        }
        Relationships: []
      }
      registrations: {
        Row: {
          created_at: string | null
          event_id: number | null
          id: number
          notes: string | null
          payment_status: string | null
          qr_code: string | null
          status: string | null
          ticket_quantity: number | null
          total_amount: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: number | null
          id?: never
          notes?: string | null
          payment_status?: string | null
          qr_code?: string | null
          status?: string | null
          ticket_quantity?: number | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: number | null
          id?: never
          notes?: string | null
          payment_status?: string | null
          qr_code?: string | null
          status?: string | null
          ticket_quantity?: number | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsor_leads: {
        Row: {
          attendee_company: string | null
          attendee_email: string
          attendee_name: string
          attendee_phone: string | null
          attendee_title: string | null
          buying_intent_score: number | null
          capture_method: string
          created_at: string | null
          engagement_score: number | null
          estimated_deal_value: number | null
          event_id: number
          follow_up_status: string | null
          id: string
          interaction_duration: number | null
          interest_level: string | null
          next_action_date: string | null
          probability_to_close: number | null
          sponsor_id: string
          updated_at: string | null
        }
        Insert: {
          attendee_company?: string | null
          attendee_email: string
          attendee_name: string
          attendee_phone?: string | null
          attendee_title?: string | null
          buying_intent_score?: number | null
          capture_method: string
          created_at?: string | null
          engagement_score?: number | null
          estimated_deal_value?: number | null
          event_id: number
          follow_up_status?: string | null
          id?: string
          interaction_duration?: number | null
          interest_level?: string | null
          next_action_date?: string | null
          probability_to_close?: number | null
          sponsor_id: string
          updated_at?: string | null
        }
        Update: {
          attendee_company?: string | null
          attendee_email?: string
          attendee_name?: string
          attendee_phone?: string | null
          attendee_title?: string | null
          buying_intent_score?: number | null
          capture_method?: string
          created_at?: string | null
          engagement_score?: number | null
          estimated_deal_value?: number | null
          event_id?: number
          follow_up_status?: string | null
          id?: string
          interaction_duration?: number | null
          interest_level?: string | null
          next_action_date?: string | null
          probability_to_close?: number | null
          sponsor_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsor_leads_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sponsor_leads_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsor_packages: {
        Row: {
          benefits: Json | null
          created_at: string | null
          id: number
          is_active: boolean | null
          max_sponsors: number | null
          name: string
          price: number | null
          tier: string
        }
        Insert: {
          benefits?: Json | null
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          max_sponsors?: number | null
          name: string
          price?: number | null
          tier: string
        }
        Update: {
          benefits?: Json | null
          created_at?: string | null
          id?: number
          is_active?: boolean | null
          max_sponsors?: number | null
          name?: string
          price?: number | null
          tier?: string
        }
        Relationships: []
      }
      sponsors: {
        Row: {
          annual_budget: number | null
          company_name: string
          company_size: string | null
          contact_email: string | null
          contact_person: string | null
          created_at: string | null
          health_score: number | null
          id: string
          industry: string | null
          logo_url: string | null
          primary_contact_id: string | null
          renewal_date: string | null
          sponsorship_history: Json | null
          status: string
          tier: string | null
          website: string | null
        }
        Insert: {
          annual_budget?: number | null
          company_name: string
          company_size?: string | null
          contact_email?: string | null
          contact_person?: string | null
          created_at?: string | null
          health_score?: number | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          primary_contact_id?: string | null
          renewal_date?: string | null
          sponsorship_history?: Json | null
          status?: string
          tier?: string | null
          website?: string | null
        }
        Update: {
          annual_budget?: number | null
          company_name?: string
          company_size?: string | null
          contact_email?: string | null
          contact_person?: string | null
          created_at?: string | null
          health_score?: number | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          primary_contact_id?: string | null
          renewal_date?: string | null
          sponsorship_history?: Json | null
          status?: string
          tier?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsors_primary_contact_id_fkey"
            columns: ["primary_contact_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          event_id: number | null
          id: string
          priority: string | null
          status: string | null
          title: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          event_id?: number | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          event_id?: number | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      team: {
        Row: {
          created_at: string | null
          event_id: number | null
          id: number
          responsibilities: string[] | null
          role: string | null
          shift_end: string | null
          shift_start: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: number | null
          id?: number
          responsibilities?: string[] | null
          role?: string | null
          shift_end?: string | null
          shift_start?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: number | null
          id?: number
          responsibilities?: string[] | null
          role?: string | null
          shift_end?: string | null
          shift_start?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_categories: {
        Row: {
          available_quantity: number | null
          benefits: Json | null
          created_at: string | null
          currency: string | null
          description: string | null
          event_id: number | null
          id: number
          is_active: boolean | null
          max_quantity: number | null
          name: string
          position: number | null
          price: number
          slug: string
          updated_at: string | null
        }
        Insert: {
          available_quantity?: number | null
          benefits?: Json | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          event_id?: number | null
          id?: never
          is_active?: boolean | null
          max_quantity?: number | null
          name: string
          position?: number | null
          price: number
          slug: string
          updated_at?: string | null
        }
        Update: {
          available_quantity?: number | null
          benefits?: Json | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          event_id?: number | null
          id?: never
          is_active?: boolean | null
          max_quantity?: number | null
          name?: string
          position?: number | null
          price?: number
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_categories_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_types: {
        Row: {
          benefits: string[] | null
          created_at: string | null
          event_id: number | null
          id: number
          name: string
          price: number | null
          quantity: number | null
          sale_end: string | null
          sale_start: string | null
          sold: number | null
        }
        Insert: {
          benefits?: string[] | null
          created_at?: string | null
          event_id?: number | null
          id?: number
          name: string
          price?: number | null
          quantity?: number | null
          sale_end?: string | null
          sale_start?: string | null
          sold?: number | null
        }
        Update: {
          benefits?: string[] | null
          created_at?: string | null
          event_id?: number | null
          id?: number
          name?: string
          price?: number | null
          quantity?: number | null
          sale_end?: string | null
          sale_start?: string | null
          sold?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_types_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_types: {
        Row: {
          id: number
          key: string
          label: string
        }
        Insert: {
          id?: number
          key: string
          label: string
        }
        Update: {
          id?: number
          key?: string
          label?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          email: string
          facebook: string | null
          full_name: string | null
          id: string
          instagram: string | null
          is_verified: boolean | null
          last_login_at: string | null
          linkedin: string | null
          phone: string | null
          profile_completion_score: number | null
          role: string
          subscription_tier: string | null
          tiktok: string | null
          timezone: string | null
          updated_at: string | null
          website: string | null
          whatsapp: string | null
          youtube: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          facebook?: string | null
          full_name?: string | null
          id?: string
          instagram?: string | null
          is_verified?: boolean | null
          last_login_at?: string | null
          linkedin?: string | null
          phone?: string | null
          profile_completion_score?: number | null
          role?: string
          subscription_tier?: string | null
          tiktok?: string | null
          timezone?: string | null
          updated_at?: string | null
          website?: string | null
          whatsapp?: string | null
          youtube?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          facebook?: string | null
          full_name?: string | null
          id?: string
          instagram?: string | null
          is_verified?: boolean | null
          last_login_at?: string | null
          linkedin?: string | null
          phone?: string | null
          profile_completion_score?: number | null
          role?: string
          subscription_tier?: string | null
          tiktok?: string | null
          timezone?: string | null
          updated_at?: string | null
          website?: string | null
          whatsapp?: string | null
          youtube?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "user_types"
            referencedColumns: ["key"]
          },
        ]
      }
      vendor_profiles: {
        Row: {
          average_rating: number | null
          awards: string[] | null
          business_name: string
          business_type: string | null
          certifications: Json | null
          created_at: string | null
          id: string
          insurance_number: string | null
          max_events_per_month: number | null
          minimum_booking_value: number | null
          on_time_delivery_rate: number | null
          portfolio_urls: string[] | null
          pricing_structure: Json | null
          primary_service: string | null
          service_categories: string[] | null
          service_description: string | null
          service_radius_km: number | null
          tax_id: string | null
          team_size: number | null
          total_events_serviced: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          average_rating?: number | null
          awards?: string[] | null
          business_name: string
          business_type?: string | null
          certifications?: Json | null
          created_at?: string | null
          id?: string
          insurance_number?: string | null
          max_events_per_month?: number | null
          minimum_booking_value?: number | null
          on_time_delivery_rate?: number | null
          portfolio_urls?: string[] | null
          pricing_structure?: Json | null
          primary_service?: string | null
          service_categories?: string[] | null
          service_description?: string | null
          service_radius_km?: number | null
          tax_id?: string | null
          team_size?: number | null
          total_events_serviced?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          average_rating?: number | null
          awards?: string[] | null
          business_name?: string
          business_type?: string | null
          certifications?: Json | null
          created_at?: string | null
          id?: string
          insurance_number?: string | null
          max_events_per_month?: number | null
          minimum_booking_value?: number | null
          on_time_delivery_rate?: number | null
          portfolio_urls?: string[] | null
          pricing_structure?: Json | null
          primary_service?: string | null
          service_categories?: string[] | null
          service_description?: string | null
          service_radius_km?: number | null
          tax_id?: string | null
          team_size?: number | null
          total_events_serviced?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_profiles: {
        Row: {
          amenities: string[] | null
          availability_calendar: Json | null
          capacity: number | null
          created_at: string | null
          id: string
          location_details: Json | null
          pricing_structure: Json | null
          user_id: string | null
          venue_name: string
          venue_type: string | null
        }
        Insert: {
          amenities?: string[] | null
          availability_calendar?: Json | null
          capacity?: number | null
          created_at?: string | null
          id?: string
          location_details?: Json | null
          pricing_structure?: Json | null
          user_id?: string | null
          venue_name: string
          venue_type?: string | null
        }
        Update: {
          amenities?: string[] | null
          availability_calendar?: Json | null
          capacity?: number | null
          created_at?: string | null
          id?: string
          location_details?: Json | null
          pricing_structure?: Json | null
          user_id?: string | null
          venue_name?: string
          venue_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "venue_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          address: string
          amenities: Json | null
          capacity: number | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          facebook: string | null
          google_maps_url: string | null
          id: number
          images: Json | null
          instagram: string | null
          name: string
          phone: string | null
          postal_code: string | null
          slug: string
          state: string | null
          tiktok: string | null
          updated_at: string | null
          venue_type: string | null
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          address: string
          amenities?: Json | null
          capacity?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          facebook?: string | null
          google_maps_url?: string | null
          id?: never
          images?: Json | null
          instagram?: string | null
          name: string
          phone?: string | null
          postal_code?: string | null
          slug: string
          state?: string | null
          tiktok?: string | null
          updated_at?: string | null
          venue_type?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: string
          amenities?: Json | null
          capacity?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          facebook?: string | null
          google_maps_url?: string | null
          id?: never
          images?: Json | null
          instagram?: string | null
          name?: string
          phone?: string | null
          postal_code?: string | null
          slug?: string
          state?: string | null
          tiktok?: string | null
          updated_at?: string | null
          venue_type?: string | null
          website?: string | null
          whatsapp?: string | null
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
      user_role:
        | "attendee"
        | "organizer"
        | "sponsor"
        | "model"
        | "designer"
        | "venue"
        | "vendor"
        | "media"
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
      user_role: [
        "attendee",
        "organizer",
        "sponsor",
        "model",
        "designer",
        "venue",
        "vendor",
        "media",
      ],
    },
  },
} as const
