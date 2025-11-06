import React, { useEffect } from "react";
import { useResumeStore} from "../store/useResumeStore";

const ResumePage = () => {
  const { fileName, resumeText, fetchResume } = useResumeStore();
  useEffect(() => {
  fetchResume();
}, []);

   return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-base-200 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">📄 {fileName || "No Resume Uploaded"}</h1>

      {resumeText ? (
        <pre className="bg-base-100 p-4 rounded-md whitespace-pre-wrap text-sm text-zinc-800">
          {resumeText}
        </pre>
      ) : (
        <p className="text-zinc-500">No extracted text available.</p>
      )}
    </div>
  );
};

export default ResumePage;