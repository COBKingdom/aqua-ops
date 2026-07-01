import { Button } from "@/components/ui/button"

export function SubscriptionExpired() {

  const handleRenewNow = () => {
    window.dispatchEvent(
      new CustomEvent("aquaops:navigate", {
        detail: "renew-subscription",
      })
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">

      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm p-8 text-center space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-red-600">
            Subscription Expired
          </h1>

          <p className="text-gray-600 mt-3">
            Your AquaOps subscription
            has expired.
          </p>

          <p className="text-gray-500 text-sm mt-2">
            Renew your subscription to
            continue managing your
            factory.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 space-y-3">

          <div className="flex justify-between text-sm">
            <span>Standard</span>
            <span className="font-semibold">
              ₦10,000/month
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Multi-User</span>
            <span className="font-semibold">
              ₦15,000/month
            </span>
          </div>

        </div>

        <Button
          className="w-full h-12 bg-[#2563eb] text-white font-semibold"
          onClick={handleRenewNow}
        >
          Renew Now
        </Button>

        <a
          href="https://wa.me/353899550078?text=Hello%20AquaOps%20Support.%0A%0AMy%20subscription%20has%20expired%20and%20I%20need%20help%20renewing."
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-gray-400 underline"
        >
          Need help? Contact Support
        </a>

      </div>

    </div>
  )
}