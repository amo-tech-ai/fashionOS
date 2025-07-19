-- FashionOS Complete Migration Script
-- Consolidated all migrations into one file for easy execution
-- Run this in Supabase SQL Editor

-- ================================================
-- 1. EVENT PLANNING TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS event_planning (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    planning_status VARCHAR(50) DEFAULT 'initial' CHECK (planning_status IN 
        ('initial', 'venue_selection', 'vendor_booking', 'model_casting', 
         'sponsor_outreach', 'marketing_prep', 'final_prep', 'completed')),
    planning_start_date DATE,
    venue_deadline DATE,
    vendor_deadline DATE,
    model_deadline DATE,
    marketing_deadline DATE,
    lead_organizer_id UUID REFERENCES users(id),
    venue_coordinator_id UUID REFERENCES users(id),
    vendor_manager_id UUID REFERENCES users(id),
    model_coordinator_id UUID REFERENCES users(id),
    sponsor_manager_id UUID REFERENCES users(id),
    total_budget DECIMAL(12,2),
    allocated_budget DECIMAL(12,2),
    venue_budget DECIMAL(12,2),
    vendor_budget DECIMAL(12,2),
    model_budget DECIMAL(12,2),
    marketing_budget DECIMAL(12,2),
    venues_confirmed INTEGER DEFAULT 0,
    venues_needed INTEGER DEFAULT 1,
    vendors_confirmed INTEGER DEFAULT 0,
    vendors_needed INTEGER DEFAULT 0,
    models_confirmed INTEGER DEFAULT 0,
    models_needed INTEGER DEFAULT 0,
    sponsors_confirmed INTEGER DEFAULT 0,
    sponsors_target INTEGER DEFAULT 0,
    planning_notes TEXT,
    risk_factors JSONB,
    contingency_plans JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_event_planning_event_id ON event_planning(event_id);
CREATE INDEX idx_event_planning_status ON event_planning(planning_status);
CREATE INDEX idx_event_planning_organizer ON event_planning(lead_organizer_id);

-- ================================================
-- 2. PROFILE TABLES
-- ================================================
CREATE TABLE IF NOT EXISTS vendor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) UNIQUE,
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100),
    tax_id VARCHAR(50),
    insurance_number VARCHAR(100),
    primary_service VARCHAR(100),
    service_categories TEXT[],
    service_description TEXT,
    max_events_per_month INTEGER,
    team_size INTEGER,
    service_radius_km INTEGER,
    pricing_structure JSONB,
    minimum_booking_value DECIMAL(12,2),
    total_events_serviced INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.0,
    on_time_delivery_rate DECIMAL(5,2) DEFAULT 100.0,
    portfolio_urls TEXT[],
    certifications JSONB,
    awards TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) UNIQUE,
    media_name VARCHAR(255),
    media_type VARCHAR(50) CHECK (media_type IN 
        ('magazine', 'blog', 'newspaper', 'tv', 'radio', 'podcast', 'social_media')),
    audience_size INTEGER,
    audience_demographics JSONB,
    coverage_regions TEXT[],
    fashion_categories TEXT[],
    content_types TEXT[],
    press_credentials JSONB,
    professional_associations TEXT[],
    events_covered INTEGER DEFAULT 0,
    articles_published INTEGER DEFAULT 0,
    total_reach INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2),
    publishing_frequency VARCHAR(50),
    lead_time_days INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vendor_profiles_user ON vendor_profiles(user_id);
CREATE INDEX idx_vendor_profiles_service ON vendor_profiles(primary_service);
CREATE INDEX idx_media_profiles_user ON media_profiles(user_id);
CREATE INDEX idx_media_profiles_type ON media_profiles(media_type);

-- ================================================
-- 3. EVENT JUNCTION TABLES
-- ================================================
CREATE TABLE IF NOT EXISTS event_venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    venue_id UUID REFERENCES venue_profiles(id) ON DELETE CASCADE,
    booking_status VARCHAR(50) DEFAULT 'inquiry' CHECK (booking_status IN 
        ('inquiry', 'negotiating', 'confirmed', 'cancelled')),
    booking_date DATE,
    setup_time TIME,
    event_time TIME,
    breakdown_time TIME,
    rental_cost DECIMAL(12,2),
    additional_services_cost DECIMAL(12,2),
    deposit_amount DECIMAL(12,2),
    deposit_paid BOOLEAN DEFAULT false,
    space_configuration TEXT,
    equipment_needed TEXT[],
    staff_needed INTEGER,
    special_requirements TEXT,
    contract_signed BOOLEAN DEFAULT false,
    contract_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, venue_id)
);

