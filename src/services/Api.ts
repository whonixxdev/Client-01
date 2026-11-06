import axios from 'axios';

const BASE_CADANGAN = 'https://backend-spmb-smktibaliglobalbadung.vercel.app/';

// Deteksi otomatis jika berjalan di Vercel atau production, atau ambil dari import.meta.env
export const BASE_URL: string = (() => {
  const envUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.replace(/\/+$/, '');
  }
  
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return 'https://backend-spmb-smktibaliglobalbadung.vercel.app';
  }

  return BASE_CADANGAN;
})();

const KUNCI_TOKEN = 'auth_token';
const KUNCI_USER = 'user_data';
const KUNCI_ROLE = 'user_role';

export type PeranPengguna = 'siswa' | 'panitia' | 'admin';
export type StatusVerifikasi = 'PENDING' | 'REVISI' | 'VALID' | 'LUNAS';
export type MetodePembayaran = 'OFFLINE' | 'ONLINE';
export type StatusRegistrasiUlang =
  | 'BELUM_HADIR'
  | 'HADIR_VERIFIKASI'
  | 'SUDAH_LENGKAP'
  | 'ADA_KEKURANGAN';
export type JenisBerkas = 'kk' | 'akta' | 'skl' | 'kia' | 'kip';

export interface PesanRespons {
  status: string;
  message: string;
}

