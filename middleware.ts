import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const factoryId =
    request.cookies.get("factoryId")?.value

  const pathname = request.nextUrl.pathname

  // Public routes
  const publicRoutes = [
    "/",
    "/onboarding",
  ]

  const isPublic = publicRoutes.includes(pathname)

  // If no factory and trying protected route
  if (!factoryId && !isPublic) {
    return NextResponse.redirect(
      new URL("/onboarding", request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}