CREATE TABLE IF NOT EXISTS event_vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE CASCADE,
    service_type VARCHAR(100) CHECK (service_type IN 
        ('catering', 'photography', 'videography', 'lighting', 'sound', 
         'decoration', 'security', 'transportation', 'makeup', 'hair', 'other')),
    service_description TEXT,
    booking_status VARCHAR(50) DEFAULT 'inquiry' CHECK (booking_status IN 
        ('inquiry', 'proposal_sent', 'negotiating', 'confirmed', 'cancelled')),
    quoted_price DECIMAL(12,2),
    final_price DECIMAL(12,2),
    deposit_required DECIMAL(12,2),
    deposit_paid BOOLEAN DEFAULT false,
    setup_start TIMESTAMPTZ,
    service_start TIMESTAMPTZ,
    service_end TIMESTAMPTZ,
    breakdown_complete TIMESTAMPTZ,
    performance_rating INTEGER CHECK (performance_rating BETWEEN 1 AND 5),
    performance_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, vendor_id, service_type)
);

CREATE TABLE IF NOT EXISTS event_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    model_id UUID REFERENCES model_profiles(id) ON DELETE CASCADE,
    booking_status VARCHAR(50) DEFAULT 'invited' CHECK (booking_status IN 
        ('invited', 'interested', 'confirmed', 'contracted', 'cancelled')),
    model_role VARCHAR(50) CHECK (model_role IN 
        ('runway', 'photoshoot', 'fitting', 'campaign', 'lookbook')),
    outfit_count INTEGER DEFAULT 1,
    call_time TIMESTAMPTZ,
    rehearsal_time TIMESTAMPTZ,
    show_time TIMESTAMPTZ,
    wrap_time TIMESTAMPTZ,
    rate_type VARCHAR(20) CHECK (rate_type IN ('hourly', 'flat', 'per_look')),
    rate_amount DECIMAL(12,2),
    total_compensation DECIMAL(12,2),
    payment_status VARCHAR(20) DEFAULT 'pending',
    measurements_confirmed BOOLEAN DEFAULT false,
    fitting_completed BOOLEAN DEFAULT false,
    special_requirements TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, model_id)
);

CREATE TABLE IF NOT EXISTS event_sponsors_enhanced (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
    sponsorship_tier VARCHAR(50) CHECK (sponsorship_tier IN 
        ('title', 'platinum', 'gold', 'silver', 'bronze', 'supporter')),
    sponsorship_amount DECIMAL(12,2),
    benefits JSONB DEFAULT '{}',
    activation_type TEXT[],
    booth_location TEXT,
    branding_opportunities TEXT[],
    lead_goal INTEGER,
    leads_captured INTEGER DEFAULT 0,
    engagement_score INTEGER DEFAULT 0,
    roi_calculated DECIMAL(10,2),
    contract_status VARCHAR(50) DEFAULT 'negotiating',
    contract_signed_date DATE,
    payment_received BOOLEAN DEFAULT false,
    logo_received BOOLEAN DEFAULT false,
    marketing_materials_approved BOOLEAN DEFAULT false,
    booth_setup_confirmed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, sponsor_id)
);

-- Create indexes
CREATE INDEX idx_event_venues_event ON event_venues(event_id);
CREATE INDEX idx_event_venues_venue ON event_venues(venue_id);
CREATE INDEX idx_event_venues_status ON event_venues(booking_status);
CREATE INDEX idx_event_vendors_event ON event_vendors(event_id);
CREATE INDEX idx_event_vendors_vendor ON event_vendors(vendor_id);
CREATE INDEX idx_event_vendors_type ON event_vendors(service_type);
CREATE INDEX idx_event_models_event ON event_models(event_id);
CREATE INDEX idx_event_models_model ON event_models(model_id);
CREATE INDEX idx_event_models_status ON event_models(booking_status);
CREATE INDEX idx_event_sponsors_event ON event_sponsors_enhanced(event_id);
CREATE INDEX idx_event_sponsors_sponsor ON event_sponsors_enhanced(sponsor_id);
CREATE INDEX idx_event_sponsors_tier ON event_sponsors_enhanced(sponsorship_tier);

