import axios from "axios";
import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

const BASEURL = "http://localhost:5000/api";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      const user = res.data || null;
      set({ authUser: user });
    } catch (error) {
      console.log("Error in checkAuth:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      const user = res.data || null;
      set({ authUser: user });

      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const user = res.data || null;
      set({ authUser: user });

      toast.success("Login successfully!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async() => {
    try {
      await axiosInstance.post("/auth/logout");
    set({authUser: null});
    toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },

 
}));
