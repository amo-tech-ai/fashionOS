-- Migration: RLS Policies
-- Description: Row Level Security for all tables

-- Enable RLS on all new tables
ALTER TABLE event_planning ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_sponsors_enhanced ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- Event planning access policies
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
-- Event venues access (venue managers can see their bookings)
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

-- Vendor access to their bookings
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
-- Model access to their bookings
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

-- Media profiles access
CREATE POLICY "media_profiles_own" ON media_profiles
    FOR ALL USING (user_id = auth.uid());

-- CRM access policies (sales team based)
CREATE POLICY "contacts_team_access" ON contacts
    FOR ALL USING (
        assigned_to = auth.uid() OR
        created_by = auth.uid() OR
        auth.uid() IN (
            SELECT user_id FROM users 
            WHERE user_type IN ('admin', 'super_admin', 'organizer')
        )
    );

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

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'RLS policies created successfully';
END $$;