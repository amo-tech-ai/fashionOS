-- Corrected RLS Security Policies for FashionOS
-- Based on actual table schema

-- 1. Accounts Table - CRM account management (corrected column names)
DROP POLICY IF EXISTS "Users can manage assigned accounts" ON accounts;
CREATE POLICY "Users can manage assigned accounts" ON accounts
    FOR ALL USING (
        auth.uid() = account_owner_id OR
        auth.uid() = ANY(account_team)
    );

-- 2. Opportunities Table - Sales pipeline security (corrected column names)
DROP POLICY IF EXISTS "Users can manage assigned opportunities" ON opportunities;
CREATE POLICY "Users can manage assigned opportunities" ON opportunities
    FOR ALL USING (
        auth.uid() = owner_id OR 
        auth.uid() = created_by OR
        auth.uid() IN (
            SELECT account_owner_id FROM accounts WHERE accounts.id = opportunities.account_id
        )
    );

-- 3. Interactions Table - Communication history (corrected column names)
DROP POLICY IF EXISTS "Users can view relevant interactions" ON interactions;
CREATE POLICY "Users can view relevant interactions" ON interactions
    FOR ALL USING (
        auth.uid() = created_by OR
        auth.uid() = ANY(attendees) OR
        auth.uid() IN (
            SELECT account_owner_id FROM accounts WHERE accounts.id = interactions.account_id
        )
    );

-- 4. Create basic policies for remaining tables without complex ownership
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own audit entries" ON audit_logs;
CREATE POLICY "Users can view own audit entries" ON audit_logs
    FOR SELECT USING (auth.uid()::text = user_id);

-- 5. Add public read access for vendor profiles  
DROP POLICY IF EXISTS "Public can view vendor profiles" ON vendor_profiles;
CREATE POLICY "Public can view vendor profiles" ON vendor_profiles
    FOR SELECT USING (true); -- Allow public read access

-- 6. Add public read access for media profiles
DROP POLICY IF EXISTS "Public can view media profiles" ON media_profiles;  
CREATE POLICY "Public can view media profiles" ON media_profiles
    FOR SELECT USING (true); -- Allow public read access

-- Verify all RLS policies are now in place
SELECT 
    tablename,
    rowsecurity as rls_enabled,
    (SELECT count(*) FROM pg_policies WHERE tablename = t.tablename) as policy_count
FROM pg_tables t
WHERE schemaname = 'public' 
AND tablename IN (
    'accounts', 'opportunities', 'interactions', 'audit_logs',
    'vendor_profiles', 'media_profiles', 'event_planning',
    'event_vendors', 'event_models'
)
ORDER BY tablename;
