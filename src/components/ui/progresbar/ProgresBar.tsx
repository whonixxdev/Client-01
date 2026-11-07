import type { ReactElement } from 'react';
import { Check, TriangleAlert } from 'lucide-react';
import type { HasilProgres, LangkahProgres, StatusLangkah } from './tipe';

interface ProgresBarProps {
  hasil: HasilProgres;
  className?: string;
}

const GAYA_BATANG: Record<StatusLangkah, string> = {
  selesai: 'bg-blue-600',
  berjalan: 'bg-blue-300',
  perlu_revisi: 'bg-blue-900',
  menunggu: 'bg-slate-200',
};

const GAYA_JUDUL: Record<StatusLangkah, string> = {
  selesai: 'text-blue-900',
  berjalan: 'text-blue-900',
  perlu_revisi: 'text-blue-950',
  menunggu: 'text-slate-400',
};

const LABEL_STATUS: Record<StatusLangkah, string> = {
  selesai: 'Selesai',
  berjalan: 'Sedang dikerjakan',
  perlu_revisi: 'Perlu revisi',
  menunggu: 'Belum dimulai',
};

function Penanda({ langkah, nomor }: { langkah: LangkahProgres; nomor: number }): ReactElement {
  if (langkah.status === 'selesai') {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  }
  if (langkah.status === 'perlu_revisi') {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-900 text-white">
        <TriangleAlert className="h-3.5 w-3.5" />
      </span>
    );
  }
  const aktif = langkah.status === 'berjalan';
  return (
    <span
      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold ${
        aktif ? 'border-blue-600 bg-white text-blue-700' : 'border-slate-300 bg-white text-slate-400'
      }`}
    >
      {nomor}
    </span>
  );
}

export function ProgresBar({ hasil, className }: ProgresBarProps): ReactElement {
  const ringkasan = hasil.selesai
    ? 'Seluruh tahap pendaftaran sudah selesai.'
    : hasil.langkahSaatIni
      ? `Tahap saat ini: ${hasil.langkahSaatIni.judul}`
      : '';

  return (
    <section
      aria-label="Progres pendaftaran"
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className ?? ''}`}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-blue-900">Progres pendaftaran</h2>
          <p className="mt-1 text-sm text-slate-500">{ringkasan}</p>
        </div>
        <p className="text-3xl font-bold leading-none text-blue-900">
          {hasil.persen}
          <span className="text-base font-semibold text-slate-500">%</span>
        </p>
      </div>

      <ol className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4 sm:gap-4">
        {hasil.langkah.map((item, indeks) => (
          <li key={item.kunci} aria-current={item.status === 'berjalan' ? 'step' : undefined}>
            <div className={`h-1.5 rounded-full ${GAYA_BATANG[item.status]}`} />
            <div className="mt-3 flex items-center gap-2">
              <Penanda langkah={item} nomor={indeks + 1} />
              <span className="text-xs font-semibold text-slate-500">{LABEL_STATUS[item.status]}</span>
            </div>
            <p className={`mt-2 text-sm font-bold ${GAYA_JUDUL[item.status]}`}>{item.judul}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.keterangan}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default ProgresBar;