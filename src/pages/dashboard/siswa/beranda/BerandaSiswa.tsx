import type { ReactElement } from "react";
import SupportCard from "../../../../components/ui/CardItems/CardSupport";
import maskotImg from "../../../../assets/img/maskot1.png";
import { ProgresBar } from "../../../../components/ui/progresbar/ProgresBar";
import { useProgresSiswa } from "../../../../components/ui/progresbar/useProgresSiswa";

export default function BerandaSiswa(): ReactElement {
  const { progres, memuat, galat, muatUlang } = useProgresSiswa();

  return (
    <div className="space-y-6">
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#204382] leading-snug">
          SELAMAT DATANG CALON SISWA BARU SUDAH SIAP UNTUK PENDAFTARAN SPMB?
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Sebelum Memulai Ayok Kita Baca Panduan Dari Smk Ti Badung
        </p>
      </div>

      {progres ? (
        <ProgresBar hasil={progres} />
      ) : memuat ? (
        <div className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-slate-100" />
      ) : (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-2xl border border-blue-900 bg-blue-100 p-5 text-sm text-blue-950 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="font-medium">{galat ?? "Progres pendaftaran belum tersedia."}</span>
          <button
            type="button"
            onClick={muatUlang}
            className="w-fit shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            Coba lagi
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1 flex flex-col items-center mt-1 sm:-mt-6">
          <div className="-mb-2 z-10 pointer-events-none">
            <img
              src={maskotImg}
              alt="Maskot SPMB"
              className="w-28 sm:w-32 lg:w-36 h-auto object-contain drop-shadow-lg"
            />
          </div>
          <div className="w-full z-20">
            <SupportCard />
          </div>
        </div>
      </div>
    </div>
  );
}