"use client";

import { DashboardRouter } from "@/components/dashboards/shared/DashboardRouter";
import { AuthProvider } from "@/contexts/AuthContext";

export default function DashboardPage() {
  return (
    <AuthProvider>
      <DashboardRouter />
    </AuthProvider>
  );
}
