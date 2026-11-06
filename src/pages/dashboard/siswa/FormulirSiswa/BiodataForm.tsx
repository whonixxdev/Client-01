import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Camera, CircleAlert, CircleCheck, LoaderCircle, Save, User } from 'lucide-react';
import {
  ambilPesanError,
  getStorageUrl,
  simpanBiodata,
  uploadAvatarSiswa,
  type BiodataPayload,
  type BiodataSiswa,
  type Jurusan,
} from '../../../../services/Api';

const JENIS_KELAMIN = ['Laki-laki', 'Perempuan'] as const;
const DAFTAR_AGAMA = [
  'Islam',
  'Kristen',
  'Katolik',
  'Hindu',
  'Buddha',
  'Konghucu',
  'Lainnya',
] as const;
const TIPE_FOTO = ['image/jpeg', 'image/png', 'image/webp'];
const BATAS_FOTO = 2 * 1024 * 1024;
const POLA_HP = /^\+?\d{9,15}$/;

interface NilaiForm {
  namaLengkap: string;
  nik: string;
  nisn: string;
  jenisKelamin: string;
  agama: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  noHpSiswa: string;
  namaAyah: string;
  noHpAyah: string;
  namaIbu: string;
  noHpIbu: string;
  asalSmp: string;
  jurusanId: string;
  jurusanCadanganId: string;
}

type NamaBidang = keyof NilaiForm;
type GalatBidang = Partial<Record<NamaBidang, string>>;

interface PesanForm {
  jenis: 'sukses' | 'galat';
  teks: string;
}

interface OpsiTeks {
  wajib?: boolean;
  petunjuk?: string;
  tipe?: 'text' | 'date';
  inputMode?: 'numeric' | 'tel' | 'text';
  maxLength?: number;
  max?: string;
  placeholder?: string;
  saring?: (nilai: string) => string;
}

interface OpsiPilihan {
  nilai: string;
  teks: string;
}

interface BiodataFormProps {
  biodata: BiodataSiswa | null;
  jurusan: Jurusan[];
  namaAkun: string;
  bisaDiedit: boolean;
  onTersimpan: () => void;
}

const hanyaAngka = (nilai: string): string => nilai.replace(/\D/g, '');
const nomorTelepon = (nilai: string): string => nilai.replace(/[^\d+]/g, '');

const hariIni = (): string => {
  const sekarang = new Date();
  const bulan = String(sekarang.getMonth() + 1).padStart(2, '0');
  const tanggal = String(sekarang.getDate()).padStart(2, '0');
  return `${sekarang.getFullYear()}-${bulan}-${tanggal}`;
};

const formatRupiah = (angka: number): string =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);

const teksAtauUndefined = (nilai: string): string | undefined => {
  const bersih = nilai.trim();
  return bersih === '' ? undefined : bersih;
};

const cariPilihan = <T extends string>(daftar: readonly T[], nilai: string): T | undefined =>
  daftar.find((item) => item === nilai);

const buatNilaiAwal = (biodata: BiodataSiswa | null, namaAkun: string): NilaiForm => ({
  namaLengkap: biodata?.namaLengkap ?? namaAkun,
  nik: biodata?.nik ?? '',
  nisn: biodata?.nisn ?? '',
  jenisKelamin: biodata?.jenisKelamin ?? '',
  agama: biodata?.agama ?? '',
  tempatLahir: biodata?.tempatLahir ?? '',
  tanggalLahir: biodata?.tanggalLahir ? biodata.tanggalLahir.slice(0, 10) : '',
  alamat: biodata?.alamat ?? '',
  noHpSiswa: biodata?.noHpSiswa ?? '',
  namaAyah: biodata?.namaAyah ?? '',
  noHpAyah: biodata?.noHpAyah ?? '',
  namaIbu: biodata?.namaIbu ?? '',
  noHpIbu: biodata?.noHpIbu ?? '',
  asalSmp: biodata?.asalSmp ?? '',
  jurusanId: biodata?.jurusanId ?? '',
  jurusanCadanganId: biodata?.jurusanCadanganId ?? '',
});

