-- FashionOS Multi-Role Dashboard Enhancement Migration
-- Phase 1: Foundation Setup
-- This migration enhances the existing schema for comprehensive multi-role dashboard support

-- ============================================
-- 1. ENHANCE EXISTING TABLES
-- ============================================

-- Enhance users table with additional role-based fields
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS user_type VARCHAR(20) DEFAULT 'attendee' 
  CHECK (user_type IN ('super_admin', 'admin', 'organizer', 'sponsor', 'designer', 'model', 'venue', 'vendor', 'media', 'attendee'));

-- Map existing roles to new user_type
UPDATE users SET user_type = role WHERE role IS NOT NULL;

-- Add dashboard-specific fields
ALTER TABLE users
ADD COLUMN IF NOT EXISTS dashboard_preferences JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS last_dashboard_access TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS dashboard_version VARCHAR(10) DEFAULT 'v1';

-- Enhance events table with fashion-specific fields
ALTER TABLE events
ADD COLUMN IF NOT EXISTS event_type VARCHAR(50) DEFAULT 'general'
  CHECK (event_type IN ('fashion_week', 'runway_show', 'trade_show', 'designer_showcase', 'vip_preview', 'pop_up', 'photoshoot', 'general')),
ADD COLUMN IF NOT EXISTS dress_code VARCHAR(50),
ADD COLUMN IF NOT EXISTS theme TEXT,
ADD COLUMN IF NOT EXISTS capacity_breakdown JSONB DEFAULT '{"vip": 0, "general": 0, "media": 0}',
ADD COLUMN IF NOT EXISTS special_requirements_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS live_streaming BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS event_metrics JSONB DEFAULT '{}';

-- Enhance sponsors table
ALTER TABLE sponsors
ADD COLUMN IF NOT EXISTS industry VARCHAR(100),
ADD COLUMN IF NOT EXISTS company_size VARCHAR(20) CHECK (company_size IN ('startup', 'small', 'medium', 'large', 'enterprise')),
ADD COLUMN IF NOT EXISTS annual_budget DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS health_score INTEGER DEFAULT 50 CHECK (health_score >= 0 AND health_score <= 100),
ADD COLUMN IF NOT EXISTS renewal_date DATE,
ADD COLUMN IF NOT EXISTS primary_contact_id UUID REFERENCES users(id),
ADD COLUMN IF NOT EXISTS sponsorship_history JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS roi_metrics JSONB DEFAULT '{}';

-- ============================================
-- 2. CREATE ROLE-BASED PROFILE TABLES
-- ============================================

-- Designer profiles
CREATE TABLE IF NOT EXISTS designer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  brand_name VARCHAR(255),
  style_focus TEXT[],
  years_experience INTEGER,
  portfolio_url TEXT,
  awards JSONB DEFAULT '[]',
  signature_style TEXT,
  collections_count INTEGER DEFAULT 0,
  shows_participated INTEGER DEFAULT 0,
  press_features INTEGER DEFAULT 0,
  social_followers INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Model profiles
CREATE TABLE IF NOT EXISTS model_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  stage_name VARCHAR(255),
  measurements JSONB DEFAULT '{}',
  height_cm INTEGER,
  experience_level VARCHAR(50) CHECK (experience_level IN ('new_face', 'developing', 'established', 'supermodel')),
  portfolio_images TEXT[],
  specialties TEXT[],
  availability_schedule JSONB DEFAULT '{}',
  total_shows INTEGER DEFAULT 0,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Venue profiles
CREATE TABLE IF NOT EXISTS venue_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  venue_id UUID REFERENCES venues(id),
  venue_name VARCHAR(255) NOT NULL,
  capacity INTEGER,
  venue_type VARCHAR(100),
  amenities TEXT[],
  location_details JSONB DEFAULT '{}',
  pricing_structure JSONB DEFAULT '{}',
  availability_calendar JSONB DEFAULT '{}',
  total_bookings INTEGER DEFAULT 0,
  utilization_rate DECIMAL(5,2) DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendor profiles
