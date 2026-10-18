import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

interface MajorCard {
  readonly name: string;
  readonly desc: string;
  readonly image: string;
  readonly href: string;
}

const majorsData: readonly MajorCard[] = [
  {
    name: "Pengembangan Perangkat Lunak & Gim",
    desc: "Mempelajari pembuatan aplikasi web, mobile, game interaktif, hingga kecerdasan buatan berbasis industri.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    href: "/Majors/pplg",
  },
  {
    name: "Teknik Jaringan Komputer & Telekomunikasi",
    desc: "Menguasai infrastruktur jaringan komputer, administrasi server, cloud computing, dan keamanan siber.",
    image: "https://www.smktibaliglobalbadung.sch.id/assets/images/kegiatan/ekstra1.jpeg",
    href: "/Majors/tjkt",
  },
  {
    name: "Desain Komunikasi Visual",
    desc: "Fokus pada seni desain grafis, videografi, fotografi, animasi, dan media periklanan kreatif digital.",
    image: "https://www.smktibaliglobalbadung.sch.id/assets/images/fasilitas/studio-foto.jpg",
    href: "/Majors/dkv",
  },
  {
    name: "Bisnis Digital",
    desc: "Mempelajari strategi e-commerce, digital marketing, pengelolaan keuangan digital, dan manajemen bisnis modern.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    href: "/Majors/bd",
  },
  {
    name: "Tata Kecantikan",
    desc: "Mengembangkan keahlian perawatan kecantikan kulit, rambut, tata rias profesional, dan industri salon modern.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    href: "/Majors/tk",
  },
];

export default function HomeSection(): ReactElement {
  return (
    <section id="jurusan" className="py-24 bg-gray-50/60 font-cabinet">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-xs font-mono font-bold tracking-widest uppercase text-blue-700 px-3.5 py-1.5 rounded-full">
            Program Keahlian Unggulan
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Pilih Jurusan Masa Depanmu di SMK TI Bali Global Badung
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Kurikulum berbasis industri yang dirancang khusus untuk mencetak lulusan kompeten, kreatif, dan siap bersaing di dunia kerja.
          </p>
        </div>

        {/* Grid Card Berita Jurusan (5 Jurusan) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {majorsData.map((major) => (
            <Link
              key={major.name}
              to={major.href}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Gambar di atas ala Card Berita */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={major.image}
                    alt={major.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Konten Teks */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {major.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {major.desc}
                  </p>
                </div>
              </div>

              {/* Tombol Aksi di Bawah Card */}
              <div className="p-6 pt-0 flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform duration-200">
                <span className="flex items-center gap-2">
                  Pelajari Selengkapnya <FiArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}