-- ================================================
-- 4. CRM TABLES
-- ================================================
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    website VARCHAR(255),
    account_type VARCHAR(50) CHECK (account_type IN 
        ('sponsor', 'vendor', 'venue', 'agency', 'brand', 'media')),
    industry VARCHAR(100),
    sub_industry VARCHAR(100),
    company_size VARCHAR(50) CHECK (company_size IN 
        ('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')),
    annual_revenue_range VARCHAR(50),
    headquarters_address TEXT,
    headquarters_city VARCHAR(100),
    headquarters_country VARCHAR(100),
    operating_regions TEXT[],
    account_status VARCHAR(50) DEFAULT 'prospect' CHECK (account_status IN 
        ('prospect', 'active', 'inactive', 'churned')),
    account_tier VARCHAR(20) CHECK (account_tier IN 
        ('strategic', 'enterprise', 'mid-market', 'small')),
    health_score INTEGER DEFAULT 50,
    total_revenue_generated DECIMAL(12,2) DEFAULT 0,
    outstanding_balance DECIMAL(12,2) DEFAULT 0,
    credit_limit DECIMAL(12,2),
    payment_terms VARCHAR(50),
    account_owner_id UUID REFERENCES users(id),
    account_team UUID[],
    first_contact_date DATE,
    became_customer_date DATE,
    renewal_date DATE,
    churn_date DATE,
    tags TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update contacts table to add account foreign key if it doesn't exist
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES accounts(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_name VARCHAR(255) NOT NULL,
    account_id UUID REFERENCES accounts(id),
    primary_contact_id UUID REFERENCES contacts(id),
    opportunity_type VARCHAR(50) CHECK (opportunity_type IN 
        ('sponsorship', 'venue_rental', 'vendor_service', 'partnership', 'advertising')),
    description TEXT,
    stage VARCHAR(50) DEFAULT 'prospecting' CHECK (stage IN 
        ('prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost')),
    probability_to_close INTEGER DEFAULT 10,
    amount DECIMAL(12,2),
    expected_close_date DATE,
    fiscal_period VARCHAR(20),
    competitors TEXT[],
    competitive_situation TEXT,
    closed_date DATE,
    win_loss_reason VARCHAR(100),
    win_loss_notes TEXT,
    owner_id UUID REFERENCES users(id),
    created_by UUID REFERENCES users(id),
    lead_source VARCHAR(100),
    campaign_id UUID,
    next_step TEXT,
    next_step_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES contacts(id),
    account_id UUID REFERENCES accounts(id),
    opportunity_id UUID REFERENCES opportunities(id),
    event_id UUID REFERENCES events(id),
    interaction_type VARCHAR(50) CHECK (interaction_type IN 
        ('email', 'phone', 'meeting', 'event', 'social_media', 'note')),
    direction VARCHAR(10) CHECK (direction IN ('inbound', 'outbound')),
    subject VARCHAR(255),
    description TEXT,
    interaction_date TIMESTAMPTZ DEFAULT NOW(),
    duration_minutes INTEGER,
    outcome VARCHAR(100),
    sentiment VARCHAR(20) CHECK (sentiment IN 
        ('positive', 'neutral', 'negative')),
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_date DATE,
    follow_up_notes TEXT,
    created_by UUID REFERENCES users(id),
    attendees UUID[],
    attachments JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lead_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name VARCHAR(100) NOT NULL UNIQUE,
    source_type VARCHAR(50) CHECK (source_type IN 
        ('organic', 'paid', 'social', 'referral', 'event', 'partner')),
    source_channel VARCHAR(100),
    campaign_name VARCHAR(255),
    campaign_start_date DATE,
    campaign_end_date DATE,
    campaign_budget DECIMAL(12,2),
    total_leads INTEGER DEFAULT 0,
    qualified_leads INTEGER DEFAULT 0,
    opportunities_created INTEGER DEFAULT 0,
    deals_won INTEGER DEFAULT 0,
    cost_per_lead DECIMAL(10,2),
    revenue_generated DECIMAL(12,2),
    roi_percentage DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lead_scoring_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES contacts(id),
    score INTEGER NOT NULL,
    previous_score INTEGER,
    score_change INTEGER,
    demographic_score INTEGER DEFAULT 0,
    firmographic_score INTEGER DEFAULT 0,
    behavioral_score INTEGER DEFAULT 0,
    engagement_score INTEGER DEFAULT 0,
    scoring_factors JSONB,
    score_reason TEXT,
    scored_at TIMESTAMPTZ DEFAULT NOW(),
    scored_by VARCHAR(50) DEFAULT 'system'
);