CREATE TABLE IF NOT EXISTS vendor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  service_categories TEXT[],
  years_in_business INTEGER,
  certifications TEXT[],
  insurance_info JSONB DEFAULT '{}',
  service_areas TEXT[],
  pricing_model VARCHAR(50) CHECK (pricing_model IN ('hourly', 'fixed', 'package', 'custom')),
  total_contracts INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,2) DEFAULT 100,
  average_rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media profiles
CREATE TABLE IF NOT EXISTS media_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  media_outlet VARCHAR(255),
  media_type VARCHAR(50) CHECK (media_type IN ('print', 'digital', 'broadcast', 'social', 'freelance')),
  coverage_areas TEXT[],
  circulation_reach INTEGER,
  accreditations TEXT[],
  specialties TEXT[],
  total_events_covered INTEGER DEFAULT 0,
  total_articles INTEGER DEFAULT 0,
  total_reach INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizer profiles
CREATE TABLE IF NOT EXISTS organizer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  company_name VARCHAR(255),
  specialization TEXT[],
  years_experience INTEGER,
  certifications TEXT[],
  event_types TEXT[],
  team_size INTEGER DEFAULT 1,
  total_events_organized INTEGER DEFAULT 0,
  average_event_size INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. CREATE DASHBOARD DATA TABLES
-- ============================================

-- Dashboard preferences and layouts
CREATE TABLE IF NOT EXISTS dashboard_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  layout_config JSONB DEFAULT '{}',
  widget_preferences JSONB DEFAULT '{}',
  notification_settings JSONB DEFAULT '{"email": true, "push": true, "sms": false}',
  theme VARCHAR(20) DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
  language VARCHAR(10) DEFAULT 'en',
  timezone VARCHAR(50) DEFAULT 'America/Toronto',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics cache for performance
CREATE TABLE IF NOT EXISTS dashboard_analytics_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  cache_key VARCHAR(255) NOT NULL,
  data JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, cache_key)
);

-- User activity tracking
CREATE TABLE IF NOT EXISTS user_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  activity_type VARCHAR(50) NOT NULL,
  activity_data JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- System health monitoring
CREATE TABLE IF NOT EXISTS system_health_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(12,4),
  metric_unit VARCHAR(20),
  status VARCHAR(20) CHECK (status IN ('healthy', 'warning', 'critical')),
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. CREATE INDEXES FOR PERFORMANCE
-- ============================================

-- User indexes
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login_at);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Profile indexes
CREATE INDEX IF NOT EXISTS idx_designer_profiles_user_id ON designer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_model_profiles_user_id ON model_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_venue_profiles_user_id ON venue_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_vendor_profiles_user_id ON vendor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_media_profiles_user_id ON media_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_organizer_profiles_user_id ON organizer_profiles(user_id);

-- Dashboard indexes
CREATE INDEX IF NOT EXISTS idx_dashboard_preferences_user_id ON dashboard_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_cache_user_key ON dashboard_analytics_cache(user_id, cache_key);
CREATE INDEX IF NOT EXISTS idx_analytics_cache_expires ON dashboard_analytics_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_created ON user_activity_log(user_id, created_at DESC);

-- ============================================
-- 5. CREATE HELPER FUNCTIONS
-- ============================================

