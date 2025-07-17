# FashionOS Database Migration Quick Guide

## 🚀 Quick Start

### Step 1: Navigate to Supabase SQL Editor
1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project: `ardqtktktptejvrsbncj`
3. Click on "SQL Editor" in the left sidebar

### Step 2: Run Migrations in Order

Execute each file in this exact order:

1. **Event Planning Tables** (`001_event_planning_tables.sql`)
   - Creates the master event planning table
   - Run time: ~2 seconds

2. **Event Junction Tables** (`002_event_junction_tables.sql`)
   - Creates relationships between events and venues/vendors/models/sponsors
   - Run time: ~3 seconds

3. **Profile Tables** (`003_profile_tables.sql`)
   - Creates vendor and media profile tables
   - Run time: ~2 seconds

4. **CRM Tables** (`004_crm_tables.sql`)
   - Creates contacts and accounts tables
   - Run time: ~3 seconds

5. **CRM Support Tables** (`005_crm_support_tables.sql`)
   - Creates interactions, lead sources, and scoring history
   - Run time: ~2 seconds

6. **RLS Policies** (`006_rls_policies.sql`)
   - Enables row-level security on all tables
   - Run time: ~5 seconds

7. **Triggers** (`007_triggers.sql`)
   - Creates audit logs and automated triggers
   - Run time: ~3 seconds

8. **Test Data** (`008_test_data.sql`)
   - Inserts sample data for testing
   - Run time: ~2 seconds

9. **Verification** (`009_verification.sql`)
   - Run this to verify everything worked
   - Expected results:
     - Tables Created: 14
     - RLS Enabled: 11
     - Triggers Created: 20+
     - Indexes Created: 40+

### Step 3: Deploy Edge Functions

Using Supabase CLI:
```bash
cd /home/sk25/fx/fashionos
supabase functions deploy event-notifications
supabase functions deploy lead-scoring
```

Or manually in Supabase Dashboard:
1. Go to "Edge Functions"
2. Create new function
3. Copy code from `/supabase/functions/[function-name]/index.ts`

## ✅ Verification Checklist

After running all migrations, verify:

- [ ] All 14 new tables appear in Table Editor
- [ ] RLS is enabled (lock icon) on tables
- [ ] Test data is visible in tables
- [ ] No errors in SQL execution
- [ ] Edge functions deployed successfully

## 🔧 Troubleshooting

### Common Issues:

1. **Foreign key constraint error**
   - Run migrations in exact order
   - Make sure previous migrations completed

2. **Permission denied**
   - Check you're using service role key
   - Verify RLS policies are correct

3. **Table already exists**
   - Safe to ignore - migrations are idempotent
   - Or drop table and recreate if needed

## 📊 What's New:

### Tables Created:
- event_planning (master planning table)
- event_venues (venue bookings)
- event_vendors (service providers)
- event_models (talent bookings)
- event_sponsors_enhanced (sponsor management)
- vendor_profiles (vendor details)
- media_profiles (press details)
- contacts (CRM individuals)
- accounts (CRM organizations)
- opportunities (sales pipeline)
- interactions (activity tracking)
- lead_sources (attribution)
- lead_scoring_history (AI scoring)
- audit_logs (compliance tracking)

### Key Features Enabled:
- Multi-role event planning workflow
- Complete CRM with lead scoring
- Audit trail for compliance
- Automated notifications
- Role-based data access
- Real-time triggers

## 🎯 Next Steps:

1. Test the role-based access with different user types
2. Configure Edge Function environment variables
3. Set up webhook endpoints for notifications
4. Begin UI development for new features
5. Import existing data into new structure