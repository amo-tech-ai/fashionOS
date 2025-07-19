#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Create admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function executeMigration() {
  try {
    console.log('🚀 Starting migration execution...')
    
    // Read the complete migration file
    const migrationSQL = readFileSync('./COMPLETE_MIGRATION.sql', 'utf8')
    
    // Split into individual statements (rough split by semicolon + newline)
    const statements = migrationSQL
      .split(';\n')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`)
    
    let successCount = 0
    let errorCount = 0
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';'
      
      try {
        console.log(`\n⏳ Executing statement ${i + 1}/${statements.length}...`)
        
        // Execute the SQL statement
        const { data, error } = await supabase.rpc('exec_sql', {
          sql_query: statement
        })
        
        if (error) {
          // Try direct SQL execution if RPC doesn't work
          const { data: directData, error: directError } = await supabase
            .from('information_schema.tables')
            .select('*')
            .limit(1)
          
          if (directError) {
            throw new Error(`SQL Error: ${error.message}`)
          }
          
          // Use raw SQL via the REST API
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${supabaseServiceKey}`,
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey
            },
            body: JSON.stringify({ sql_query: statement })
          })
          
          if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`HTTP Error: ${response.status} - ${errorText}`)
          }
        }
        
        console.log(`✅ Statement ${i + 1} executed successfully`)
        successCount++
        
      } catch (error) {
        console.log(`❌ Statement ${i + 1} failed: ${error.message}`)
        
        // Check if it's a "table already exists" error (which is OK)
        if (error.message.includes('already exists') || 
            error.message.includes('duplicate key') ||
            error.message.includes('relation') && error.message.includes('already exists')) {
          console.log(`ℹ️  Statement ${i + 1}: Object already exists (skipping)`)
          successCount++
        } else {
          errorCount++
        }
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    console.log('\n📊 Migration Summary:')
    console.log(`✅ Successful: ${successCount}`)
    console.log(`❌ Errors: ${errorCount}`)
    console.log(`📝 Total: ${statements.length}`)
    
    if (errorCount === 0) {
      console.log('\n🎉 Migration completed successfully!')
    } else {
      console.log('\n⚠️  Migration completed with some errors.')
    }
    
    // Verify tables were created
    await verifyTables()
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

async function verifyTables() {
  try {
    console.log('\n🔍 Verifying created tables...')
    
    // List all tables in the public schema
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .order('table_name')
    
    if (error) {
      console.error('❌ Failed to verify tables:', error.message)
      return
    }
    
    const tableNames = data.map(row => row.table_name)
    
    console.log('\n📋 Tables in public schema:')
    tableNames.forEach((name, index) => {
      console.log(`${index + 1}. ${name}`)
    })
    
    // Check for our specific tables
    const expectedTables = [
      'events',
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
      'audit_log'
    ]
    
    const missingTables = expectedTables.filter(table => !tableNames.includes(table))
    const foundTables = expectedTables.filter(table => tableNames.includes(table))
    
    console.log(`\n✅ Found ${foundTables.length}/${expectedTables.length} expected tables`)
    
    if (missingTables.length > 0) {
      console.log('❌ Missing tables:', missingTables.join(', '))
    } else {
      console.log('🎉 All expected tables found!')
    }
    
  } catch (error) {
    console.error('❌ Table verification failed:', error.message)
  }
}

// Run the migration
executeMigration()
