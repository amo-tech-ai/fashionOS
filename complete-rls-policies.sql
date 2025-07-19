-- Complete RLS Security Policies for FashionOS
-- Execute this in Supabase SQL Editor or via psql

-- 1. Event Planning Table - Team coordination security
ALTER TABLE event_planning ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Team members can manage planning" ON event_planning;
CREATE POLICY "Team members can manage planning" ON event_planning
    FOR ALL USING (
        auth.uid() IN (
            lead_organizer_id, 
            venue_coordinator_id, 
            vendor_manager_id, 
            model_coordinator_id, 
            sponsor_manager_id
        )
    );

-- 2. Accounts Table - CRM account management
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage assigned accounts" ON accounts;
CREATE POLICY "Users can manage assigned accounts" ON accounts
    FOR ALL USING (
        auth.uid() = created_by OR 
        auth.uid() = owner_id OR
        auth.uid() IN (
            SELECT user_id FROM team WHERE account_id = accounts.id
        )
    );

-- 3. Opportunities Table - Sales pipeline security  
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage assigned opportunities" ON opportunities;
CREATE POLICY "Users can manage assigned opportunities" ON opportunities
    FOR ALL USING (
        auth.uid() = assigned_to OR 
        auth.uid() = created_by OR
        auth.uid() IN (
            SELECT owner_id FROM accounts WHERE accounts.id = opportunities.account_id
        )
    );

-- 4. Interactions Table - Communication history
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view relevant interactions" ON interactions;
CREATE POLICY "Users can view relevant interactions" ON interactions
    FOR ALL USING (
        auth.uid() = created_by OR
        auth.uid() IN (
            SELECT owner_id FROM accounts WHERE accounts.id = interactions.account_id
        )
    );

-- 5. Audit Log Table - System audit trail (admin only)
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view audit logs" ON audit_log;
CREATE POLICY "Admins can view audit logs" ON audit_log
    FOR SELECT USING (
        auth.jwt() ->> 'role' = 'admin' OR
        auth.uid() = user_id
    );

-- 6. Event Vendors Table - Vendor-event relationships
ALTER TABLE event_vendors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Event organizers and vendors can manage" ON event_vendors;
CREATE POLICY "Event organizers and vendors can manage" ON event_vendors
    FOR ALL USING (
        auth.uid() IN (
            SELECT organizer_id FROM events WHERE events.id = event_vendors.event_id
        ) OR
        auth.uid() IN (
            SELECT user_id FROM vendor_profiles WHERE vendor_profiles.id = event_vendors.vendor_id
        )
    );

-- 7. Event Models Table - Model-event relationships
ALTER TABLE event_models ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Event organizers and models can manage" ON event_models;
CREATE POLICY "Event organizers and models can manage" ON event_models
    FOR ALL USING (
        auth.uid() IN (
            SELECT organizer_id FROM events WHERE events.id = event_models.event_id
        ) OR
        auth.uid() IN (
            SELECT user_id FROM model_profiles WHERE model_profiles.id = event_models.model_id
        )
    );

-- 8. Vendor Profiles Table - Vendor portfolio management
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Vendors can manage own profiles" ON vendor_profiles;
CREATE POLICY "Vendors can manage own profiles" ON vendor_profiles
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can view vendor profiles" ON vendor_profiles;
CREATE POLICY "Public can view vendor profiles" ON vendor_profiles
    FOR SELECT USING (is_active = true);

-- 9. Media Profiles Table - Media portfolio management  
ALTER TABLE media_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Media can manage own profiles" ON media_profiles;
CREATE POLICY "Media can manage own profiles" ON media_profiles
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can view media profiles" ON media_profiles;
CREATE POLICY "Public can view media profiles" ON media_profiles
    FOR SELECT USING (is_active = true);

-- Verify RLS is now enabled on all critical tables
SELECT 
    tablename,
    rowsecurity as rls_enabled,
    (SELECT count(*) FROM pg_policies WHERE tablename = t.tablename) as policy_count
FROM pg_tables t
WHERE schemaname = 'public' 
AND tablename IN (
    'event_planning', 'accounts', 'opportunities', 'interactions', 
    'audit_log', 'event_vendors', 'event_models', 'vendor_profiles', 'media_profiles'
)
ORDER BY tablename;
