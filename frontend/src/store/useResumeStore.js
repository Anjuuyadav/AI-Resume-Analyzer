// src/store/useResumeStore.js
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useResumeStore = create((set, get) => ({
  resumeUrl: "",
  fileName: "",
  resumeText: "",
  loading: false,

  // Upload or replace resume
  uploadResume: async (file, token) => {
    if (!file) return toast.error("No file selected!");

    // if (
    //   ![
    //     "application/pdf",
    //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //   ].includes(file.type)
    // ) {
    //   return toast.error("Only PDF or DOCX files allowed!");
    // }

    // if (file.size > 5 * 1024 * 1024) {
    //   return toast.error("File must be less than 5MB!");
    // }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      set({ loading: true });

      const res = await axios.put(
        "http://localhost:5000/api/users/upload-resume",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Resume uploaded successfully!");
      set({
        resumeUrl: res.data.resumeUrl,
        fileName: res.data.fileName,
         resumeText: res.data.resumeText,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed!");
    } finally {
      set({ loading: false });
    }
  },

  

  fetchResume: async () => {
    try {
      set({ loading: true });
       const res = await axios.get("http://localhost:5000/api/users/get", { withCredentials: true });
    set({
         resumeUrl: res.data.resumeUrl,
      fileName: res.data.fileName,
      resumeText: res.data.extractedText, // ✅ correct key
      loading: false,
      });
    } catch (error) {
      console.error("Error fetching resume:", error);
      set({ extractedText: "", loading: false });
    }
  },

  // Initialize store from user data (for when page loads)
  setInitialResume: (resumeUrl, fileName, resumeText) => {
    set({ resumeUrl, fileName, resumeText });
  },
}));
