import type { ReactElement } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import MainLayout from "./components/layouts/MainLayout";
import NotFound from "./pages/errors/NotFound";
import AccessDenied from "./pages/errors/AccessDenied";
import Maintenance from "./pages/errors/Maintenance";
import logoSmk from "./assets/img/logo-smk.png";

import Home from "./pages/website/Home/Home";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";
import ForgetPasswordForm from "./pages/auth/ForgerPasswordForm";
import OtpForm from "./pages/auth/OtpForm";


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

const BerkasSiswa = (): ReactElement => (
  <div className="p-6 font-semibold text-lg font-cabinet bg-white text-gray-800 min-h-screen">Halaman Berkas Persyaratan</div>
);
const PembayaranSiswa = (): ReactElement => (
  <div className="p-6 font-semibold text-lg font-cabinet bg-white text-gray-800 min-h-screen">Halaman Pembayaran</div>
);
const PengumumanSiswa = (): ReactElement => (
  <div className="p-6 font-semibold text-lg font-cabinet bg-white text-gray-800 min-h-screen">Halaman Status & Pengumuman Seleksi</div>
);
const ProfileSiswa = (): ReactElement => (
  <div className="p-6 font-semibold text-lg font-cabinet bg-white text-gray-800 min-h-screen">Halaman Edit Pengaturan Profil Siswa</div>
);

const KelolaPendaftaran = (): ReactElement => (
  <div className="p-6 font-semibold text-lg font-cabinet bg-white text-gray-800 min-h-screen">Halaman Kelola Pendaftaran</div>
);
const KelolaPembayaran = (): ReactElement => (
  <div className="p-6 font-semibold text-lg font-cabinet bg-white text-gray-800 min-h-screen">Halaman Kelola Pembayaran</div>
);
const KelolaJurusan = (): ReactElement => (
  <div className="p-6 font-semibold text-lg font-cabinet bg-white text-gray-800 min-h-screen">Halaman Kelola Jurusan</div>
);
const LaporanAdmin = (): ReactElement => (
  <div className="p-6 font-semibold text-lg font-cabinet bg-white text-gray-800 min-h-screen">Halaman Laporan Data Siswa</div>
);
const PublikasiAdmin = (): ReactElement => (
  <div className="p-6 font-semibold text-lg font-cabinet bg-white text-gray-800 min-h-screen">Halaman Publikasi Hasil Seleksi</div>
);
const ProfileAdmin = (): ReactElement => (
  <div className="p-6 font-semibold text-lg font-cabinet bg-white text-gray-800 min-h-screen">Halaman Edit Pengaturan Profil Admin</div>
);

export default function App(): ReactElement {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Profile/Organizational" element={<PlaceholderPage title="Struktur Organisasi" />} />
        <Route path="/Profile/Facilities" element={<PlaceholderPage title="Fasilitas & Sarpras" />} />
        <Route path="/Profile/Accreditation" element={<PlaceholderPage title="Akreditasi Sekolah" />} />
        <Route path="/Majors/Pplg" element={<PlaceholderPage title="PPLG (Pengembangan Perangkat Lunak dan Gim)" />} />
        <Route path="/Majors/Dkv" element={<PlaceholderPage title="DKV (Desain Komunikasi Visual)" />} />
        <Route path="/Majors/Tjkt" element={<PlaceholderPage title="TJKT (Teknik Jaringan Komputer dan Telekomunikasi)" />} />
        <Route path="/Majors/Bd" element={<PlaceholderPage title="Bisnis Digital" />} />
        <Route path="/StudentAffairs/Achievements" element={<PlaceholderPage title="Prestasi Siswa" />} />
        <Route path="/StudentAffairs/Extracurriculars" element={<PlaceholderPage title="Ekstrakurikuler" />} />
        <Route path="/StudentAffairs/Scholarships" element={<PlaceholderPage title="Informasi Beasiswa" />} />
        
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forgot-password" element={<ForgetPasswordForm />} />
      <Route path="/otp" element={<OtpForm />} />


      <Route path="/siswa/berkas" element={<BerkasSiswa />} />
      <Route path="/siswa/pembayaran" element={<PembayaranSiswa />} />
      <Route path="/siswa/pengumuman" element={<PengumumanSiswa />} />
      <Route path="/siswa/profile" element={<ProfileSiswa />} />
      <Route path="/portal-panitia-spmb/pendaftaran" element={<KelolaPendaftaran />} />
      <Route path="/portal-panitia-spmb/pembayaran" element={<KelolaPembayaran />} />
      <Route path="/portal-panitia-spmb/jurusan" element={<KelolaJurusan />} />
      <Route path="/portal-panitia-spmb/laporan" element={<LaporanAdmin />} />
      <Route path="/portal-panitia-spmb/publikasi" element={<PublikasiAdmin />} />
      <Route path="/portal-panitia-spmb/profile" element={<ProfileAdmin />} />
    </Routes>
  );
}