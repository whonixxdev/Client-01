import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiHome } from "react-icons/fi";

export default function NotFound(): ReactElement {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center font-cabinet">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 shadow-inner">
        <FiAlertCircle className="text-4xl" />
      </div>
      <h1 className="mt-6 text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">404</h1>
      <h2 className="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">Halaman Tidak Ditemukan</h2>
      <p className="mt-3 max-w-md text-sm text-gray-600 sm:text-base">
        Maaf, halaman yang Anda cari tidak ada, telah dihapus, atau alamat URL yang Anda masukkan salah.
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
}