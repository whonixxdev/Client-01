import { useCallback, useEffect, useState } from 'react';
import { ambilPesanError, getPendaftaranSaya } from '../../../services/Api';
import { ambilMasukanProgres } from './dariPendaftaran';
import { hitungProgres } from './hitungProgres';
import type { HasilProgres } from './tipe';

interface HasilHookProgres {
  progres: HasilProgres | null;
  memuat: boolean;
  galat: string | null;
  muatUlang: () => void;
}

export function useProgresSiswa(): HasilHookProgres {
  const [progres, setProgres] = useState<HasilProgres | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState<string | null>(null);
  const [versi, setVersi] = useState(0);

  useEffect(() => {
    let dibatalkan = false;

    const muat = async (): Promise<void> => {
      try {
        const data = await getPendaftaranSaya();
        if (dibatalkan) return;
        setProgres(hitungProgres(ambilMasukanProgres(data)));
        setGalat(null);
      } catch (error) {
        if (!dibatalkan) {
          setGalat(ambilPesanError(error, 'Gagal memuat progres pendaftaran.'));
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

  const muatUlang = useCallback((): void => {
    setMemuat(true);
    setVersi((sebelumnya) => sebelumnya + 1);
  }, []);

  return { progres, memuat, galat, muatUlang };
}