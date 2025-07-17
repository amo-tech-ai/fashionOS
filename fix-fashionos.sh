#!/bin/bash

echo "🔧 FashionOS Fix Script - Addressing all critical issues"
echo "======================================================="

# Step 1: Backup current state
echo "📦 Creating backup..."
cp package.json package.json.backup
cp -r pages pages.backup 2>/dev/null || true

# Step 2: Remove pages directory (router conflict)
echo "🗑️  Removing pages directory (router conflict)..."
rm -rf pages/

# Step 3: Fix package versions
echo "📦 Fixing package dependencies..."
cat > fix-packages.json << 'EOF'
{
  "name": "fashionos",
  "version": "0.1.0",
  "private": true,
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "dev": "cross-env NODE_OPTIONS=--max_old_space_size=4096 refine dev",
    "build": "refine build",
    "start": "refine start",
    "lint": "next lint",
    "refine": "refine",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@emotion/react": "^11.11.0",
    "@mantine/core": "5.10.5",
    "@mantine/hooks": "5.10.5",
    "@mantine/form": "5.10.5",
    "@mantine/notifications": "5.10.5",
    "@mantine/dates": "5.10.5",
    "@mantine/charts": "5.10.5",
    "@refinedev/core": "^4.47.1",
    "@refinedev/mantine": "^2.36.2",
    "@refinedev/nextjs-router": "^6.0.0",
    "@refinedev/react-table": "^5.6.6",
    "@refinedev/supabase": "^5.7.4",
    "@supabase/ssr": "^0.3.0",
    "@supabase/supabase-js": "^2.39.0",
    "@tabler/icons-react": "^3.14.0",
    "@tanstack/react-table": "^8.2.6",
    "dayjs": "^1.11.10",
    "js-cookie": "^3.0.5",
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@refinedev/cli": "^2.16.21",
    "@refinedev/devtools": "^1.1.32",
    "@refinedev/inferencer": "^5.1.1",
    "@playwright/test": "^1.40.0",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@types/js-cookie": "^3.0.6",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/parser": "^6.21.0",
    "cross-env": "^7.0.3",
    "eslint": "^8",
    "eslint-config-next": "^14.1.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "typescript": "^5.3.0"
  },
  "refine": {
    "projectId": "uMW5Qq-paqJCq-BpOJx8"
  }
}
EOF

mv fix-packages.json package.json

echo "📦 Installing corrected dependencies..."
npm install

echo "✅ Package fixes complete!"
