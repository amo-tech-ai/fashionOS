#!/bin/bash

# Fashionistas Platform Startup Script
# Starts both dashboard and website

echo "🚀 Starting Fashionistas Platform..."
echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        return 0
    fi
}

# Check ports
echo "🔍 Checking ports..."
if check_port 4572; then
    echo "✅ Port 4572 is available for dashboard"
else
    echo "❌ Dashboard port 4572 is busy. Please free it first."
    exit 1
fi

if check_port 4570; then
    echo "✅ Port 4570 is available for website"
else
    echo "❌ Website port 4570 is busy. Please free it first."
    exit 1
fi

echo ""
echo "🎯 Starting services..."

# Start dashboard in background
echo "📊 Starting Dashboard on http://localhost:4572"
cd /home/sk25/fx/fashionistas/dashboard
PORT=4572 npm run dev > dashboard.log 2>&1 &
DASHBOARD_PID=$!
echo "   Dashboard PID: $DASHBOARD_PID"

# Wait a bit for dashboard to start
sleep 5

# Start website in background
echo "🌐 Starting Website on http://localhost:4570"
cd /home/sk25/fx/fashionistas/website
PORT=4570 npm run dev > website.log 2>&1 &
WEBSITE_PID=$!
echo "   Website PID: $WEBSITE_PID"

echo ""
echo "✅ Fashionistas Platform is starting!"
echo ""
echo "📌 Access your services at:"
echo "   Dashboard: http://localhost:4572"
echo "   Website:   http://localhost:4570"
echo ""
echo "📝 Logs are available at:"
echo "   Dashboard: /home/sk25/fx/fashionistas/dashboard/dashboard.log"
echo "   Website:   /home/sk25/fx/fashionistas/website/website.log"
echo ""
echo "🛑 To stop all services, run:"
echo "   kill $DASHBOARD_PID $WEBSITE_PID"
echo ""
echo "Happy coding! 🎉"
