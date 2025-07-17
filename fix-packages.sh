#!/bin/bash

echo "🔧 Fixing FashionOS package dependencies..."

# Step 1: Uninstall incorrect versions
echo "📦 Removing incorrect Mantine v8 packages..."
npm uninstall @mantine/charts @mantine/dates

# Step 2: Install correct v5 versions
echo "📦 Installing correct Mantine v5 packages..."
npm install @mantine/charts@5.10.5 @mantine/dates@5.10.5

# Step 3: Move dev dependencies to devDependencies
echo "📦 Moving dev tools to devDependencies..."
npm uninstall @refinedev/cli @refinedev/devtools
npm install --save-dev @refinedev/cli@^2.16.21 @refinedev/devtools@^1.1.32

# Step 4: Install Playwright for testing
echo "🧪 Installing Playwright..."
npm install --save-dev @playwright/test playwright

echo "✅ Package fixes complete!"
