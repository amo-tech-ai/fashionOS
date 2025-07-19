// Access Control Provider for FashionOS Dashboard
// This provider implements role-based access control following Refine best practices

import { AccessControlProvider } from "@refinedev/core";
import { supabaseClient } from "@/utility/supabaseClient";

// Define role hierarchy and permissions
const rolePermissions = {
  super_admin: {
    resources: ["*"], // Access to everything
    actions: ["*"]
  },
  admin: {
    resources: ["dashboard", "events", "users", "venues", "vendors", "sponsors", "analytics"],
    actions: ["list", "create", "edit", "delete", "show"]
  },
  organizer: {
    resources: ["dashboard", "events", "venues", "vendors", "models"],
    actions: ["list", "create", "edit", "show"],
    conditions: {
      events: "own", // Can only manage own events
    }
  },
  vendor: {
    resources: ["dashboard", "vendor_profiles", "bookings", "availability"],
    actions: ["list", "edit", "show"],
    conditions: {
      vendor_profiles: "own",
      bookings: "own"
    }
  },
  sponsor: {
    resources: ["dashboard", "sponsor_profiles", "sponsorships", "analytics"],
    actions: ["list", "edit", "show"],
    conditions: {
      sponsor_profiles: "own",
      sponsorships: "own"
    }
  },
  user: {
    resources: ["dashboard", "events"],
    actions: ["list", "show"]
  }
};

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, params }) => {
    try {
      // Get current user
      const { data: { user } } = await supabaseClient.auth.getUser();
      
      if (!user) {
        return { can: false, reason: "Not authenticated" };
      }

      // Fetch user role and details from database
      const { data: userProfile, error } = await supabaseClient
        .from("users")
        .select(`
          id,
          user_type,
          permissions,
          vendor_profiles!inner(id),
          media_profiles!inner(id)
        `)
        .eq("id", user.id)
        .single();

      if (error || !userProfile) {
        console.error("Error fetching user profile:", error);
        return { can: false, reason: "Failed to fetch user permissions" };
      }

      const userRole = userProfile.user_type || "user";
      const permissions = rolePermissions[userRole];

      if (!permissions) {
        return { can: false, reason: "Invalid user role" };
      }

      // Super admin can do everything
      if (userRole === "super_admin") {
        return { can: true };
      }

      // Check if user has access to resource
      const hasResourceAccess = 
        permissions.resources.includes("*") || 
        permissions.resources.includes(resource);

      if (!hasResourceAccess) {
        return { can: false, reason: "No access to this resource" };
      }

      // Check if user can perform action
      const hasActionAccess = 
        permissions.actions.includes("*") || 
        permissions.actions.includes(action);

      if (!hasActionAccess) {
        return { can: false, reason: "Cannot perform this action" };
      }

      // Check conditions for specific resources
      if (permissions.conditions && permissions.conditions[resource]) {
        const condition = permissions.conditions[resource];
        
        if (condition === "own" && params?.id) {
          // Check ownership based on resource type
          const ownershipCheck = await checkOwnership(
            resource, 
            params.id, 
            user.id, 
            userRole,
            userProfile
          );
          
          if (!ownershipCheck) {
            return { can: false, reason: "You can only access your own records" };
          }
        }
      }

      return { can: true };
    } catch (error) {
      console.error("Access control error:", error);
      return { can: false, reason: "Error checking permissions" };
    }
  },

  options: {
    buttons: {
      enableAccessControl: true,
      hideIfUnauthorized: true, // Hide buttons if user doesn't have access
    },
  },
};

// Helper function to check ownership
async function checkOwnership(
  resource: string, 
  recordId: string, 
  userId: string,
  userRole: string,
  userProfile: any
): Promise<boolean> {
  switch (resource) {
    case "events":
      if (userRole === "organizer") {
        const { data } = await supabaseClient
          .from("event_planning")
          .select("lead_organizer_id")
          .eq("event_id", recordId)
          .single();
        
        return data?.lead_organizer_id === userId;
      }
      break;

    case "vendor_profiles":
      if (userRole === "vendor") {
        return userProfile.vendor_profiles?.id === recordId;
      }
      break;

    case "sponsor_profiles":
      if (userRole === "sponsor") {
        const { data } = await supabaseClient
          .from("sponsors")
          .select("user_id")
          .eq("id", recordId)
          .single();
        
        return data?.user_id === userId;
      }
      break;

    case "bookings":
      if (userRole === "vendor") {
        const { data } = await supabaseClient
          .from("event_vendors")
          .select("vendor_id")
          .eq("id", recordId)
          .single();
        
        return data?.vendor_id === userProfile.vendor_profiles?.id;
      }
      break;
  }

  return false;
}

// Export helper to get user permissions
export async function getUserPermissions() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return null;

  const { data: userProfile } = await supabaseClient
    .from("users")
    .select("user_type, permissions")
    .eq("id", user.id)
    .single();

  return {
    role: userProfile?.user_type || "user",
    permissions: userProfile?.permissions || {},
    ...rolePermissions[userProfile?.user_type || "user"]
  };
}
