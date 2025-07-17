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
        const result = JSON.parse(responseData)
        if (res.statusCode === 200) {
          resolve(result)
        } else {
          reject(new Error(result.message || responseData))
        }
      })
    })
    
    req.on('error', reject)
    req.write(data)
    req.end()
  })
}

async function checkExistingSchema() {
  console.log('🔍 Checking existing table schemas...\n')
  
  // Check events table structure
  const eventsSchema = await executeSql(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'events'
    ORDER BY ordinal_position
  `)
  
  console.log('📋 Events table columns:')
  eventsSchema.forEach(col => {
    console.log(`  - ${col.column_name}: ${col.data_type}`)
  })
  
  // Check users table
  const usersSchema = await executeSql(`
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = 'users'
    AND column_name = 'id'
  `)
  
  console.log('\n📋 Users table ID type:')
  usersSchema.forEach(col => {
    console.log(`  - ${col.column_name}: ${col.data_type}`)
  })
  
  // Check existing tables
  const tables = await executeSql(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `)
  
  console.log('\n📋 Existing tables:')
  tables.forEach(t => console.log(`  - ${t.table_name}`))
}

// Create tables with correct types
async function createTablesWithCorrectTypes() {
  console.log('\n🚀 Creating tables with correct data types...\n')
  
  const migrations = [
    {
      name: "Event Planning Table",
      sql: `
CREATE TABLE IF NOT EXISTS event_planning (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    planning_status VARCHAR(50) DEFAULT 'initial' CHECK (planning_status IN 
        ('initial', 'venue_selection', 'vendor_booking', 'model_casting', 
         'sponsor_outreach', 'marketing_prep', 'final_prep', 'completed')),
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
      name: "Vendor Profiles",
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
      name: "Media Profiles",
      sql: `
CREATE TABLE IF NOT EXISTS media_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) UNIQUE,
    media_name VARCHAR(255),
    media_type VARCHAR(50) CHECK (media_type IN 
        ('magazine', 'blog', 'newspaper', 'tv', 'radio', 'podcast', 'social_media')),
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
      name: "Event Venues Junction",
      sql: `
CREATE TABLE IF NOT EXISTS event_venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    venue_id UUID REFERENCES venue_profiles(id) ON DELETE CASCADE,
    booking_status VARCHAR(50) DEFAULT 'inquiry' CHECK (booking_status IN 
        ('inquiry', 'negotiating', 'confirmed', 'cancelled')),
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
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, venue_id)
)`
    },
    {
      name: "Event Vendors Junction",
      sql: `
CREATE TABLE IF NOT EXISTS event_vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES vendor_profiles(id) ON DELETE CASCADE,
    service_type VARCHAR(100) CHECK (service_type IN 
        ('catering', 'photography', 'videography', 'lighting', 'sound', 
         'decoration', 'security', 'transportation', 'makeup', 'hair', 'other')),
    service_description TEXT,
    booking_status VARCHAR(50) DEFAULT 'inquiry' CHECK (booking_status IN 
        ('inquiry', 'proposal_sent', 'negotiating', 'confirmed', 'cancelled')),
    quoted_price DECIMAL(12,2),
    final_price DECIMAL(12,2),
    deposit_required DECIMAL(12,2),
    deposit_paid BOOLEAN DEFAULT false,
    setup_start TIMESTAMPTZ,
    service_start TIMESTAMPTZ,
    service_end TIMESTAMPTZ,
    breakdown_complete TIMESTAMPTZ,
    performance_rating INTEGER CHECK (performance_rating BETWEEN 1 AND 5),
    performance_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, vendor_id, service_type)
)`
    },
    {
      name: "Event Models Junction",
      sql: `
CREATE TABLE IF NOT EXISTS event_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    model_id UUID REFERENCES model_profiles(id) ON DELETE CASCADE,
    booking_status VARCHAR(50) DEFAULT 'invited' CHECK (booking_status IN 
        ('invited', 'interested', 'confirmed', 'contracted', 'cancelled')),
    model_role VARCHAR(50) CHECK (model_role IN 
        ('runway', 'photoshoot', 'fitting', 'campaign', 'lookbook')),
    outfit_count INTEGER DEFAULT 1,
    call_time TIMESTAMPTZ,
    rehearsal_time TIMESTAMPTZ,
    show_time TIMESTAMPTZ,
    wrap_time TIMESTAMPTZ,
    rate_type VARCHAR(20) CHECK (rate_type IN ('hourly', 'flat', 'per_look')),
    rate_amount DECIMAL(12,2),
    total_compensation DECIMAL(12,2),
    payment_status VARCHAR(20) DEFAULT 'pending',
    measurements_confirmed BOOLEAN DEFAULT false,
    fitting_completed BOOLEAN DEFAULT false,
    special_requirements TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, model_id)
)`
    },
    {
      name: "Event Sponsors Enhanced",
      sql: `
CREATE TABLE IF NOT EXISTS event_sponsors_enhanced (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
    sponsor_id BIGINT REFERENCES sponsors(id) ON DELETE CASCADE,
    sponsorship_tier VARCHAR(50) CHECK (sponsorship_tier IN 
        ('title', 'platinum', 'gold', 'silver', 'bronze', 'supporter')),
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
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, sponsor_id)
)`
    }
  ]
  
  for (const migration of migrations) {
    try {
      console.log(`📋 Creating ${migration.name}...`)
      await executeSql(migration.sql)
      console.log(`✅ ${migration.name} created successfully`)
    } catch (error) {
      console.log(`❌ ${migration.name} failed: ${error.message}`)
    }
  }
}

