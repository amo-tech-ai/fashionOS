# FashionOS + Supabase: Complete Setup Documentation

## 🎯 Setup Status: ✅ FULLY OPERATIONAL

FashionOS is now fully connected to Supabase with all systems operational and ready for production development.

---

## 🔗 Connection Details

### Supabase Project
- **Project ID**: `ardqtktktptejvrsbncj`
- **Project URL**: `https://ardqtktktptejvrsbncj.supabase.co`
- **Region**: US East (Virginia)
- **Status**: ✅ Active and Connected

### Database
- **Provider**: PostgreSQL (Supabase)
- **Connection**: Pooled connection via AWS
- **Tables**: 34 tables accessible
- **Sample Data**: 4 events, 8 users, 5 sponsors, 3 venues

---

## 🌐 Application URLs

| Service | URL | Status |
|---------|-----|---------|
| **Main App** | http://localhost:3000 | ✅ Running |
| **Events Management** | http://localhost:3000/events | ✅ Working |
| **Create Event** | http://localhost:3000/events/create | ✅ Working |
| **Refine DevTools** | http://localhost:5002 | ✅ Running |

---

## 🗄️ Database Schema

### Core Tables
1. **events** - Main events table (4 sample events)
2. **venues** - Event venues (3 venues)
3. **users** - User management (8 users)
4. **sponsors** - Event sponsors (5 sponsors)
5. **registrations** - Event registrations (empty)

### Additional Tables (31)
- accounts, audit_logs, contacts, dashboard_preferences
- designer_profiles, event_analytics, event_categories
- event_models, event_planning, event_schedule
- event_sponsors, event_vendors, event_venues
- interactions, lead_scoring_history, lead_sources
- media_profiles, model_profiles, opportunities
- payments, sponsor_leads, sponsor_packages
- tasks, team, ticket_categories, ticket_types
- user_types, vendor_profiles, venue_profiles

---

## 🔑 Environment Configuration

### Environment Variables (.env.local)
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ardqtktktptejvrsbncj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZHF0a3RrdHB0ZWp2cnNibmNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NDUzNjEsImV4cCI6MjA2ODEyMTM2MX0.QtBCNZq5jEorUCWd8LmuDWNyan5Yik5eLMuRTORQNiA

# Service Role Key (Backend only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZHF0a3RrdHB0ZWp2cnNibmNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjU0NTM2MSwiZXhwIjoyMDY4MTIxMzYxfQ.M9iPCSgqUtcxHFagvhA9MCMfzO799UE2YigRi6l0Ng8

# CLI Access
SUPABASE_ACCESS_TOKEN=sbp_103bf6af613ca6e106c3d71cf58d496073d1817f
SUPABASE_DB_PASSWORD=Toronto2025#
```

---

## 🚀 Quick Start Commands

### Start Development Server
```bash
cd /home/sk25/fx/fashionos
./start-fashionos.sh
```

### Verify Setup
```bash
cd /home/sk25/fx/fashionos
./verify-setup.sh
```

### Test Supabase Connection
```bash
cd /home/sk25/fx/fashionos
node test-supabase-connection.js
```

### Access Supabase CLI
```bash
cd /home/sk25/fx/fashionos
supabase status
supabase db pull
```

---

## 📊 Sample Data Overview

### Events Table (4 records)
1. **Fashion Week 2025** - September 15, 2025 (Published, 100 target)
2. **Designer Showcase** - August 20, 2025 (Published, 100 target)
3. **Fashion Summit** - July 30, 2025 (Draft, 100 target)
4. **Swimwear Fashion Show 2025** - July 29, 2025 (Published, 500 target)

### Users Table (8 records)
- Admin users, designers, organizers, attendees

### Venues Table (3 records)
- Fashion venues with addresses and capacities

### Sponsors Table (5 records)
- Event sponsors with contact information

---

## 🔒 Security Configuration

### Row Level Security (RLS)
- ✅ Enabled on all core tables
- ✅ Public can view published events
- ✅ Authenticated users can create/edit
- ✅ Proper role-based access control

### Authentication
- ✅ Supabase Auth configured
- ✅ Anonymous access for public content
- ✅ JWT token validation
- ✅ Session management enabled

---

## 🛠 Development Workflow

### 1. Local Development
```bash
# Start server
./start-fashionos.sh

# Access application at http://localhost:3000
```

### 2. Database Changes
```bash
# Create migration
supabase migration new add_new_feature

# Edit migration file
# Apply locally
supabase db reset

# Push to remote
supabase db push
```

### 3. TypeScript Types
```bash
# Generate types from database
npx supabase gen types typescript --project-id ardqtktktptejvrsbncj > src/types/supabase.ts
```

### 4. Testing
```bash
# Test Supabase connection
node test-supabase-connection.js

# Test application
npm test

# E2E tests
npx playwright test
```

---

## 📁 Project Structure

```
fashionos/
├── .env.local                    # Environment variables
├── src/
│   ├── types/supabase.ts        # Generated TypeScript types
│   ├── utility/supabaseClient.ts # Supabase client configuration
│   └── app/                     # Next.js app directory
├── supabase/
│   ├── config.toml             # Supabase configuration
│   ├── migrations/             # Database migrations
│   └── functions/              # Edge functions
├── tests/                      # Playwright tests
├── start-fashionos.sh          # Start development server
├── verify-setup.sh             # Verify setup
└── test-supabase-connection.js # Connection test
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Connection Errors
```bash
# Test connection
node test-supabase-connection.js

# Check environment variables
cat .env.local
```

#### 2. Server Won't Start
```bash
# Kill existing processes
pkill -f "node.*refine"

# Restart server
./start-fashionos.sh
```

#### 3. Database Access Issues
```bash
# Test direct connection
PGPASSWORD="Toronto2025#" psql -h aws-0-us-east-2.pooler.supabase.com -p 5432 -U postgres.ardqtktktptejvrsbncj -d postgres -c "SELECT COUNT(*) FROM events;"
```

#### 4. TypeScript Errors
```bash
# Regenerate types
npx supabase gen types typescript --project-id ardqtktktptejvrsbncj > src/types/supabase.ts
```

---

## 🎯 Production Deployment

### Environment Setup
1. **Create production Supabase project** (or use existing)
2. **Update environment variables** in production
3. **Run migrations** on production database
4. **Deploy application** to hosting platform

### Security Checklist
- [ ] RLS policies properly configured
- [ ] Service role key secured
- [ ] CORS settings configured
- [ ] Rate limiting enabled
- [ ] SSL certificates configured

---

## 📚 Additional Resources

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [Refine Docs](https://refine.dev/docs)
- [Next.js Docs](https://nextjs.org/docs)

### Support
- **Supabase Support**: https://supabase.com/support
- **Project Repository**: /home/sk25/fx/fashionos
- **Local Test Suite**: `node test-supabase-connection.js`

---

## ✅ Verification Checklist

- [x] Supabase project connected
- [x] Database accessible with sample data
- [x] Authentication configured
- [x] Row Level Security enabled
- [x] TypeScript types generated
- [x] Development server running
- [x] All core features working
- [x] Test suite passing
- [x] Documentation complete

**Status: 🎉 READY FOR DEVELOPMENT!**

---

*Last Updated: July 16, 2025*
*Project: FashionOS*
*Environment: Development*
*Database: Supabase (ardqtktktptejvrsbncj)*
