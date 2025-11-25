import { AuthProvider } from "@/context/AuthContext";
import Layout from "../layouts/Layout";
import About from "../pages/About";
// import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Projects from "../pages/Projects";
import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "@/pages";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function AppRoutes() {
  // Hardcoded for now, but usually comes from Auth Context
  return (
    <Routes>
      <Route
        element={
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        }
      >
        {/* 1. PUBLIC ROUTES */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<div>Dashboard</div>} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
