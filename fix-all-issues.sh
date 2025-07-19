#!/bin/bash
set -e

echo "🔧 FashionOS Complete Fix Script"
echo "================================="

# Navigate to project directory
cd /home/sk25/fx/fashionos

# 1. Kill any existing processes on common ports
echo "🛑 Killing existing processes..."
pkill -f "node.*refine" || true
pkill -f "next.*dev" || true
sleep 2

# 2. Clean up port conflicts
echo "🔧 Checking for port conflicts..."
for port in 3000 3001 3002 3003 3004 3005 5001; do
    pid=$(lsof -ti :$port) || true
    if [ ! -z "$pid" ]; then
        echo "   Killing process on port $port (PID: $pid)"
        kill -9 $pid || true
    fi
done

# 3. Set environment variables to avoid port conflicts
echo "📝 Setting environment variables..."
export REFINE_DEVTOOLS_PORT=5002
export PORT=3000

# 4. Clean install dependencies
echo "📦 Cleaning and reinstalling dependencies..."
rm -rf node_modules/.cache
rm -rf .next
pnpm install --frozen-lockfile

echo "✅ Fix complete! Ready to start development server."
echo ""
echo "To start the server:"
echo "REFINE_DEVTOOLS_PORT=5002 PORT=3000 pnpm dev"
