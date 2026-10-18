import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { industriImages } from "../../../assets/img/industri/Data";

export default function CardIndustri(): ReactElement {
  // Mengambil semua logo gambar dari folder industri secara otomatis
  const industryLogos = Object.values(industriImages);

  return (
    <section className="py-16 text-white overflow-hidden border-y border-white/10 font-cabinet">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 text-center space-y-3">
        {/* <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-400/20">
          Kemitraan Korporasi
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Sinergi Strategis Bersama Aliansi Industri Global
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Menjalin kolaborasi eksklusif dengan korporasi dan institusi terkemuka guna menjamin ekosistem pendidikan vokasi yang adaptif, kompeten, dan berorientasi pada masa depan karier global.
        </p> */}
      </div>

      {/* Infinite Moving Marquee Container */}
      <div className="relative w-full overflow-hidden flex">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35, // Kecepatan putaran marquee
          }}
          className="flex gap-8 items-center shrink-0 min-w-max py-4"
        >
          {[...industryLogos, ...industryLogos].map((imgSrc, index) => (
            <div
              key={index}
              className="w-44 h-24  rounded-2xl flex items-center justify-center p-4 transition-colors"
            >
              <img
                src={imgSrc}
                alt={`Mitra Industri ${index + 1}`}
                className="max-h-14 w-auto object-contain filter  hover:grayscale-0 transition-all duration-300 "
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}