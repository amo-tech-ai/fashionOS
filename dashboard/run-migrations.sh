#!/bin/bash
# FashionOS Database Migration Execution Script
# Run this script to apply all migrations to your Supabase database

echo "🚀 Starting FashionOS Database Migration..."
echo "============================================"

# Check if we're in the right directory
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local not found. Make sure you're in the fashionos directory."
    exit 1
fi

# Source environment variables
source .env.local

# Function to run a migration
run_migration() {
    local file=$1
    local description=$2
    
    echo ""
    echo "📋 Running: $description"
    echo "File: $file"
    
    # You'll need to copy and paste the SQL from each file into Supabase SQL Editor
    # Or use the Supabase CLI if you have it set up
    echo "➡️  Copy the contents of $file and run in Supabase SQL Editor"
    echo "   Press Enter when complete..."
    read
}

# Run migrations in order
echo ""
echo "📊 Starting Database Migrations..."
echo "================================="

run_migration "supabase/migrations/001_event_planning_tables.sql" "Event Planning Tables"
run_migration "supabase/migrations/002_event_junction_tables.sql" "Event Junction Tables"
run_migration "supabase/migrations/003_profile_tables.sql" "Profile Tables (Vendor & Media)"
run_migration "supabase/migrations/004_crm_tables.sql" "CRM Tables (Contacts & Accounts)"
run_migration "supabase/migrations/005_crm_support_tables.sql" "CRM Support Tables"
run_migration "supabase/migrations/006_rls_policies.sql" "RLS Security Policies"
run_migration "supabase/migrations/007_triggers.sql" "Automated Triggers"
run_migration "supabase/migrations/008_test_data.sql" "Test Data"
run_migration "supabase/migrations/009_verification.sql" "Verification Queries"

echo ""
echo "🚀 Deploying Edge Functions..."
echo "=============================="

# Deploy edge functions (if Supabase CLI is installed)
if command -v supabase &> /dev/null; then
    echo "✅ Supabase CLI detected. Deploying functions..."
    cd supabase/functions
    supabase functions deploy event-notifications
    supabase functions deploy lead-scoring
    cd ../..
else
    echo "⚠️  Supabase CLI not found. Deploy functions manually:"
    echo "   - event-notifications"
    echo "   - lead-scoring"
fi

echo ""
echo "✅ Migration Complete!"
echo "===================="
echo ""
echo "Next Steps:"
echo "1. Run the verification queries to confirm all tables are created"
echo "2. Test the RLS policies with different user roles"
echo "3. Deploy the edge functions if not already done"
echo "4. Update your application code to use the new tables"
echo ""
echo "📊 Expected Results:"
echo "- 14 new tables created"
echo "- 11+ tables with RLS enabled"
echo "- 20+ triggers active"
echo "- 2 edge functions deployed"