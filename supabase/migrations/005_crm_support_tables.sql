-- Migration: Create CRM Support Tables
-- Description: Interactions, Lead Sources, and Lead Scoring

-- 1. Interactions table (activity tracking)
CREATE TABLE IF NOT EXISTS interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Related entities
    contact_id UUID REFERENCES contacts(id),
    account_id UUID REFERENCES accounts(id),
    opportunity_id UUID REFERENCES opportunities(id),
    event_id UUID REFERENCES events(id),
    
    -- Interaction details
    interaction_type VARCHAR(50) CHECK (interaction_type IN 
        ('email', 'phone', 'meeting', 'event', 'social_media', 'note')),
    direction VARCHAR(10) CHECK (direction IN ('inbound', 'outbound')),
    
    -- Content
    subject VARCHAR(255),
    description TEXT,
    
    -- Timing
    interaction_date TIMESTAMPTZ DEFAULT NOW(),
    duration_minutes INTEGER,
    
    -- Outcome
    outcome VARCHAR(100),
    sentiment VARCHAR(20) CHECK (sentiment IN 
        ('positive', 'neutral', 'negative')),    
    -- Follow-up
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_date DATE,
    follow_up_notes TEXT,
    
    -- Metadata
    created_by UUID REFERENCES users(id),
    attendees UUID[], -- Array of user IDs
    attachments JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_interactions_contact ON interactions(contact_id);
CREATE INDEX idx_interactions_account ON interactions(account_id);
CREATE INDEX idx_interactions_date ON interactions(interaction_date);
CREATE INDEX idx_interactions_type ON interactions(interaction_type);

-- 2. Lead sources table
CREATE TABLE IF NOT EXISTS lead_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Source information
    source_name VARCHAR(100) NOT NULL UNIQUE,
    source_type VARCHAR(50) CHECK (source_type IN 
        ('organic', 'paid', 'social', 'referral', 'event', 'partner')),
    source_channel VARCHAR(100),    
    -- Campaign association
    campaign_name VARCHAR(255),
    campaign_start_date DATE,
    campaign_end_date DATE,
    campaign_budget DECIMAL(12,2),
    
    -- Performance metrics
    total_leads INTEGER DEFAULT 0,
    qualified_leads INTEGER DEFAULT 0,
    opportunities_created INTEGER DEFAULT 0,
    deals_won INTEGER DEFAULT 0,
    
    -- Financial metrics
    cost_per_lead DECIMAL(10,2),
    revenue_generated DECIMAL(12,2),
    roi_percentage DECIMAL(10,2),
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_lead_sources_active ON lead_sources(is_active);

-- 3. Lead scoring history
CREATE TABLE IF NOT EXISTS lead_scoring_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),    
    -- Lead reference
    contact_id UUID REFERENCES contacts(id),
    
    -- Score details
    score INTEGER NOT NULL,
    previous_score INTEGER,
    score_change INTEGER,
    
    -- Scoring factors
    demographic_score INTEGER DEFAULT 0,
    firmographic_score INTEGER DEFAULT 0,
    behavioral_score INTEGER DEFAULT 0,
    engagement_score INTEGER DEFAULT 0,
    
    -- Reasoning
    scoring_factors JSONB,
    score_reason TEXT,
    
    -- Metadata
    scored_at TIMESTAMPTZ DEFAULT NOW(),
    scored_by VARCHAR(50) DEFAULT 'system' -- 'system' or 'manual'
);

-- Create indexes
CREATE INDEX idx_lead_scoring_contact ON lead_scoring_history(contact_id);
CREATE INDEX idx_lead_scoring_date ON lead_scoring_history(scored_at);

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'CRM support tables created successfully';
END $$;