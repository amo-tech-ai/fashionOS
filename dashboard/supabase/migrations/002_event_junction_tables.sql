-- Migration: Create Event Junction Tables
-- Description: Many-to-many relationships for events

-- 2. Event-Venue relationship table
CREATE TABLE IF NOT EXISTS event_venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    venue_id UUID REFERENCES venue_profiles(id) ON DELETE CASCADE,
    
    -- Booking details
    booking_status VARCHAR(50) DEFAULT 'inquiry' CHECK (booking_status IN 
        ('inquiry', 'negotiating', 'confirmed', 'cancelled')),
    booking_date DATE,
    setup_time TIME,
    event_time TIME,
    breakdown_time TIME,
    
    -- Financial details
    rental_cost DECIMAL(12,2),
    additional_services_cost DECIMAL(12,2),
    deposit_amount DECIMAL(12,2),
    deposit_paid BOOLEAN DEFAULT false,
    
    -- Venue requirements
    space_configuration TEXT,
    equipment_needed TEXT[],
    staff_needed INTEGER,
    special_requirements TEXT,
    
    -- Contract details
    contract_signed BOOLEAN DEFAULT false,
    contract_url TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(event_id, venue_id)
);

-- Create indexes
CREATE INDEX idx_event_venues_event ON event_venues(event_id);
CREATE INDEX idx_event_venues_venue ON event_venues(venue_id);
CREATE INDEX idx_event_venues_status ON event_venues(booking_status);
-- 3. Event-Vendor relationship table
CREATE TABLE IF NOT EXISTS event_vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES users(id), -- Will reference vendor_profiles when created
    
    -- Service details
    service_type VARCHAR(100) CHECK (service_type IN 
        ('catering', 'photography', 'videography', 'lighting', 'sound', 
         'decoration', 'security', 'transportation', 'makeup', 'hair', 'other')),
    service_description TEXT,
    
    -- Booking details
    booking_status VARCHAR(50) DEFAULT 'inquiry' CHECK (booking_status IN 
        ('inquiry', 'proposal_sent', 'negotiating', 'confirmed', 'cancelled')),
    
    -- Financial details
    quoted_price DECIMAL(12,2),
    final_price DECIMAL(12,2),
    deposit_required DECIMAL(12,2),
    deposit_paid BOOLEAN DEFAULT false,
    
    -- Service timeline
    setup_start TIMESTAMPTZ,
    service_start TIMESTAMPTZ,
    service_end TIMESTAMPTZ,
    breakdown_complete TIMESTAMPTZ,
    
    -- Performance tracking
    performance_rating INTEGER CHECK (performance_rating BETWEEN 1 AND 5),
    performance_notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(event_id, vendor_id, service_type)
);

-- Create indexes
CREATE INDEX idx_event_vendors_event ON event_vendors(event_id);
CREATE INDEX idx_event_vendors_vendor ON event_vendors(vendor_id);
CREATE INDEX idx_event_vendors_type ON event_vendors(service_type);
-- 4. Event-Model relationship table
CREATE TABLE IF NOT EXISTS event_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    model_id UUID REFERENCES model_profiles(id) ON DELETE CASCADE,
    
    -- Booking details
    booking_status VARCHAR(50) DEFAULT 'invited' CHECK (booking_status IN 
        ('invited', 'interested', 'confirmed', 'contracted', 'cancelled')),
    
    -- Role details
    model_role VARCHAR(50) CHECK (model_role IN 
        ('runway', 'photoshoot', 'fitting', 'campaign', 'lookbook')),
    outfit_count INTEGER DEFAULT 1,
    
    -- Schedule
    call_time TIMESTAMPTZ,
    rehearsal_time TIMESTAMPTZ,
    show_time TIMESTAMPTZ,
    wrap_time TIMESTAMPTZ,
    
    -- Compensation
    rate_type VARCHAR(20) CHECK (rate_type IN ('hourly', 'flat', 'per_look')),
    rate_amount DECIMAL(12,2),
    total_compensation DECIMAL(12,2),
    payment_status VARCHAR(20) DEFAULT 'pending',
    
    -- Requirements
    measurements_confirmed BOOLEAN DEFAULT false,
    fitting_completed BOOLEAN DEFAULT false,
    special_requirements TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(event_id, model_id)
);

-- Create indexes
CREATE INDEX idx_event_models_event ON event_models(event_id);
CREATE INDEX idx_event_models_model ON event_models(model_id);
CREATE INDEX idx_event_models_status ON event_models(booking_status);
-- 5. Enhanced Event-Sponsor relationship table
CREATE TABLE IF NOT EXISTS event_sponsors_enhanced (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
    
    -- Sponsorship details
    sponsorship_tier VARCHAR(50) CHECK (sponsorship_tier IN 
        ('title', 'platinum', 'gold', 'silver', 'bronze', 'supporter')),
    sponsorship_amount DECIMAL(12,2),
    
    -- Benefits package
    benefits JSONB DEFAULT '{}', -- {logo_placement: [], booth_size: "10x10", tickets: 10}
    
    -- Activation details
    activation_type TEXT[],
    booth_location TEXT,
    branding_opportunities TEXT[],
    
    -- Performance metrics
    lead_goal INTEGER,
    leads_captured INTEGER DEFAULT 0,
    engagement_score INTEGER DEFAULT 0,
    roi_calculated DECIMAL(10,2),
    
    -- Contract status
    contract_status VARCHAR(50) DEFAULT 'negotiating',
    contract_signed_date DATE,
    payment_received BOOLEAN DEFAULT false,
    
    -- Deliverables tracking
    logo_received BOOLEAN DEFAULT false,
    marketing_materials_approved BOOLEAN DEFAULT false,
    booth_setup_confirmed BOOLEAN DEFAULT false,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(event_id, sponsor_id)
);

-- Create indexes
CREATE INDEX idx_event_sponsors_event ON event_sponsors_enhanced(event_id);
CREATE INDEX idx_event_sponsors_sponsor ON event_sponsors_enhanced(sponsor_id);
CREATE INDEX idx_event_sponsors_tier ON event_sponsors_enhanced(sponsorship_tier);

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'Event junction tables created successfully';
END $$;