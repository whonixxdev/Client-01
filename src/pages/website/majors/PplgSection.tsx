import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { LuGraduationCap } from "react-icons/lu";
import { FiCode, FiLayers } from "react-icons/fi";
import backgroundPplg from "../../../assets/img/BackgroundPplg.jpg";
import { FaRobot } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { MdOutlinePhonelinkSetup } from "react-icons/md";

interface CounterProps {
  readonly value: number;
  readonly suffix?: string;
}

interface MajorCard {
  readonly title: string;
  readonly desc: string;
  readonly badge: string;
  readonly icon: React.ComponentType<{ className?: string }>;
}

const majorCards: readonly MajorCard[] = [
  {
    title: "Website Development",
    desc: "Mempelajari modern stack seperti React, Vue, Laravel, dan Flutter untuk membangun aplikasi skala industri.",
    badge: "Core Skill",
    icon: FiCode,
  },
  {
    title: "Game Development",
    desc: "Merancang dan mengembangkan game 2D & 3D interaktif menggunakan Unity Engine dan Unreal Engine.",
    badge: "Creative",
    icon: IoGameController,
  },
  {
    title: "Database & Security",
    desc: "Pemodelan basis data SQL/NoSQL serta pemahaman dasar arsitektur keamanan web yang aman.",
    badge: "Security",
    icon: FiLayers,
  },
  {
    title: "AI & Machine Learning",
    desc: "Pengenalan kecerdasan buatan dan machine learning untuk aplikasi modern.",
    badge: "AI ENGINEER",
    icon: FaRobot,
  },
  {
    title: "Software Engineer",
    desc: "Metodologi pengembangan software seperti Agile, Scrum, dan best practices industri.",
    badge: "ENGINEER",
    icon: FaGear,
  },
  {
    title: "Mobile Development",
    desc: "Pengembangan aplikasi mobile untuk Android dan iOS menggunakan teknologi terkini.",
    badge: "MOBILE PHONE",
    icon: MdOutlinePhonelinkSetup,
  },
];

function CounterNumber({ value, suffix = "" }: CounterProps): ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function PplgSection(): ReactElement {
  return (
    <div className="w-full bg-gray-950 overflow-hidden">
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-12 pt-24 pb-16 font-cabinet text-white">
        <div className="absolute inset-0 h-full">
          <img
            src={backgroundPplg}
            alt="Suasana Jurusan PPLG SMK TI Bali Global Badung"
            className="w-full h-full object-cover object-center scale-105 transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/70 to-gray-950/50" />
        </div>

        <div className="relative max-w-5xl w-full mx-auto text-center space-y-4 -mt-6 z-10">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm font-bold border border-blue-400/30 backdrop-blur-md uppercase tracking-wider shadow-sm">
              <LuGraduationCap className="text-base" />
              Selamat Datang di
            </span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Pengembangan <br className="hidden sm:inline" />
              <span className="text-blue-500">Perangkat Lunak & Game</span>
            </h1>
          </div>

          <p className="text-gray-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
            Mencetak Software Engineer, Game Developer, dan Inovator Digital
            yang Siap Bersaing di Industri Global.
          </p>

          <div className="pt-6 border-t border-white/20 max-w-3xl mx-auto">
            <div className="grid grid-cols-3 divide-x divide-white/20 text-center">
              <div className="px-2 sm:px-4 py-1">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  <CounterNumber value={500} suffix="+" />
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-bold text-blue-300 mt-1 uppercase tracking-wider">
                  Alumni Sukses
                </p>
              </div>

              <div className="px-2 sm:px-4 py-1">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  <CounterNumber value={95} suffix="%" />
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-bold text-blue-300 mt-1 uppercase tracking-wider">
                  Terserap Industri
                </p>
              </div>

              <div className="px-2 sm:px-4 py-1">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  <CounterNumber value={50} suffix="+" />
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-bold text-blue-300 mt-1 uppercase tracking-wider">
                  Mitra Perusahaan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full min-h-screen bg-white text-gray-900 flex flex-col justify-center px-0 md:px-12 py-20 font-cabinet rounded-t-[35px] -mt-6 z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.2)]">
        <div className="max-w-6xl w-full mx-auto space-y-12 px-6 md:px-0">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
              Kenapa Memilih <span className="text-blue-600">PPLG?</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Kurikulum berbasis industri yang dirancang untuk menguasai
              teknologi masa depan.
            </p>
          </div>

          <div className="hidden md:grid grid-cols-3 gap-6">
            {majorCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl border border-gray-200 bg-blue-800 p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900 text-white">
                      <Icon className="text-2xl" />
                    </div>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 border border-blue-100">
                      {card.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden overflow-hidden w-full relative py-4 mt-6">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-4 w-max px-6"
          >
            {[...majorCards, ...majorCards].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="w-[280px] shrink-0 rounded-2xl border border-gray-200 bg-blue-800 p-5 shadow-md"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-800 text-white">
                      <Icon className="text-xl" />
                    </div>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-600 border border-blue-100">
                      {card.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">
                    {card.title}
                  </h4>
                  <p className="text-xs text-white leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}