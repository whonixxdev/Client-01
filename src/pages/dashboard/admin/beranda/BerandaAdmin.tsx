import { useEffect, useState } from "react";
import {
  Users,
  FileCheck,
  CreditCard,
  GraduationCap,
  RefreshCw,
} from "lucide-react";
import { api } from "../../../../services/Api";

interface QuotaItem {
  id_jurusan: number | string;
  nama_jurusan: string;
  kode_jurusan?: string;
  kuota: number;
  terisi: number;
}

interface RecentStudent {
  id_pendaftaran: number | string;
  nama_lengkap: string;
  jurusan: string;
  status_verifikasi: string;
  tanggal_daftar: string;
}

interface DashboardSummary {
  total_pendaftar: number;
  perlu_verifikasi: number;
  pembayaran_lunas: number;
  siswa_diterima: number;
  jurusan: QuotaItem[];
  pendaftar_terbaru: RecentStudent[];
}

interface PendaftaranItem {
  id_pendaftaran: number | string;
  id_jurusan_pilihan1?: number | string;
  status_verifikasi?: string;
  status_pembayaran?: string;
  status_kelulusan?: string;
  created_at?: string;
  user?: {
    username?: string;
    biodata?: { nama_lengkap?: string };
  };
  jurusan_pilihan1?: { nama_jurusan?: string };
}

interface JurusanItem {
  id_jurusan: number | string;
  nama_jurusan: string;
  kode_jurusan?: string;
  kuota?: number;
}

interface StatCardProps {
  title: string;
  value: number;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeText: string;
  badgeColor: string;
  iconBgColor: string;
}

const EMPTY_SUMMARY: DashboardSummary = {
  total_pendaftar: 0,
  perlu_verifikasi: 0,
  pembayaran_lunas: 0,
  siswa_diterima: 0,
  jurusan: [],
  pendaftar_terbaru: [],
};

const unwrap = (value: unknown): unknown => {
  if (value && typeof value === "object" && "data" in value) {
    return (value as { data: unknown }).data;
  }
  return value;
};

const asList = <T,>(value: unknown): T[] =>
  Array.isArray(value) ? (value as T[]) : [];

const fetchSummary = async (): Promise<DashboardSummary> => {
  try {
    const response = await api.get("/dashboard/stats");
    const data = (unwrap(response.data) || {}) as Partial<DashboardSummary>;
    return {
      total_pendaftar: data.total_pendaftar || 0,
      perlu_verifikasi: data.perlu_verifikasi || 0,
      pembayaran_lunas: data.pembayaran_lunas || 0,
      siswa_diterima: data.siswa_diterima || 0,
      jurusan: data.jurusan || [],
      pendaftar_terbaru: data.pendaftar_terbaru || [],
    };
  } catch {
    const [resPendaftaran, resJurusan] = await Promise.all([
      api.get("/pendaftaran"),
      api.get("/jurusan"),
    ]);
    const pendaftaranList = asList<PendaftaranItem>(unwrap(resPendaftaran.data));
    const jurusanList = asList<JurusanItem>(unwrap(resJurusan.data));

    const perluVerifikasi = pendaftaranList.filter(
      (p) =>
        p.status_verifikasi === "pending" ||
        p.status_verifikasi === "belum_diunggah"
    ).length;
    const lunas = pendaftaranList.filter(
      (p) =>
        p.status_pembayaran === "lunas" ||
        p.status_pembayaran === "terkonfirmasi"
    ).length;
    const diterima = pendaftaranList.filter(
      (p) => p.status_kelulusan === "lulus"
    ).length;

    const jurusan: QuotaItem[] = jurusanList.map((j) => ({
      id_jurusan: j.id_jurusan,
      nama_jurusan: j.nama_jurusan,
      kode_jurusan: j.kode_jurusan,
      kuota: j.kuota || 0,
      terisi: pendaftaranList.filter(
        (p) => p.id_jurusan_pilihan1 === j.id_jurusan
      ).length,
    }));

    const pendaftarTerbaru: RecentStudent[] = pendaftaranList
      .slice(0, 5)
      .map((p) => ({
        id_pendaftaran: p.id_pendaftaran,
        nama_lengkap:
          p.user?.biodata?.nama_lengkap || p.user?.username || "Calon Siswa",
        jurusan: p.jurusan_pilihan1?.nama_jurusan || "Belum Memilih",
        status_verifikasi: p.status_verifikasi || p.status_kelulusan || "proses",
        tanggal_daftar: p.created_at
          ? new Date(p.created_at).toLocaleDateString("id-ID")
          : "Hari ini",
      }));

    return {
      total_pendaftar: pendaftaranList.length,
      perlu_verifikasi: perluVerifikasi,
      pembayaran_lunas: lunas,
      siswa_diterima: diterima,
      jurusan,
      pendaftar_terbaru: pendaftarTerbaru,
    };
  }
};

