import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    resumeUrl: {
      type: String,
      default: ""
    },
     resumeFileName: {
      type: String, // Original file name
      default: "",
    },
    resumeText: {
  type: String,
  default: "",
},
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

