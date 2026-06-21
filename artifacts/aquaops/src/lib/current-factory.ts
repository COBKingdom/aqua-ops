import { supabase } from "@/lib/supabase"

export async function getCurrentFactory() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // STEP 1
  // GET USER MEMBERSHIP
  const { data: membership, error: membershipError } =
    await supabase
      .from("factory_users")
      .select("factory_id, role")
      .eq("user_id", user.id)
      .single()

  if (membershipError || !membership) {
    return null
  }

  // STEP 2
  // LOAD FACTORY
  const { data: factory, error: factoryError } =
    await supabase
      .from("factories")
      .select("*")
      .eq("id", membership.factory_id)
      .single()

  if (factoryError || !factory) {
    return null
  }

  return {
    ...factory,
    role: membership.role,
  }
}