#!/usr/bin/env node
import https from 'https'

const PROJECT_REF = 'ardqtktktptejvrsbncj'
const ACCESS_TOKEN = 'sbp_103bf6af613ca6e106c3d71cf58d496073d1817f'

async function executeSql(query) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, legacy: false })
    
    const options = {
      hostname: 'api.supabase.com',
      port: 443,
      path: `/v1/projects/${PROJECT_REF}/database/query`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Length': data.length
      }
    }
    
    const req = https.request(options, (res) => {
      let responseData = ''
      res.on('data', (chunk) => { responseData += chunk })
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData)
          if (res.statusCode === 200) {
            resolve(result)
          } else {
            reject(new Error(result.message || responseData))
          }
        } catch (e) {
          reject(new Error(responseData))
        }
      })
    })
    
    req.on('error', reject)
    req.write(data)
    req.end()
  })
}

async function setupDatabase() {
  console.log('🚀 FashionOS Database Setup')
  console.log('===========================\n')
  
  const steps = [
    {
      name: "1. Event Planning Table",
      sql: `
CREATE TABLE IF NOT EXISTS event_planning (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    planning_status VARCHAR(50) DEFAULT 'initial',
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
)`
    },
    {
      name: "2. Vendor Profiles",
      sql: `
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
)`
    },
    {
      name: "3. Media Profiles",
      sql: `
CREATE TABLE IF NOT EXISTS media_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) UNIQUE,
    media_name VARCHAR(255),
    media_type VARCHAR(50),
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
)`
    },
    {
      name: "4. Event Venues",
      sql: `
CREATE TABLE IF NOT EXISTS event_venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    venue_id UUID REFERENCES venue_profiles(id) ON DELETE CASCADE,
    booking_status VARCHAR(50) DEFAULT 'inquiry',
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
    updated_at TIMESTAMPTZ DEFAULT NOW()
)`
    },
    {
      name: "5. Event Vendors",
      sql: `
CREATE TABLE IF NOT EXISTS event_vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE CASCADE,
    service_type VARCHAR(100),
    service_description TEXT,
    booking_status VARCHAR(50) DEFAULT 'inquiry',
    quoted_price DECIMAL(12,2),
    final_price DECIMAL(12,2),
    deposit_required DECIMAL(12,2),
    deposit_paid BOOLEAN DEFAULT false,
    setup_start TIMESTAMPTZ,
    service_start TIMESTAMPTZ,
    service_end TIMESTAMPTZ,
    breakdown_complete TIMESTAMPTZ,
    performance_rating INTEGER,
    performance_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)`
    },
    {
      name: "6. Event Models",
      sql: `
CREATE TABLE IF NOT EXISTS event_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    model_id UUID REFERENCES model_profiles(id) ON DELETE CASCADE,
    booking_status VARCHAR(50) DEFAULT 'invited',
    model_role VARCHAR(50),
    outfit_count INTEGER DEFAULT 1,
    call_time TIMESTAMPTZ,
    rehearsal_time TIMESTAMPTZ,
    show_time TIMESTAMPTZ,
    wrap_time TIMESTAMPTZ,
    rate_type VARCHAR(20),
    rate_amount DECIMAL(12,2),
    total_compensation DECIMAL(12,2),
    payment_status VARCHAR(20) DEFAULT 'pending',
    measurements_confirmed BOOLEAN DEFAULT false,
    fitting_completed BOOLEAN DEFAULT false,
    special_requirements TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)`
    },
    {
      name: "7. Event Sponsors Enhanced",
      sql: `
CREATE TABLE IF NOT EXISTS event_sponsors_enhanced (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    sponsor_id BIGINT REFERENCES sponsors(id) ON DELETE CASCADE,
    sponsorship_tier VARCHAR(50),
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
    updated_at TIMESTAMPTZ DEFAULT NOW()
)`
    },
    {
      name: "8. Accounts Table",
      sql: `
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    website VARCHAR(255),
    account_type VARCHAR(50),
    industry VARCHAR(100),
    sub_industry VARCHAR(100),
    company_size VARCHAR(50),
    annual_revenue_range VARCHAR(50),
    headquarters_address TEXT,
    headquarters_city VARCHAR(100),
    headquarters_country VARCHAR(100),
    operating_regions TEXT[],
    account_status VARCHAR(50) DEFAULT 'prospect',
    account_tier VARCHAR(20),
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
)`
    },
    {
      name: "9. Opportunities",
      sql: `
CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_name VARCHAR(255) NOT NULL,
    account_id UUID REFERENCES accounts(id),
    primary_contact_id UUID REFERENCES contacts(id),
    opportunity_type VARCHAR(50),
    description TEXT,
    stage VARCHAR(50) DEFAULT 'prospecting',
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
)`
    },
    {
      name: "10. Interactions",
      sql: `
CREATE TABLE IF NOT EXISTS interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES contacts(id),
    account_id UUID REFERENCES accounts(id),
    opportunity_id UUID REFERENCES opportunities(id),
    event_id BIGINT REFERENCES events(id),
    interaction_type VARCHAR(50),
    direction VARCHAR(10),
    subject VARCHAR(255),
    description TEXT,
    interaction_date TIMESTAMPTZ DEFAULT NOW(),
    duration_minutes INTEGER,
    outcome VARCHAR(100),
    sentiment VARCHAR(20),
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_date DATE,
    follow_up_notes TEXT,
    created_by UUID REFERENCES users(id),
    attendees UUID[],
    attachments JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
)`
    },
    {
      name: "11. Lead Sources",
      sql: `
CREATE TABLE IF NOT EXISTS lead_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name VARCHAR(100) NOT NULL UNIQUE,
    source_type VARCHAR(50),
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
)`
    },
    {
      name: "12. Lead Scoring History",
      sql: `
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
)`
    },
    {
      name: "13. Audit Logs",
      sql: `
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(100),
    record_id UUID,
    action VARCHAR(20),
    user_id UUID,
    changes JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
)`
    }
  ]
  
  let successCount = 0
  let failCount = 0
  
  for (const step of steps) {
    try {
      console.log(`\n📋 Creating ${step.name}...`)
      await executeSql(step.sql)
      console.log(`✅ ${step.name} created successfully`)
      successCount++
    } catch (error) {
      console.log(`❌ ${step.name} failed: ${error.message}`)
      failCount++
    }
  }
  
  // Add sample data
  console.log('\n📝 Adding sample data...')
  
  try {
    // Add event planning record
    await executeSql(`
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
LIMIT 1`)
    console.log('✅ Added event planning data')
  } catch (error) {
    console.log('⚠️  Sample data might already exist')
  }
  
  // Final verification
  console.log('\n📊 Verifying tables...')
  
  try {
    const result = await executeSql(`
      SELECT COUNT(*) as table_count
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN (
          'event_planning', 'event_venues', 'event_vendors', 'event_models',
          'event_sponsors_enhanced', 'vendor_profiles', 'media_profiles',
          'accounts', 'opportunities', 'interactions', 'lead_sources',
          'lead_scoring_history', 'audit_logs'
      )
    `)
    
    console.log(`\n✅ Tables created: ${result[0].table_count}/13`)
    console.log(`✅ Success rate: ${Math.round(successCount/(successCount+failCount)*100)}%`)
    
    if (result[0].table_count === 13) {
      console.log('\n🎉 All tables created successfully!')
    } else {
      console.log('\n⚠️  Some tables are missing. Check the errors above.')
    }
  } catch (error) {
    console.log('Error verifying tables:', error.message)
  }
}

setupDatabase().catch(console.error)