import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import CandidateDashboard from "../pages/dashboard/CandidateDashboard";
import InterviewerDashboard from "../pages/dashboard/InterviewerDashboard";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/dashboard/candidate" element={<CandidateDashboard />} />
        <Route path="/dashboard/interviewer" element={<InterviewerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