const statusBadgeClass = (status: string): string => {
  const value = status.toLowerCase();
  if (value === "lulus" || value === "terverifikasi" || value === "lunas") {
    return "bg-emerald-50 text-emerald-700";
  }
  if (value === "pending" || value === "belum_diunggah" || value === "proses") {
    return "bg-amber-50 text-amber-700";
  }
  if (value === "ditolak" || value === "tidak_lulus") {
    return "bg-red-50 text-red-700";
  }
  return "bg-slate-100 text-slate-600";
};

function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  badgeText,
  badgeColor,
  iconBgColor,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBgColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${badgeColor}`}>
          {badgeText}
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-bold text-slate-800">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{subtext}</p>
    </div>
  );
}

function QuotaCard({ data }: { data: QuotaItem[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm h-full">
      <h2 className="text-base font-bold text-slate-800">Kuota Jurusan</h2>
      <p className="text-xs text-slate-400 mb-4">Terisi dibanding kuota tersedia</p>
      {data.length === 0 ? (
        <p className="text-sm text-slate-400 py-6 text-center">
          Belum ada data jurusan.
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((item) => {
            const percent =
              item.kuota > 0
                ? Math.min(100, Math.round((item.terisi / item.kuota) * 100))
                : 0;
            return (
              <div key={item.id_jurusan}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700 truncate pr-2">
                    {item.nama_jurusan}
                  </span>
                  <span className="text-xs text-slate-500 shrink-0">
                    {item.terisi}/{item.kuota}
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RecentTableCard({ students }: { students: RecentStudent[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm h-full">
      <h2 className="text-base font-bold text-slate-800">Pendaftar Terbaru</h2>
      <p className="text-xs text-slate-400 mb-4">Lima pendaftar terakhir</p>
      {students.length === 0 ? (
        <p className="text-sm text-slate-400 py-6 text-center">
          Belum ada pendaftar.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-slate-400 border-b border-gray-100">
                <th className="py-2 pr-4 font-medium">Nama</th>
                <th className="py-2 pr-4 font-medium">Jurusan</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 font-medium">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id_pendaftaran}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="py-3 pr-4 font-medium text-slate-700">
                    {student.nama_lengkap}
                  </td>
                  <td className="py-3 pr-4 text-slate-500">{student.jurusan}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusBadgeClass(
                        student.status_verifikasi
                      )}`}
                    >
                      {student.status_verifikasi}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500">{student.tanggal_daftar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function BerandaAdmin() {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [stats, setStats] = useState<DashboardSummary>(EMPTY_SUMMARY);

  useEffect(() => {
    let isActive = true;

    const loadDashboard = async () => {
      try {
        const summary = await fetchSummary();
        if (!isActive) return;
        setStats(summary);
        setErrorMessage(null);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        if (isActive) {
          setErrorMessage("Data dashboard gagal dimuat. Periksa koneksi atau server, lalu coba lagi.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void loadDashboard();

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  const handleRefresh = () => {
    setLoading(true);
    setErrorMessage(null);
    setReloadKey((current) => current + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Utama SPMB</h1>
          <p className="text-sm text-slate-500">
            Ringkasan statistik pendaftaran siswa baru secara real-time.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Segarkan Data
        </button>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Pendaftar"
          value={stats.total_pendaftar}
          subtext="Calon siswa terdaftar"
          icon={Users}
          badgeText="Aktif"
          badgeColor="bg-blue-50 text-blue-700"
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Perlu Verifikasi"
          value={stats.perlu_verifikasi}
          subtext="Berkas menunggu tinjauan"
          icon={FileCheck}
          badgeText="Pending"
          badgeColor="bg-amber-50 text-amber-700"
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Pembayaran Lunas"
          value={stats.pembayaran_lunas}
          subtext="Transaksi terverifikasi"
          icon={CreditCard}
          badgeText="Lunas"
          badgeColor="bg-emerald-50 text-emerald-700"
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Siswa Diterima"
          value={stats.siswa_diterima}
          subtext="Lolos seleksi penerimaan"
          icon={GraduationCap}
          badgeText="Lulus"
          badgeColor="bg-purple-50 text-purple-700"
          iconBgColor="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTableCard students={stats.pendaftar_terbaru} />
        </div>
        <div className="lg:col-span-1">
          <QuotaCard data={stats.jurusan} />
        </div>
      </div>
    </div>
  );
}