-- Create CRM indexes
CREATE INDEX idx_accounts_name ON accounts(company_name);
CREATE INDEX idx_accounts_type ON accounts(account_type);
CREATE INDEX idx_accounts_status ON accounts(account_status);
CREATE INDEX idx_accounts_owner ON accounts(account_owner_id);
CREATE INDEX idx_opportunities_account ON opportunities(account_id);
CREATE INDEX idx_opportunities_contact ON opportunities(primary_contact_id);
CREATE INDEX idx_opportunities_stage ON opportunities(stage);
CREATE INDEX idx_opportunities_owner ON opportunities(owner_id);
CREATE INDEX idx_opportunities_close_date ON opportunities(expected_close_date);
CREATE INDEX idx_interactions_contact ON interactions(contact_id);
CREATE INDEX idx_interactions_account ON interactions(account_id);
CREATE INDEX idx_interactions_date ON interactions(interaction_date);
CREATE INDEX idx_interactions_type ON interactions(interaction_type);
CREATE INDEX idx_lead_sources_active ON lead_sources(is_active);
CREATE INDEX idx_lead_scoring_contact ON lead_scoring_history(contact_id);
CREATE INDEX idx_lead_scoring_date ON lead_scoring_history(scored_at);

-- ================================================
-- 5. AUDIT LOG TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(100),
    record_id UUID,
    action VARCHAR(20) CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    user_id UUID,
    changes JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================
-- 6. RLS POLICIES
-- ================================================
-- Enable RLS on all tables
ALTER TABLE event_planning ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_sponsors_enhanced ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_scoring_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "event_planning_access" ON event_planning
    FOR ALL USING (
        auth.uid() IN (
            lead_organizer_id,
            venue_coordinator_id,
            vendor_manager_id,
            model_coordinator_id,
            sponsor_manager_id
        ) OR
        auth.uid() IN (
            SELECT user_id FROM users 
            WHERE user_type IN ('admin', 'super_admin')
        )
    );

CREATE POLICY "event_venues_access" ON event_venues
    FOR ALL USING (
        auth.uid() IN (
            SELECT vp.user_id FROM venue_profiles vp 
            WHERE vp.id = venue_id
        ) OR
        auth.uid() IN (
            SELECT ep.lead_organizer_id FROM event_planning ep 
            WHERE ep.event_id = event_id
        ) OR
        auth.uid() IN (
            SELECT user_id FROM users 
            WHERE user_type IN ('admin', 'super_admin')
        )
    );

CREATE POLICY "vendor_profiles_own" ON vendor_profiles
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "event_vendors_access" ON event_vendors
    FOR ALL USING (
        vendor_id IN (
            SELECT id FROM vendor_profiles WHERE user_id = auth.uid()
        ) OR
        auth.uid() IN (
            SELECT ep.lead_organizer_id FROM event_planning ep 
            WHERE ep.event_id = event_id
        )
    );

CREATE POLICY "event_models_access" ON event_models
    FOR ALL USING (
        auth.uid() IN (
            SELECT mp.user_id FROM model_profiles mp 
            WHERE mp.id = model_id
        ) OR
        auth.uid() IN (
            SELECT ep.model_coordinator_id FROM event_planning ep 
            WHERE ep.event_id = event_id
        )
    );

CREATE POLICY "media_profiles_own" ON media_profiles
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "accounts_team_access" ON accounts
    FOR ALL USING (
        account_owner_id = auth.uid() OR
        auth.uid() = ANY(account_team) OR
        auth.uid() IN (
            SELECT user_id FROM users 
            WHERE user_type IN ('admin', 'super_admin', 'organizer')
        )
    );

CREATE POLICY "opportunities_owner_access" ON opportunities
    FOR ALL USING (
        owner_id = auth.uid() OR
        created_by = auth.uid() OR
        auth.uid() IN (
            SELECT account_owner_id FROM accounts 
            WHERE id = account_id
        )
    );

CREATE POLICY "interactions_creator_access" ON interactions
    FOR ALL USING (
        created_by = auth.uid() OR
        auth.uid() = ANY(attendees) OR
        auth.uid() IN (
            SELECT assigned_to FROM contacts 
            WHERE id = contact_id
        )
    );

CREATE POLICY "lead_sources_read_all" ON lead_sources
    FOR SELECT USING (true);

CREATE POLICY "lead_scoring_view_own" ON lead_scoring_history
    FOR SELECT USING (
        contact_id IN (
            SELECT id FROM contacts WHERE assigned_to = auth.uid()
        )
    );

