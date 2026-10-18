// Mengambil semua file gambar berformat .png di folder industri secara otomatis
const imagesModule = import.meta.glob<{ default: string }>('./*.png', { eager: true });

export const industriImages: Record<string, string> = Object.fromEntries(
  Object.entries(imagesModule).map(([path, module]) => {
    const fileName = path.replace('./', '').replace(/\.[^/.]+$/, '');
    return [fileName, module.default];
  })
);