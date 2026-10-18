import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMessageSquare, FiMail } from "react-icons/fi";
import logoSmk from "../../../assets/img/logo-smk.png";

export default function FooterSekolah(): ReactElement {
  return (
    <footer className="w-full bg-blue-800 text-white font-cabinet">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src={logoSmk}
                alt="Logo SMK TI Bali Global Badung"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-blue-100 leading-relaxed max-w-sm font-normal">
              SMK TI Bali Global Badung menghadirkan pendidikan vokasi berbasis
              teknologi untuk membekali siswa dengan kompetensi, kreativitas,
              dan pengalaman yang relevan dengan dunia industri.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-bold text-white tracking-wide">
              NAVIGASI
            </h4>
            <ul className="space-y-2.5 text-sm text-blue-100">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/Profile/Organizational"
                  className="hover:text-white transition-colors"
                >
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  to="/Majors/Pplg"
                  className="hover:text-white transition-colors"
                >
                  Jurusan
                </Link>
              </li>
              <li>
                <Link
                  to="/StudentAffairs/Achievements"
                  className="hover:text-white transition-colors"
                >
                  Kesiswaan
                </Link>
              </li>
              <li>
                <Link to="/spmb" className="hover:text-white transition-colors">
                  SPMB
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Tim Pengembang / Built With (Tengah Kanan - 2 Kolom) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-base font-bold text-white tracking-wide">
              BUILT WITH
            </h4>
            <ul className="space-y-1.5 text-sm text-blue-100 font-medium">
              <li>Gede Radea</li>
              <li>Nata</li>
              <li>Mersa</li>
              <li>Dena</li>
              <li>Dewa</li>
              <li>Haris</li>
            </ul>
          </div>

          {/* Kolom 4: Kontak Sekolah (Kanan - 4 Kolom dengan Icon) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-base font-bold text-white tracking-wide">
              KONTAK
            </h4>
            <ul className="space-y-3 text-sm text-blue-100">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-base shrink-0 mt-0.5 text-white" />
                <span className="leading-snug">
                  Jl. Tibungsari No. 1, Desa Dalung, Kuta Utara, Badung, Bali
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-base shrink-0 text-white" />
                <a
                  href="tel:+62361419097"
                  className="hover:text-white transition-colors"
                >
                  +62 361-419097
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMessageSquare className="text-base shrink-0 text-white" />
                <a
                  href="https://wa.me/6282261900070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  +62 822-61-9000-70
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-base shrink-0 text-white" />
                <a
                  href="mailto:info@smktibaliglobalbadung.sch.id"
                  className="hover:text-white transition-colors"
                >
                  info@smktibaliglobalbadung.sch.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-blue-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200">
          <p>
            © {new Date().getFullYear()} SMK TI Bali Global Badung. Hak Cipta
            Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}