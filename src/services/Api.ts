import axios from 'axios';

export const BASE_URL: string = 
  import.meta.env.VITE_LARAVEL_BACKEND || import.meta.env.VITE_LARAVEL_BACKEND_LOCALHOST || 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id_user: number;
  username: string;
  email: string;
  role: "siswa" | "panitia" | "admin";
  id_panitia?: string | null;
  no_hp?: string | null;
  foto_profile?: string | null;
  created_at?: string;
  updated_at?: string;
  biodata?: Biodata;
  berkas?: Berkas;
  pendaftaran?: PendaftaranSpmb;
}

export interface Biodata {
  id_biodata?: number;
  id_user: number;
  nama_lengkap: string;
  nisn?: string | null;
  nik?: string | null;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null;
  jenis_kelamin?: 'L' | 'P' | string | null;
  alamat?: string | null;
  no_hp?: string | null;
  no_hp_siswa?: string | null;
  no_hp_ortu?: string | null;
  asal_smp?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Berkas {
  id_berkas?: number;
  id_user: number;
  foto_ijazah?: string | null;
  foto_kk?: string | null;
  foto_pas?: string | null;
  status_verifikasi: 'belum_diunggah' | 'pending' | 'terverifikasi' | 'ditolak';
  created_at?: string;
  updated_at?: string;
}

export interface Jurusan {
  id_jurusan: number;
  nama_jurusan: string;
  kode_jurusan: string;
  kuota: number;
  terisi?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PendaftaranSpmb {
  id_pendaftaran?: number;
  no_pendaftaran?: string;
  id_user: number;
  id_jurusan_pilihan1?: number | null;
  id_jurusan_pilihan2?: number | null;
  id_biodata?: number | null;
  id_berkas?: number | null;
  nilai_tes_masuk?: number | null;
  status_kelulusan: 'proses' | 'lulus' | 'tidak_lulus';
  jurusan_diterima?: number | null;
  created_at?: string;
  updated_at?: string;
  jurusan1?: Jurusan;
  jurusan2?: Jurusan;
  jurusanDiterima?: Jurusan;
  jurusan_pilihan1?: Jurusan;
  jurusan_pilihan2?: Jurusan;
  biodata?: Biodata;
  berkas?: Berkas;
  user?: User;
}

export interface DashboardStats {
  total_pendaftar: number;
  total_lulus: number;
  total_proses: number;
  total_tidak_lulus: number;
  perlu_verifikasi: number;
  pembayaran_lunas: number;
  siswa_diterima: number;
}

export interface LoginPayload {
  login: string;
  password: string;
}

export interface RegisterPayload {
  nama_lengkap: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  role?: "siswa" | "panitia" | "admin";
  no_hp?: string;
}

export interface RegisterVerifyOtpPayload {
  email: string;
  otp: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  access_token: string;
  token_type: string;
  data: User;
}

export interface ForgotPasswordResetPayload {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateBiodataPayload {
  nama_lengkap?: string;
  nisn?: string;
  nik?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: 'L' | 'P' | string;
  alamat?: string;
  no_hp?: string;
  no_hp_siswa?: string;
  no_hp_ortu?: string;
  asal_smp?: string;
}

export const getStorageUrl = (filePath?: string | null): string | null => {
  if (!filePath || filePath.trim() === '' || String(filePath).toUpperCase() === 'NULL') {
    return null;
  }
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath;
  }
  return `http://127.0.0.1:8000/storage/${filePath.startsWith('/') ? filePath.substring(1) : filePath}`;
};

export const registerSendOtp = async (payload: RegisterPayload) => {
  const response = await api.post('/register/send-otp', payload);
  return response.data;
};

export const registerVerifyOtp = async (payload: RegisterVerifyOtpPayload | { email: string; otp: string; [key: string]: any }): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/register/verify-otp', payload);
  const data = response.data;
  if (data.access_token) {
    localStorage.setItem("auth_token", data.access_token);
    localStorage.setItem("user_data", JSON.stringify(data.data));
  }
  return data;
};

export const sendOtp = registerSendOtp;
export const verifyOtp = registerVerifyOtp;
export const registerVerify = registerVerifyOtp;

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/login', payload);
  const data = response.data;
  if (data.access_token) {
    localStorage.setItem("auth_token", data.access_token);
    localStorage.setItem("user_data", JSON.stringify(data.data));
    if (data.data?.role) {
      localStorage.setItem("user_role", data.data.role);
    }
  }
  return data;
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/logout');
  } finally {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
  }
};

export const getMyProfile = async (): Promise<User> => {
  const response = await api.get('/me');
  return (response.data.data || response.data.user || response.data) as User;
};

export const forgotPasswordSendOtp = async (email: string) => {
  const response = await api.post('/forgot-password/send-otp', { email });
  return response.data;
};

