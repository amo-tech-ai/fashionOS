// Simple test to check if tables exist
const SUPABASE_URL = 'https://ardqtktktptejvrsbncj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZHF0a3RrdHB0ZWp2cnNibmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NDUzNjEsImV4cCI6MjA2ODEyMTM2MX0.QtBCNZq5jEorUCWd8LmuDWNyan5Yik5eLMuRTORQNiA'

async function checkTables() {
  console.log('🔍 Checking Supabase tables...\n')
  
  // Tables we expect to exist
  const newTables = [
    'event_planning',
    'event_venues', 
    'event_vendors',
    'event_models',
    'event_sponsors_enhanced',
    'vendor_profiles',
    'media_profiles',
    'contacts',
    'accounts',
    'opportunities',
    'interactions',
    'lead_sources',
    'lead_scoring_history',
    'audit_logs'
  ]
  
  // Check existing tables first
  const existingTables = ['users', 'events', 'sponsors', 'registrations']
  
  console.log('📋 Checking existing tables:')
  for (const table of existingTables) {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${table}?select=*&limit=1`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        console.log(`✅ ${table} - Exists`)
      } else {
        console.log(`❌ ${table} - Error: ${response.status}`)
      }
    } catch (error) {
      console.log(`❌ ${table} - Network error`)
    }
  }
  
  console.log('\n📋 Checking new tables:')
  let found = 0
  let missing = 0
  
  for (const table of newTables) {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${table}?select=*&limit=1`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        }
      )
      
      if (response.ok) {
        console.log(`✅ ${table} - Found!`)
        found++
      } else if (response.status === 404 || response.status === 400) {
        console.log(`❌ ${table} - Not found (needs migration)`)
        missing++
      } else {
        console.log(`⚠️  ${table} - Error: ${response.status}`)
      }
    } catch (error) {
      console.log(`❌ ${table} - Network error`)
    }
  }
  
  console.log(`\n📊 Summary:`)
  console.log(`- New tables found: ${found}/${newTables.length}`)
  console.log(`- Missing tables: ${missing}`)
  
  if (missing > 0) {
    console.log(`\n⚠️  Action Required:`)
    console.log(`You need to run the migration scripts in Supabase SQL Editor`)
    console.log(`Follow the instructions in MIGRATION_GUIDE.md`)
  }
}

checkTables().catch(console.error)