import { Router } from "express";
import user from "./user/index";
import tournament from "./tournament/index";
import schedule from "./schedule/index";

const router = Router();

router.use(user.path, user.router);
router.use(tournament.path, tournament.router);
router.use(schedule.path, schedule.router);

export default router;
