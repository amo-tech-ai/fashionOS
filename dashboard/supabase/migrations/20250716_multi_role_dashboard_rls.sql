-- RLS Policies for Multi-Role Dashboard Tables
-- This ensures proper data isolation and security

-- ============================================
-- 1. ENABLE RLS ON NEW TABLES
-- ============================================

ALTER TABLE designer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_analytics_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_health_metrics ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. PROFILE TABLE POLICIES
-- ============================================

-- Designer profiles: Users can only access their own profile
CREATE POLICY "designer_own_profile" ON designer_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "designer_profile_public_read" ON designer_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = designer_profiles.user_id 
      AND users.is_verified = true
    )
  );

-- Model profiles: Own profile full access, others can view basic info
CREATE POLICY "model_own_profile" ON model_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "model_profile_public_read" ON model_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = model_profiles.user_id 
      AND users.is_verified = true
    )
  );

-- Venue profiles: Own profile management
CREATE POLICY "venue_own_profile" ON venue_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "venue_profile_public_read" ON venue_profiles
  FOR SELECT USING (true); -- Venues are public

-- Vendor profiles: Own profile management
CREATE POLICY "vendor_own_profile" ON vendor_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "vendor_profile_event_read" ON vendor_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM event_vendors ev
      JOIN events e ON ev.event_id = e.id
      WHERE ev.vendor_id = vendor_profiles.user_id
      AND (e.organizer_id = auth.uid() OR e.status = 'published')
    )
  );

-- Media profiles: Public read for accredited media
CREATE POLICY "media_own_profile" ON media_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "media_profile_public_read" ON media_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = media_profiles.user_id 
      AND users.is_verified = true
    )
  );

-- Organizer profiles: Own profile management
CREATE POLICY "organizer_own_profile" ON organizer_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "organizer_profile_sponsor_read" ON organizer_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM event_sponsors es
      JOIN events e ON es.event_id = e.id
      WHERE e.organizer_id = organizer_profiles.user_id
      AND es.sponsor_id = auth.uid()
    )
  );

-- ============================================
-- 3. DASHBOARD DATA POLICIES
-- ============================================

-- Dashboard preferences: Users manage their own
CREATE POLICY "own_dashboard_preferences" ON dashboard_preferences
  FOR ALL USING (auth.uid() = user_id);

-- Analytics cache: Users access their own cached data
CREATE POLICY "own_analytics_cache" ON dashboard_analytics_cache
  FOR ALL USING (auth.uid() = user_id);

-- Activity log: Users can view their own activity
CREATE POLICY "own_activity_log_read" ON user_activity_log
  FOR SELECT USING (auth.uid() = user_id);

-- Activity log: System can insert for any user (using service role)
CREATE POLICY "system_activity_log_insert" ON user_activity_log
  FOR INSERT WITH CHECK (true);

-- System health: Admins only
CREATE POLICY "admin_system_health" ON system_health_metrics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type IN ('admin', 'super_admin')
    )
  );

-- ============================================
-- 4. ENHANCED EVENT ACCESS POLICIES
-- ============================================

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "role_based_event_access" ON events;

-- Create comprehensive role-based event access
CREATE POLICY "role_based_event_access" ON events
  FOR SELECT USING (
    CASE 
      -- Admins see everything
      WHEN EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.user_type IN ('super_admin', 'admin')
      ) THEN true
      
      -- Organizers see their own events
      WHEN organizer_id = auth.uid() THEN true
      
      -- Sponsors see events they sponsor
      WHEN EXISTS (
        SELECT 1 FROM event_sponsors 
        WHERE event_id = events.id 
        AND sponsor_id = auth.uid()
      ) THEN true
      
      -- Designers/Models see events they participate in
      WHEN EXISTS (
        SELECT 1 FROM event_participants 
        WHERE event_id = events.id 
        AND participant_id = auth.uid()
      ) THEN true
      
      -- Venues see events at their venue
      WHEN EXISTS (
        SELECT 1 FROM venues v
        JOIN users u ON v.manager_id = u.id
        WHERE v.id = events.venue_id 
        AND u.id = auth.uid()
      ) THEN true
      
      -- Vendors see events they service
      WHEN EXISTS (
        SELECT 1 FROM event_vendors 
        WHERE event_id = events.id 
        AND vendor_id = auth.uid()
      ) THEN true
      
      -- Media sees published events or events they're accredited for
      WHEN EXISTS (
        SELECT 1 FROM users 
        WHERE users.id = auth.uid() 
        AND users.user_type = 'media'
      ) AND (
        events.status = 'published' OR
        EXISTS (
          SELECT 1 FROM event_media_accreditation 
          WHERE event_id = events.id 
          AND media_id = auth.uid()
        )
      ) THEN true
      
      -- Everyone else sees only published events
      ELSE events.status = 'published'
    END
  );

-- Event modification policies
CREATE POLICY "organizer_modify_own_events" ON events
  FOR UPDATE USING (
    organizer_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type IN ('super_admin', 'admin')
    )
  );

CREATE POLICY "admin_delete_events" ON events
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type IN ('super_admin', 'admin')
    )
  );

-- ============================================
-- 5. SPONSOR DATA ACCESS
-- ============================================

-- Sponsors can see their own data and aggregated metrics
CREATE POLICY "sponsor_own_data" ON sponsors
  FOR SELECT USING (
    id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.user_type IN ('super_admin', 'admin')
    )
  );

CREATE POLICY "sponsor_update_own" ON sponsors
  FOR UPDATE USING (
    id = auth.uid() OR
    primary_contact_id = auth.uid()
  );

-- ============================================
-- 6. CREATE HELPER FUNCTIONS FOR RLS
-- ============================================

-- Function to check if user has access to event
CREATE OR REPLACE FUNCTION user_has_event_access(event_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM events e
    LEFT JOIN users u ON u.id = user_uuid
    WHERE e.id = event_uuid
    AND (
      -- Admin access
      u.user_type IN ('super_admin', 'admin') OR
      -- Organizer access
      e.organizer_id = user_uuid OR
      -- Sponsor access
      EXISTS (
        SELECT 1 FROM event_sponsors 
        WHERE event_id = event_uuid AND sponsor_id = user_uuid
      ) OR
      -- Participant access
      EXISTS (
        SELECT 1 FROM event_participants 
        WHERE event_id = event_uuid AND participant_id = user_uuid
      ) OR
      -- Public event
      e.status = 'published'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION user_has_event_access TO authenticated;
