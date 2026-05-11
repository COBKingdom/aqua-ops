import { supabase } from "@/lib/supabase/client"

export async function signOutUser() {
  try {
    // Supabase logout
    await supabase.auth.signOut()

    // Clear persisted local storage
    localStorage.removeItem("aquaops-factory")

    // Optional:
    // clear additional persisted stores here
    // localStorage.removeItem("expense-store")
    // localStorage.removeItem("sales-store")

    // Hard redirect
    window.location.href = "/"
  } catch (error) {
    console.error("Sign out error:", error)
  }
}