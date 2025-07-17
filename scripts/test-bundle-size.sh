#!/bin/bash

# Test 5: Performance & Bundle Impact Test
# Analyzes the bundle size impact of the menu system

echo "🧪 Test 5: Performance & Bundle Impact Test"

# Check if build exists
if [ ! -d ".next" ]; then
  echo "❌ No build found. Running build..."
  pnpm build
fi

echo "\n📊 Analyzing bundle sizes..."

# Find all JS chunks
echo "\n📦 JavaScript Chunks:"
find .next/static/chunks -name "*.js" -type f -exec ls -lh {} \; | awk '{print $9 ": " $5}'

# Calculate total size
total_size=$(find .next/static/chunks -name "*.js" -type f -exec ls -l {} \; | awk '{sum += $5} END {print sum}')
total_size_mb=$(echo "scale=2; $total_size / 1024 / 1024" | bc)

echo "\n📈 Total JS size: ${total_size_mb} MB"

# Check for large chunks
echo "\n⚠️ Large chunks (>100KB):"
find .next/static/chunks -name "*.js" -size +100k -exec ls -lh {} \; | awk '{print $9 ": " $5}'

# Specific checks for icon libraries
echo "\n🎨 Checking for icon bundle size..."
icon_chunk=$(find .next/static/chunks -name "*.js" -exec grep -l "tabler-icons" {} \; 2>/dev/null | head -1)
if [ -n "$icon_chunk" ]; then
  icon_size=$(ls -lh "$icon_chunk" | awk '{print $5}')
  echo "Icon chunk found: $icon_chunk ($icon_size)"
  
  # Check if tree-shaking is working
  if grep -q "IconMenu2\|IconChevronLeft\|IconHome" "$icon_chunk" 2>/dev/null; then
    echo "✅ Specific icons found (tree-shaking likely working)"
  else
    echo "⚠️ Could not verify tree-shaking"
  fi
fi

# Performance budget check
echo "\n🎯 Performance Budget Check:"
if (( $(echo "$total_size_mb < 5" | bc -l) )); then
  echo "✅ Total bundle size under 5MB budget"
else
  echo "❌ Total bundle exceeds 5MB budget"
fi

# Recommendations
echo "\n💡 Recommendations:"
echo "- Use dynamic imports for heavy components"
echo "- Ensure tree-shaking is working for icons"
echo "- Consider code splitting for role-specific features"
echo "- Run 'npx @next/bundle-analyzer' for detailed analysis"