export interface Paginasi {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DaftarBerpaginasi<T> {
  status: string;
  data: T[];
  meta: Paginasi;
}

export interface PenggunaSesi {
  id: string;
  username: string | null;
  email: string;
  role: PeranPengguna;
  panitiaId: string | null;
}

export interface LoginResponse {
  status: string;
  message: string;
  access_token: string;
  token_type: string;
  data: PenggunaSesi;
}

export interface PerluOtpResponse {
  status: string;
  requiresOtp: true;
  message: string;
}

export interface ProfilPengguna {
  id: string;
  email: string;
  username: string | null;
  panitiaId: string | null;
  role: PeranPengguna;
  namaLengkap: string | null;
  noHp: string | null;
  avatarUrl: string | null;
  adaAvatar: boolean;
  createdAt: string;
}

export interface JurusanRingkas {
  id: string;
  namaJurusan: string;
  biayaPendaftaran: number;
}

export interface Jurusan {
  id: string;
  namaJurusan: string;
  kuota: number;
  biayaPendaftaran: number;
  aktif: boolean;
  terisi: number;
  sisaKuota: number;
}

export interface Gelombang {
  id: string;
  nama: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  aktif: boolean;
  jumlahSiswa?: number;
}

export interface BiodataSiswa {
  id: string;
  userId: string;
  namaLengkap: string;
  avatarUrl: string | null;
  nik: string | null;
  nisn: string | null;
  nis: string | null;
  jenisKelamin: string | null;
  tempatLahir: string | null;
  tanggalLahir: string | null;
  agama: string | null;
  alamat: string | null;
  noHpSiswa: string | null;
  namaAyah: string | null;
  noHpAyah: string | null;
  namaIbu: string | null;
  noHpIbu: string | null;
  asalSmp: string | null;
  jurusanId: string | null;
  jurusanCadanganId: string | null;
  jurusanDiterimaId: string | null;
  gelombangId: string | null;
  statusFormulir: StatusVerifikasi;
  diajukanPada: string | null;
  statusDaftarUlang: StatusRegistrasiUlang;
  catatanDaftarUlang: string | null;
  jurusan?: JurusanRingkas | null;
  jurusanCadangan?: JurusanRingkas | null;
  jurusanDiterima?: JurusanRingkas | null;
  gelombang?: { id: string; nama: string } | null;
}

export interface BiodataPayload {
  namaLengkap: string;
  nik?: string;
  nisn?: string;
  nis?: string;
  jenisKelamin?: 'Laki-laki' | 'Perempuan';
  tempatLahir?: string;
  tanggalLahir?: string;
  agama?: 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Buddha' | 'Konghucu' | 'Lainnya';
  alamat?: string;
  noHpSiswa?: string;
  namaAyah?: string;
  noHpAyah?: string;
  namaIbu?: string;
  noHpIbu?: string;
  asalSmp?: string;
  jurusanId?: string;
  jurusanCadanganId?: string;
}

export interface InfoBerkas {
  label: string;
  wajib: boolean;
  tersedia: boolean;
  url: string | null;
}

export type DaftarBerkas = Record<JenisBerkas, InfoBerkas>;

export interface StatusBerkasSiswa {
  statusVerifikasi: StatusVerifikasi;
  catatanAdmin: string | null;
  files: DaftarBerkas;
}

export interface PembayaranSiswa {
  metode: MetodePembayaran;
  jumlah: number;
  status: StatusVerifikasi;
  buktiUrl: string | null;
}

export interface Kekurangan {
  biodataKurang: string[];
  berkasKurang: string[];
}

export interface Notifikasi {
  id: string;
  kategori: string;
  pesan: string;
  dibacaPada: string | null;
  createdAt: string;
}

export interface PendaftaranSaya {
  biodata: BiodataSiswa | null;
  berkas: StatusBerkasSiswa | null;
  pembayaran: PembayaranSiswa | null;
  biayaPendaftaran: number | null;
  kekurangan: Kekurangan | null;
  akses: {
    biodataBisaDiedit: boolean;
    berkasBisaDiedit: boolean;
    bisaMengajukan: boolean;
    pembayaranTerbuka: boolean;
    daftarUlangTerbuka: boolean;
  };
  infoPembayaran: {
    bankNama: string | null;
    nomorRekening: string | null;
    atasNama: string | null;
    instruksiOffline: string | null;
  } | null;
  instruksiRegistrasiUlang: string | null;
  catatanPanitia: Notifikasi[];
  notifikasiBelumDibaca: number;
}

export interface DaftarNotifikasi extends DaftarBerpaginasi<Notifikasi> {
  belumDibaca: number;
}

export interface QueryPendaftar {
  page?: number;
  limit?: number;
  search?: string;
  jurusanId?: string;
  gelombangId?: string;
  statusFormulir?: StatusVerifikasi;
  statusBerkas?: StatusVerifikasi;
  statusPembayaran?: StatusVerifikasi;
  statusDaftarUlang?: StatusRegistrasiUlang;
  diajukan?: boolean;
  avatar?: boolean;
}

export interface NamaJurusan {
  id: string;
  namaJurusan: string;
}

export interface PendaftarRingkas {
  id: string;
  email: string;
  username: string | null;
  createdAt: string;
  biodata: {
    namaLengkap: string;
    nisn: string | null;
    noHpSiswa: string | null;
    asalSmp: string | null;
    statusFormulir: StatusVerifikasi;
    statusDaftarUlang: StatusRegistrasiUlang;
    diajukanPada: string | null;
    avatarUrl: string | null;
    jurusan: NamaJurusan | null;
    jurusanCadangan: NamaJurusan | null;
    jurusanDiterima: NamaJurusan | null;
    gelombang: { id: string; nama: string } | null;
  } | null;
  berkas: { statusVerifikasi: StatusVerifikasi } | null;
  pembayaran: { metode: MetodePembayaran; jumlah: number; status: StatusVerifikasi } | null;
}

export interface RiwayatKomentar {
  id: string;
  userId: string;
  panitiaId: string;
  kategori: string;
  pesan: string;
  batchId: string | null;
  dibacaPada: string | null;
  createdAt: string;
}

export interface PendaftarDetail {
  id: string;
  email: string;
  username: string | null;
  createdAt: string;
  biodata: BiodataSiswa | null;
  berkas: StatusBerkasSiswa | null;
  pembayaran: PembayaranSiswa | null;
  kekurangan: Kekurangan | null;
  riwayat: RiwayatKomentar[];
}

export interface VerifikasiPayload {
  statusFormulir?: 'REVISI' | 'VALID';
  statusBerkas?: 'REVISI' | 'VALID';
  catatanFormulir?: string;
  catatanAdmin?: string;
}

export interface KonfirmasiPembayaranPayload {
  status: 'LUNAS' | 'REVISI';
  catatan?: string;
}

export interface DaftarUlangPayload {
  statusDaftarUlang: StatusRegistrasiUlang;
  catatanDaftarUlang?: string;
}

export interface KirimNotifikasiPayload {
  pesan: string;
  userIds?: string[];
  filter?: QueryPendaftar;
  pratinjau?: boolean;
}

export interface StatusEkspor {
  total: number;
  layak: number;
  belumSelesai: number;
  bisaEkspor: boolean;
  syarat: string;
  maksBaris: number;
  maksBarisDenganFoto: number;
}

export interface Statistik {
  akun: { totalSiswa: number; terverifikasi: number };
  pendaftaran: {
    diajukan: number;
    formulir: Record<string, number>;
    berkas: Record<string, number>;
  };
  pembayaran: {
    perStatus: Record<string, number>;
    perMetode: Record<string, number>;
    totalLunas: number;
  };
  registrasiUlang: Record<string, number>;
  perJurusan: Array<{
    id: string;
    namaJurusan: string;
    aktif: boolean;
    kuota: number;
    pilihanUtama: number;
    pilihanCadangan: number;
    diterima: number;
    sisaKuota: number;
  }>;
  perGelombang: Array<{
    id: string;
    nama: string;
    tanggalMulai: string;
    tanggalSelesai: string;
    aktif: boolean;
    jumlahSiswa: number;
  }>;
  akunBaruHarian: Array<{ hari: string; jumlah: number }>;
}

export interface Pengaturan {
  bankNama: string | null;
  bankNomorRekening: string | null;
  bankAtasNama: string | null;
  instruksiPembayaranOffline: string | null;
  instruksiRegistrasiUlang: string | null;
}

export interface AkunPanitia {
  id: string;
  panitiaId: string | null;
  email: string;
  username: string | null;
  namaLengkap: string | null;
  noHp: string | null;
  isVerified: boolean;
  aktif: boolean;
  terkunciSampai: string | null;
  createdAt: string;
}

export interface CatatanAudit {
  id: string;
  aktorId: string;
  aksi: string;
  targetId: string | null;
  detail: string | null;
  createdAt: string;
  aktor: {
    id: string;
    email: string;
    username: string | null;
    namaLengkap: string | null;
    role: string;
  } | null;
}

export interface KategoriBerita {
  id: string;
  name: string;
  slug: string;
  jumlahBerita: number;
  createdAt?: string;
}

export interface Berita {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content?: string;
  thumbnailUrl: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  category: { id: string; name: string; slug: string };
  penulis: string;
  penulisId: string;
}

export interface QueryBerita {
  page?: number;
  limit?: number;
  search?: string;
  kategori?: string;
  status?: 'terbit' | 'draft';
}

export interface BeritaPayload {
  title: string;
  content: string;
  excerpt?: string;
  categoryId: string;
  published?: boolean;
}

export interface JurusanPayload {
  namaJurusan: string;
  kuota: number;
  biayaPendaftaran: number;
  aktif?: boolean;
}

export interface GelombangPayload {
  nama: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  aktif?: boolean;
}

export interface RegisterPayload {
  nama_lengkap: string;
  email: string;
  username: string;
  no_hp: string;
  password: string;
  password_confirmation: string;
}

export interface LoginPayload {
  login: string;
  password: string;
}

export interface LoginPanitiaPayload {
  panitiaId?: string;
  email?: string;
  password: string;
  otp?: string;
}

export interface ForgotPasswordResetPayload {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const bacaToken = (): string | null =>
  localStorage.getItem(KUNCI_TOKEN) || localStorage.getItem('token');

export const hapusSesi = (): void => {
  localStorage.removeItem(KUNCI_TOKEN);
  localStorage.removeItem('token');
  localStorage.removeItem(KUNCI_USER);
  localStorage.removeItem(KUNCI_ROLE);
};

api.interceptors.request.use((config) => {
  const token = bacaToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = axios.isAxiosError(error) ? error.response?.status : undefined;
    const jalur = axios.isAxiosError(error) ? (error.config?.url ?? '') : '';
    const kecuali = jalur.startsWith('/auth/') || jalur === '/profil/ganti-password';
    
    if (status === 401 && !kecuali) {
      hapusSesi();
      
      // Cegah looping dengan mengecek apakah user sudah berada di halaman login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

const ambil = async <T>(url: string, params?: object): Promise<T> => {
  const response = await api.get<{ status: string; data: T }>(url, { params });
  return response.data.data;
};

const kirim = async <T = PesanRespons>(
  metode: 'post' | 'put' | 'patch' | 'delete',
  url: string,
  isi?: object,
): Promise<T> => {
  const response = await api.request<T>({ method: metode, url, data: isi });
  return response.data;
};

const kirimFile = async <T = PesanRespons>(url: string, formData: FormData): Promise<T> => {
  const response = await api.post<T>(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const ambilPesanError = (
  error: unknown,
  cadangan = 'Terjadi kesalahan. Silakan coba lagi.',
): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string | string[] } | undefined;
    const pesan = data?.message;
    if (Array.isArray(pesan) && pesan.length > 0) return pesan.join('\n');
    if (typeof pesan === 'string' && pesan) return pesan;
    if (error.code === 'ECONNABORTED') return 'Waktu permintaan habis. Silakan coba lagi.';
    if (!error.response) return 'Tidak dapat terhubung ke server.';
  }
  if (error instanceof Error && error.message) return error.message;
  return cadangan;
};

export const ambilKekurangan = (error: unknown): Kekurangan | null => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Partial<Kekurangan> | undefined;
    if (data && (Array.isArray(data.biodataKurang) || Array.isArray(data.berkasKurang))) {
      return { biodataKurang: data.biodataKurang ?? [], berkasKurang: data.berkasKurang ?? [] };
    }
  }
  return null;
};

export const getStorageUrl = (filePath?: string | null): string | null => {
  if (!filePath || filePath.trim() === '' || String(filePath).toUpperCase() === 'NULL') {
    return null;
  }
  return filePath.startsWith('http://') || filePath.startsWith('https://') ? filePath : null;
};

const simpanSesi = (data: LoginResponse): LoginResponse => {
  const peran = String(data.data.role).toLowerCase() as PeranPengguna;
  const pengguna: PenggunaSesi = { ...data.data, role: peran };
  localStorage.setItem(KUNCI_TOKEN, data.access_token);
  localStorage.setItem(KUNCI_USER, JSON.stringify(pengguna));
  localStorage.setItem(KUNCI_ROLE, peran);
  return { ...data, data: pengguna };
};

export const getPenggunaSesi = (): PenggunaSesi | null => {
  const teks = localStorage.getItem(KUNCI_USER);
  if (!teks) return null;
  try {
    return JSON.parse(teks) as PenggunaSesi;
  } catch {
    return null;
  }
};

export const sudahLogin = (): boolean => Boolean(bacaToken());

export const registerSendOtp = async (payload: RegisterPayload): Promise<PesanRespons> => {
  const response = await api.post<PesanRespons>('/auth/register/siswa', {
    email: payload.email.trim(),
    namaLengkap: payload.nama_lengkap.trim(),
    username: payload.username.trim(),
    noHp: payload.no_hp.trim(),
    password: payload.password,
    confirmPassword: payload.password_confirmation,
  });
  return response.data;
};

export const registerVerifyOtp = async (payload: {
  email: string;
  otp: string;
}): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/verify-otp', {
    email: payload.email.trim(),
    otpCode: payload.otp.trim(),
  });
  return simpanSesi(response.data);
};

