import User from "../models/userModels.js";
import cloudinary from "../lib/cloudinary.js";


//UPLOAD-RESUME
export const uploadResume = async(req, res) => {
try {
      const userId = req.user._id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

     if (user.resumeUrl) {
      const oldPublicId = user.resumeUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`resumes/${oldPublicId}`);
    }

     user.resumeUrl = file.path;
    user.resumeFileName = file.originalname;
    await user.save();

     res.status(200).json({
      message: "Resume uploaded successfully!",
      resumeUrl: user.resumeUrl,
      fileName: user.resumeFileName,
    });


} catch (error) {
      console.error("Error in Resume Controller: ", error.message);
    res.status(500).json({ message: "Failed to upload resume" });
}
      
    
}
//SIGNUP
export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;
  
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    generateToken(newUser._id, res);

    return res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};