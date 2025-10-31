import express from "express";
import {uploadResume} from "../controllers/resumeControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import upload from"../middleware/resumeMiddleware.js";

const router = express.Router();

router.put("/upload-resume", protectRoute, upload.single("resume"), uploadResume);

export default router;