const buatPayload = (nilai: NilaiForm): BiodataPayload => ({
  namaLengkap: nilai.namaLengkap.trim(),
  nik: teksAtauUndefined(nilai.nik),
  nisn: teksAtauUndefined(nilai.nisn),
  jenisKelamin: cariPilihan(JENIS_KELAMIN, nilai.jenisKelamin),
  agama: cariPilihan(DAFTAR_AGAMA, nilai.agama),
  tempatLahir: teksAtauUndefined(nilai.tempatLahir),
  tanggalLahir: teksAtauUndefined(nilai.tanggalLahir),
  alamat: teksAtauUndefined(nilai.alamat),
  noHpSiswa: teksAtauUndefined(nilai.noHpSiswa),
  namaAyah: teksAtauUndefined(nilai.namaAyah),
  noHpAyah: teksAtauUndefined(nilai.noHpAyah),
  namaIbu: teksAtauUndefined(nilai.namaIbu),
  noHpIbu: teksAtauUndefined(nilai.noHpIbu),
  asalSmp: teksAtauUndefined(nilai.asalSmp),
  jurusanId: teksAtauUndefined(nilai.jurusanId),
  jurusanCadanganId: teksAtauUndefined(nilai.jurusanCadanganId),
});

const validasi = (nilai: NilaiForm): GalatBidang => {
  const galat: GalatBidang = {};

  if (nilai.namaLengkap.trim().length < 3) {
    galat.namaLengkap = 'Nama lengkap minimal 3 karakter.';
  }
  if (nilai.nik !== '' && !/^\d{16}$/.test(nilai.nik)) {
    galat.nik = 'NIK harus 16 digit angka.';
  }
  if (nilai.nisn !== '' && !/^\d{10}$/.test(nilai.nisn)) {
    galat.nisn = 'NISN harus 10 digit angka.';
  }

  const bidangTelepon: NamaBidang[] = ['noHpSiswa', 'noHpAyah', 'noHpIbu'];
  bidangTelepon.forEach((nama) => {
    const isi = nilai[nama].trim();
    if (isi !== '' && !POLA_HP.test(isi)) {
      galat[nama] = 'Nomor HP tidak valid (9 sampai 15 digit).';
    }
  });

  if (nilai.tanggalLahir !== '' && nilai.tanggalLahir > hariIni()) {
    galat.tanggalLahir = 'Tanggal lahir tidak boleh di masa depan.';
  }

  if (nilai.jurusanCadanganId !== '' && nilai.jurusanId === '') {
    galat.jurusanCadanganId = 'Pilih jurusan utama terlebih dahulu.';
  } else if (nilai.jurusanCadanganId !== '' && nilai.jurusanCadanganId === nilai.jurusanId) {
    galat.jurusanCadanganId = 'Jurusan cadangan harus berbeda dari jurusan utama.';
  }

  return galat;
};

