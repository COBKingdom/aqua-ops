import "./globals.css"
import Script from "next/script"
import { AuthProvider } from "@/contexts/AuthContext"

export const metadata = {
  title: "AquaOps",
  description: "Water Factory Management App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>

      <body>

        <AuthProvider>

          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-2G1MMLJZGH"
            strategy="afterInteractive"
          />

          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];

              function gtag() {
                dataLayer.push(arguments);
              }

              gtag('js', new Date());

              gtag('config', 'G-2G1MMLJZGH');
            `}
          </Script>

          {children}

        </AuthProvider>

      </body>
    </html>
  )
}