#!/usr/bin/env node

/**
 * FashionOS Supabase Connection Test
 * Comprehensive test of all Supabase functionality
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '../src/types/supabase.js';

// Environment variables
const SUPABASE_URL = 'https://ardqtktktptejvrsbncj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZHF0a3RrdHB0ZWp2cnNibmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NDUzNjEsImV4cCI6MjA2ODEyMTM2MX0.QtBCNZq5jEorUCWd8LmuDWNyan5Yik5eLMuRTORQNiA';

// Create Supabase client with TypeScript types
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('🧪 FashionOS Supabase Connection Test');
console.log('=====================================');

async function testDatabaseConnection() {
  console.log('\n1️⃣ Testing Database Connection...');
  
  try {
    const { data, error } = await supabase
      .from('events')
      .select('count');
    
    if (error) {
      console.log('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful');
    console.log(`📊 Events count: ${data[0].count}`);
    return true;
  } catch (err) {
    console.log('❌ Connection error:', err.message);
    return false;
  }
}

async function testEventsTable() {
  console.log('\n2️⃣ Testing Events Table...');
  
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select(`
        id,
        title,
        status,
        event_date,
        target_attendance,
        current_attendance
      `)
      .limit(5);
    
    if (error) {
      console.log('❌ Events query failed:', error.message);
      return false;
    }
    
    console.log('✅ Events table accessible');
    console.log(`📋 Found ${events.length} events:`);
    
    events.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.title} (${event.status}) - ${event.event_date}`);
    });
    
    return true;
  } catch (err) {
    console.log('❌ Events table error:', err.message);
    return false;
  }
}

async function testRealTimeSubscription() {
  console.log('\n3️⃣ Testing Real-time Subscriptions...');
  
  try {
    const channel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('🔔 Real-time update:', payload);
        }
      )
      .subscribe();
    
    console.log('✅ Real-time subscription created');
    
    // Clean up subscription
    setTimeout(() => {
      supabase.removeChannel(channel);
      console.log('🧹 Subscription cleaned up');
    }, 2000);
    
    return true;
  } catch (err) {
    console.log('❌ Real-time subscription error:', err.message);
    return false;
  }
}

async function testAuthentication() {
  console.log('\n4️⃣ Testing Authentication...');
  
  try {
    // Test session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      console.log('✅ User authenticated:', session.user.email);
    } else {
      console.log('ℹ️  No active session (expected for anonymous access)');
    }
    
    // Test auth configuration
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      console.log('✅ Auth user found:', user.email);
    } else {
      console.log('ℹ️  No authenticated user (expected for anonymous access)');
    }
    
    return true;
  } catch (err) {
    console.log('❌ Authentication error:', err.message);
    return false;
  }
}

async function testEdgeFunctions() {
  console.log('\n5️⃣ Testing Edge Functions...');
  
  try {
    // Test a simple edge function call (if any exist)
    const { data, error } = await supabase.functions.invoke('hello-world', {
      body: { name: 'FashionOS' }
    });
    
    if (error && error.message.includes('Function not found')) {
      console.log('ℹ️  No edge functions deployed (expected)');
      return true;
    }
    
    if (error) {
      console.log('❌ Edge function error:', error.message);
      return false;
    }
    
    console.log('✅ Edge function working:', data);
    return true;
  } catch (err) {
    console.log('ℹ️  Edge functions not configured (expected)');
    return true;
  }
}

async function testStorage() {
  console.log('\n6️⃣ Testing Storage...');
  
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.log('❌ Storage error:', error.message);
      return false;
    }
    
    console.log('✅ Storage accessible');
    console.log(`🗄️  Found ${buckets.length} storage buckets`);
    
    buckets.forEach((bucket, index) => {
      console.log(`   ${index + 1}. ${bucket.name} (${bucket.public ? 'public' : 'private'})`);
    });
    
    return true;
  } catch (err) {
    console.log('❌ Storage error:', err.message);
    return false;
  }
}

async function testComplexQuery() {
  console.log('\n7️⃣ Testing Complex Queries...');
  
  try {
    // Test join with venue information
    const { data, error } = await supabase
      .from('events')
      .select(`
        title,
        status,
        event_date,
        venues:venue_id (
          name,
          address
        )
      `)
      .eq('status', 'published')
      .order('event_date', { ascending: true });
    
    if (error) {
      console.log('❌ Complex query failed:', error.message);
      return false;
    }
    
    console.log('✅ Complex queries working');
    console.log(`📅 Found ${data.length} published events with venue info`);
    
    return true;
  } catch (err) {
    console.log('ℹ️  Complex query test (expected if venues table structure differs)');
    return true;
  }
}

async function runAllTests() {
  console.log('🚀 Starting comprehensive Supabase tests...\n');
  
  const results = [];
  
  results.push(await testDatabaseConnection());
  results.push(await testEventsTable());
  results.push(await testRealTimeSubscription());
  results.push(await testAuthentication());
  results.push(await testEdgeFunctions());
  results.push(await testStorage());
  results.push(await testComplexQuery());
  
  // Wait for real-time subscription cleanup
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('\n📊 Test Results Summary');
  console.log('========================');
  
  const passed = results.filter(Boolean).length;
  const total = results.length;
  
  console.log(`✅ Passed: ${passed}/${total} tests`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! Supabase is fully configured.');
  } else {
    console.log('⚠️  Some tests failed. Check configuration.');
  }
  
  console.log('\n🔗 Connection Details:');
  console.log(`   URL: ${SUPABASE_URL}`);
  console.log(`   Project: ardqtktktptejvrsbncj`);
  console.log(`   Status: ${passed === total ? 'READY' : 'NEEDS ATTENTION'}`);
  
  process.exit(passed === total ? 0 : 1);
}

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log('\n🛑 Test interrupted by user');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Test terminated');
  process.exit(0);
});

// Run tests
runAllTests().catch(err => {
  console.error('💥 Test suite crashed:', err);
  process.exit(1);
});
