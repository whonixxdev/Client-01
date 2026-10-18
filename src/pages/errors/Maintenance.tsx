import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FiTool, FiHome } from "react-icons/fi";

export default function Maintenance(): ReactElement {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center font-cabinet">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 text-amber-600 shadow-inner">
        <FiTool className="text-4xl" />
      </div>
      <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">Sedang Diperbaiki</h1>
      <p className="mt-3 max-w-md text-sm text-gray-600 sm:text-base">
        Halaman ini sedang dalam pemeliharaan sistem atau pembaruan fitur. Silakan kembali lagi nanti.
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