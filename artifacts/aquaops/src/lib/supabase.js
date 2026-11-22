import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables"
  )
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
// TEMPORARY: Platform Admin email change helper
if (import.meta.env.DEV) {
  window.requestPlatformAdminEmailChange = async () => {
    const { data: { user }, error: userError } =
      await supabase.auth.getUser();

    if (userError) {
      console.error(userError.message);
      return;
    }

    if (
      user?.id !== "a6eaefd7-5bdf-4e72-a446-0fb3f811f8bb" ||
      user?.email?.toLowerCase() !== "domainkcl@yahoo.com"
    ) {
      console.error("Administrator identity mismatch. No change made.");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      email: "kolkanltd@yahoo.co.uk"
    });

    if (error) {
      console.error("Email change failed:", error.message);
    } else {
      console.log("Email change requested:", data);
    }
  };
}