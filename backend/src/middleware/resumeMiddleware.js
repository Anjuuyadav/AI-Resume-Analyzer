import express from "express";
import multer from"multer";
import cloudinary from "../lib/cloudinary.js";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import User from "../models/userModels.js";

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "resumes",
        resource_type: "auto",
        public_id: (req, file) => {
            const userId = req.user? req.user._id.toString() : "unknow_user";
            return `resume_${userId}_${Date.now()}`;
        }
    }
});

const upload = multer({storage});
export default upload;