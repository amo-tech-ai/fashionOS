"use client";

import "@/styles/global.css";
import { 
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme
} from "@mantine/core";
import { Refine } from "@refinedev/core";
import { RefineThemes } from "@refinedev/mantine";
import { NotificationsProvider } from "@mantine/notifications";
import routerProvider from "@refinedev/nextjs-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { supabaseClient } from "@/utility/supabaseClient";
import authProvider from "@/authProvider";
import { useState, Suspense } from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocalStorage } from '@mantine/hooks';

// Dynamic imports for better performance
const CustomThemedLayout = dynamic(
  () => import("@/components/layout/CustomThemedLayout").then(mod => mod.CustomThemedLayout),
  { ssr: false }
);

// Loading component
function LoadingSpinner() {
  return <div>Loading...</div>;
}

// Error fallback component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert" style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Something went wrong:</h2>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}

// Wrapper component for layout content
function LayoutContent({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'fashionos-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          ...RefineThemes.Blue,
          colorScheme,
          primaryColor: "blue",
          defaultRadius: "md",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
        withNormalizeCSS
        withGlobalStyles
      >
        <NotificationsProvider position="top-right">
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            resources={[
              // Main Dashboard
              {
                name: "dashboard",
                list: "/",
                meta: {
                  label: "Dashboard",
                  icon: "🏠",
                },
              },
              // Events Management
              {
                name: "events",
                list: "/events",
                create: "/events/create",
                edit: "/events/edit/:id",
                show: "/events/show/:id",
                meta: {
                  label: "Events",
                  icon: "🎭",
                },
              },
              // Admin Features
              {
                name: "admin",
                list: "/admin",
                meta: {
                  label: "Admin Panel",
                  icon: "⚙️",
                  parent: "administration",
                },
              },
              {
                name: "users",
                list: "/admin/users",
                create: "/admin/users/create",
                edit: "/admin/users/edit/:id",
                show: "/admin/users/show/:id",
                meta: {
                  label: "User Management",
                  icon: "👥",
                  parent: "administration",
                },
              },
              // Organizer Features
              {
                name: "organizer",
                list: "/organizer",
                meta: {
                  label: "Organizer Hub",
                  icon: "📋",
                },
              },
              // Sponsor Features
              {
                name: "sponsor",
                list: "/sponsor",
                meta: {
                  label: "Sponsor Portal",
                  icon: "💰",
                },
              },
              {
                name: "sponsorships",
                list: "/sponsor/sponsorships",
                create: "/sponsor/sponsorships/create",
                edit: "/sponsor/sponsorships/edit/:id",
                meta: {
                  label: "My Sponsorships",
                  icon: "🤝",
                  parent: "sponsor",
                },
              },
              {
                name: "roi-analytics",
                list: "/sponsor/roi",
                meta: {
                  label: "ROI Analytics",
                  icon: "📊",
                  parent: "sponsor",
                },
              },
              // Model Features
              {
                name: "model",
                list: "/model",
                meta: {
                  label: "Model Hub",
                  icon: "💃",
                },
              },
              {
                name: "model-portfolio",
                list: "/model/portfolio",
                create: "/model/portfolio/create",
                edit: "/model/portfolio/edit/:id",
                meta: {
                  label: "My Portfolio",
                  icon: "📸",
                  parent: "model",
                },
              },
              {
                name: "model-bookings",
                list: "/model/bookings",
                meta: {
                  label: "My Bookings",
                  icon: "📅",
                  parent: "model",
                },
              },
              // Designer Features
              {
                name: "designer",
                list: "/designer",
                meta: {
                  label: "Designer Studio",
                  icon: "🎨",
                },
              },
              {
                name: "collections",
                list: "/designer/collections",
                create: "/designer/collections/create",
                edit: "/designer/collections/edit/:id",
                meta: {
                  label: "Collections",
                  icon: "👗",
                  parent: "designer",
                },
              },
              // Venue Features
              {
                name: "venue",
                list: "/venue",
                meta: {
                  label: "Venue Manager",
                  icon: "🏛️",
                },
              },
              {
                name: "venues",
                list: "/venue/spaces",
                create: "/venue/spaces/create",
                edit: "/venue/spaces/edit/:id",
                meta: {
                  label: "My Venues",
                  icon: "🏢",
                  parent: "venue",
                },
              },
              {
                name: "venue-bookings",
                list: "/venue/bookings",
                meta: {
                  label: "Venue Bookings",
                  icon: "📆",
                  parent: "venue",
                },
              },
              // Vendor Features
              {
                name: "vendor",
                list: "/vendor",
                meta: {
                  label: "Vendor Portal",
                  icon: "🛍️",
                },
              },
              {
                name: "products",
                list: "/vendor/products",
                create: "/vendor/products/create",
                edit: "/vendor/products/edit/:id",
                meta: {
                  label: "Products",
                  icon: "📦",
                  parent: "vendor",
                },
              },
              // Media Features
              {
                name: "media",
                list: "/media",
                meta: {
                  label: "Media Center",
                  icon: "📰",
                },
              },
              {
                name: "press-releases",
                list: "/media/press",
                create: "/media/press/create",
                edit: "/media/press/edit/:id",
                meta: {
                  label: "Press Releases",
                  icon: "📢",
                  parent: "media",
                },
              },
              // Blog & Content
              {
                name: "blog_posts", 
                list: "/blog-posts",
                create: "/blog-posts/create",
                edit: "/blog-posts/edit/:id",
                show: "/blog-posts/show/:id",
                meta: {
                  label: "Blog Posts",
                  icon: "📝",
                },
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                edit: "/categories/edit/:id",
                meta: {
                  label: "Categories", 
                  icon: "🏷️",
                },
              },
              // Analytics & Reports
              {
                name: "analytics",
                list: "/analytics",
                meta: {
                  label: "Analytics",
                  icon: "📈",
                },
              },
              // Settings
              {
                name: "settings",
                list: "/settings",
                meta: {
                  label: "Settings",
                  icon: "⚙️",
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "fashionos-v2",
            }}
          >
            <CustomThemedLayout
              Title={() => (
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--mantine-color-blue-6)"
                }}>
                  🌟 FashionOS
                </div>
              )}
            >
              {children}
            </CustomThemedLayout>
          </Refine>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>FashionOS - Event Management System</title>
        <meta name="description" content="Professional fashion event management platform" />
      </head>
      <body>
        <ErrorBoundary fallback={<ErrorFallback error={new Error("Application Error")} />}>
          <Suspense fallback={<LoadingSpinner />}>
            <LayoutContent>{children}</LayoutContent>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