async function createCRMTables() {
  console.log('\n🔄 Creating CRM tables...\n')
  
  const crmTables = [
    {
      name: "Accounts",
      sql: `
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    legal_name VARCHAR(255),
    website VARCHAR(255),
    account_type VARCHAR(50) CHECK (account_type IN 
        ('sponsor', 'vendor', 'venue', 'agency', 'brand', 'media')),
    industry VARCHAR(100),
    sub_industry VARCHAR(100),
    company_size VARCHAR(50) CHECK (company_size IN 
        ('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')),
    annual_revenue_range VARCHAR(50),
    headquarters_address TEXT,
    headquarters_city VARCHAR(100),
    headquarters_country VARCHAR(100),
    operating_regions TEXT[],
    account_status VARCHAR(50) DEFAULT 'prospect' CHECK (account_status IN 
        ('prospect', 'active', 'inactive', 'churned')),
    account_tier VARCHAR(20) CHECK (account_tier IN 
        ('strategic', 'enterprise', 'mid-market', 'small')),
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
      name: "Update Contacts with Account",
      sql: `ALTER TABLE contacts ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES accounts(id) ON DELETE SET NULL`
    },
    {
      name: "Opportunities",
      sql: `
CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_name VARCHAR(255) NOT NULL,
    account_id UUID REFERENCES accounts(id),
    primary_contact_id UUID REFERENCES contacts(id),
    opportunity_type VARCHAR(50) CHECK (opportunity_type IN 
        ('sponsorship', 'venue_rental', 'vendor_service', 'partnership', 'advertising')),
    description TEXT,
    stage VARCHAR(50) DEFAULT 'prospecting' CHECK (stage IN 
        ('prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost')),
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
      name: "Interactions",
      sql: `
CREATE TABLE IF NOT EXISTS interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES contacts(id),
    account_id UUID REFERENCES accounts(id),
    opportunity_id UUID REFERENCES opportunities(id),
    event_id BIGINT REFERENCES events(id),
    interaction_type VARCHAR(50) CHECK (interaction_type IN 
        ('email', 'phone', 'meeting', 'event', 'social_media', 'note')),
    direction VARCHAR(10) CHECK (direction IN ('inbound', 'outbound')),
    subject VARCHAR(255),
    description TEXT,
    interaction_date TIMESTAMPTZ DEFAULT NOW(),
    duration_minutes INTEGER,
    outcome VARCHAR(100),
    sentiment VARCHAR(20) CHECK (sentiment IN 
        ('positive', 'neutral', 'negative')),
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
      name: "Lead Sources",
      sql: `
CREATE TABLE IF NOT EXISTS lead_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name VARCHAR(100) NOT NULL UNIQUE,
    source_type VARCHAR(50) CHECK (source_type IN 
        ('organic', 'paid', 'social', 'referral', 'event', 'partner')),
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
      name: "Lead Scoring History",
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
      name: "Audit Logs",
      sql: `
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(100),
    record_id UUID,
    action VARCHAR(20) CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    user_id UUID,
    changes JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
)`
    }
  ]
  
  for (const table of crmTables) {
    try {
      console.log(`📋 Creating ${table.name}...`)
      await executeSql(table.sql)
      console.log(`✅ ${table.name} created successfully`)
    } catch (error) {
      console.log(`❌ ${table.name} failed: ${error.message}`)
    }
  }
}

