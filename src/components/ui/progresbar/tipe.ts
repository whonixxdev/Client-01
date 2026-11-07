export type KunciLangkah = 'biodata' | 'berkas' | 'verifikasi' | 'pembayaran';

export type StatusLangkah = 'selesai' | 'berjalan' | 'menunggu' | 'perlu_revisi';

export type HasilVerifikasi = 'BELUM' | 'REVISI' | 'DISETUJUI';

export type MetodePembayaran = 'OFFLINE' | 'ONLINE';

export interface MasukanProgres {
  biodataLengkap: boolean;
  berkasLengkap: boolean;
  sudahDiajukan: boolean;
  hasilVerifikasi: HasilVerifikasi;
  metodePembayaran: MetodePembayaran | null;
  pembayaranDisetujui: boolean;
}

export interface LangkahProgres {
  kunci: KunciLangkah;
  judul: string;
  keterangan: string;
  status: StatusLangkah;
}

export interface HasilProgres {
  langkah: LangkahProgres[];
  persen: number;
  selesai: boolean;
  langkahSaatIni: LangkahProgres | null;
}