export const kirimUlangOtp = async (email: string): Promise<PesanRespons> => {
  const response = await api.post<PesanRespons>('/auth/resend-otp', { email: email.trim() });
  return response.data;
};

export const sendOtp = registerSendOtp;
export const verifyOtp = registerVerifyOtp;
export const registerVerify = registerVerifyOtp;

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', {
    identifier: payload.login.trim(),
    password: payload.password,
  });
  return simpanSesi(response.data);
};

export const loginPanitia = async (
  payload: LoginPanitiaPayload,
): Promise<LoginResponse | PerluOtpResponse> => {
  const response = await api.post<LoginResponse | PerluOtpResponse>('/auth/login/panitia', {
    panitiaId: payload.panitiaId?.trim() || undefined,
    email: payload.email?.trim() || undefined,
    password: payload.password,
    otpCode: payload.otp?.trim() || undefined,
  });
  if ('access_token' in response.data) {
    return simpanSesi(response.data);
  }
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  hapusSesi();
};

export const getMyProfile = async (): Promise<ProfilPengguna> => {
  const profil = await ambil<ProfilPengguna>('/profil/me');
  const sesi = getPenggunaSesi();
  if (sesi) {
    localStorage.setItem(KUNCI_USER, JSON.stringify({ ...sesi, username: profil.username }));
  }
  return profil;
};

