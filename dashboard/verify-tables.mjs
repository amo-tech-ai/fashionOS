// Test script to verify Supabase tables
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: join(__dirname, '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function verifyTables() {
  console.log('🔍 Verifying Supabase Tables...\n')
  
  const tablesToCheck = [
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
  
  const results = {
    exists: [],
    missing: [],
    withData: []
  }
  
  for (const table of tablesToCheck) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: false })
        .limit(1)
      
      if (error) {
        if (error.message.includes('does not exist')) {
          results.missing.push(table)
          console.log(`❌ ${table} - Table does not exist`)
        } else {
          console.log(`⚠️  ${table} - Error: ${error.message}`)
        }
      } else {
        results.exists.push(table)
        if (count > 0) {
          results.withData.push({ table, count })
          console.log(`✅ ${table} - Exists with ${count} records`)
        } else {
          console.log(`✅ ${table} - Exists (empty)`)
        }
      }
    } catch (err) {
      console.log(`❌ ${table} - Error: ${err.message}`)
    }
  }
  
  console.log('\n📊 Summary:')
  console.log(`- Tables found: ${results.exists.length}/${tablesToCheck.length}`)
  console.log(`- Tables with data: ${results.withData.length}`)
  console.log(`- Missing tables: ${results.missing.length}`)
  
  if (results.missing.length > 0) {
    console.log('\n❌ Missing tables:', results.missing.join(', '))
    console.log('\n⚠️  You need to run the migration scripts in Supabase SQL Editor')
  }
  
  // Test existing tables
  console.log('\n🔍 Checking existing tables...')
  const existingTables = ['users', 'events', 'sponsors', 'registrations']
  
  for (const table of existingTables) {
    const { count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
    
    console.log(`📋 ${table}: ${count} records`)
  }
}

// Run verification
verifyTables().catch(console.error)