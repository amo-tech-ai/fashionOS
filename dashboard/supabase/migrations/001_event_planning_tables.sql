-- Migration: Create Event Planning Tables
-- Description: Core event planning infrastructure with relationships

-- 1. Create comprehensive event planning table
CREATE TABLE IF NOT EXISTS event_planning (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    
    -- Planning phases
    planning_status VARCHAR(50) DEFAULT 'initial' CHECK (planning_status IN 
        ('initial', 'venue_selection', 'vendor_booking', 'model_casting', 
         'sponsor_outreach', 'marketing_prep', 'final_prep', 'completed')),
    
    -- Key dates
    planning_start_date DATE,
    venue_deadline DATE,
    vendor_deadline DATE,
    model_deadline DATE,
    marketing_deadline DATE,
    
    -- Team assignments
    lead_organizer_id UUID REFERENCES users(id),
    venue_coordinator_id UUID REFERENCES users(id),
    vendor_manager_id UUID REFERENCES users(id),
    model_coordinator_id UUID REFERENCES users(id),
    sponsor_manager_id UUID REFERENCES users(id),
    
    -- Planning metrics
    total_budget DECIMAL(12,2),
    allocated_budget DECIMAL(12,2),
    venue_budget DECIMAL(12,2),
    vendor_budget DECIMAL(12,2),
    model_budget DECIMAL(12,2),
    marketing_budget DECIMAL(12,2),
    
    -- Status tracking
    venues_confirmed INTEGER DEFAULT 0,
    venues_needed INTEGER DEFAULT 1,
    vendors_confirmed INTEGER DEFAULT 0,
    vendors_needed INTEGER DEFAULT 0,
    models_confirmed INTEGER DEFAULT 0,
    models_needed INTEGER DEFAULT 0,
    sponsors_confirmed INTEGER DEFAULT 0,
    sponsors_target INTEGER DEFAULT 0,
    
    -- Additional planning data
    planning_notes TEXT,
    risk_factors JSONB,
    contingency_plans JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_event_planning_event_id ON event_planning(event_id);
CREATE INDEX idx_event_planning_status ON event_planning(planning_status);
CREATE INDEX idx_event_planning_organizer ON event_planning(lead_organizer_id);

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'Event planning table created successfully';
END $$;
