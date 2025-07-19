#!/bin/bash

# Route Existence Smoke Test
# Tests that all menu routes return a non-404 status

echo "🧪 Testing Route Existence..."

# Array of routes to test
routes=(
  "/"
  "/events"
  "/admin"
  "/admin/users"
  "/organizer"
  "/sponsor"
  "/model"
  "/designer"
  "/venue"
  "/vendor"
  "/media"
  "/blog-posts"
  "/categories"
  "/analytics"
  "/settings"
)

# Base URL (adjust port if needed)
BASE_URL="http://localhost:3006"

# Check if server is running
if ! curl -s "$BASE_URL" > /dev/null; then
  echo "❌ Server not running at $BASE_URL"
  echo "Please start the dev server: pnpm dev"
  exit 1
fi

# Test each route
failed=0
for route in "${routes[@]}"; do
  url="$BASE_URL$route"
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  
  if [ "$status" = "200" ] || [ "$status" = "301" ] || [ "$status" = "302" ]; then
    echo "✅ $route - Status: $status"
  else
    echo "❌ $route - Status: $status"
    ((failed++))
  fi
done

echo ""
if [ $failed -eq 0 ]; then
  echo "✅ All routes exist!"
else
  echo "❌ $failed routes failed"
fi