-- Function to get user dashboard data
CREATE OR REPLACE FUNCTION get_user_dashboard_data(user_uuid UUID)
RETURNS TABLE (
  user_type VARCHAR,
  profile_data JSONB,
  preferences JSONB,
  cached_analytics JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.user_type,
    CASE 
      WHEN u.user_type = 'designer' THEN row_to_json(dp.*)::JSONB
      WHEN u.user_type = 'model' THEN row_to_json(mp.*)::JSONB
      WHEN u.user_type = 'venue' THEN row_to_json(vp.*)::JSONB
      WHEN u.user_type = 'vendor' THEN row_to_json(vdp.*)::JSONB
      WHEN u.user_type = 'media' THEN row_to_json(mdp.*)::JSONB
      WHEN u.user_type = 'organizer' THEN row_to_json(op.*)::JSONB
      ELSE '{}'::JSONB
    END as profile_data,
    COALESCE(pref.layout_config, '{}'::JSONB) as preferences,
    COALESCE(
      (SELECT jsonb_object_agg(cache_key, data) 
       FROM dashboard_analytics_cache 
       WHERE user_id = user_uuid AND expires_at > NOW()),
      '{}'::JSONB
    ) as cached_analytics
  FROM users u
  LEFT JOIN designer_profiles dp ON u.id = dp.user_id
  LEFT JOIN model_profiles mp ON u.id = mp.user_id
  LEFT JOIN venue_profiles vp ON u.id = vp.user_id
  LEFT JOIN vendor_profiles vdp ON u.id = vdp.user_id
  LEFT JOIN media_profiles mdp ON u.id = mdp.user_id
  LEFT JOIN organizer_profiles op ON u.id = op.user_id
  LEFT JOIN dashboard_preferences pref ON u.id = pref.user_id
  WHERE u.id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to refresh dashboard cache
CREATE OR REPLACE FUNCTION refresh_dashboard_cache(user_uuid UUID, p_cache_key VARCHAR, p_data JSONB, p_ttl_minutes INTEGER DEFAULT 60)
RETURNS void AS $$
BEGIN
  INSERT INTO dashboard_analytics_cache (user_id, cache_key, data, expires_at)
  VALUES (user_uuid, p_cache_key, p_data, NOW() + (p_ttl_minutes || ' minutes')::INTERVAL)
  ON CONFLICT (user_id, cache_key) 
  DO UPDATE SET 
    data = EXCLUDED.data,
    expires_at = EXCLUDED.expires_at;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 6. INSERT SAMPLE PROFILE DATA
-- ============================================

-- Create profiles for existing users based on their roles
INSERT INTO designer_profiles (user_id, brand_name, style_focus, years_experience)
SELECT id, full_name || ' Designs', ARRAY['Contemporary', 'Avant-garde'], 5
FROM users WHERE role = 'designer' OR user_type = 'designer'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO model_profiles (user_id, stage_name, height_cm, experience_level)
SELECT id, full_name, 178, 'established'
FROM users WHERE role = 'model' OR user_type = 'model'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO venue_profiles (user_id, venue_name, capacity, venue_type)
SELECT u.id, COALESCE(v.name, u.full_name || ' Venue'), COALESCE(v.capacity, 500), 'event_space'
FROM users u
LEFT JOIN venues v ON v.manager_id = u.id
WHERE u.role = 'venue' OR u.user_type = 'venue'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO vendor_profiles (user_id, business_name, service_categories, pricing_model)
SELECT id, company || ' Services', ARRAY['Catering', 'Photography', 'Decoration'], 'package'
FROM users WHERE role = 'vendor' OR user_type = 'vendor'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO media_profiles (user_id, media_outlet, media_type, coverage_areas)
SELECT id, company, 'digital', ARRAY['Fashion', 'Lifestyle', 'Events']
FROM users WHERE role = 'media' OR user_type = 'media'
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO organizer_profiles (user_id, company_name, specialization, years_experience)
SELECT id, company, ARRAY['Fashion Shows', 'Trade Events'], 8
FROM users WHERE role = 'organizer' OR user_type = 'organizer'
ON CONFLICT (user_id) DO NOTHING;

-- Create default dashboard preferences for all users
INSERT INTO dashboard_preferences (user_id)
SELECT id FROM users
ON CONFLICT (user_id) DO NOTHING;

-- Log the migration completion
INSERT INTO system_health_metrics (metric_name, metric_value, status, details)
VALUES ('dashboard_migration_v1', 1, 'healthy', '{"phase": "foundation", "completed": true}');
