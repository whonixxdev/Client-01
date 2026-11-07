import type { HasilProgres, LangkahProgres, MasukanProgres, StatusLangkah } from './tipe';

interface KeadaanLangkah {
  status: StatusLangkah;
  keterangan: string;
}

const hitungBiodata = (masukan: MasukanProgres): KeadaanLangkah =>
  masukan.biodataLengkap
    ? { status: 'selesai', keterangan: 'Biodata sudah lengkap.' }
    : { status: 'berjalan', keterangan: 'Lengkapi semua data pada formulir.' };

const hitungBerkas = (masukan: MasukanProgres): KeadaanLangkah => {
  if (!masukan.biodataLengkap) {
    return { status: 'menunggu', keterangan: 'Terbuka setelah biodata lengkap.' };
  }
  return masukan.berkasLengkap
    ? { status: 'selesai', keterangan: 'Semua berkas sudah diunggah.' }
    : { status: 'berjalan', keterangan: 'Unggah semua berkas persyaratan.' };
};

const hitungVerifikasi = (masukan: MasukanProgres): KeadaanLangkah => {
  if (!masukan.biodataLengkap || !masukan.berkasLengkap) {
    return { status: 'menunggu', keterangan: 'Dimulai setelah berkas lengkap.' };
  }
  if (masukan.hasilVerifikasi === 'DISETUJUI') {
    return { status: 'selesai', keterangan: 'Data dan berkas disetujui panitia.' };
  }
  if (masukan.hasilVerifikasi === 'REVISI') {
    return { status: 'perlu_revisi', keterangan: 'Ada data atau berkas yang harus diperbaiki.' };
  }
  return { status: 'berjalan', keterangan: 'Panitia sedang memeriksa data dan berkas.' };
};

const hitungPembayaran = (
  masukan: MasukanProgres,
  statusVerifikasi: StatusLangkah,
): KeadaanLangkah => {
  if (statusVerifikasi !== 'selesai') {
    return { status: 'menunggu', keterangan: 'Terbuka setelah panitia menyetujui data dan berkas.' };
  }
  if (masukan.pembayaranDisetujui) {
    return { status: 'selesai', keterangan: 'Pembayaran sudah dikonfirmasi.' };
  }
  if (masukan.metodePembayaran === 'OFFLINE') {
    return { status: 'selesai', keterangan: 'Bayar langsung di sekolah. Pendaftaran Anda selesai.' };
  }
  if (masukan.metodePembayaran === 'ONLINE') {
    return { status: 'berjalan', keterangan: 'Menunggu panitia mengonfirmasi bukti transfer.' };
  }
  return { status: 'berjalan', keterangan: 'Pilih pembayaran offline atau online.' };
};

export function hitungProgres(masukan: MasukanProgres): HasilProgres {
  const biodata = hitungBiodata(masukan);
  const berkas = hitungBerkas(masukan);
  const verifikasi = hitungVerifikasi(masukan);
  const pembayaran = hitungPembayaran(masukan, verifikasi.status);

  const langkah: LangkahProgres[] = [
    { kunci: 'biodata', judul: 'Isi Biodata', ...biodata },
    { kunci: 'berkas', judul: 'Upload Berkas', ...berkas },
    { kunci: 'verifikasi', judul: 'Verifikasi Panitia', ...verifikasi },
    { kunci: 'pembayaran', judul: 'Pembayaran', ...pembayaran },
  ];

  const jumlahSelesai = langkah.filter((item) => item.status === 'selesai').length;

  return {
    langkah,
    persen: Math.round((jumlahSelesai / langkah.length) * 100),
    selesai: jumlahSelesai === langkah.length,
    langkahSaatIni: langkah.find((item) => item.status !== 'selesai') ?? null,
  };
}