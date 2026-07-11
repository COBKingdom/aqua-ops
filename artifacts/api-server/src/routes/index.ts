import { Router, type IRouter } from "express";
import healthRouter from "./health";
import invitationRouter from "./invitation";
import welcomeRouter from "./welcome";

const router: IRouter = Router();

router.use(healthRouter);
router.use(invitationRouter);
router.use(welcomeRouter);

export default router;