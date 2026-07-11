import { Router, type IRouter } from "express"
import { Resend } from "resend"

const router: IRouter = Router()

router.post("/send-welcome", async (req, res) => {
  const { email, factoryName } = req.body

  if (!email || !factoryName) {
    res.status(400).json({
      error: "Missing required fields",
    })
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

  const { error } = await resend.emails.send({
    from: "COB <support@trueops.app>",
    to: email,
    subject: "Welcome to AquaOps",

    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;">

        <h2>Welcome to AquaOps 🚰</h2>

        <p>Hello,</p>

        <p>
          Thank you for registering
          <strong>${factoryName}</strong>
          on AquaOps.
        </p>

        <p>
          Your 14-day free trial is now active.
        </p>

        <p>
          We recommend adding your first:
        </p>

        <ul>
          <li>Production Record</li>
          <li>Sales Record</li>
          <li>Expense Record</li>
        </ul>

        <p>
          AquaOps helps you track production,
          sales, expenses, debts and profitability
          from one dashboard.
        </p>

        <br/>

        <p>
          Regards,
        </p>

        <p>
          COB<br/>
          AquaOps<br/>
          support@trueops.app
        </p>

      </div>
    `,
  })

  if (error) {
    res.status(500).json({
      error: error.message,
    })
    return
  }

  res.json({ ok: true })
})

export default router