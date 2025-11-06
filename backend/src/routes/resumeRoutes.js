import express from "express";
import {uploadResume, getResume} from "../controllers/resumeControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import upload from"../middleware/resumeMiddleware.js";

const router = express.Router();

router.put("/upload-resume", protectRoute, upload.single("resume"), uploadResume);
router.get("/get", protectRoute, getResume);

export default router;