-- Migration: Test Data and Verification
-- Description: Sample data for testing and verification queries

-- 1. Create test event planning data
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

-- 2. Create test venue booking
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
-- 3. Create test vendor profiles for existing vendor users
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
    'Creative ' || u.raw_user_meta_data->>'full_name' || ' Services',
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

-- 4. Create test media profiles
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
    u.raw_user_meta_data->>'full_name' || ' Media',
    'blog',
    50000,
    ARRAY['runway', 'streetwear', 'luxury'],
    ARRAY['reviews', 'interviews', 'photography']
FROM users u
WHERE u.user_type = 'media'
AND NOT EXISTS (
    SELECT 1 FROM media_profiles mp WHERE mp.user_id = u.id
);

-- 5. Create test accounts
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
    (SELECT id FROM users WHERE user_type = 'organizer' LIMIT 1))
ON CONFLICT (company_name) DO NOTHING;
-- 6. Create test contacts
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
    SELECT 1 FROM contacts c WHERE c.account_id = a.id
)
LIMIT 2;

-- 7. Create test opportunities
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
LIMIT 2;