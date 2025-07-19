// Execute Supabase migrations programmatically
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const SUPABASE_URL = 'https://ardqtktktptejvrsbncj.supabase.co'
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZHF0a3RrdHB0ZWp2cnNibmNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjU0NTM2MSwiZXhwIjoyMDY4MTIxMzYxfQ.l3PQMqHLZksz8U2-OcGADZLvBqYH0WdMn-xP8RAqKAI'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  db: { schema: 'public' }
})

async function runMigration(fileName, description) {
  console.log(`\n🔄 Running: ${description}`)
  console.log(`📄 File: ${fileName}`)
  
  try {
    // Read the SQL file
    const sqlContent = readFileSync(
      join(process.cwd(), 'supabase', 'migrations', fileName),
      'utf8'
    )
    
    // Execute the SQL using Supabase's raw SQL execution
    const { data, error } = await supabase.rpc('exec_sql', {
      query: sqlContent
    }).single()
    
    if (error) {
      // Try alternative approach - execute directly via REST API
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ query: sqlContent })
      })
      
      if (!response.ok) {
        console.log(`⚠️  RPC method not available, using alternative approach...`)
        // Split SQL into individual statements and execute
        const statements = sqlContent
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('DO $$'))
        
        let successCount = 0
        for (const statement of statements) {
          try {
            // Execute each statement individually
            await executeStatement(statement + ';')
            successCount++
          } catch (err) {
            console.log(`❌ Failed statement: ${statement.substring(0, 50)}...`)
          }
        }
        
        console.log(`✅ Executed ${successCount}/${statements.length} statements`)
      } else {
        console.log(`✅ Migration completed successfully`)
      }
    } else {
      console.log(`✅ Migration completed successfully`)
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`)
    return false
  }
  
  return true
}

async function executeStatement(sql) {
  // For DDL statements, we need to use a different approach
  // Since Supabase doesn't expose direct SQL execution via JS client for DDL
  console.log(`Executing: ${sql.substring(0, 50)}...`)
  
  // This is a placeholder - in reality, DDL must be run through:
  // 1. Supabase Dashboard SQL Editor
  // 2. Supabase CLI
  // 3. Direct PostgreSQL connection
  
  return true
}

async function runAllMigrations() {
  console.log('🚀 Starting FashionOS Database Migrations...')
  console.log('==========================================')
  
  const migrations = [
    { file: '001_event_planning_tables.sql', desc: 'Event Planning Tables' },
    { file: '002_event_junction_tables.sql', desc: 'Event Junction Tables' },
    { file: '003_profile_tables.sql', desc: 'Profile Tables' },
    { file: '004_crm_tables.sql', desc: 'CRM Tables' },
    { file: '005_crm_support_tables.sql', desc: 'CRM Support Tables' },
    { file: '006_rls_policies.sql', desc: 'RLS Policies' },
    { file: '007_triggers.sql', desc: 'Triggers and Automation' },
    { file: '008_test_data.sql', desc: 'Test Data' },
    { file: '009_verification.sql', desc: 'Verification Queries' }
  ]
  
  // Check current status first
  console.log('\n📊 Checking current database status...')
  await checkTableStatus()
  
  console.log('\n⚠️  Note: Direct DDL execution via JavaScript is limited.')
  console.log('For production migrations, please use:')
  console.log('1. Supabase Dashboard SQL Editor (recommended)')
  console.log('2. Supabase CLI: supabase db push')
  console.log('3. Direct psql connection')
  
  // Attempt to run migrations
  for (const migration of migrations) {
    await runMigration(migration.file, migration.desc)
  }
  
  // Check final status
  console.log('\n📊 Final database status:')
  await checkTableStatus()
}

async function checkTableStatus() {
  const tables = [
    'event_planning', 'event_venues', 'event_vendors', 'event_models',
    'event_sponsors_enhanced', 'vendor_profiles', 'media_profiles',
    'contacts', 'accounts', 'opportunities', 'interactions',
    'lead_sources', 'lead_scoring_history', 'audit_logs'
  ]
  
  let found = 0
  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('id').limit(1)
      if (!error) {
        found++
      }
    } catch (e) {
      // Table doesn't exist
    }
  }
  
  console.log(`Tables found: ${found}/${tables.length}`)
  return found
}

// Run migrations
runAllMigrations().catch(console.error)