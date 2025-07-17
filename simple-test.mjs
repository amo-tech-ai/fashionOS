#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('🔑 Testing Supabase JavaScript Client Connection')
console.log('Project ID: ardqtktktptejvrsbncj')
console.log('URL:', supabaseUrl)
console.log('=' .repeat(50))

// Create admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function simpleTest() {
  try {
    console.log('\n🧪 Testing simple table access...')
    
    // Test with a simple query on existing events table
    const { data, error } = await supabase
      .from('events')
      .select('id, title')
      .limit(3)
    
    if (error) {
      console.error('❌ Events query failed:', error.message)
      return false
    }
    
    console.log('✅ JavaScript client connection successful!')
    console.log('📊 Sample events:', data)
    
    return true
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message)
    return false
  }
}

async function testAuth() {
  try {
    console.log('\n👥 Testing auth admin access...')
    
    const { data, error } = await supabase.auth.admin.listUsers()
    
    if (error) {
      console.log('ℹ️  Auth admin access:', error.message)
    } else {
      console.log(`✅ Auth working - found ${data.users.length} users`)
    }
    
  } catch (error) {
    console.log('ℹ️  Auth test:', error.message)
  }
}

// Run tests
simpleTest().then(success => {
  if (success) {
    testAuth()
    console.log('\n🎉 JavaScript client is working correctly!')
    console.log('✅ Ready for frontend development')
    console.log('✅ Service role key is valid')
    console.log('✅ Database access confirmed')
  }
})
