import { Router } from "express"

const router = Router()

router.get("/env-check", (_req, res) => {
  res.json({
    resend: !!process.env["RESEND_API_KEY"],
    supabaseUrl: !!process.env["SUPABASE_URL"],
    serviceRole: !!process.env["SUPABASE_SERVICE_ROLE_KEY"],
  })
})

export default router