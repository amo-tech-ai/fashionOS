-- Migration: Create Missing Profile Tables
-- Description: Vendor and Media profile tables

-- 1. Create vendor profiles table
CREATE TABLE IF NOT EXISTS vendor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) UNIQUE,
    
    -- Business information
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100),
    tax_id VARCHAR(50),
    insurance_number VARCHAR(100),
    
    -- Services offered
    primary_service VARCHAR(100),
    service_categories TEXT[],
    service_description TEXT,
    
    -- Capacity and availability
    max_events_per_month INTEGER,
    team_size INTEGER,
    service_radius_km INTEGER,
    
    -- Pricing
    pricing_structure JSONB, -- {hourly: 150, daily: 1000, package: {...}}
    minimum_booking_value DECIMAL(12,2),
    
    -- Performance metrics
    total_events_serviced INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.0,
    on_time_delivery_rate DECIMAL(5,2) DEFAULT 100.0,
    
    -- Portfolio
    portfolio_urls TEXT[],
    certifications JSONB,
    awards TEXT[],
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_vendor_profiles_user ON vendor_profiles(user_id);
CREATE INDEX idx_vendor_profiles_service ON vendor_profiles(primary_service);
-- 2. Create media profiles table
CREATE TABLE IF NOT EXISTS media_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) UNIQUE,
    
    -- Media information
    media_name VARCHAR(255),
    media_type VARCHAR(50) CHECK (media_type IN 
        ('magazine', 'blog', 'newspaper', 'tv', 'radio', 'podcast', 'social_media')),
    
    -- Reach and audience
    audience_size INTEGER,
    audience_demographics JSONB,
    coverage_regions TEXT[],
    
    -- Specializations
    fashion_categories TEXT[],
    content_types TEXT[], -- ['reviews', 'interviews', 'photography', 'video']
    
    -- Credentials
    press_credentials JSONB,
    professional_associations TEXT[],
    
    -- Performance metrics
    events_covered INTEGER DEFAULT 0,
    articles_published INTEGER DEFAULT 0,
    total_reach INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2),
    
    -- Publishing schedule
    publishing_frequency VARCHAR(50),
    lead_time_days INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_media_profiles_user ON media_profiles(user_id);
CREATE INDEX idx_media_profiles_type ON media_profiles(media_type);

-- Update event_vendors foreign key to reference vendor_profiles
ALTER TABLE event_vendors DROP CONSTRAINT IF EXISTS event_vendors_vendor_id_fkey;
ALTER TABLE event_vendors ADD CONSTRAINT event_vendors_vendor_id_fkey 
    FOREIGN KEY (vendor_id) REFERENCES vendor_profiles(id) ON DELETE CASCADE;

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'Profile tables created successfully';
END $$;