export const ubahProfil = (data: { namaLengkap?: string; noHp?: string }): Promise<ProfilPengguna> =>
  api.patch<{ data: ProfilPengguna }>('/profil/me', data).then((response) => response.data.data);

export const uploadAvatar = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await kirimFile<{ status: string; message: string; data: { url: string } }>(
    '/profil/avatar',
    formData,
  );
  return response.data;
};

export const gantiPassword = (payload: {
  passwordLama: string;
  passwordBaru: string;
  konfirmasiPassword: string;
}): Promise<PesanRespons> => kirim('post', '/profil/ganti-password', payload);

export const forgotPasswordSendOtp = async (email: string): Promise<PesanRespons> => {
  const response = await api.post<PesanRespons>('/auth/forgot-password', { email: email.trim() });
  return response.data;
};

// 
export const forgotPasswordVerifyOtp = async (
  email: string,
  otp: string,
): Promise<PesanRespons> => {
  const response = await api.post<PesanRespons>(
    '/auth/forgot-password/verify-otp',
    {email, otp}
  )
  return response.data
}

export const forgotPasswordReset = async (
  payload: ForgotPasswordResetPayload,
): Promise<PesanRespons> => {
  const response = await api.post<PesanRespons>('/auth/reset-password', {
    email: payload.email.trim(),
    otpCode: payload.otp.trim(),
    newPassword: payload.password,
    confirmPassword: payload.password_confirmation,
  });
  return response.data;
};

