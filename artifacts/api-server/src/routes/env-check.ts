import { Router, type IRouter } from "express"

const router: IRouter = Router()

router.get("/env-check", (_req, res) => {
  res.json({
    resend: !!process.env["RESEND_API_KEY"],
    supabaseUrl: !!process.env["SUPABASE_URL"],
    serviceRole: !!process.env["SUPABASE_SERVICE_ROLE_KEY"],
    port: !!process.env["PORT"],
  })
})

export default router