async function createIndexes() {
  console.log('\n🔧 Creating indexes...\n')
  
  const indexes = [
    'CREATE INDEX IF NOT EXISTS idx_event_planning_event_id ON event_planning(event_id)',
    'CREATE INDEX IF NOT EXISTS idx_event_planning_status ON event_planning(planning_status)',
    'CREATE INDEX IF NOT EXISTS idx_event_venues_event ON event_venues(event_id)',
    'CREATE INDEX IF NOT EXISTS idx_event_vendors_event ON event_vendors(event_id)',
    'CREATE INDEX IF NOT EXISTS idx_event_models_event ON event_models(event_id)',
    'CREATE INDEX IF NOT EXISTS idx_accounts_name ON accounts(company_name)',
    'CREATE INDEX IF NOT EXISTS idx_opportunities_account ON opportunities(account_id)',
    'CREATE INDEX IF NOT EXISTS idx_interactions_contact ON interactions(contact_id)'
  ]
  
  for (const index of indexes) {
    try {
      await executeSql(index)
      console.log(`✅ Index created`)
    } catch (error) {
      console.log(`⚠️  Index might already exist`)
    }
  }
}

async function enableRLS() {
  console.log('\n🔒 Enabling RLS...\n')
  
  const tables = [
    'event_planning', 'event_venues', 'event_vendors', 'event_models',
    'event_sponsors_enhanced', 'vendor_profiles', 'media_profiles',
    'accounts', 'opportunities', 'interactions', 'lead_sources',
    'lead_scoring_history', 'audit_logs'
  ]
  
  for (const table of tables) {
    try {
      await executeSql(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY`)
      console.log(`✅ RLS enabled for ${table}`)
    } catch (error) {
      console.log(`⚠️  ${table}: ${error.message}`)
    }
  }
}

async function addSampleData() {
  console.log('\n📝 Adding sample data...\n')
  
  try {
    // Create vendor profile
    await executeSql(`
INSERT INTO vendor_profiles (
    user_id,
    business_name,
    business_type,
    primary_service,
    service_categories,
    team_size
)
SELECT 
    u.id,
    'Creative ' || COALESCE(u.raw_user_meta_data->>'full_name', 'Vendor') || ' Services',
    'Event Services',
    'photography',
    ARRAY['photography', 'videography'],
    5
FROM users u
WHERE u.user_type = 'vendor'
AND NOT EXISTS (
    SELECT 1 FROM vendor_profiles vp WHERE vp.user_id = u.id
)
LIMIT 1`)
    console.log('✅ Added vendor profile')
  } catch (error) {
    console.log('⚠️  Sample data might already exist')
  }
}

async function verifyTables() {
  console.log('\n📊 Verifying tables...\n')
  
  const result = await executeSql(`
    SELECT table_name, 
           CASE WHEN table_name IN (
               'event_planning', 'event_venues', 'event_vendors', 'event_models',
               'event_sponsors_enhanced', 'vendor_profiles', 'media_profiles',
               'accounts', 'opportunities', 'interactions', 'lead_sources',
               'lead_scoring_history', 'audit_logs'
           ) THEN 'New' ELSE 'Existing' END as table_type
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    ORDER BY table_type DESC, table_name
  `)
  
  const newTables = result.filter(t => t.table_type === 'New')
  const existingTables = result.filter(t => t.table_type === 'Existing')
  
  console.log(`✅ New tables created: ${newTables.length}`)
  newTables.forEach(t => console.log(`   - ${t.table_name}`))
  
  console.log(`\n📋 Total tables: ${result.length}`)
}

// Main execution
async function main() {
  try {
    await checkExistingSchema()
    await createTablesWithCorrectTypes()
    await createCRMTables()
    await createIndexes()
    await enableRLS()
    await addSampleData()
    await verifyTables()
    
    console.log('\n✅ FashionOS database setup complete!')
  } catch (error) {
    console.error('Error:', error.message)
  }
}

main()