import { Router, type IRouter } from "express";
import healthRouter from "./health";
import invitationRouter from "./invitation";

const router: IRouter = Router();

router.use(healthRouter);
router.use(invitationRouter);

export default router;