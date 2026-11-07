import { useEffect, useState, type ReactElement } from 'react';
import { ClipboardList, LoaderCircle, MessageSquare, TriangleAlert } from 'lucide-react';
import {
  ambilPesanError,
  getJurusanList,
  getMyProfile,
  getPendaftaranSaya,
  type Jurusan,
  type PendaftaranSaya,
  type StatusVerifikasi,
} from '../../../../services/Api';
import {
  ProgresBar,
  ambilMasukanProgres,
  hitungProgres,
} from '../../../../components/ui/progresbar';
import BiodataForm from './BiodataForm';

const LABEL_STATUS: Record<StatusVerifikasi, string> = {
  PENDING: 'Belum diverifikasi',
  REVISI: 'Perlu revisi',
  VALID: 'Terverifikasi',
  LUNAS: 'Lunas',
};

const formatTanggal = (iso: string): string =>
  new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function FormulirSiswaView(): ReactElement {
  const [saya, setSaya] = useState<PendaftaranSaya | null>(null);
  const [jurusan, setJurusan] = useState<Jurusan[]>([]);
  const [namaAkun, setNamaAkun] = useState('');
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState<string | null>(null);
  const [versi, setVersi] = useState(0);

  useEffect(() => {
    let dibatalkan = false;

    const muat = async (): Promise<void> => {
      try {
        const [dataSaya, daftarJurusan, profil] = await Promise.all([
          getPendaftaranSaya(),
          getJurusanList(),
          getMyProfile().catch(() => null),
        ]);
        if (dibatalkan) return;
        setSaya(dataSaya);
        setJurusan(daftarJurusan);
        setNamaAkun(profil?.namaLengkap ?? '');
        setGalat(null);
      } catch (error) {
        if (!dibatalkan) {
          setGalat(ambilPesanError(error, 'Gagal memuat data formulir.'));
        }
      } finally {
        if (!dibatalkan) setMemuat(false);
      }
    };

    void muat();

    return () => {
      dibatalkan = true;
    };
  }, [versi]);

  const segarkan = (): void => setVersi((sebelumnya) => sebelumnya + 1);

  const cobaLagi = (): void => {
    setMemuat(true);
    setGalat(null);
    setVersi((sebelumnya) => sebelumnya + 1);
  };

  if (memuat && !saya) {
    return (
      <div className="mx-auto flex w-full max-w-4xl items-center justify-center gap-3 p-10 text-sm text-slate-600">
        <LoaderCircle className="h-5 w-5 animate-spin text-blue-600" />
        Memuat formulir...
      </div>
    );
  }

  if (!saya) {
    return (
      <div className="mx-auto w-full max-w-4xl space-y-4 p-4 sm:p-6">
        <div className="flex items-start gap-3 rounded-2xl border border-blue-900 bg-blue-100 p-5 text-blue-950">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="space-y-3">
            <p className="text-sm font-semibold">{galat ?? 'Data formulir tidak tersedia.'}</p>
            <button
              type="button"
              onClick={cobaLagi}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Coba lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusFormulir = saya.biodata ? LABEL_STATUS[saya.biodata.statusFormulir] : 'Belum diisi';
  const biodataKurang = saya.kekurangan?.biodataKurang ?? [];
  const catatan = saya.catatanPanitia.slice(0, 3);
  const progres = hitungProgres(ambilMasukanProgres(saya));

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-900">Formulir Pendaftaran</h1>
            <p className="mt-1 text-sm text-slate-500">
              Lengkapi biodata Anda, lalu lanjutkan ke tahap berikutnya.
            </p>
          </div>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
          Status: {statusFormulir}
        </span>
      </header>

      <ProgresBar hasil={progres} />

      {biodataKurang.length > 0 ? (
        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-blue-900">Data yang masih perlu dilengkapi</p>
            <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              {biodataKurang.length} data
            </span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-2">
            {biodataKurang.map((item) => (
              <li
                key={item}
                className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-900"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {catatan.length > 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
            <MessageSquare className="h-4 w-4" />
            Catatan dari panitia
          </div>
          <ul className="mt-3 space-y-3">
            {catatan.map((item) => (
              <li key={item.id} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                <p>{item.pesan}</p>
                <p className="mt-1 text-xs text-slate-500">{formatTanggal(item.createdAt)}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <BiodataForm
        biodata={saya.biodata}
        jurusan={jurusan}
        namaAkun={namaAkun}
        bisaDiedit={saya.akses.biodataBisaDiedit}
        onTersimpan={segarkan}
        onMuatUlang={segarkan}
      />
    </div>
  );
}