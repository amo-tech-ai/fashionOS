// Verify FashionOS Tables After Migration
const SUPABASE_URL = 'https://ardqtktktptejvrsbncj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZHF0a3RrdHB0ZWp2cnNibmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NDUzNjEsImV4cCI6MjA2ODEyMTM2MX0.QtBCNZq5jEorUCWd8LmuDWNyan5Yik5eLMuRTORQNiA'

async function verifyMigration() {
  console.log('🔍 Verifying FashionOS Migration...\n')
  
  const tables = {
    'Event Planning': [
      'event_planning',
      'event_venues', 
      'event_vendors',
      'event_models',
      'event_sponsors_enhanced'
    ],
    'Profiles': [
      'vendor_profiles',
      'media_profiles'
    ],
    'CRM': [
      'accounts',
      'opportunities',
      'interactions',
      'lead_sources',
      'lead_scoring_history'
    ],
    'System': [
      'audit_logs'
    ]
  }
  
  let totalTables = 0
  let foundTables = 0
  
  for (const [category, tableList] of Object.entries(tables)) {
    console.log(`\n📋 ${category} Tables:`)
    
    for (const table of tableList) {
      totalTables++
      try {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/${table}?select=count`,
          {
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Prefer': 'count=exact'
            }
          }
        )
        
        if (response.ok) {
          const count = response.headers.get('content-range')?.split('/')[1] || '0'
          console.log(`✅ ${table} - Found (${count} records)`)
          foundTables++
        } else if (response.status === 404 || response.status === 400) {
          console.log(`❌ ${table} - Not found`)
        } else {
          console.log(`⚠️  ${table} - Error: ${response.status}`)
        }
      } catch (error) {
        console.log(`❌ ${table} - Network error`)
      }
    }
  }
  
  console.log(`\n📊 Migration Summary:`)
  console.log(`- Tables found: ${foundTables}/${totalTables}`)
  console.log(`- Success rate: ${Math.round(foundTables/totalTables*100)}%`)
  
  if (foundTables === totalTables) {
    console.log(`\n✅ Migration completed successfully!`)
    console.log(`All tables are created and accessible.`)
  } else {
    console.log(`\n⚠️  Migration incomplete!`)
    console.log(`Missing ${totalTables - foundTables} tables.`)
    console.log(`\nNext steps:`)
    console.log(`1. Go to: https://app.supabase.com/project/ardqtktktptejvrsbncj/sql/new`)
    console.log(`2. Copy and paste the contents of COMPLETE_MIGRATION.sql`)
    console.log(`3. Click "Run" to execute the migration`)
    console.log(`4. Run this verification script again`)
  }
}

verifyMigration().catch(console.error)