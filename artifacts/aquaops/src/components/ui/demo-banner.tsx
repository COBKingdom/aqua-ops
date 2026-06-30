interface DemoBannerProps {
  onSignUp: () => void
}

export function DemoBanner({ onSignUp }: DemoBannerProps) {
  return (
    <div className="bg-amber-500 text-white px-4 py-2.5 flex items-center justify-between gap-3 shrink-0">
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wide">Demo Mode</p>
        <p className="text-[11px] opacity-90 leading-tight">
          You are exploring AquaOps using sample data.
        </p>
      </div>
      <button
        onClick={onSignUp}
        className="shrink-0 bg-white text-amber-700 text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap"
      >
        Create Free Account
      </button>
    </div>
  )
}