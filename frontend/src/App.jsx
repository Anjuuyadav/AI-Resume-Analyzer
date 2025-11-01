import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import Resumepage from "./pages/ResumePage";
import LoginPage from "./pages/LoginPage";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  console.log(authUser);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login"></Navigate>}
        ></Route>
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/resume"
          element={authUser ? <Resumepage /> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
