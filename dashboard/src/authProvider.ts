import { AuthBindings } from "@refinedev/core";
import { supabaseClient } from "./utility/supabaseClient";
import { notification } from "@mantine/notifications";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  user_type: "super_admin" | "admin" | "organizer" | "vendor" | "sponsor" | "user";
  avatar_url?: string;
  permissions?: Record<string, any>;
  vendor_profiles?: any;
  media_profiles?: any;
  created_at: string;
  updated_at: string;
}

const authProvider: AuthBindings = {
  login: async ({ email, password, remember }) => {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        return {
          success: false,
          error: {
            name: "LoginError",
            message: error.message || "Invalid login credentials",
          },
        };
      }

      if (data?.user) {
        // Fetch complete user profile
        const { data: profile } = await supabaseClient
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profile) {
          // Store user data in localStorage for quick access
          if (remember) {
            localStorage.setItem("remember_me", "true");
          }
          
          // Log activity
          await supabaseClient
            .from("activity_logs")
            .insert({
              user_id: data.user.id,
              action: "login",
              metadata: { 
                user_type: profile.user_type,
                ip: window.location.hostname 
              }
            });
        }

        notification.show({
          title: "Welcome back!",
          message: `Logged in as ${profile?.full_name || email}`,
          color: "green",
        });

        // Redirect based on user role
        const redirectMap = {
          super_admin: "/admin",
          admin: "/admin",
          organizer: "/organizer",
          vendor: "/vendor",
          sponsor: "/sponsor",
          user: "/dashboard"
        };

        return { 
          success: true, 
          redirectTo: redirectMap[profile?.user_type] || "/" 
        };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Login failed",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "An unexpected error occurred",
        },
      };
    }
  },

  logout: async () => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      
      if (user) {
        // Log activity before logout
        await supabaseClient
          .from("activity_logs")
          .insert({
            user_id: user.id,
            action: "logout",
            metadata: {}
          });
      }

      const { error } = await supabaseClient.auth.signOut();
      
      if (error) {
        return {
          success: false,
          error: {
            name: "LogoutError",
            message: error.message,
          },
        };
      }

      // Clear all local storage
      localStorage.removeItem("remember_me");
      
      notification.show({
        title: "Goodbye!",
        message: "You have been logged out successfully",
        color: "blue",
      });

      return { 
        success: true, 
        redirectTo: "/login" 
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "LogoutError",
          message: "Failed to logout",
        },
      };
    }
  },

  check: async () => {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      
      if (session) {
        // Refresh session if needed
        const { data: { user } } = await supabaseClient.auth.getUser();
        
        if (user) {
          // Check if user is active
          const { data: profile } = await supabaseClient
            .from("users")
            .select("status")
            .eq("id", user.id)
            .single();

          if (profile?.status === "inactive" || profile?.status === "suspended") {
            await supabaseClient.auth.signOut();
            return { 
              authenticated: false, 
              redirectTo: "/login",
              error: {
                name: "AccountError",
                message: "Your account has been suspended"
              }
            };
          }

          return { authenticated: true };
        }
      }
      
      return { 
        authenticated: false, 
        redirectTo: "/login" 
      };
    } catch (error) {
      return { 
        authenticated: false, 
        redirectTo: "/login" 
      };
    }
  },

  getIdentity: async () => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      
      if (!user) return null;

      // Fetch complete user profile with related data
      const { data: profile, error } = await supabaseClient
        .from("users")
        .select(`
          *,
          vendor_profiles (
            id,
            business_name,
            service_type,
            verified
          ),
          media_profiles (
            id,
            organization_name,
            media_type,
            verified
          )
        `)
        .eq("id", user.id)
        .single();

      if (error || !profile) {
        console.error("Error fetching user identity:", error);
        return {
          id: user.id,
          name: user.email,
          email: user.email,
        };
      }

      return {
        id: profile.id,
        name: profile.full_name || profile.email,
        email: profile.email,
        avatar: profile.avatar_url,
        role: profile.user_type,
        ...profile,
      };
    } catch (error) {
      console.error("Get identity error:", error);
      return null;
    }
  },

  getPermissions: async () => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      
      if (!user) return null;

      const { data: profile } = await supabaseClient
        .from("users")
        .select("user_type, permissions")
        .eq("id", user.id)
        .single();

      if (!profile) return null;

      // Return structured permissions
      return {
        role: profile.user_type,
        permissions: profile.permissions || {},
        // Add computed permissions based on role
        canAccessAdmin: ["super_admin", "admin"].includes(profile.user_type),
        canManageEvents: ["super_admin", "admin", "organizer"].includes(profile.user_type),
        canManageUsers: ["super_admin", "admin"].includes(profile.user_type),
        canViewAnalytics: ["super_admin", "admin", "organizer"].includes(profile.user_type),
      };
    } catch (error) {
      console.error("Get permissions error:", error);
      return null;
    }
  },

  onError: async (error) => {
    console.error("Auth error:", error);
    
    if (error?.statusCode === 401) {
      notification.show({
        title: "Session Expired",
        message: "Please login again",
        color: "orange",
      });
      
      return {
        redirectTo: "/login",
        error,
      };
    }

    notification.show({
      title: "Authentication Error",
      message: error?.message || "An error occurred",
      color: "red",
    });

    return { error };
  },

  forgotPassword: async ({ email }) => {
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return {
          success: false,
          error: {
            name: "ForgotPasswordError",
            message: error.message,
          },
        };
      }

      notification.show({
        title: "Check your email",
        message: "We've sent you a password reset link",
        color: "blue",
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "ForgotPasswordError",
          message: "Failed to send reset email",
        },
      };
    }
  },

  updatePassword: async ({ password }) => {
    try {
      const { error } = await supabaseClient.auth.updateUser({ 
        password 
      });

      if (error) {
        return {
          success: false,
          error: {
            name: "UpdatePasswordError",
            message: error.message,
          },
        };
      }

      notification.show({
        title: "Password Updated",
        message: "Your password has been changed successfully",
        color: "green",
      });

      return { 
        success: true,
        redirectTo: "/dashboard" 
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "UpdatePasswordError",
          message: "Failed to update password",
        },
      };
    }
  },
};

export default authProvider;
