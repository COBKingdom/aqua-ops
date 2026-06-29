import { Button } from "@/components/ui/button"
import { supportUrl } from "@/config/support"

export function SubscriptionExpired() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm p-8 text-center space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-red-600">Subscription Expired</h1>
          <p className="text-gray-600 mt-3">Your AquaOps subscription has expired.</p>
          <p className="text-gray-500 text-sm mt-2">
            Renew your subscription to continue managing your factory.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between">
            <span>Monthly</span>
            <span className="font-semibold">₦10,000</span>
          </div>
          <div className="flex justify-between">
            <span>Annual</span>
            <span className="font-semibold">₦108,000</span>
          </div>
        </div>

        <a
          href={supportUrl("Hello AquaOps Support.\n\nMy subscription has expired and I would like to renew my account.\n\nPlease send payment details.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full bg-[#2563eb]">Contact Support</Button>
        </a>

      </div>
    </div>
  )
}