CREATE POLICY "audit_logs_admin_only" ON audit_logs
    FOR ALL USING (
        auth.uid() IN (
            SELECT user_id FROM users 
            WHERE user_type IN ('admin', 'super_admin')
        )
    );

-- ================================================
-- 7. TRIGGERS
-- ================================================
-- Update timestamp function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply timestamp triggers
CREATE TRIGGER update_event_planning_timestamp 
    BEFORE UPDATE ON event_planning
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_event_venues_timestamp 
    BEFORE UPDATE ON event_venues
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_event_vendors_timestamp 
    BEFORE UPDATE ON event_vendors
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_event_models_timestamp 
    BEFORE UPDATE ON event_models
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_event_sponsors_enhanced_timestamp 
    BEFORE UPDATE ON event_sponsors_enhanced
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_vendor_profiles_timestamp 
    BEFORE UPDATE ON vendor_profiles
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_media_profiles_timestamp 
    BEFORE UPDATE ON media_profiles
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_accounts_timestamp 
    BEFORE UPDATE ON accounts
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_opportunities_timestamp 
    BEFORE UPDATE ON opportunities
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_lead_sources_timestamp 
    BEFORE UPDATE ON lead_sources
    FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Lead scoring trigger
CREATE OR REPLACE FUNCTION update_lead_score()
RETURNS TRIGGER AS $$
DECLARE
    new_score INTEGER := 0;
    old_score INTEGER;
BEGIN
    SELECT lead_score INTO old_score FROM contacts WHERE id = NEW.contact_id;
    new_score := COALESCE(old_score, 0);
    
    IF NEW.sentiment = 'positive' THEN
        new_score := new_score + 10;
    ELSIF NEW.sentiment = 'negative' THEN
        new_score := new_score - 5;
    END IF;
    
    CASE NEW.interaction_type
        WHEN 'meeting' THEN new_score := new_score + 15;
        WHEN 'phone' THEN new_score := new_score + 10;
        WHEN 'email' THEN new_score := new_score + 5;
        ELSE new_score := new_score + 2;
    END CASE;
    
    UPDATE contacts 
    SET lead_score = new_score,
        last_interaction_date = NEW.interaction_date,
        interaction_count = interaction_count + 1
    WHERE id = NEW.contact_id;
    
    INSERT INTO lead_scoring_history 
        (contact_id, score, previous_score, score_change, behavioral_score)
    VALUES 
        (NEW.contact_id, new_score, old_score, new_score - COALESCE(old_score, 0), 
         new_score - COALESCE(old_score, 0));
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_lead_score 
    AFTER INSERT ON interactions
    FOR EACH ROW EXECUTE FUNCTION update_lead_score();

-- ================================================
-- 8. SAMPLE DATA
-- ================================================
-- Create test event planning data
INSERT INTO event_planning (
    event_id,
    planning_status,
    planning_start_date,
    lead_organizer_id,
    total_budget,
    venues_needed,
    vendors_needed,
    models_needed,
    sponsors_target
) 
SELECT 
    e.id,
    'venue_selection',
    CURRENT_DATE,
    (SELECT id FROM users WHERE user_type = 'organizer' LIMIT 1),
    100000,
    1,
    5,
    10,
    3
FROM events e
WHERE NOT EXISTS (
    SELECT 1 FROM event_planning ep WHERE ep.event_id = e.id
)
LIMIT 1;

-- Create vendor profiles for vendor users
INSERT INTO vendor_profiles (
    user_id,
    business_name,
    business_type,
    primary_service,
    service_categories,
    team_size,
    pricing_structure
)
SELECT 
    u.id,
    'Creative ' || COALESCE(u.raw_user_meta_data->>'full_name', 'Vendor') || ' Services',
    'Event Services',
    'photography',
    ARRAY['photography', 'videography'],
    5,
    '{"hourly": 250, "daily": 1500, "event": 2500}'::jsonb
FROM users u
WHERE u.user_type = 'vendor'
AND NOT EXISTS (
    SELECT 1 FROM vendor_profiles vp WHERE vp.user_id = u.id
);

-- Create media profiles
INSERT INTO media_profiles (
    user_id,
    media_name,
    media_type,
    audience_size,
    fashion_categories,
    content_types
)
SELECT 
    u.id,
    COALESCE(u.raw_user_meta_data->>'full_name', 'Media') || ' Media',
    'blog',
    50000,
    ARRAY['runway', 'streetwear', 'luxury'],
    ARRAY['reviews', 'interviews', 'photography']
FROM users u
WHERE u.user_type = 'media'
AND NOT EXISTS (
    SELECT 1 FROM media_profiles mp WHERE mp.user_id = u.id
);

