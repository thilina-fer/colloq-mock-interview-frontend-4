import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import LandingPage from "../pages/LandingPage";
import CandidateDashboard from "../pages/Dashboard/Candidate/CandidateDashboard";
import InterviewerDashboard from "../pages/Dashboard/Interviewer/InterviewerDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
        <Route path="/dashboard/interviewer" element={<InterviewerDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
