# Fashionistas - Modern Event Management Platform

## 🎨 Overview

Fashionistas is a comprehensive event management platform built with modern technologies, featuring both an admin dashboard and a customer-facing website.

## 🏗️ Project Structure

```
fashionistas/
├── dashboard/          # Admin dashboard (Refine + Mantine + Supabase)
├── website/           # Customer website (Next.js + Mantine)
├── PLATFORM_GUIDE.md  # Platform documentation
└── start-platform.sh  # Startup script
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm or npm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amo-tech-ai/fashionistas.git
cd fashionistas
```

2. Install dependencies:
```bash
# Dashboard
cd dashboard
npm install

# Website
cd ../website
npm install
```

3. Set up environment variables:
```bash
# Copy example env files
cp dashboard/.env.example dashboard/.env.local
cp website/.env.example website/.env.local
```

4. Start the development servers:
```bash
# Option 1: Use the startup script
./start-platform.sh

# Option 2: Run individually
# Terminal 1 - Dashboard
cd dashboard && npm run dev

# Terminal 2 - Website
cd website && npm run dev
```

## 🌐 Access Points

- **Admin Dashboard**: http://localhost:4572
- **Customer Website**: http://localhost:4570

## 🛠️ Tech Stack

### Dashboard
- **Framework**: Refine
- **UI Library**: Mantine v5
- **Backend**: Supabase
- **Language**: TypeScript
- **Authentication**: Supabase Auth

### Website
- **Framework**: Next.js 14
- **UI Library**: Mantine
- **Styling**: CSS Modules
- **Language**: TypeScript

## 📚 Documentation

- [Platform Guide](./PLATFORM_GUIDE.md)
- [Dashboard Implementation](./dashboard/IMPLEMENTATION_GUIDE.md)
- [Dashboard Analysis](./dashboard/DASHBOARD_ANALYSIS_REPORT.md)

## 🔒 Security

- Row Level Security (RLS) enabled
- Multi-role authentication
- Secure API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential.

## 🙏 Acknowledgments

Built with ❤️ using:
- [Refine](https://refine.dev)
- [Mantine](https://mantine.dev)
- [Supabase](https://supabase.com)
- [Next.js](https://nextjs.org)