-- Create test accounts
INSERT INTO accounts (
    company_name,
    account_type,
    industry,
    company_size,
    account_status,
    account_owner_id
) VALUES 
('Fashion House Inc', 'sponsor', 'Fashion & Luxury', '51-200', 'active', 
    (SELECT id FROM users WHERE user_type = 'organizer' LIMIT 1)),
('Style Agency LLC', 'agency', 'Marketing & PR', '11-50', 'prospect',
    (SELECT id FROM users WHERE user_type = 'organizer' LIMIT 1)),
('Glamour Media Group', 'media', 'Publishing', '201-500', 'active',
    (SELECT id FROM users WHERE user_type = 'organizer' LIMIT 1))
ON CONFLICT (company_name) DO NOTHING;

-- Create test contacts
INSERT INTO contacts (
    first_name,
    last_name,
    email,
    title,
    account_id,
    contact_type,
    influence_level,
    lead_status,
    assigned_to
)
SELECT 
    'Jane',
    'Smith',
    'jane@' || LOWER(REPLACE(a.company_name, ' ', '')) || '.com',
    'Marketing Director',
    a.id,
    'sponsor',
    'decision_maker',
    'qualified',
    a.account_owner_id
FROM accounts a
WHERE NOT EXISTS (
    SELECT 1 FROM contacts c WHERE c.account_id = a.id AND c.first_name = 'Jane'
)
LIMIT 3;

-- Create test opportunities
INSERT INTO opportunities (
    opportunity_name,
    account_id,
    primary_contact_id,
    opportunity_type,
    stage,
    amount,
    expected_close_date,
    owner_id
)
SELECT 
    'Fashion Week 2025 - ' || a.company_name,
    a.id,
    c.id,
    'sponsorship',
    'proposal',
    50000,
    CURRENT_DATE + INTERVAL '60 days',
    a.account_owner_id
FROM accounts a
JOIN contacts c ON c.account_id = a.id
WHERE NOT EXISTS (
    SELECT 1 FROM opportunities o WHERE o.account_id = a.id
)
LIMIT 3;

-- Create venue booking
INSERT INTO event_venues (
    event_id,
    venue_id,
    booking_status,
    booking_date,
    rental_cost,
    deposit_amount
)
SELECT 
    ep.event_id,
    vp.id,
    'confirmed',
    CURRENT_DATE + INTERVAL '30 days',
    15000,
    3000
FROM event_planning ep
CROSS JOIN venue_profiles vp
WHERE NOT EXISTS (
    SELECT 1 FROM event_venues ev 
    WHERE ev.event_id = ep.event_id AND ev.venue_id = vp.id
)
LIMIT 1;

-- ================================================
-- 9. VERIFICATION QUERIES
-- ================================================
-- Check all tables are created
SELECT 
    'Event Planning' as category,
    COUNT(*) FILTER (WHERE table_name = 'event_planning') as event_planning,
    COUNT(*) FILTER (WHERE table_name = 'event_venues') as event_venues,
    COUNT(*) FILTER (WHERE table_name = 'event_vendors') as event_vendors,
    COUNT(*) FILTER (WHERE table_name = 'event_models') as event_models,
    COUNT(*) FILTER (WHERE table_name = 'event_sponsors_enhanced') as event_sponsors_enhanced
FROM information_schema.tables 
WHERE table_schema = 'public';

SELECT 
    'CRM Tables' as category,
    COUNT(*) FILTER (WHERE table_name = 'accounts') as accounts,
    COUNT(*) FILTER (WHERE table_name = 'opportunities') as opportunities,
    COUNT(*) FILTER (WHERE table_name = 'interactions') as interactions,
    COUNT(*) FILTER (WHERE table_name = 'lead_sources') as lead_sources,
    COUNT(*) FILTER (WHERE table_name = 'lead_scoring_history') as lead_scoring_history
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Show record counts
SELECT 'Record Counts:' as info;
SELECT 'event_planning' as table_name, COUNT(*) as count FROM event_planning
UNION ALL
SELECT 'vendor_profiles', COUNT(*) FROM vendor_profiles
UNION ALL
SELECT 'media_profiles', COUNT(*) FROM media_profiles
UNION ALL
SELECT 'accounts', COUNT(*) FROM accounts
UNION ALL
SELECT 'contacts', COUNT(*) FROM contacts
UNION ALL
SELECT 'opportunities', COUNT(*) FROM opportunities
ORDER BY table_name;