export const getJurusanList = (): Promise<Jurusan[]> => ambil<Jurusan[]>('/jurusan');

export const getPendaftaranSaya = (): Promise<PendaftaranSaya> =>
  ambil<PendaftaranSaya>('/pendaftaran/me');

export const simpanBiodata = (payload: BiodataPayload) =>
  kirim<{ status: string; message: string; data: BiodataSiswa }>(
    'post',
    '/pendaftaran/biodata',
    payload,
  );

export const getSiswaBiodata = async (): Promise<BiodataSiswa | null> =>
  (await getPendaftaranSaya()).biodata;

export const updateSiswaBiodata = (payload: BiodataPayload) => simpanBiodata(payload);

export const pilihJurusanSiswa = async (jurusanId: string, jurusanCadanganId?: string) => {
  const saya = await getPendaftaranSaya();
  if (!saya.biodata) {
    throw new Error('Biodata belum tersedia.');
  }
  return simpanBiodata({
    namaLengkap: saya.biodata.namaLengkap,
    jurusanId,
    jurusanCadanganId,
  });
};

export const pilihJurusan = pilihJurusanSiswa;

export const uploadAvatarSiswa = uploadAvatar;

export const uploadBerkas = async (
  jenis: JenisBerkas,
  file: File,
): Promise<{ jenis: JenisBerkas; url: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await kirimFile<{
    status: string;
    message: string;
    data: { jenis: JenisBerkas; url: string };
  }>(`/pendaftaran/berkas/${jenis}`, formData);
  return response.data;
};

export const getSiswaBerkas = async (): Promise<StatusBerkasSiswa | null> =>
  (await getPendaftaranSaya()).berkas;

