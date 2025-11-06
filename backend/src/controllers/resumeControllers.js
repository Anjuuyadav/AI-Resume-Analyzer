import User from "../models/userModels.js";

import multer from "multer";
import cloudinary from "../lib/cloudinary.js";
import { extractData } from "../lib/pdf.js";

const storage = multer.memoryStorage();
const upload = multer({ storage }); // keeps file in memory

export const uploadResume = async (req, res) => {
  try {
    const userId = req.user._id;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // 1️⃣ Extract text from buffer
    const resumeText = await extractData(file);

    // 2️⃣ Upload to Cloudinary manually
    const uploadResult = await cloudinary.uploader.upload_stream(
      { folder: "resumes", resource_type: "auto" },
      async (error, result) => {
        if (error) return res.status(500).json({ message: error.message });

        // 3️⃣ Save in MongoDB
        const user = await User.findById(userId);
        user.resumeUrl = result.secure_url;
        user.resumeFileName = file.originalname;
        user.resumeText = resumeText;

        console.log("Extracted Text:", resumeText?.substring(0, 200)); // preview first 200 chars
        console.log("Uploaded to Cloudinary:", uploadResult.secure_url);
        console.log("File name:", file.originalname);
        await user.save();

        return res.status(200).json({
          message: "Resume uploaded successfully!",
          resumeUrl: user.resumeUrl,
          fileName: user.resumeFileName,
          resumeText: resumeText,
        });
      }
    );

    // Push the file buffer into the Cloudinary upload stream
    uploadResult.end(file.buffer);

  } catch (error) {
    console.error("Error in uploadResume:", error);
    res.status(500).json({ message: "Failed to upload resume" });
  }
};


export const getResume = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.resumeText) {
      return res.status(404).json({ message: "No extracted text available." });
    }

    res.status(200).json({
      resumeUrl: user.resumeUrl,
      fileName: user.resumeFileName,
      extractedText: user.resumeText,
    });
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// import User from "../models/userModels.js";
// import cloudinary from "../lib/cloudinary.js";
// import { extractData } from "../lib/pdf.js";
// import multer from "multer";

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// export const uploadResume = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const file = req.file;

//     if (!file) return res.status(400).json({ message: "No file uploaded" });

//     // 1️⃣ Extract text from the file
//     const resumeText = await extractData(file);

//     // 2️⃣ Upload file to Cloudinary
//     const result = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "resumes", resource_type: "auto" },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       );
//       stream.end(file.buffer);
//     });

//     // 3️⃣ Save resume details in MongoDB
//     const user = await User.findById(userId);
//     user.resumeUrl = result.secure_url;
//     user.resumeFileName = file.originalname;
//     user.resumeText = resumeText;
//     await user.save();

//     res.status(200).json({
//       message: "Resume uploaded successfully!",
//       resumeUrl: user.resumeUrl,
//       fileName: user.resumeFileName,
//       resumeText: resumeText,
//     });
//   } catch (error) {
//     console.error("Error in uploadResume:", error);
//     res.status(500).json({ message: "Failed to upload resume" });
//   }
// };

// export const getResume = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user.resumeText) {
//       return res.status(404).json({ message: "No extracted text available." });
//     }

//     res.status(200).json({
//       resumeUrl: user.resumeUrl,
//       fileName: user.resumeFileName,
//       extractedText: user.resumeText,
//     });
//   } catch (error) {
//     console.error("Error fetching resume:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

