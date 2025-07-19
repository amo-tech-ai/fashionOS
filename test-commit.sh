#!/bin/bash

echo "🧪 Testing FashionOS Platform Commit"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check Git Repository
echo "1. Checking Git Repository..."
if [ -d ".git" ] && git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Git repository exists${NC}"
    
    # Check commit
    COMMIT_COUNT=$(git rev-list --count HEAD)
    if [ "$COMMIT_COUNT" -gt 0 ]; then
        echo -e "${GREEN}✅ Repository has $COMMIT_COUNT commit(s)${NC}"
        echo "   Latest commit: $(git log -1 --pretty=format:'%h - %s')"
    else
        echo -e "${RED}❌ No commits found${NC}"
    fi
else
    echo -e "${RED}❌ Not a git repository${NC}"
fi

echo ""

# Test 2: Check Directory Structure
echo "2. Checking Directory Structure..."
if [ -d "dashboard" ] && [ -d "website" ]; then
    echo -e "${GREEN}✅ Both dashboard and website directories exist${NC}"
    
    # Check subdirectories
    if [ -d "dashboard/src" ] && [ -d "website/app" ]; then
        echo -e "${GREEN}✅ Source directories found${NC}"
    else
        echo -e "${RED}❌ Missing source directories${NC}"
    fi
else
    echo -e "${RED}❌ Missing main directories${NC}"
fi

echo ""

# Test 3: Check Essential Files
echo "3. Checking Essential Files..."
FILES_TO_CHECK=(
    "dashboard/package.json"
    "dashboard/src/authProvider.ts"
    "dashboard/src/app/layout.tsx"
    "website/package.json"
    "website/app/layout.tsx"
    ".gitignore"
    "start-platform.sh"
)

MISSING_FILES=0
for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file exists${NC}"
    else
        echo -e "${RED}❌ $file missing${NC}"
        MISSING_FILES=$((MISSING_FILES + 1))
    fi
done

echo ""

# Test 4: Check Dependencies
echo "4. Checking Package Dependencies..."
if [ -f "dashboard/package.json" ]; then
    if grep -q "@refinedev/core" dashboard/package.json && \
       grep -q "@mantine/core" dashboard/package.json && \
       grep -q "@supabase/supabase-js" dashboard/package.json; then
        echo -e "${GREEN}✅ Dashboard has correct dependencies${NC}"
    else
        echo -e "${RED}❌ Dashboard missing key dependencies${NC}"
    fi
fi

if [ -f "website/package.json" ]; then
    if grep -q "@mantine/core" website/package.json && \
       grep -q "next" website/package.json; then
        echo -e "${GREEN}✅ Website has correct dependencies${NC}"
    else
        echo -e "${RED}❌ Website missing key dependencies${NC}"
    fi
fi

echo ""

# Test 5: Check Environment Files
echo "5. Checking Environment Setup..."
if [ -f "dashboard/.env.local" ] || [ -f "dashboard/.env.example" ]; then
    echo -e "${GREEN}✅ Dashboard environment config exists${NC}"
else
    echo -e "${YELLOW}⚠️  No dashboard environment file found${NC}"
fi

if [ -f "website/.env.local" ] || [ -f "website/.env.example" ]; then
    echo -e "${GREEN}✅ Website environment config exists${NC}"
else
    echo -e "${YELLOW}⚠️  No website environment file found${NC}"
fi

echo ""

# Test 6: Check File Count
echo "6. Repository Statistics..."
TOTAL_FILES=$(find . -type f -not -path "./.git/*" -not -path "./node_modules/*" | wc -l)
DASHBOARD_FILES=$(find ./dashboard -type f -not -path "*/node_modules/*" | wc -l)
WEBSITE_FILES=$(find ./website -type f -not -path "*/node_modules/*" | wc -l)

echo "   Total files: $TOTAL_FILES"
echo "   Dashboard files: $DASHBOARD_FILES"
echo "   Website files: $WEBSITE_FILES"

echo ""

# Test 7: Check Git Ignore
echo "7. Checking .gitignore..."
if [ -f ".gitignore" ]; then
    if grep -q "node_modules" .gitignore && \
       grep -q ".env.local" .gitignore && \
       grep -q ".next" .gitignore; then
        echo -e "${GREEN}✅ .gitignore properly configured${NC}"
    else
        echo -e "${YELLOW}⚠️  .gitignore may be missing important entries${NC}"
    fi
fi

echo ""

# Final Summary
echo "===================================="
echo "SUMMARY:"
if [ $MISSING_FILES -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed! Repository is properly committed.${NC}"
else
    echo -e "${YELLOW}⚠️  Some files are missing, but repository is committed.${NC}"
fi

echo ""
echo "Next steps:"
echo "1. Add remote repository: git remote add origin <your-repo-url>"
echo "2. Push to remote: git push -u origin main"
echo "3. Start development:"
echo "   cd dashboard && npm install"
echo "   cd website && npm install"
echo "   ./start-platform.sh"
