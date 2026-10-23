import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import NavbarDashboard from "../ui/Navbar/NavbarDashboard";

interface DashboardLayoutProps {
  readonly userRole: "siswa" | "admin";
}

export default function DashboardLayout({
  userRole,
}: DashboardLayoutProps): ReactElement {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarDashboard userRole={userRole} />

      <main className="pt-16 lg:pl-64 min-h-screen transition-all duration-300">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}