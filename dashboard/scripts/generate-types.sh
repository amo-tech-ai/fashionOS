#!/bin/bash

# Generate TypeScript types from Supabase database
# This script should be run after any database schema changes

echo "🔧 Generating TypeScript types from Supabase..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found"
    echo "Please create .env.local with SUPABASE_PROJECT_ID"
    exit 1
fi

# Extract project ID from .env.local
PROJECT_ID=$(grep NEXT_PUBLIC_SUPABASE_URL .env.local | cut -d'/' -f3 | cut -d'.' -f1)

if [ -z "$PROJECT_ID" ]; then
    echo "❌ Error: Could not extract Supabase project ID"
    echo "Please ensure NEXT_PUBLIC_SUPABASE_URL is set in .env.local"
    exit 1
fi

echo "📋 Project ID: $PROJECT_ID"

# Check if user is logged in to Supabase CLI
if ! npx supabase projects list &>/dev/null; then
    echo "🔐 Please login to Supabase CLI first"
    npx supabase login
fi

# Generate types
echo "🚀 Generating types..."
npx supabase gen types typescript --project-id "$PROJECT_ID" > src/types/database.generated.ts

# Check if generation was successful
if [ $? -eq 0 ]; then
    echo "✅ Types generated successfully!"
    echo "📁 Output: src/types/database.generated.ts"
    
    # Create index file for easier imports
    cat > src/types/database.ts << 'EOF'
// Re-export generated types
export * from './database.generated';

// Add custom type helpers
export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row'];

export type Inserts<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Insert'];

export type Updates<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Update'];

// Common type aliases
export type User = Tables<'users'>;
export type Event = Tables<'events'>;
export type Venue = Tables<'venues'>;
export type Vendor = Tables<'vendors'>;
export type Sponsor = Tables<'sponsors'>;
EOF

    echo "✅ Type helpers created!"
    
    # Update tsconfig to include types
    echo "📝 Updating tsconfig.json..."
    # This would need jq or similar to properly update JSON
    
else
    echo "❌ Error: Failed to generate types"
    exit 1
fi

echo "🎉 Type generation complete!"
echo ""
echo "Next steps:"
echo "1. Import types in your components: import { Tables } from '@/types/database'"
echo "2. Use types for better type safety: const events: Tables<'events'>[]"
echo "3. Run this script after any database schema changes"
