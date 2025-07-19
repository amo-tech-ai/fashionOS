# FashionOS Development Guide

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm typecheck

# Health check
curl http://localhost:${PORT:-3000}/api/health
```

## 📍 Port Configuration

The application will auto-select an available port between 3000-3010.
To lock a specific port, add to `.env.local`:

```env
PORT=3000
```

## 🔍 Verification Commands

```bash
# Check TypeScript errors
pnpm typecheck

# Verify build
pnpm build && echo "Build successful!"

# Test health endpoint
curl -s http://localhost:3000/api/health | jq

# Check bundle size
pnpm build && ls -lah .next/static/chunks
```

## 📊 Performance Benchmarks

Run performance tests:
```bash
./scripts/benchmark.sh
```

Results are saved to:
- `lighthouse-report.html`
- `bundle-analysis.json`
- `PERFORMANCE.md`

## 🔐 Authentication Setup

User roles are automatically detected from Supabase auth:
- `admin` - Full system access
- `organizer` - Event management
- `sponsor` - Sponsorship features
- `model` - Portfolio management
- `designer` - Collection management
- `venue` - Venue management
- `vendor` - Product management
- `media` - Press features

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Type checking
pnpm typecheck
```

## 📦 Deployment

```bash
# Production build
pnpm build

# Deploy to Vercel
vercel

# Deploy to custom server
pnpm build && pnpm start
```

## 🛠️ Troubleshooting

### Port already in use
- Check `.env.local` for PORT setting
- Kill existing processes: `lsof -ti:3000 | xargs kill -9`

### TypeScript errors
- Run `pnpm typecheck` for detailed report
- Non-blocking warnings don't prevent build

### Missing dependencies
- Run `pnpm install`
- Clear cache: `rm -rf node_modules .next && pnpm install`