import { Router } from "express";
import { getUser, updateUser } from "../controllers/user.controller";
import { validateUser } from "../middlewares/auth.middleware";

const router = Router();

router.get("/getUser", validateUser, getUser);
router.put("/update", validateUser, updateUser);
export default router;