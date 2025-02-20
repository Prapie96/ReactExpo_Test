import { Router } from "express";
import { getUsers, regisUsers } from "../controller.ts/user.controller";

const router  = Router();

router.post('/getuser',getUsers);
router.post('/regisuser',regisUsers);

export default router;
