import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Harga Paket Internet - IDPlay",
  description: "Lihat daftar harga paket internet IDPlay. Pilih paket bulanan, semesteran, atau tahunan dengan kecepatan hingga 100 Mbps.",
  openGraph: {
    title: "Daftar Harga Paket Internet - IDPlay",
    description: "Lihat daftar harga paket internet IDPlay. Pilih paket bulanan, semesteran, atau tahunan dengan kecepatan hingga 100 Mbps.",
    url: "https://www.idplay.it.com/harga",
    images: [{ url: "https://www.idplay.it.com/price-list.webp", width: 800, height: 1131, alt: "Daftar Harga IDPlay" }],
    siteName: 'IDPlay',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Daftar Harga Paket Internet - IDPlay",
    description: "Lihat daftar harga paket internet IDPlay. Pilih paket bulanan, semesteran, atau tahunan dengan kecepatan hingga 100 Mbps.",
    images: ["https://www.idplay.it.com/price-list.webp"],
  },
};

export default function HargaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
