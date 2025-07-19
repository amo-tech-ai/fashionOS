import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ardqtktktptejvrsbncj.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZHF0a3RrdHB0ZWp2cnNibmNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjU0NTM2MSwiZXhwIjoyMDY4MTIxMzYxfQ.l3PQMqHLZksz8U2-OcGADZLvBqYH0WdMn-xP8RAqKAI'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Function to execute SQL statements
async function executeSql(sql, description) {
  console.log(`\n🔄 ${description}...`)
  
  try {
    // Use the Supabase SQL execution endpoint
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'x-connection-encrypted': 'true'
      },
      body: JSON.stringify({
        query: sql
      })
    })
    
    if (!response.ok) {
      // Try alternative approach using raw SQL endpoint
      const altResponse = await fetch(`${SUPABASE_URL}/pg/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        },
        body: JSON.stringify({ query: sql })
      })
      
      if (altResponse.ok) {
        console.log(`✅ ${description} - Success`)
        return true
      } else {
        console.log(`❌ ${description} - Failed: ${altResponse.status}`)
        return false
      }
    }
    
    console.log(`✅ ${description} - Success`)
    return true
  } catch (error) {
    console.log(`❌ ${description} - Error: ${error.message}`)
    return false
  }
}

// Split migrations into executable chunks
const migrations = [
  {
    name: "Create event_planning table",
    sql: `
CREATE TABLE IF NOT EXISTS event_planning (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
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
    name: "Create vendor_profiles table",
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
    name: "Create media_profiles table",
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
  }
]

// Execute migrations
async function runMigrations() {
  console.log('🚀 Starting FashionOS Table Creation...')
  console.log('=====================================')
  
  let success = 0
  let failed = 0
  
  for (const migration of migrations) {
    const result = await executeSql(migration.sql, migration.name)
    if (result) success++
    else failed++
  }
  
  console.log('\n📊 Migration Summary:')
  console.log(`- Successful: ${success}`)
  console.log(`- Failed: ${failed}`)
  
  if (failed > 0) {
    console.log('\n⚠️  Some migrations failed.')
    console.log('This might be due to API limitations.')
    console.log('Please run the SQL directly in Supabase Dashboard.')
  }
}

// Test if we can create tables via API
async function testTableCreation() {
  console.log('🧪 Testing table creation via API...')
  
  // Try to create a simple test table
  const testSql = `
CREATE TABLE IF NOT EXISTS api_test_table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
)`;
  
  const result = await executeSql(testSql, 'Test table creation')
  
  if (result) {
    // Clean up test table
    await executeSql('DROP TABLE IF EXISTS api_test_table', 'Clean up test table')
    return true
  }
  
  return false
}

// Main execution
async function main() {
  // First test if we can create tables
  const canCreate = await testTableCreation()
  
  if (!canCreate) {
    console.log('\n❌ Cannot create tables via API')
    console.log('Supabase restricts DDL operations via API for security.')
    console.log('\n📋 Please use one of these methods:')
    console.log('1. Supabase Dashboard SQL Editor')
    console.log('2. Supabase CLI with migrations')
    console.log('3. Direct PostgreSQL connection')
    console.log('\nThe complete SQL is in: COMPLETE_MIGRATION.sql')
    return
  }
  
  // If we can create tables, run migrations
  await runMigrations()
}

main().catch(console.error)