export const uploadBerkasSiswa = async (payload: {
  foto_ijazah?: File;
  foto_kk?: File;
  foto_pas?: File;
}): Promise<PesanRespons> => {
  if (payload.foto_kk) await uploadBerkas('kk', payload.foto_kk);
  if (payload.foto_ijazah) await uploadBerkas('skl', payload.foto_ijazah);
  if (payload.foto_pas) await uploadAvatar(payload.foto_pas);
  return { status: 'success', message: 'Berkas berhasil diunggah.' };
};

export const uploadBerkasGeneral = uploadBerkasSiswa;

export const ajukanPendaftaran = (): Promise<PesanRespons> =>
  kirim('post', '/pendaftaran/ajukan');

export const getStatusPendaftaranSiswa = getPendaftaranSaya;

export const kirimPembayaran = async (
  metode: MetodePembayaran,
  bukti?: File,
): Promise<{
  status: string;
  message: string;
  data: { metode: MetodePembayaran; jumlah: number; status: StatusVerifikasi };
}> => {
  const formData = new FormData();
  formData.append('metode', metode);
  if (bukti) formData.append('bukti', bukti);
  return kirimFile('/pendaftaran/pembayaran', formData);
};

export const konfirmasiPembayaran = (buktiFile?: File) =>
  kirimPembayaran(buktiFile ? 'ONLINE' : 'OFFLINE', buktiFile);

export const getNotifikasi = async (
  params: { page?: number; limit?: number; belumDibaca?: boolean } = {},
): Promise<DaftarNotifikasi> => {
  const response = await api.get<DaftarNotifikasi>('/pendaftaran/notifikasi', { params });
  return response.data;
};

export const getJumlahNotifikasi = async (): Promise<number> =>
  (await ambil<{ belumDibaca: number }>('/pendaftaran/notifikasi/jumlah')).belumDibaca;

export const tandaiNotifikasiDibaca = (id: string): Promise<PesanRespons> =>
  kirim('patch', `/pendaftaran/notifikasi/${id}/baca`);

export const bacaSemuaNotifikasi = (): Promise<PesanRespons> =>
  kirim('post', '/pendaftaran/notifikasi/baca-semua');

export const getPendaftarList = async (
  query: QueryPendaftar = {},
): Promise<DaftarBerpaginasi<PendaftarRingkas>> => {
  const response = await api.get<DaftarBerpaginasi<PendaftarRingkas>>(
    '/pendaftaran/panitia/all',
    { params: query },
  );
  return response.data;
};

export const getPendaftarDetail = (userId: string): Promise<PendaftarDetail> =>
  ambil<PendaftarDetail>(`/pendaftaran/panitia/${userId}`);

export const verifikasiPendaftar = (userId: string, payload: VerifikasiPayload): Promise<PesanRespons> =>
  kirim('patch', `/pendaftaran/panitia/${userId}/verifikasi`, payload);

export const konfirmasiPembayaranPanitia = (
  userId: string,
  payload: KonfirmasiPembayaranPayload,
) =>
  kirim<{
    status: string;
    message: string;
    data: { metode: MetodePembayaran; jumlah: number; status: StatusVerifikasi };
  }>('patch', `/pendaftaran/panitia/${userId}/pembayaran`, payload);

export const updateDaftarUlang = (userId: string, payload: DaftarUlangPayload) =>
  kirim<{
    status: string;
    message: string;
    data: { statusDaftarUlang: StatusRegistrasiUlang; catatanDaftarUlang: string | null };
  }>('patch', `/pendaftaran/panitia/${userId}/daftar-ulang`, payload);

export const kirimKomentarSiswa = (userId: string, pesan: string): Promise<PesanRespons> =>
  kirim('post', `/pendaftaran/panitia/${userId}/komentar`, { pesan });

export const kirimNotifikasi = (payload: KirimNotifikasiPayload) =>
  kirim<{
    status: string;
    message?: string;
    pratinjau?: boolean;
    data: { jumlahPenerima: number; batchId?: string | null; contohPenerima?: string[]; pesan?: string };
  }>('post', '/pendaftaran/panitia/notifikasi', payload);

