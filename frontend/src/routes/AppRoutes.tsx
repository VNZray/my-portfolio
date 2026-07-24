import { AuthProvider } from "@/context/AuthContext";
import Layout from "../layouts/Layout";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Projects from "../pages/Projects";
import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "@/pages";
import Login from "@/pages/cms/Login";
import CmsLayout from "@/layouts/CmsLayout";
import CMSDashboard from "@/pages/cms/Dashboard";
import CertificatesPage from "@/pages/cms/Certificates";
import ProjectsPage from "@/pages/cms/Projects";
import AchievementsPage from "@/pages/cms/Achievements";
import EducationPage from "@/pages/cms/Education";
import InquiriesPage from "@/pages/cms/Inquiries";
import SocialsPage from "@/pages/cms/Socials";
import TechStackPage from "@/pages/cms/TechStack";
import RequirementsPage from "@/pages/cms/Requirements";
import ContactForm from "@/pages/ContactForm";
import Unauthorized from "@/pages/Unauthorized";
import ProtectedRoute from "@/routes/ProtectedRoute";

export default function AppRoutes() {
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
          <Route path="contact" element={<ContactForm />} />
        </Route>

        {/* 2. HIDDEN LOGIN ROUTE */}
        <Route path="/rc-admin" element={<Login />} />

        {/* 3. UNAUTHORIZED */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* 4. CMS ROUTES (Protected) */}
        <Route
          path="/cms"
          element={
            <ProtectedRoute>
              <CmsLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CMSDashboard />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="socials" element={<SocialsPage />} />
          <Route path="tech-stack" element={<TechStackPage />} />
          <Route path="inquiries" element={<InquiriesPage />} />
          <Route path="requirements" element={<RequirementsPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