export const forgotPasswordVerifyOtp = async (email: string, otp: string) => {
  const response = await api.post('/forgot-password/verify-otp', { email, otp });
  return response.data;
};

export const forgotPasswordReset = async (payload: ForgotPasswordResetPayload) => {
  const response = await api.post('/forgot-password/reset', payload);
  return response.data;
};

export const getJurusanList = async (): Promise<Jurusan[]> => {
  const response = await api.get('/jurusan');
  return (response.data.data || response.data) as Jurusan[];
};

export const getSiswaBiodata = async (): Promise<Biodata> => {
  const response = await api.get('/siswa/biodata');
  return (response.data.data || response.data) as Biodata;
};

export const updateSiswaBiodata = async (data: UpdateBiodataPayload) => {
  const response = await api.post('/siswa/biodata', data);
  return response.data;
};

export const getSiswaBerkas = async (): Promise<Berkas> => {
  const response = await api.get('/siswa/berkas');
  return (response.data.data || response.data) as Berkas;
};

export const uploadBerkasSiswa = async (payload: { foto_ijazah?: File; foto_kk?: File; foto_pas?: File }) => {
  const formData = new FormData();
  if (payload.foto_ijazah) formData.append('foto_ijazah', payload.foto_ijazah);
  if (payload.foto_kk) formData.append('foto_kk', payload.foto_kk);
  if (payload.foto_pas) formData.append('foto_pas', payload.foto_pas);

  const response = await api.post('/siswa/berkas', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const uploadBerkasGeneral = async (payload: { foto_ijazah?: File; foto_kk?: File; foto_pas?: File }) => {
  const formData = new FormData();
  if (payload.foto_ijazah) formData.append('foto_ijazah', payload.foto_ijazah);
  if (payload.foto_kk) formData.append('foto_kk', payload.foto_kk);
  if (payload.foto_pas) formData.append('foto_pas', payload.foto_pas);

  const response = await api.post('/berkas/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getStatusPendaftaranSiswa = async () => {
  const response = await api.get('/siswa/pendaftaran');
  return response.data;
};

export const pilihJurusanSiswa = async (idJurusan1: number, idJurusan2?: number) => {
  const response = await api.post('/siswa/pendaftaran', {
    id_jurusan_pilihan1: idJurusan1,
    id_jurusan_pilihan2: idJurusan2 || null,
  });
  return response.data;
};

export const pilihJurusan = async (idJurusan1: number, idJurusan2?: number) => {
  const response = await api.post('/pendaftaran/pilih-jurusan', {
    id_jurusan_pilihan1: idJurusan1,
    id_jurusan_pilihan2: idJurusan2 || null,
  });
  return response.data;
};

export const konfirmasiPembayaran = async (buktiFile?: File) => {
  const formData = new FormData();
  if (buktiFile) formData.append('bukti_pembayaran', buktiFile);

  const response = await api.post('/pembayaran/konfirmasi', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get('/dashboard/stats');
  return (response.data.data || response.data) as DashboardStats;
};

export const getRecentPendaftaran = async (): Promise<PendaftaranSpmb[]> => {
  const response = await api.get('/pendaftaran/recent');
  return (response.data.data || response.data) as PendaftaranSpmb[];
};

export const getAdminDashboardStats = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

export const getAdminJurusanList = async (): Promise<Jurusan[]> => {
  const response = await api.get('/admin/jurusan');
  return (response.data.data || response.data) as Jurusan[];
};

export const createAdminJurusan = async (data: { nama_jurusan: string; kode_jurusan: string; kuota: number }) => {
  const response = await api.post('/admin/jurusan', data);
  return response.data;
};

export const updateAdminJurusan = async (id: number, data: { nama_jurusan?: string; kode_jurusan?: string; kuota?: number }) => {
  const response = await api.put(`/admin/jurusan/${id}`, data);
  return response.data;
};

export const deleteAdminJurusan = async (id: number) => {
  const response = await api.delete(`/admin/jurusan/${id}`);
  return response.data;
};

export const getAdminPendaftaranList = async () => {
  const response = await api.get('/admin/pendaftaran');
  return response.data;
};

export const getAdminPendaftaranDetail = async (id: number) => {
  const response = await api.get(`/admin/pendaftaran/${id}`);
  return response.data;
};

export const updateAdminKelulusanPendaftaran = async (id: number, status: 'lulus' | 'tidak_lulus' | 'proses', jurusanDiterimaId?: number) => {
  const response = await api.put(`/admin/pendaftaran/${id}/kelulusan`, {
    status_kelulusan: status,
    jurusan_diterima: jurusanDiterimaId
  });
  return response.data;
};

export const updateAdminVerifikasiBerkas = async (id: number, status: 'terverifikasi' | 'ditolak') => {
  const response = await api.put(`/admin/verifikasi-berkas/${id}`, {
    status_verifikasi: status
  });
  return response.data;
};

export default api;