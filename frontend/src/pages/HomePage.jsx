// src/pages/HomePage.jsx
import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useResumeStore } from "../store/useResumeStore";
import { useNavigate } from "react-router-dom";
import ResumeCard from "../components/ResumeCard";

const HomePage = () => {
  const { authUser } = useAuthStore();
  const { resumeUrl, fileName, loading, uploadResume, setInitialResume } =
    useResumeStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      setInitialResume(authUser.resumeUrl, authUser.resumeFileName);
    }
  }, [authUser, setInitialResume]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    uploadResume(file, authUser?.token);
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">📁 Uploaded Resume</h1>
            <p className="mt-2 text-zinc-400">
              Manage or replace your uploaded resume
            </p>
          </div>

          {/* Resume Card */}
          <ResumeCard
            resumeUrl={resumeUrl}
            fileName={fileName}
            loading={loading}
            onFileChange={handleFileChange}
            onView={() => navigate("/resume")}
          />

          {/* Account Information */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Full Name</span>
                <span>{authUser?.fullName}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Email</span>
                <span>{authUser?.email}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
