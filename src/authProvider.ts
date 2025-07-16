import { AuthBindings } from "@refinedev/core";
import { supabaseClient } from "./utility/supabaseClient";

const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { success: true, redirectTo: "/" };
  },
  logout: async () => {
    await supabaseClient.auth.signOut();
    return { success: true, redirectTo: "/login" };
  },
  check: async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    return session ? { authenticated: true } : { authenticated: false, redirectTo: "/login" };
  },
  getIdentity: async () => {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
  },
  getPermissions: async () => null,
  onError: async () => ({ }),
};

export default authProvider;
