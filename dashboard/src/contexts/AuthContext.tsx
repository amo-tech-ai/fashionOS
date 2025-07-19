import React, { createContext, useContext, useEffect, useState } from 'react';
import { useGetIdentity } from '@refinedev/core';
import { supabaseClient } from '@/utility/supabaseClient';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  user_type: string;
  company?: string;
  avatar_url?: string;
  is_verified?: boolean;
  subscription_tier?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: string | null;
  canAccessDashboard: (dashboard: string) => boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const dashboardAccessMap = {
  admin: ['admin', 'super_admin'],
  organizer: ['organizer', 'admin', 'super_admin'],
  sponsor: ['sponsor', 'admin', 'super_admin'],
  designer: ['designer', 'admin', 'super_admin'],
  model: ['model', 'admin', 'super_admin'],
  venue: ['venue', 'admin', 'super_admin'],
  vendor: ['vendor', 'admin', 'super_admin'],
  media: ['media', 'admin', 'super_admin'],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: identity, isLoading: identityLoading } = useGetIdentity<User>();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        
        if (session?.user) {
          // Get full user profile from database
          const { data: userProfile } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (userProfile) {
            setUser(userProfile);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: userProfile } = await supabaseClient
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userProfile) {
          setUser(userProfile);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const canAccessDashboard = (dashboard: string): boolean => {
    if (!user) return false;
    const allowedRoles = dashboardAccessMap[dashboard] || [];
    return allowedRoles.includes(user.user_type || user.role);
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();
    setUser(null);
  };

  const value: AuthContextType = {
    user: user || identity || null,
    isLoading: isLoading || identityLoading,
    isAuthenticated: !!user || !!identity,
    userRole: user?.user_type || user?.role || identity?.user_type || identity?.role || null,
    canAccessDashboard,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
