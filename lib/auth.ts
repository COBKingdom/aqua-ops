import { supabase } from "./supabase"

export async function signUp(email: string, password: string) {
  return await supabase.auth.signUp({
    email,
    password,
  })
}

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function signOutUser() {
  try {
    await supabase.auth.signOut()

    // Clear persisted local state
    localStorage.removeItem("aquaops-factory")

    // Future cleanup stores can go here
    // localStorage.removeItem("expense-store")
    // localStorage.removeItem("sales-store")

    // Redirect safely
    window.location.href = "/"
  } catch (error) {
    console.error("Sign out error:", error)
  }
}

export async function getUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}