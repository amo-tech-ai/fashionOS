-- Migration: Triggers and Audit
-- Description: Automated triggers for timestamps and auditing

-- 1. Create audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(100),
    record_id UUID,
    action VARCHAR(20) CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    user_id UUID,
    changes JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Generic audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (table_name, record_id, action, user_id, changes)
    VALUES (
        TG_TABLE_NAME,
        CASE 
            WHEN TG_OP = 'DELETE' THEN OLD.id 
            ELSE NEW.id 
        END,
        TG_OP,
        auth.uid(),
        CASE
            WHEN TG_OP = 'INSERT' THEN row_to_json(NEW)
            WHEN TG_OP = 'UPDATE' THEN 
                jsonb_build_object(
                    'old', row_to_json(OLD),
                    'new', row_to_json(NEW)
                )            WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)
        END
    );
    
    RETURN CASE
        WHEN TG_OP = 'DELETE' THEN OLD
        ELSE NEW
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Apply audit triggers to critical tables
CREATE TRIGGER audit_events 
    AFTER INSERT OR UPDATE OR DELETE ON events
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_sponsors 
    AFTER INSERT OR UPDATE OR DELETE ON sponsors
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_opportunities 
    AFTER INSERT OR UPDATE OR DELETE ON opportunities
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_contacts 
    AFTER INSERT OR UPDATE OR DELETE ON contacts
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- 4. Update timestamp trigger
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- 5. Apply timestamp triggers to all tables with updated_at
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

CREATE TRIGGER update_contacts_timestamp 
    BEFORE UPDATE ON contacts
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

-- 6. Lead scoring trigger
CREATE OR REPLACE FUNCTION update_lead_score()
RETURNS TRIGGER AS $$
DECLARE
    new_score INTEGER := 0;
    old_score INTEGER;
BEGIN
    -- Get current score
    SELECT lead_score INTO old_score FROM contacts WHERE id = NEW.contact_id;
    
    -- Calculate new score based on interaction
    new_score := COALESCE(old_score, 0);
    
    -- Positive interactions
    IF NEW.sentiment = 'positive' THEN
        new_score := new_score + 10;
    ELSIF NEW.sentiment = 'negative' THEN
        new_score := new_score - 5;
    END IF;    
    -- Interaction type scoring
    CASE NEW.interaction_type
        WHEN 'meeting' THEN new_score := new_score + 15;
        WHEN 'phone' THEN new_score := new_score + 10;
        WHEN 'email' THEN new_score := new_score + 5;
        ELSE new_score := new_score + 2;
    END CASE;
    
    -- Update contact score
    UPDATE contacts 
    SET lead_score = new_score,
        last_interaction_date = NEW.interaction_date,
        interaction_count = interaction_count + 1
    WHERE id = NEW.contact_id;
    
    -- Log score change
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

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'Triggers created successfully';
END $$;