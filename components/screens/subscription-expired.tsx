"use client"

import { Button } from "@/components/ui/button"

export function SubscriptionExpired() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">

      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm p-8 text-center space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-red-600">
            Subscription Expired
          </h1>

          <p className="text-gray-600 mt-3">
            Your AquaOps subscription has expired.
          </p>

          <p className="text-gray-500 text-sm mt-2">
            Renew your subscription to continue
            managing your factory.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 space-y-3">

          <div className="flex justify-between">
            <span>Monthly</span>
            <span className="font-semibold">
              ₦10,000
            </span>
          </div>

          <div className="flex justify-between">
            <span>Annual</span>
            <span className="font-semibold">
              ₦108,000
            </span>
          </div>

        </div>

<a
  href="https://wa.me/2349066656691?text=Hello%20AquaOps%20Support.%0A%0AMy%20subscription%20has%20expired%20and%20I%20would%20like%20to%20renew%20my%20account.%0A%0APlease%20send%20payment%20details."
  target="_blank"
  rel="noopener noreferrer"
>
  <Button className="w-full bg-[#2563eb]">
    Contact Support
  </Button>
</a>

      </div>

    </div>
  )
}