-- Migration: Verification Queries
-- Description: Queries to verify successful implementation

-- 1. Check all tables are created
SELECT 'Tables Created' as check_type, COUNT(*) as count 
FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN (
    'event_planning', 'event_venues', 'event_vendors', 'event_models', 
    'event_sponsors_enhanced', 'vendor_profiles', 'media_profiles',
    'contacts', 'accounts', 'opportunities', 'interactions', 
    'lead_sources', 'lead_scoring_history', 'audit_logs'
);

-- 2. Check RLS is enabled
SELECT 'RLS Enabled' as check_type, COUNT(*) as count
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true
AND tablename IN (
    'event_planning', 'event_venues', 'event_vendors', 'event_models',
    'event_sponsors_enhanced', 'vendor_profiles', 'media_profiles',
    'contacts', 'accounts', 'opportunities', 'interactions'
);

-- 3. Check triggers are created
SELECT 'Triggers Created' as check_type, COUNT(*) as count
FROM information_schema.triggers 
WHERE trigger_schema = 'public'
AND event_object_table IN (
    'event_planning', 'event_venues', 'event_vendors', 'event_models',
    'contacts', 'accounts', 'opportunities', 'interactions'
);

-- 4. Check indexes are created
SELECT 'Indexes Created' as check_type, COUNT(*) as count
FROM pg_indexes 
WHERE schemaname = 'public'
AND tablename IN (
    'event_planning', 'event_venues', 'event_vendors', 'event_models',
    'contacts', 'accounts', 'opportunities', 'interactions'
);

-- 5. Test event planning connections
SELECT 
    'Event Connections' as check_type,
    COUNT(DISTINCT ep.id) as planning_records,
    COUNT(DISTINCT ev.id) as venue_bookings,
    COUNT(DISTINCT em.id) as model_bookings
FROM event_planning ep
LEFT JOIN event_venues ev ON ep.event_id = ev.event_id
LEFT JOIN event_models em ON ep.event_id = em.event_id;

-- 6. Test CRM data flow
SELECT 
    'CRM Data Flow' as check_type,
    COUNT(DISTINCT a.id) as accounts,
    COUNT(DISTINCT c.id) as contacts,
    COUNT(DISTINCT o.id) as opportunities
FROM accounts a
LEFT JOIN contacts c ON a.id = c.account_id
LEFT JOIN opportunities o ON a.id = o.account_id;

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'Verification complete - check results above';
END $$;