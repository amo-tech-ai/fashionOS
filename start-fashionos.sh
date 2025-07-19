#!/bin/bash
set -e

echo "🚀 FashionOS Complete Startup Script"
echo "===================================="

cd /home/sk25/fx/fashionos

# Set environment variables
export REFINE_DEVTOOLS_PORT=5002
export PORT=3000
export NODE_OPTIONS="--max_old_space_size=4096"

# Kill any existing processes
echo "🛑 Cleaning up existing processes..."
pkill -f "node.*refine" || true
pkill -f "next.*dev" || true
for port in 3000 5002; do
    pid=$(lsof -ti :$port) || true
    if [ ! -z "$pid" ]; then
        echo "   Killing process on port $port (PID: $pid)"
        kill -9 $pid || true
    fi
done

echo "⏳ Starting FashionOS development server..."
echo "📍 Server will be available at: http://localhost:3000"
echo "🔧 Devtools will be available at: http://localhost:5002"
echo ""

# Start the development server
exec pnpm dev