function Pemberitahuan({ pesan }: { pesan: PesanForm | null }): ReactElement | null {
  if (!pesan) return null;
  const sukses = pesan.jenis === 'sukses';
  return (
    <div
      role={sukses ? 'status' : 'alert'}
      className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm ${
        sukses
          ? 'border-blue-200 bg-blue-50 text-blue-800'
          : 'border-blue-900 bg-blue-100 font-medium text-blue-950'
      }`}
    >
      {sukses ? (
        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <span>{pesan.teks}</span>
    </div>
  );
}

function Seksi({
  judul,
  deskripsi,
  children,
}: {
  judul: string;
  deskripsi: string;
  children: ReactNode;
}): ReactElement {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 border-b border-slate-100 pb-4">
        <h2 className="text-base font-bold text-blue-900">{judul}</h2>
        <p className="mt-1 text-sm text-slate-500">{deskripsi}</p>
      </div>
      {children}
    </section>
  );
}

function Bidang({
  id,
  label,
  wajib,
  galat,
  petunjuk,
  lebar,
  children,
}: {
  id: string;
  label: string;
  wajib?: boolean;
  galat?: string;
  petunjuk?: string;
  lebar?: boolean;
  children: ReactNode;
}): ReactElement {
  return (
    <div className={`flex flex-col gap-1.5 ${lebar ? 'md:col-span-2' : ''}`}>
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
        {wajib ? <span className="text-blue-700"> *</span> : null}
      </label>
      {children}
      {galat ? (
        <p className="text-xs font-semibold text-blue-900">{galat}</p>
      ) : petunjuk ? (
        <p className="text-xs text-slate-500">{petunjuk}</p>
      ) : null}
    </div>
  );
}

export default function BiodataForm({
  biodata,
  jurusan,
  namaAkun,
  bisaDiedit,
  onTersimpan,
}: BiodataFormProps): ReactElement {
  const [nilai, setNilai] = useState<NilaiForm>(() => buatNilaiAwal(biodata, namaAkun));
  const [galat, setGalat] = useState<GalatBidang>({});
  const [menyimpan, setMenyimpan] = useState(false);
  const [mengunggah, setMengunggah] = useState(false);
  const [avatarBaru, setAvatarBaru] = useState<string | null>(null);
  const [pesan, setPesan] = useState<PesanForm | null>(null);
  const [pesanFoto, setPesanFoto] = useState<PesanForm | null>(null);

  const avatarTampil = avatarBaru ?? getStorageUrl(biodata?.avatarUrl);

  const ubah = (nama: NamaBidang, nilaiBaru: string): void => {
    setNilai((sebelumnya) => ({ ...sebelumnya, [nama]: nilaiBaru }));
    setGalat((sebelumnya) => {
      if (!sebelumnya[nama]) return sebelumnya;
      const salinan = { ...sebelumnya };
      delete salinan[nama];
      return salinan;
    });
  };

  const ubahJurusanUtama = (id: string): void => {
    ubah('jurusanId', id);
    if (id !== '' && id === nilai.jurusanCadanganId) {
      ubah('jurusanCadanganId', '');
    }
  };

  const kelasKontrol = (nama: NamaBidang): string =>
    `w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ${
      galat[nama] ? 'border-blue-900 bg-blue-50' : 'border-slate-300 bg-white'
    }`;

  const bidangTeks = (nama: NamaBidang, label: string, opsi: OpsiTeks = {}): ReactElement => (
    <Bidang id={nama} label={label} wajib={opsi.wajib} galat={galat[nama]} petunjuk={opsi.petunjuk}>
      <input
        id={nama}
        name={nama}
        type={opsi.tipe ?? 'text'}
        inputMode={opsi.inputMode}
        maxLength={opsi.maxLength}
        max={opsi.max}
        placeholder={opsi.placeholder}
        autoComplete="off"
        value={nilai[nama]}
        onChange={(event) =>
          ubah(nama, opsi.saring ? opsi.saring(event.target.value) : event.target.value)
        }
        aria-invalid={galat[nama] ? true : undefined}
        className={kelasKontrol(nama)}
      />
    </Bidang>
  );

  const bidangPilihan = (
    nama: NamaBidang,
    label: string,
    daftar: OpsiPilihan[],
    placeholder: string,
    petunjuk?: string,
    saatUbah?: (nilaiBaru: string) => void,
  ): ReactElement => (
    <Bidang id={nama} label={label} galat={galat[nama]} petunjuk={petunjuk}>
      <select
        id={nama}
        name={nama}
        value={nilai[nama]}
        onChange={(event) =>
          saatUbah ? saatUbah(event.target.value) : ubah(nama, event.target.value)
        }
        aria-invalid={galat[nama] ? true : undefined}
        className={kelasKontrol(nama)}
      >
        <option value="">{placeholder}</option>
        {daftar.map((item) => (
          <option key={item.nilai} value={item.nilai}>
            {item.teks}
          </option>
        ))}
      </select>
    </Bidang>
  );

  const jurusanTersedia = jurusan.filter(
    (item) => item.aktif || item.id === nilai.jurusanId || item.id === nilai.jurusanCadanganId,
  );

  const labelJurusan = (item: Jurusan): string =>
    item.sisaKuota > 0
      ? `${item.namaJurusan} (sisa kuota ${item.sisaKuota})`
      : `${item.namaJurusan} (kuota penuh)`;

  const opsiUtama: OpsiPilihan[] = jurusanTersedia.map((item) => ({
    nilai: item.id,
    teks: labelJurusan(item),
  }));

  const opsiCadangan: OpsiPilihan[] = jurusanTersedia
    .filter((item) => item.id !== nilai.jurusanId)
    .map((item) => ({ nilai: item.id, teks: labelJurusan(item) }));

  const jurusanDipilih = jurusan.find((item) => item.id === nilai.jurusanId);
  const petunjukUtama = jurusanDipilih
    ? jurusanDipilih.sisaKuota > 0
      ? `Biaya pendaftaran: ${formatRupiah(jurusanDipilih.biayaPendaftaran)}`
      : 'Kuota jurusan ini penuh. Pastikan jurusan cadangan sudah dipilih.'
    : undefined;

  const pilihFoto = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const berkas = event.target.files?.[0];
    event.target.value = '';
    if (!berkas) return;

    if (!TIPE_FOTO.includes(berkas.type)) {
      setPesanFoto({ jenis: 'galat', teks: 'Format foto harus JPG, PNG, atau WebP.' });
      return;
    }
    if (berkas.size > BATAS_FOTO) {
      setPesanFoto({ jenis: 'galat', teks: 'Ukuran foto maksimal 2 MB.' });
      return;
    }

    setMengunggah(true);
    setPesanFoto(null);
    try {
      const hasil = await uploadAvatarSiswa(berkas);
      setAvatarBaru(getStorageUrl(hasil.url));
      setPesanFoto({ jenis: 'sukses', teks: 'Foto berhasil diunggah.' });
      onTersimpan();
    } catch (error) {
      setPesanFoto({ jenis: 'galat', teks: ambilPesanError(error, 'Gagal mengunggah foto.') });
    } finally {
      setMengunggah(false);
    }
  };

  const kirimForm = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!bisaDiedit || menyimpan) return;

    const hasilValidasi = validasi(nilai);
    setGalat(hasilValidasi);
    if (Object.keys(hasilValidasi).length > 0) {
      setPesan({ jenis: 'galat', teks: 'Periksa kembali isian yang ditandai.' });
      return;
    }

    setMenyimpan(true);
    setPesan(null);
    try {
      await simpanBiodata(buatPayload(nilai));
      setPesan({ jenis: 'sukses', teks: 'Biodata berhasil disimpan.' });
      onTersimpan();
    } catch (error) {
      setPesan({ jenis: 'galat', teks: ambilPesanError(error, 'Gagal menyimpan biodata.') });
    } finally {
      setMenyimpan(false);
    }
  };

  return (
    <form onSubmit={(event) => void kirimForm(event)} noValidate className="space-y-6">
      {!bisaDiedit ? (
        <Pemberitahuan
          pesan={{
            jenis: 'galat',
            teks: 'Formulir sedang terkunci dan tidak bisa diubah. Hubungi panitia jika perlu perubahan data.',
          }}
        />
      ) : null}

      <fieldset disabled={!bisaDiedit} className="min-w-0 space-y-6 border-0 p-0">
        <Seksi judul="Foto Siswa" deskripsi="Gunakan pas foto yang jelas dan terbaru.">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-blue-200 bg-blue-50">
              {avatarTampil ? (
                <img src={avatarTampil} alt="Foto siswa" className="h-full w-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-blue-400" />
              )}
            </div>
            <div className="space-y-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-700 transition focus-within:ring-2 focus-within:ring-blue-300 hover:bg-blue-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50">
                {mengunggah ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
                {mengunggah ? 'Mengunggah...' : avatarTampil ? 'Ganti foto' : 'Pilih foto'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  disabled={mengunggah}
                  onChange={(event) => void pilihFoto(event)}
                />
              </label>
              <p className="text-xs text-slate-500">Format JPG, PNG, atau WebP. Maksimal 2 MB.</p>
              <Pemberitahuan pesan={pesanFoto} />
            </div>
          </div>
        </Seksi>

        <Seksi judul="Data Pribadi" deskripsi="Isi sesuai dokumen resmi seperti Kartu Keluarga dan akta kelahiran.">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Bidang
              id="namaLengkap"
              label="Nama lengkap"
              wajib
              galat={galat.namaLengkap}
              petunjuk="Terisi otomatis dari akun dan bisa disunting."
              lebar
            >
              <input
                id="namaLengkap"
                name="namaLengkap"
                type="text"
                autoComplete="off"
                value={nilai.namaLengkap}
                onChange={(event) => ubah('namaLengkap', event.target.value)}
                aria-invalid={galat.namaLengkap ? true : undefined}
                className={kelasKontrol('namaLengkap')}
              />
            </Bidang>
            {bidangTeks('nik', 'NIK', {
              inputMode: 'numeric',
              maxLength: 16,
              saring: hanyaAngka,
              placeholder: '16 digit',
            })}
            {bidangTeks('nisn', 'NISN', {
              inputMode: 'numeric',
              maxLength: 10,
              saring: hanyaAngka,
              placeholder: '10 digit',
            })}
            {bidangPilihan(
              'jenisKelamin',
              'Jenis kelamin',
              JENIS_KELAMIN.map((item) => ({ nilai: item, teks: item })),
              'Pilih jenis kelamin',
            )}
            {bidangPilihan(
              'agama',
              'Agama',
              DAFTAR_AGAMA.map((item) => ({ nilai: item, teks: item })),
              'Pilih agama',
            )}
            {bidangTeks('tempatLahir', 'Tempat lahir')}
            {bidangTeks('tanggalLahir', 'Tanggal lahir', { tipe: 'date', max: hariIni() })}
            <Bidang id="alamat" label="Alamat lengkap" galat={galat.alamat} lebar>
              <textarea
                id="alamat"
                name="alamat"
                rows={3}
                value={nilai.alamat}
                onChange={(event) => ubah('alamat', event.target.value)}
                className={kelasKontrol('alamat')}
              />
            </Bidang>
            {bidangTeks('noHpSiswa', 'Nomor HP siswa', {
              inputMode: 'tel',
              maxLength: 16,
              saring: nomorTelepon,
              placeholder: '08xxxxxxxxxx',
            })}
          </div>
        </Seksi>

        <Seksi judul="Data Orang Tua" deskripsi="Nomor HP orang tua dipakai panitia untuk menghubungi jika diperlukan.">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {bidangTeks('namaAyah', 'Nama ayah')}
            {bidangTeks('noHpAyah', 'Nomor HP ayah', {
              inputMode: 'tel',
              maxLength: 16,
              saring: nomorTelepon,
              placeholder: '08xxxxxxxxxx',
            })}
            {bidangTeks('namaIbu', 'Nama ibu')}
            {bidangTeks('noHpIbu', 'Nomor HP ibu', {
              inputMode: 'tel',
              maxLength: 16,
              saring: nomorTelepon,
              placeholder: '08xxxxxxxxxx',
            })}
          </div>
        </Seksi>

        <Seksi
          judul="Asal Sekolah dan Pilihan Jurusan"
          deskripsi="Jurusan cadangan dipakai jika kuota jurusan utama sudah penuh."
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">{bidangTeks('asalSmp', 'Asal SMP/MTs')}</div>
            {bidangPilihan(
              'jurusanId',
              'Jurusan utama',
              opsiUtama,
              'Pilih jurusan utama',
              petunjukUtama,
              ubahJurusanUtama,
            )}
            {bidangPilihan('jurusanCadanganId', 'Jurusan cadangan', opsiCadangan, 'Pilih jurusan cadangan')}
          </div>
        </Seksi>
      </fieldset>

      <Pemberitahuan pesan={pesan} />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!bisaDiedit || menyimpan}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
        >
          {menyimpan ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {menyimpan ? 'Menyimpan...' : 'Simpan biodata'}
        </button>
      </div>
    </form>
  );
}