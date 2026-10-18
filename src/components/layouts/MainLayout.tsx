import type { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import NavbarSekolah from "../ui/Navbar/NavbarWebsite";
import FooterWebsite from "../ui/Footer/FooterWebsite";

export default function MainLayout(): ReactElement {
  return (
    <div className="flex flex-col min-h-screen font-cabinet bg-white text-gray-800">
      <NavbarSekolah />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FooterWebsite />
    </div>
  );
}