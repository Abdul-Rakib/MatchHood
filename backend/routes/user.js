import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
    kyc,  editProfile
} from "../controllers/user.js";
import { uploadCloudinaryImage } from "../controllers/kyc.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/kyc", verifyToken, upload.array('documents'), uploadCloudinaryImage);
router.get("/kyc-status", verifyToken, kyc);
router.post("/update-profile", verifyToken, editProfile);

export default router;