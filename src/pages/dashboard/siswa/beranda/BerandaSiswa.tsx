import SupportCard from "../../../../components/ui/CardItems/CardSupport";
import maskotImg from "../../../../assets/img/maskot1.png";

export default function BerandaSiswa() {
  return (
    <>
    <div className="space-y-6">
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#204382] leading-snug">
          SELAMAT DATANG CALON SISWA BARU SUDAH SIAP UNTUK PENDAFTARAN SPMB?
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Sebelum Memulai Ayok Kita Baca Panduan Dari Smk Ti Badung
        </p>
      </div>

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
    
    </>
  );
}