import { Router } from "express";
import { validateUser, validateAdmin } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { createAvatar, deleteAvatar, getAvatarById, getAvatars } from "../controllers/avatar.controller";

const router = Router();

router.post("/add", validateAdmin, upload.single("image"), createAvatar);
router.get("/", getAvatars);
router.get("/:id", getAvatarById);
router.delete("/delete/:id", validateAdmin, deleteAvatar);

export default router;