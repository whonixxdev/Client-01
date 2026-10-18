import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import backgroundHome from "../../../assets/img/BackgroundHome.jpg";
import HomeSection from "./HomeSection";
import RegistrationCard from "../../../components/ui/CardItems/CardPendaftaran"
import CardIndustri from "../../../components/ui/CardItems/CardIndustri";

export default function HeroSection(): ReactElement {
  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-28 pb-16 lg:pt-36 lg:pb-20 font-cabinet overflow-hidden">
      {/* Background Image dengan Overlay Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundHome}
          alt="Suasana Sekolah SMK TI Bali Global Badung"
          className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/70 via-gray-950/80 to-blue-950/75" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="space-y-5 text-left">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm font-semibold border border-blue-400/30 backdrop-blur-md shadow-sm">
            <LuGraduationCap className="text-base" />
            Pendaftaran SPMB 2027/2028
          </span>

          {/* Font judul dikecilkan sedikit agar ruang terasa pas & lega */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Belajar. Berkarya. Berinovasi. <br />
            <span className="text-blue-500">SMK TI Bali Global Badung</span>
          </h1>

          <p className="text-gray-100 text-sm md:text-base leading-relaxed max-w-xl font-normal">
            SMK TI Bali Global Badung menghadirkan pendidikan vokasi berbasis teknologi untuk membekali siswa dengan kompetensi, kreativitas, dan pengalaman yang relevan dengan dunia industri.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/login"
              className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-600/30 transition duration-200 text-center flex items-center gap-2 text-sm md:text-base"
            >
              <span>Daftar Sekarang</span>
              <FiArrowRight />
            </Link>

            <a
              href="/Majors"
              className="px-7 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 backdrop-blur-md transition duration-200 text-center text-sm md:text-base"
            >
              Lihat Jurusan
            </a>
          </div>

          <div className="pt-5 grid grid-cols-3 gap-4 border-t border-white/10">
            <div>
              <p className="text-xl md:text-2xl font-extrabold text-white">A</p>
              <p className="text-xs font-medium text-gray-100">Akreditasi Sekolah</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-extrabold text-white">5+</p>
              <p className="text-xs font-medium text-gray-100">Program Keahlian</p>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-extrabold text-white">50+</p>
              <p className="text-xs font-medium text-gray-100">Mitra Industri</p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Kartu Informasi Profesional */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="w-full max-w-lg rounded-3xl bg-white/10 border border-white/15 p-7 sm:p-8 text-white backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="space-y-4">
              <span className="inline-block text-[11px] font-mono font-bold tracking-widest uppercase bg-blue-600 text-white px-3 py-1 rounded-md">
                Pusat Unggulan Vokasi IT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                Siap Menjadi Tenaga Ahli Profesional di Era Digital?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Dilengkapi dengan fasilitas lab komputer modern, kurikulum berbasis industri, dan jaminan penempatan kerja maupun jalur kuliah lanjutan.
              </p>
              <div className="pt-4 border-t border-white/15 grid grid-cols-2 gap-3 text-xs font-semibold text-gray-200">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-400 text-base shrink-0" />
                  <span>Kurikulum Industri</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-400 text-base shrink-0" />
                  <span>Lab Komputer Modern</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-400 text-base shrink-0" />
                  <span>Sertifikasi Profesional</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-400 text-base shrink-0" />
                  <span>Penyaluran Kerja</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <HomeSection/>
    <CardIndustri/>
    <RegistrationCard/>
    </>
  );
}