export const getStatusEkspor = (query: QueryPendaftar = {}): Promise<StatusEkspor> =>
  ambil<StatusEkspor>('/pendaftaran/panitia/export/status', query);

export const unduhEksporExcel = async (query: QueryPendaftar = {}): Promise<void> => {
  try {
    const response = await api.get<Blob>('/pendaftaran/panitia/export', {
      params: query,
      responseType: 'blob',
    });
    const disposisi = String(response.headers['content-disposition'] ?? '');
    const cocok = /filename="?([^";]+)"?/i.exec(disposisi);
    const nama = cocok ? cocok[1] : 'data-pendaftar.xlsx';
    const alamat = window.URL.createObjectURL(response.data);
    const tautan = document.createElement('a');
    tautan.href = alamat;
    tautan.download = nama;
    document.body.appendChild(tautan);
    tautan.click();
    tautan.remove();
    window.URL.revokeObjectURL(alamat);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data instanceof Blob) {
      // const teks = await error.response.data.text();
      let pesan = 'Gagal mengunduh ekspor.';
      try {
        const errorData = error.response.data;
        const teks = errorData instanceof Blob ? await  errorData.text() : JSON.stringify(errorData);

        const json = JSON.parse(teks) as { message?: string | string[] };
        pesan = Array.isArray(json.message) ? json.message.join(', ') : (json.message ?? pesan);
      
      } catch {
        if (typeof error.response.data === 'string') {
          pesan =error.response.data;
        }
      }
      throw new Error(pesan, { cause: error });
    }
    throw error;
  }
};

export const getStatistik = (): Promise<Statistik> => ambil<Statistik>('/statistik');

export interface DashboardStats {
  total_pendaftar: number;
  total_lulus: number;
  total_proses: number;
  total_tidak_lulus: number;
  perlu_verifikasi: number;
  pembayaran_lunas: number;
  siswa_diterima: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const statistik = await getStatistik();
  const lengkap = statistik.registrasiUlang.SUDAH_LENGKAP ?? 0;
  const diterima = statistik.perJurusan.reduce((jumlah, item) => jumlah + item.diterima, 0);
  return {
    total_pendaftar: statistik.pendaftaran.diajukan,
    total_lulus: lengkap,
    total_proses: Math.max(0, statistik.pendaftaran.diajukan - lengkap),
    total_tidak_lulus: 0,
    perlu_verifikasi: statistik.pendaftaran.formulir.PENDING ?? 0,
    pembayaran_lunas: statistik.pembayaran.perStatus.LUNAS ?? 0,
    siswa_diterima: diterima,
  };
};

export const getAdminJurusanList = async (): Promise<Jurusan[]> =>
  ambil<Jurusan[]>('/konfigurasi/jurusan');

export const createAdminJurusan = (data: JurusanPayload) =>
  kirim<{ status: string; message: string; data: Jurusan }>('post', '/konfigurasi/jurusan', data);

export const updateAdminJurusan = (id: string, data: Partial<JurusanPayload>) =>
  kirim('patch', `/konfigurasi/jurusan/${id}`, data);

export const deleteAdminJurusan = (id: string) => kirim('delete', `/konfigurasi/jurusan/${id}`);

export const getGelombangList = (): Promise<Gelombang[]> =>
  ambil<Gelombang[]>('/konfigurasi/gelombang');

export const createGelombang = (data: GelombangPayload) =>
  kirim<{ status: string; message: string; data: Gelombang }>(
    'post',
    '/konfigurasi/gelombang',
    data,
  );

export const updateGelombang = (id: string, data: Partial<GelombangPayload>) =>
  kirim('patch', `/konfigurasi/gelombang/${id}`, data);

export const deleteGelombang = (id: string) => kirim('delete', `/konfigurasi/gelombang/${id}`);

export const getPengaturan = (): Promise<Pengaturan> =>
  ambil<Pengaturan>('/konfigurasi/pengaturan');

export const updatePengaturan = (data: Partial<Record<keyof Pengaturan, string>>) =>
  kirim<{ status: string; message: string; data: Pengaturan }>(
    'put',
    '/konfigurasi/pengaturan',
    data,
  );

