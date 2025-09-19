import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cek Jangkauan - IDPlay",
  description: "Cek apakah lokasi Anda tercover oleh jaringan internet cepat IDPlay. Masukkan alamat Anda dan daftar sekarang.",
  openGraph: {
    title: "Cek Jangkauan - IDPlay",
    description: "Cek apakah lokasi Anda tercover oleh jaringan internet cepat IDPlay. Masukkan alamat Anda dan daftar sekarang.",
    url: "https://www.idplay.it.com/cek-jangkauan",
    images: [{ url: "https://www.idplay.it.com/cek-jangkauan.webp", width: 1200, height: 630, alt: "Cek Jangkauan IDPlay" }],
    siteName: 'IDPlay',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cek Jangkauan - IDPlay",
    description: "Cek apakah lokasi Anda tercover oleh jaringan internet cepat IDPlay. Masukkan alamat Anda dan daftar sekarang.",
    images: ["https://www.idplay.it.com/cek-jangkauan.webp"],
  },
};

export default function CekJangkauanLayout({ children }: { children: React.ReactNode }) {
  return children;
}