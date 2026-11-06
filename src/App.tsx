import type { ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import DashboardLayout from "./components/layouts/Dashboardlayout";
import NotFound from "./pages/errors/NotFound";
import AccessDenied from "./pages/errors/AccessDenied";
import Maintenance from "./pages/errors/Maintenance";

import Home from "./pages/website/Home/Home";
import BdSection from "./pages/website/majors/BdSection";
import DkvSection from "./pages/website/majors/DkvSection";
import PplgSection from "./pages/website/majors/PplgSection";
import TjktSection from "./pages/website/majors/TjktSection";
import TkSection from "./pages/website/majors/TkSection";

// import OrganizationalPage from "./pages/website/profile/";
import FacilitiesPage from "./pages/website/profile/FacilitiesPage";
import AccreditationPage from "./pages/website/profile/AccreditationPage";
import AchievementsPage from "./pages/website/student/AchievementsPage";
import ExtracurricularsPage from "./pages/website/student/ExtracurricularsPage";
import ScholarshipsPage from "./pages/website/student/ScholarshipsPage";

import ForgetPasswordForm from "./pages/auth/ForgetPasswordForm";
import LoginForm from "./pages/auth/LoginForm";
import OtpForm from "./pages/auth/OtpForm";
import RegisterForm from "./pages/auth/RegisterForm";
import RegisterPanitiaForm from "./pages/auth/RegisterPanitiaForm";
import LoginPanitia from "./pages/auth/LoginPanitia";
import ForgetPanitia from "./pages/auth/ForgetPanitia";
import { PanitiaRoute } from "./pages/auth/PanitiaGuard";
import BerandaAdmin from "./pages/dashboard/admin/beranda/BerandaAdmin";
import OrganizationalPage from "./pages/website/profile/rganizationalPage";
import BerandaSiswa from "./pages/dashboard/siswa/beranda/BerandaSiswa";
import FormulirSiswaView from "./pages/dashboard/siswa/FormulirSiswa/FormulirSiswaView";

export default function App(): ReactElement {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/Profile/Organizational"
          element={<OrganizationalPage />}
        />
        <Route path="/Profile/Facilities" element={<FacilitiesPage />} />
        <Route path="/Profile/Accreditation" element={<AccreditationPage />} />

        <Route path="/Majors/Pplg" element={<PplgSection />} />
        <Route path="/Majors/Dkv" element={<DkvSection />} />
        <Route path="/Majors/Tjkt" element={<TjktSection />} />
        <Route path="/Majors/Bd" element={<BdSection />} />
        <Route path="/Majors/Tk" element={<TkSection />} />

        <Route
          path="/StudentAffairs/Achievements"
          element={<AchievementsPage />}
        />
        <Route
          path="/StudentAffairs/Extracurriculars"
          element={<ExtracurricularsPage />}
        />
        <Route
          path="/StudentAffairs/Scholarships"
          element={<ScholarshipsPage />}
        />

        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/register-panitia" element={<RegisterPanitiaForm />} />
      <Route path="/login-panitia" element={<LoginPanitia />} />
      <Route path="/forget-panitia" element={<ForgetPanitia />} />
      <Route path="/forgot-password" element={<ForgetPasswordForm />} />
      <Route path="/otp" element={<OtpForm />} />

      <Route element={<DashboardLayout userRole="siswa" />}>
        <Route path="/siswa/dashboard" element={<BerandaSiswa />} />
        <Route path="/siswa/dashboard/formulir" element={<FormulirSiswaView />} />
      </Route>

      <Route element={<PanitiaRoute />}>
        <Route
          path="/portal-panitia-spmb"
          element={<DashboardLayout userRole="admin" />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<BerandaAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
}
