import { Router, type IRouter } from "express"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

const router: IRouter = Router()

router.post("/run-email-automation", async (_req, res) => {
  try {
    const supabaseUrl = process.env["SUPABASE_URL"]
    const supabaseServiceKey =
      process.env["SUPABASE_SERVICE_ROLE_KEY"]
    const resendApiKey =
      process.env["RESEND_API_KEY"]

    if (
      !supabaseUrl ||
      !supabaseServiceKey ||
      !resendApiKey
    ) {
      res.status(500).json({
        error: "Missing environment variables",
      })
      return
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseServiceKey
    )

    const resend = new Resend(resendApiKey)

    const today = new Date()

    const threeDays = new Date()
    threeDays.setDate(today.getDate() + 3)

    const oneDay = new Date()
    oneDay.setDate(today.getDate() + 1)

    const formatDate = (date: Date) =>
      date.toISOString().split("T")[0]

    const threeDayDate = formatDate(threeDays)
    const oneDayDate = formatDate(oneDay)
    const todayDate = formatDate(today)

    const { data: subscriptions, error } =
      await supabase
        .from("subscriptions")
        .select("*")

    if (error) {
      throw error
    }

    let sent = 0

    for (const subscription of subscriptions || []) {
      if (!subscription.expires_at) continue

      const expiryDate =
        subscription.expires_at.split("T")[0]

      let eventType = ""
      let endpoint = ""
      let subject = ""

      if (expiryDate === threeDayDate) {
        eventType = "trial_3_days"
        endpoint = "3days"
        subject = "⏳ Your AquaOps trial expires in 3 days"
      } else if (expiryDate === oneDayDate) {
        eventType = "trial_1_day"
        endpoint = "1day"
        subject = "⚠️ Your AquaOps trial ends tomorrow"
      } else if (expiryDate < todayDate) {
        eventType = "trial_expired"
        endpoint = "expired"
        subject = "Your AquaOps trial has expired"
      } else {
        continue
      }

      const { data: existing } =
        await supabase
          .from("email_events")
          .select("id")
          .eq("user_id", subscription.user_id)
          .eq("event_type", eventType)
          .limit(1)

      if (existing && existing.length > 0) {
        continue
      }

      const { data: factory } =
        await supabase
          .from("factories")
          .select("name,user_id")
          .eq("user_id", subscription.user_id)
          .single()

      if (!factory) continue

      const { data: factoryUser } =
        await supabase
          .from("factory_users")
          .select("email")
          .eq("user_id", subscription.user_id)
          .single()

      if (!factoryUser?.email) continue

      let html = ""

      if (eventType === "trial_3_days") {
        html = `
          <h2>Your AquaOps Trial Expires in 3 Days</h2>
          <p>Your trial for <strong>${factory.name}</strong> expires in 3 days.</p>
        `
      }

      if (eventType === "trial_1_day") {
        html = `
          <h2>Your AquaOps Trial Ends Tomorrow</h2>
          <p>Your trial for <strong>${factory.name}</strong> expires tomorrow.</p>
        `
      }

      if (eventType === "trial_expired") {
        html = `
          <h2>Your AquaOps Trial Has Expired</h2>
          <p>Your trial for <strong>${factory.name}</strong> has expired.</p>
        `
      }

      const { error: emailError } =
        await resend.emails.send({
          from: "COB <support@trueops.app>",
          to: factoryUser.email,
          subject,
          html,
        })

      if (emailError) {
        console.error(emailError)
        continue
      }

      await supabase
        .from("email_events")
        .insert({
          user_id: subscription.user_id,
          event_type: eventType,
          email: factoryUser.email,
          metadata: {
            factory_name: factory.name,
          },
        })

      sent++
    }

    res.json({
      ok: true,
      emails_sent: sent,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      error: "Automation failed",
    })
  }
})

export default router