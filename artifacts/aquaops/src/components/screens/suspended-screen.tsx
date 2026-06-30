import { supportUrl } from "@/config/support"
import { supabase } from "@/lib/supabase"

export function SuspendedScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-sm w-full bg-white rounded-3xl shadow-sm p-8 text-center space-y-5">
        <div className="text-5xl">🔒</div>
        <h1 className="text-2xl font-bold text-red-600">Account Suspended</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Your AquaOps account has been suspended. Please contact support to restore access.
        </p>
        <a
          href={supportUrl("Hello AquaOps Support,\n\nMy account has been suspended. Please assist me in restoring access.")}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#2563eb] text-white py-3 rounded-xl font-semibold text-sm"
        >
          Contact Support on WhatsApp
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