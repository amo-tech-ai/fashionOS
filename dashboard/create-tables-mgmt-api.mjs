#!/usr/bin/env node
import https from 'https'
import { readFileSync } from 'fs'

// Supabase connection details
const PROJECT_REF = 'ardqtktktptejvrsbncj'
const ACCESS_TOKEN = 'sbp_103bf6af613ca6e106c3d71cf58d496073d1817f'
const DB_PASSWORD = 'Toronto2025#'

// Function to execute SQL via Supabase Management API
async function executeSqlViaManagementApi(sql) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      query: sql,
      legacy: false
    })
    
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
      
      res.on('data', (chunk) => {
        responseData += chunk
      })
      
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve({ success: true, data: JSON.parse(responseData) })
        } else {
          resolve({ success: false, error: responseData, status: res.statusCode })
        }
      })
    })
    
    req.on('error', (error) => {
      reject(error)
    })
    
    req.write(data)
    req.end()
  })
}

// Read and parse SQL files
function readSqlFile(filename) {
  try {
    return readFileSync(`./supabase/migrations/${filename}`, 'utf8')
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message)
    return null
  }
}

// Main execution
async function createTables() {
  console.log('🚀 FashionOS Database Setup via Management API')
  console.log('============================================\n')
  
  // List of migration files to execute
  const migrations = [
    { file: '001_event_planning_tables.sql', name: 'Event Planning Tables' },
    { file: '002_event_junction_tables.sql', name: 'Event Junction Tables' },
    { file: '003_profile_tables.sql', name: 'Profile Tables' },
    { file: '004_crm_tables.sql', name: 'CRM Tables' },
    { file: '005_crm_support_tables.sql', name: 'CRM Support Tables' },
    { file: '006_rls_policies.sql', name: 'RLS Policies' },
    { file: '007_triggers.sql', name: 'Triggers' },
    { file: '008_test_data.sql', name: 'Test Data' }
  ]
  
  let successCount = 0
  let failCount = 0
  
  // Test API access first
  console.log('🧪 Testing API access...')
  try {
    const testResult = await executeSqlViaManagementApi('SELECT version()')
    if (testResult.success) {
      console.log('✅ API access confirmed\n')
    } else {
      console.log('❌ API access failed:', testResult.error)
      console.log('\nStatus code:', testResult.status)
      if (testResult.status === 401) {
        console.log('\n⚠️  Authentication failed. Please check your access token.')
      } else if (testResult.status === 403) {
        console.log('\n⚠️  Permission denied. SQL execution might be restricted.')
      }
      return
    }
  } catch (error) {
    console.log('❌ Network error:', error.message)
    return
  }
  
  // Execute each migration
  for (const migration of migrations) {
    console.log(`\n📋 Executing: ${migration.name}`)
    console.log(`File: ${migration.file}`)
    
    const sql = readSqlFile(migration.file)
    if (!sql) {
      failCount++
      continue
    }
    
    try {
      const result = await executeSqlViaManagementApi(sql)
      if (result.success) {
        console.log(`✅ ${migration.name} - Success`)
        successCount++
      } else {
        console.log(`❌ ${migration.name} - Failed`)
        console.log(`Error: ${result.error}`)
        failCount++
      }
    } catch (error) {
      console.log(`❌ ${migration.name} - Network error`)
      failCount++
    }
    
    // Small delay between migrations
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log('\n📊 Final Summary:')
  console.log(`- Successful: ${successCount}`)
  console.log(`- Failed: ${failCount}`)
  
  if (failCount > 0) {
    console.log('\n⚠️  Some migrations failed.')
    console.log('You may need to run them manually in the Supabase Dashboard.')
  } else {
    console.log('\n✅ All migrations completed successfully!')
  }
}

// Alternative: Direct execution using complete migration
async function executeCompleteMigration() {
  console.log('\n🔄 Attempting complete migration execution...')
  
  try {
    const completeSql = readFileSync('./COMPLETE_MIGRATION.sql', 'utf8')
    
    // Split into smaller chunks if needed
    const statements = completeSql
      .split(';')
      .filter(stmt => stmt.trim().length > 0)
      .map(stmt => stmt.trim() + ';')
    
    console.log(`Found ${statements.length} SQL statements to execute`)
    
    // Execute in batches
    const batchSize = 5
    for (let i = 0; i < statements.length; i += batchSize) {
      const batch = statements.slice(i, i + batchSize).join('\n')
      console.log(`Executing batch ${Math.floor(i/batchSize) + 1}...`)
      
      const result = await executeSqlViaManagementApi(batch)
      if (!result.success) {
        console.log('Batch failed:', result.error)
      }
    }
  } catch (error) {
    console.log('Error:', error.message)
  }
}

// Run the migrations
createTables().catch(console.error)