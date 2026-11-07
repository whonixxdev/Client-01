import type { PendaftaranSaya } from '../../../services/Api';
import type { HasilVerifikasi, MasukanProgres, MetodePembayaran } from './tipe';

const gabungVerifikasi = (statusFormulir?: string, statusBerkas?: string): HasilVerifikasi => {
  if (statusFormulir === 'VALID' && statusBerkas === 'VALID') return 'DISETUJUI';
  if (statusFormulir === 'REVISI' || statusBerkas === 'REVISI') return 'REVISI';
  return 'BELUM';
};

const bacaMetode = (metode: string | undefined): MetodePembayaran | null =>
  metode === 'OFFLINE' || metode === 'ONLINE' ? metode : null;

export function ambilMasukanProgres(saya: PendaftaranSaya): MasukanProgres {
  const adaBiodata = saya.biodata !== null;
  const biodataKurang = saya.kekurangan?.biodataKurang ?? [];
  const berkasKurang = saya.kekurangan?.berkasKurang ?? [];

  return {
    biodataLengkap: adaBiodata && biodataKurang.length === 0,
    berkasLengkap: adaBiodata && saya.kekurangan !== null && berkasKurang.length === 0,
    sudahDiajukan: adaBiodata && !saya.akses.bisaMengajukan,
    hasilVerifikasi: gabungVerifikasi(saya.biodata?.statusFormulir, saya.berkas?.statusVerifikasi),
    metodePembayaran: bacaMetode(saya.pembayaran?.metode),
    pembayaranDisetujui: saya.pembayaran?.status === 'LUNAS',
  };
}