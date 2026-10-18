import type { ReactElement } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import MainLayout from "./components/layouts/MainLayout";
import NotFound from "./pages/errors/NotFound";
import AccessDenied from "./pages/errors/AccessDenied";
import Maintenance from "./pages/errors/Maintenance";
import logoSmk from "./assets/img/logo-smk.png";

import Home from "./pages/website/Home/Home";
import PplgSection from "./pages/website/majors/PplgSection"
import BdSection from "./pages/website/majors/BdSection";
import TjktSection from "./pages/website/majors/TjktSection";
import DkvSection from "./pages/website/majors/DkvSection";


interface PlaceholderPageProps {
  readonly title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps): ReactElement => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center font-cabinet">
    <img
      src={logoSmk}
      alt="Logo SMK TI Bali Global Badung"
      className="h-20 w-auto object-contain mb-6"
    />
    <h1 className="text-3xl font-bold text-blue-600 sm:text-4xl">{title}</h1>
    <p className="mt-2 text-sm text-gray-600 sm:text-base">
      Halaman ini sedang dalam tahap pengembangan.
    </p>
    <Link
      to="/"
      className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
    >
      <FiHome className="text-lg" />
      Kembali ke Beranda
    </Link>
  </div>
);

export default function App(): ReactElement {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Profile/Organizational" element={<PlaceholderPage title="Struktur Organisasi" />} />
        <Route path="/Profile/Facilities" element={<PlaceholderPage title="Fasilitas & Sarpras" />} />
        <Route path="/Profile/Accreditation" element={<PlaceholderPage title="Akreditasi Sekolah" />} />

        <Route path="/Majors/Pplg" element={<PplgSection/>} />
        <Route path="/Majors/Dkv" element={<DkvSection/>} />
        <Route path="/Majors/Tjkt" element={<TjktSection/>} />
        <Route path="/Majors/Bd" element={<BdSection/>} />

        <Route path="/StudentAffairs/Achievements" element={<PlaceholderPage title="Prestasi Siswa" />} />
        <Route path="/StudentAffairs/Extracurriculars" element={<PlaceholderPage title="Ekstrakurikuler" />} />
        <Route path="/StudentAffairs/Scholarships" element={<PlaceholderPage title="Informasi Beasiswa" />} />

        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}