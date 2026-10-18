import { useEffect, useState, useRef } from "react";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import {
  FiChevronDown,
  FiMenu,
  FiX,
  FiPlus,
  FiCode,
  FiTv,
  FiServer,
  FiTrendingUp,
  FiHome as FiFacility,
  FiCheckCircle,
  FiAward,
  FiActivity,
  FiGift,
  FiPhone,
  FiMail,
  FiGitBranch,
} from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import logoSmk from "../../../assets/img/logo-smk.png";

interface MenuItem {
  readonly title: string;
  readonly desc: string;
  readonly href: string;
  readonly icon?: React.ComponentType<{ className?: string }>;
}

interface MenuCategory {
  readonly category: string;
  readonly items: readonly MenuItem[];
}

interface NavItem {
  readonly title: string;
  readonly href?: string;
  readonly megaMenu?: readonly MenuCategory[];
}

const navbarData: readonly NavItem[] = [
  {
    title: "BERANDA",
    href: "/",
  },
  {
    title: "PROFIL",
    megaMenu: [
      {
        category: "TENTANG SEKOLAH",
        items: [
          {
            title: "Struktur Organisasi",
            desc: "Bagan dan hirarki tata kelola sekolah",
            href: "/Profile/Organizational",
            icon: FiGitBranch,
          },
          {
            title: "Fasilitas & Sarpras",
            desc: "Sarana penunjang kegiatan belajar mengajar",
            href: "/Profile/Facilities",
            icon: FiFacility,
          },
        ],
      },
      {
        category: "MUTU SEKOLAH",
        items: [
          {
            title: "Akreditasi",
            desc: "Status kelayakan & sertifikasi sekolah",
            href: "/Profile/Accreditation",
            icon: FiCheckCircle,
          },
        ],
      },
    ],
  },
  {
    title: "JURUSAN",
    megaMenu: [
      {
        category: "PROGRAM KEAHLIAN",
        items: [
          {
            title: "PPLG",
            desc: "Pengembangan Perangkat Lunak dan Gim",
            href: "/Majors/Pplg",
            icon: FiCode,
          },
          {
            title: "DKV",
            desc: "Desain Komunikasi Visual",
            href: "/Majors/Dkv",
            icon: FiTv,
          },
        ],
      },
      {
        category: "JURUSAN LAINNYA",
        items: [
          {
            title: "TJKT",
            desc: "Teknik Jaringan Komputer dan Telekomunikasi",
            href: "/Majors/Tjkt",
            icon: FiServer,
          },
          {
            title: "BD",
            desc: "Bisnis Digital",
            href: "/Majors/Bd",
            icon: FiTrendingUp,
          },
        ],
      },
    ],
  },
  {
    title: "KESISWAAN",
    megaMenu: [
      {
        category: "KEGIATAN & PRESTASI",
        items: [
          {
            title: "Prestasi Siswa",
            desc: "Pencapaian di bidang akademik & non-akademik",
            href: "/StudentAffairs/Achievements",
            icon: FiAward,
          },
          {
            title: "Ekstrakurikuler",
            desc: "Wadah pengembangan bakat dan minat",
            href: "/StudentAffairs/Extracurriculars",
            icon: FiActivity,
          },
        ],
      },
      {
        category: "BANTUAN",
        items: [
          {
            title: "Beasiswa",
            desc: "Informasi bantuan pendidikan & KJP/PIP",
            href: "/StudentAffairs/Scholarships",
            icon: FiGift,
          },
        ],
      },
    ],
  },
];