export const registerPanitia = (payload: {
  namaLengkap: string;
  username: string;
  email: string;
  noHp: string;
  password: string;
  confirmPassword: string;
}) =>
  kirim<{ status: string; message: string; panitiaId: string }>(
    'post',
    '/auth/register/panitia',
    payload,
  );

export const getAkunPanitia = async (
  params: { page?: number; limit?: number; search?: string } = {},
): Promise<DaftarBerpaginasi<AkunPanitia>> => {
  const response = await api.get<DaftarBerpaginasi<AkunPanitia>>('/admin/panitia', { params });
  return response.data;
};

export const ubahStatusAkunPanitia = (id: string, aktif: boolean): Promise<PesanRespons> =>
  kirim('patch', `/admin/panitia/${id}/status`, { aktif });

export const bukaKunciAkunPanitia = (id: string): Promise<PesanRespons> =>
  kirim('post', `/admin/panitia/${id}/buka-kunci`);

export const getAuditLog = async (
  params: { page?: number; limit?: number; aksi?: string; aktorId?: string } = {},
): Promise<DaftarBerpaginasi<CatatanAudit>> => {
  const response = await api.get<DaftarBerpaginasi<CatatanAudit>>('/admin/audit', { params });
  return response.data;
};

export const getBeritaPublik = async (
  query: QueryBerita = {},
): Promise<DaftarBerpaginasi<Berita>> => {
  const response = await api.get<DaftarBerpaginasi<Berita>>('/berita', { params: query });
  return response.data;
};

export const getKategoriBeritaPublik = (): Promise<KategoriBerita[]> =>
  ambil<KategoriBerita[]>('/berita/kategori');

export const getBeritaBySlug = (slug: string): Promise<Berita> =>
  ambil<Berita>(`/berita/detail/${encodeURIComponent(slug)}`);

export const getBeritaKelola = async (
  query: QueryBerita = {},
): Promise<DaftarBerpaginasi<Berita>> => {
  const response = await api.get<DaftarBerpaginasi<Berita>>('/berita/kelola', { params: query });
  return response.data;
};

export const getBeritaKelolaDetail = (id: string): Promise<Berita> =>
  ambil<Berita>(`/berita/kelola/${id}`);

export const buatBerita = (payload: BeritaPayload) =>
  kirim<{ status: string; message: string; data: { id: string; slug: string } }>(
    'post',
    '/berita/kelola',
    payload,
  );

export const ubahBerita = (id: string, payload: Partial<BeritaPayload>): Promise<PesanRespons> =>
  kirim('patch', `/berita/kelola/${id}`, payload);

export const hapusBerita = (id: string): Promise<PesanRespons> =>
  kirim('delete', `/berita/kelola/${id}`);

export const uploadGambarSampul = async (
  id: string,
  file: File,
): Promise<{ thumbnailUrl: string | null }> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await kirimFile<{
    status: string;
    message: string;
    data: { thumbnailUrl: string | null };
  }>(`/berita/kelola/${id}/gambar`, formData);
  return response.data;
};

export const hapusGambarSampul = (id: string): Promise<PesanRespons> =>
  kirim('delete', `/berita/kelola/${id}/gambar`);

export const uploadGambarKonten = async (file: File): Promise<{ url: string | null }> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await kirimFile<{
    status: string;
    message: string;
    data: { url: string | null };
  }>('/berita/kelola/gambar-konten', formData);
  return response.data;
};

export const getKategoriBeritaKelola = (): Promise<KategoriBerita[]> =>
  ambil<KategoriBerita[]>('/kategori-berita');

export const buatKategoriBerita = (name: string) =>
  kirim<{ status: string; message: string; data: KategoriBerita }>('post', '/kategori-berita', {
    name,
  });

export const ubahKategoriBerita = (id: string, name: string): Promise<PesanRespons> =>
  kirim('patch', `/kategori-berita/${id}`, { name });

export const hapusKategoriBerita = (id: string): Promise<PesanRespons> =>
  kirim('delete', `/kategori-berita/${id}`);



export default api;