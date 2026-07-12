import { Router, type IRouter } from "express";
import healthRouter from "./health";
import invitationRouter from "./invitation";
import welcomeRouter from "./welcome";
import trial3DaysRouter from "./trial-3-days"
import trial1DayRouter from "./trial-1-day"
import trialExpiredRouter from "./trial-expired"
import emailAutomationRouter from "./email-automation"
import envCheckRouter from "./env-check"

const router: IRouter = Router();

router.use(healthRouter);
router.use(invitationRouter);
router.use(welcomeRouter);
router.use(trial3DaysRouter)
router.use(trial1DayRouter)
router.use(trialExpiredRouter)
router.use(emailAutomationRouter)
router.use(envCheckRouter)

export default router;