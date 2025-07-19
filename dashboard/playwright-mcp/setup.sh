#!/bin/bash

# FashionOS Playwright MCP Setup Script
# Automated browser testing and control

echo "🎭 Setting up Playwright MCP for FashionOS..."

# Install dependencies
cd /home/sk25/fx/dashboard/playwright-mcp
npm install

# Install Playwright browsers
npx playwright install

# Create MCP configuration
cat > mcp-config.json << EOF
{
  "server": {
    "port": 4600,
    "host": "0.0.0.0",
    "browser": "chromium",
    "headless": false,
    "viewport": {
      "width": 1280,
      "height": 720
    },
    "capabilities": [
      "tabs",
      "pdf",
      "history",
      "wait",
      "files",
      "install"
    ],
    "allowedOrigins": "http://localhost:4572;http://localhost:4570",
    "outputDir": "./test-results"
  }
}
EOF

echo "✅ Playwright MCP setup complete!"
echo ""
echo "🚀 Quick Start Commands:"
echo "  Run tests:           npm test"
echo "  Debug tests:         npm run test:debug"
echo "  Start MCP server:    npm run mcp:server"
echo "  Record new tests:    npm run record"
echo ""
echo "📊 Test Results:       ./test-results/index.html"
