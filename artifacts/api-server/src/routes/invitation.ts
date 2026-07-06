import { Router, type IRouter } from "express"
import { Resend } from "resend"

const router: IRouter = Router()

router.post("/send-invitation", async (req, res) => {
  const { email, factoryName, inviteCode, role } =
    req.body

  if (!email || !factoryName || !inviteCode || !role) {
    res.status(400).json({ error: "Missing required fields" })
    return
  }

  const apiKey = process.env["RESEND_API_KEY"]

  if (!apiKey) {
    res.status(500).json({
      error: "Email service not configured",
    })
    return
  }

  const resend = new Resend(apiKey)

  const joinUrl =
    `https://app.aquaops.app/join?code=${inviteCode}`

  const roleName =
    role === "owner" ? "Owner" : "Data Entry"

  const { error } = await resend.emails.send({
    from: "AquaOps <noreply@trueops.app>",
    to: email,
    subject: `You've been invited to join ${factoryName} on AquaOps`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AquaOps Invitation</title>
</head>
<body style="margin:0;padding:0;background-color:#eef0f5;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef0f5;padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- CARD -->
        <table width="100%" cellpadding="0" cellspacing="0"
               style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:#0d1b3e;padding:28px 32px;text-align:center;">
              <img
                src="https://app.aquaops.app/icon-192.png"
                alt="AquaOps"
                width="56"
                height="56"
                style="border-radius:12px;display:block;margin:0 auto 12px;"
              />
              <h1 style="color:#ffffff;font-size:20px;font-weight:700;margin:0;letter-spacing:-0.3px;">
                AquaOps
              </h1>
              <p style="color:rgba(255,255,255,0.55);font-size:12px;margin:4px 0 0;">
                Water Factory Management
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:32px;">

              <p style="color:#374151;font-size:15px;margin:0 0 20px;line-height:1.6;">
                Hello,
              </p>

              <p style="color:#374151;font-size:15px;margin:0 0 20px;line-height:1.6;">
                You have been invited to join
                <strong style="color:#0d1b3e;">${factoryName}</strong>
                on AquaOps as a
                <strong style="color:#0d1b3e;">${roleName}</strong> user.
              </p>

              <p style="color:#374151;font-size:15px;margin:0 0 28px;line-height:1.6;">
                Click the button below to join the factory.
              </p>

              <!-- CTA BUTTON -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <a href="${joinUrl}"
                       style="display:inline-block;background:#2563eb;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;letter-spacing:-0.2px;">
                      Join ${factoryName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- DIVIDER -->
              <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 24px;" />

              <p style="color:#6b7280;font-size:13px;margin:0 0 10px;line-height:1.7;">
                If you already have an AquaOps account, simply log in.
              </p>

              <p style="color:#6b7280;font-size:13px;margin:0 0 10px;line-height:1.7;">
                If you are new to AquaOps, create your account and you will
                automatically be linked to <strong>${factoryName}</strong>.
              </p>

              <p style="color:#6b7280;font-size:13px;margin:0 0 28px;line-height:1.7;">
                If you were not expecting this invitation, you may safely
                ignore this email.
              </p>

              <!-- DIVIDER -->
              <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 20px;" />

              <!-- FOOTER -->
              <p style="color:#374151;font-size:13px;margin:0 0 4px;line-height:1.6;">
                Regards,<br/>
                <strong>The AquaOps Team</strong>
              </p>

              <p style="color:#9ca3af;font-size:12px;margin:0;">
                Powered by TrueOps &nbsp;&middot;&nbsp;
                <a href="mailto:support@trueops.app"
                   style="color:#2563eb;text-decoration:none;">
                  support@trueops.app
                </a>
              </p>

            </td>
          </tr>

        </table>
        <!-- END CARD -->

      </td>
    </tr>
  </table>

</body>
</html>
    `,
  })

  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.json({ ok: true })
})

export default router