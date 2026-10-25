import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { LuGraduationCap } from "react-icons/lu";
import { FiServer, FiShield, FiWifi, FiCpu, FiTerminal, FiCloud } from "react-icons/fi";
import backgroundTjkt from "../../../assets/img/BackgroundTjkt.jpg";

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

const tjktCards: readonly MajorCard[] = [
  {
    title: "Network Engineering",
    desc: "Mempelajari konfigurasi router, switch, Cisco, Mikrotik, dan manajemen infrastruktur jaringan skala enterprise.",
    badge: "Core Skill",
    icon: FiServer,
  },
  {
    title: "Cyber Security",
    desc: "Praktik ethical hacking, pentesting, analisis kerentanan sistem, dan mitigasi ancaman keamanan siber.",
    badge: "Security",
    icon: FiShield,
  },
  {
    title: "Telecommunication",
    desc: "Pengelolaan teknologi fiber optik, wireless transmission, dan infrastruktur telekomunikasi modern.",
    badge: "Infrastructure",
    icon: FiWifi,
  },
  {
    title: "Server Administration",
    desc: "Manajemen sistem operasi server Linux dan Windows Server, virtualization, serta layanan cloud computing.",
    badge: "Cloud",
    icon: FiCloud,
  },
  {
    title: "IoT & Hardware",
    desc: "Perakitan komputer, troubleshooting perangkat keras, serta implementasi Internet of Things (IoT).",
    badge: "Hardware",
    icon: FiCpu,
  },
  {
    title: "System Automation",
    desc: "Otomasi konfigurasi jaringan dan skrip administrasi menggunakan bahasa pemrograman modern.",
    badge: "Automation",
    icon: FiTerminal,
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

export default function TjktSection(): ReactElement {
  return (
    <div className="w-full bg-gray-950 overflow-hidden">
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-12 pt-24 pb-16 font-cabinet text-white">
        <div className="absolute inset-0 h-full">
          <img
            src={backgroundTjkt}
            alt="Suasana Jurusan TJKT SMK TI Bali Global Badung"
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
              Teknik Komputer <br className="hidden sm:inline" />
              <span className="text-blue-500">Jaringan & Telekomunikasi</span>
            </h1>
          </div>

          <p className="text-gray-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
            Network Engineer • Cyber Security Expert • Cloud Specialist
          </p>

          <div className="pt-6 border-t border-white/20 max-w-3xl mx-auto">
            <div className="grid grid-cols-3 divide-x divide-white/20 text-center">
              <div className="px-2 sm:px-4 py-1">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  <CounterNumber value={600} suffix="+" />
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-bold text-blue-300 mt-1 uppercase tracking-wider">
                  Alumni Sukses
                </p>
              </div>

              <div className="px-2 sm:px-4 py-1">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  <CounterNumber value={98} suffix="%" />
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-bold text-blue-300 mt-1 uppercase tracking-wider">
                  Bersertifikasi
                </p>
              </div>

              <div className="px-2 sm:px-4 py-1">
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  <CounterNumber value={40} suffix="+" />
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
              Kenapa Memilih <span className="text-blue-600">TJKT?</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Kompetensi keahlian jaringan dan keamanan siber berstandar industri global.
            </p>
          </div>

          <div className="hidden md:grid grid-cols-3 gap-6">
            {tjktCards.map((card, idx) => {
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
            {[...tjktCards, ...tjktCards].map((card, idx) => {
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