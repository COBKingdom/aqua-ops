import { supportUrl } from "@/config/support"
import { supabase } from "@/lib/supabase"

export function InactiveScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-sm w-full bg-white rounded-3xl shadow-sm p-8 text-center space-y-5">
        <div className="text-5xl">😴</div>
        <h1 className="text-2xl font-bold text-gray-700">Account Deactivated</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Your account has been deactivated. Your data is safely stored and can be reactivated at any time.
        </p>
        <a
          href={supportUrl("Hello AquaOps Support,\n\nI would like to reactivate my deactivated AquaOps account.")}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#0d1b3e] text-white py-3 rounded-xl font-semibold text-sm"
        >
          Contact Support to Reactivate
        </a>
        <button
          onClick={() => { supabase.auth.signOut(); window.location.href = "/" }}
          className="w-full border border-gray-200 text-gray-600 py-3 rounded-xl text-sm"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}