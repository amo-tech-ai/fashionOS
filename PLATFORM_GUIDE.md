# 🎉 Fashionistas Complete Platform

## ✅ Migration Complete
Both the admin dashboard and customer website are now consolidated under `/home/sk25/fx/fashionistas/`

## 📁 New Structure
```
/home/sk25/fx/fashionistas/
├── website/              # Customer-facing website (Port 4570)
├── playwright-mcp/       # Automated testing framework
├── src/                  # Dashboard source code
├── node_modules/         # Dashboard dependencies
├── package.json          # Dashboard config
└── [other dashboard files]
```

## 🌐 Running Services

### 1. Admin Dashboard
- **URL**: http://localhost:4572
- **Location**: `/home/sk25/fx/fashionistas/`
- **Purpose**: Internal event management system
- **Status**: ✅ Running

### 2. Customer Website
- **URL**: http://localhost:4570
- **Location**: `/home/sk25/fx/fashionistas/website/`
- **Purpose**: Customer-facing fashion platform
- **Status**: ✅ Running

## 🚀 Quick Commands

### Start Both Services
```bash
# Terminal 1 - Dashboard
cd /home/sk25/fx/fashionistas
PORT=4572 npm run dev

# Terminal 2 - Website
cd /home/sk25/fx/fashionistas/website
PORT=4570 npm run dev
```

### Individual Commands
```bash
# Dashboard only
cd /home/sk25/fx/fashionistas && npm run dev

# Website only
cd /home/sk25/fx/fashionistas/website && npm run dev

# Run tests
cd /home/sk25/fx/fashionistas/playwright-mcp && npm test
```

## 📊 Service Status Check
```bash
# Check dashboard
curl -I http://localhost:4572

# Check website
curl -I http://localhost:4570

# Check both
curl -s -o /dev/null -w "Dashboard: %{http_code}\n" http://localhost:4572 && \
curl -s -o /dev/null -w "Website: %{http_code}\n" http://localhost:4570
```

## 🛠️ Development Workflow

1. **Dashboard Development**
   - Edit files in `/home/sk25/fx/fashionistas/src/`
   - Access at http://localhost:4572
   - Hot reload enabled

2. **Website Development**
   - Edit files in `/home/sk25/fx/fashionistas/website/`
   - Access at http://localhost:4570
   - Mantine UI components

3. **Testing**
   - Run from `/home/sk25/fx/fashionistas/playwright-mcp/`
   - Tests both dashboard and website
   - Automated browser control

## 📝 Environment Variables
- Dashboard: `/home/sk25/fx/fashionistas/.env.local`
- Website: `/home/sk25/fx/fashionistas/website/.env.local`

## 🎯 Next Steps
1. Update any CI/CD pipelines to new paths
2. Update documentation with new structure
3. Consider creating a monorepo setup
4. Add shared components library

## 💡 Pro Tips
- Use `tmux` or multiple terminals to run both services
- The dashboard uses Refine framework
- The website uses Mantine components
- Both share similar Next.js configurations
