import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { LuGraduationCap } from "react-icons/lu";
// import backgroundTk from "../../../assets/img/BackgroundTk.jpg";

interface CounterProps {
  readonly value: number;
  readonly suffix?: string;
}

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

export default function TkSection(): ReactElement {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-12 pt-24 pb-12 font-cabinet bg-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 h-full">
        <img
        //   src={backgroundTk}
          alt="Suasana Jurusan Tata Kecantikan SMK"
          className="w-full h-full object-cover object-center scale-105 transform transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/70 to-gray-950/50" />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto text-center space-y-4 -mt-6">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm font-bold border border-blue-400/30 backdrop-blur-md uppercase tracking-wider shadow-sm">
            <LuGraduationCap className="text-base" />
            Selamat Datang di
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Tata <br className="hidden sm:inline" />
            <span className="text-blue-400">Kecantikan</span>
          </h1>
        </div>

        <p className="text-gray-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
          Professional Makeup Artist • Hair Stylist • Beauty Therapist
        </p>

        <div className="pt-6 border-t border-white/20 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 divide-x divide-white/20 text-center">
            <div className="px-2 sm:px-4 py-1">
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                <CounterNumber value={350} suffix="+" />
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
                Siap Kerja
              </p>
            </div>

            <div className="px-2 sm:px-4 py-1">
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                <CounterNumber value={25} suffix="+" />
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm font-bold text-blue-300 mt-1 uppercase tracking-wider">
                Mitra Salon & Spa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}