export default function NavbarSekolah(): ReactElement {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = openDrawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openDrawer]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        setIsNavbarHidden(true);
        setActiveIndex(null);
        setIsPinned(false);
      } else {
        setIsNavbarHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        setIsPinned(false);
        setOpenDrawer(false);
      }
    };

    const handleClickOutside = (event: MouseEvent): void => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveIndex(null);
        setIsPinned(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (index: number) => {
    if (!isPinned) {
      setActiveIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setActiveIndex(null);
    }
  };

  const handleMenuClick = (index: number) => {
    if (activeIndex === index && isPinned) {
      setIsPinned(false);
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
      setIsPinned(true);
    }
  };

  return (
    <>
      <motion.div
        animate={{ y: isNavbarHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full"
      >
        <nav
          ref={navRef}
          aria-label="Navigasi utama"
          className="w-full font-cabinet bg-transparent text-white"
        >
          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
            <Link to="/" aria-label="Beranda" className="flex shrink-0 items-center">
              <img
                src={logoSmk}
                alt="Logo sekolah"
                className="h-11 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navbarData.map((item, index) => {
                const isActive = activeIndex === index;
                const hasChildren = Boolean(item.megaMenu && item.megaMenu.length > 0);

                if (!hasChildren && item.href) {
                  return (
                    <li key={item.title}>
                      <Link
                        to={item.href}
                        onMouseEnter={() => {
                          if (!isPinned) setActiveIndex(null);
                        }}
                        className="flex items-center px-4 py-2 text-sm font-semibold tracking-wider text-white transition-colors duration-200 hover:text-blue-400"
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => handleMenuClick(index)}
                      className={clsx(
                        "flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-wider transition-colors duration-200 rounded-lg",
                        isActive ? "text-blue-400 bg-white/10" : "text-white hover:text-blue-400"
                      )}
                    >
                      {item.title}
                      <FiChevronDown
                        className={clsx(
                          "text-sm transition-transform duration-300",
                          isActive && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isActive && item.megaMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-0 top-full pt-2 w-[480px] z-50"
                        >
                          <div className="rounded-2xl border border-white/15 bg-slate-900/95 backdrop-blur-xl p-5 shadow-2xl text-white">
                            <div className="grid grid-cols-2 gap-6">
                              {item.megaMenu.map((group) => (
                                <div key={group.category}>
                                  <p className="mb-2 px-2 text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                                    {group.category}
                                  </p>
                                  <ul className="space-y-1">
                                    {group.items.map((sub) => {
                                      const SubIcon = sub.icon;
                                      return (
                                        <li key={sub.href}>
                                          <Link
                                            to={sub.href}
                                            onClick={() => {
                                              setActiveIndex(null);
                                              setIsPinned(false);
                                            }}
                                            className="group flex items-start gap-2.5 rounded-xl p-2 transition-all duration-200 hover:bg-white/10"
                                          >
                                            {SubIcon && (
                                              <SubIcon className="mt-0.5 shrink-0 text-base text-blue-400 transition-transform duration-200 group-hover:scale-110" />
                                            )}
                                            <div>
                                              <span className="block text-sm font-semibold text-white transition-colors group-hover:text-blue-300">
                                                {sub.title}
                                              </span>
                                              <span className="block text-xs leading-tight text-gray-400">
                                                {sub.desc}
                                              </span>
                                            </div>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="hidden items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 sm:inline-flex hover:bg-blue-700 transition duration-200"
              >
                <LuGraduationCap className="text-lg" />
                Daftar SPMB
              </Link>

              <button
                type="button"
                aria-label={openDrawer ? "Tutup menu" : "Buka menu"}
                aria-expanded={openDrawer}
                onClick={() => setOpenDrawer((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white text-xl lg:hidden shadow-md"
              >
                {openDrawer ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {isNavbarHidden && !openDrawer && (
          <motion.div
            initial={{ x: "150%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "150%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 24, restDelta: 0.001 }}
            className="fixed top-5 right-5 lg:top-6 lg:right-8 z-50"
          >
            <button
              onClick={() => setOpenDrawer(true)}
              aria-label="Buka menu"
              className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-2xl bg-blue-600 text-white text-2xl shadow-xl hover:bg-blue-700 transition-colors"
            >
              <FiMenu />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openDrawer && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-[#095491] z-[999] text-white p-6 sm:p-10 flex flex-col justify-between shadow-2xl overflow-y-auto font-cabinet"
          >
            <div className="flex justify-between items-center w-full border-b border-white/20 pb-4">
              <div className="flex items-center gap-3">
                <img src={logoSmk} alt="Logo SMK" className="h-8 w-auto brightness-0 invert" />
                <span className="text-xs font-bold tracking-widest uppercase text-white">
                  SMK TI BALI GLOBAL BADUNG
                </span>
              </div>
              <button
                onClick={() => setOpenDrawer(false)}
                className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4 my-auto py-6">
              <span className="text-white/80 uppercase tracking-widest text-[11px] font-mono font-semibold">
                Menu Utama
              </span>

              {navbarData.map((item, idx) => {
                const hasChildren = Boolean(item.megaMenu && item.megaMenu.length > 0);
                const isExpanded = mobileExpanded === idx;

                if (!hasChildren && item.href) {
                  return (
                    <Link
                      key={idx}
                      to={item.href}
                      onClick={() => setOpenDrawer(false)}
                      className="text-2xl sm:text-3xl font-bold tracking-wide flex items-center justify-between border-b border-white/15 pb-3 text-white hover:text-white/80 transition-colors"
                    >
                      <span>{item.title}</span>
                    </Link>
                  );
                }

                return (
                  <div key={idx} className="border-b border-white/15 pb-3">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(isExpanded ? null : idx)}
                      className="w-full text-2xl sm:text-3xl font-bold tracking-wide flex items-center justify-between text-white hover:text-white/80 transition-colors"
                    >
                      <span>{item.title}</span>
                      <FiPlus
                        size={22}
                        className={clsx(
                          "transition-transform duration-300 text-white",
                          isExpanded && "rotate-45"
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && item.megaMenu && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-2 pt-3 space-y-4"
                        >
                          {item.megaMenu.map((group) => (
                            <div key={group.category}>
                              <p className="text-[11px] font-bold tracking-widest text-white/80 uppercase mb-2">
                                {group.category}
                              </p>
                              <div className="space-y-3">
                                {group.items.map((sub) => {
                                  const SubIcon = sub.icon;
                                  return (
                                    <Link
                                      key={sub.href}
                                      to={sub.href}
                                      onClick={() => setOpenDrawer(false)}
                                      className="flex items-start gap-3 py-1 hover:text-white/80 transition-colors"
                                    >
                                      {SubIcon && (
                                        <SubIcon className="text-white text-lg mt-0.5 shrink-0" />
                                      )}
                                      <div>
                                        <span className="block text-sm font-semibold text-white">
                                          {sub.title}
                                        </span>
                                        <span className="block text-xs text-white/90 font-normal">
                                          {sub.desc}
                                        </span>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                to="/login"
                onClick={() => setOpenDrawer(false)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 shadow-xl hover:bg-blue-50 transition duration-200"
              >
                <LuGraduationCap className="text-lg" />
                Daftar SPMB Sekarang
              </Link>
            </div>

            <div className="flex flex-col gap-2 border-t border-white/20 pt-4">
              <span className="text-white/80 uppercase tracking-widest text-[10px] font-mono font-semibold">
                Kontak Sekolah
              </span>
              <div className="flex flex-col sm:flex-row gap-3 text-xs text-white">
                <a href="tel:+62361123456" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                  <FiPhone /> (0361) 123456
                </a>
                <a href="mailto:info@smktibaliglobalbadung.sch.id" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                  <FiMail /> info@smktibaliglobalbadung.sch.id
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}