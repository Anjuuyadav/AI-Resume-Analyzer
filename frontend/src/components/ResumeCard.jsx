// src/components/ResumeCard.jsx
import React from "react";
import { FileText, Upload, RefreshCcw } from "lucide-react";

const ResumeCard = ({
  resumeUrl,
  fileName,
  loading,
  onFileChange,
  onView,
}) => {
  return (
    <div className="flex flex-col items-center gap-6">
      {!resumeUrl ? (
        <>
          <FileText className="w-20 h-20 text-zinc-500" />
          <p className="text-zinc-400">No resume uploaded yet</p>
          <label className="btn btn-primary flex items-center gap-2">
            {loading ? "Uploading..." : "Upload Resume"}
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={onFileChange}
              className="hidden"
              disabled={loading}
            />
          </label>
        </>
      ) : (
        <div className="w-full flex flex-col items-center space-y-4">
          <div className="bg-base-200 p-4 rounded-lg w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <span className="text-sm truncate">{fileName}</span>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={onView} className="btn btn-outline btn-sm">
                View
              </button>

              <label className="btn btn-primary btn-sm flex items-center gap-2">
                {loading ? "Uploading..." : "Replace"}
                <RefreshCcw className="w-4 h-4" />
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={onFileChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeCard;
