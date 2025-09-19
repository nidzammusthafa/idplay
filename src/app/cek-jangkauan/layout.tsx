import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cek Jangkauan Area Internet IDPlay",
  description: "Gunakan peta interaktif untuk mengecek jangkauan jaringan internet IDPlay di lokasi Anda. Daftar sekarang dan nikmati koneksi super cepat!",
  keywords: ["cek jangkauan", "coverage check", "peta jangkauan", "daftar internet", "IDPlay coverage"],
  openGraph: {
    title: "Cek Jangkauan Area Internet IDPlay",
    description: "Gunakan peta interaktif untuk mengecek jangkauan jaringan internet IDPlay di lokasi Anda.",
    url: "https://www.idplay.it.com/cek-jangkauan",
    images: [
      {
        url: "https://www.idplay.it.com/cek-jangkauan.png",
        width: 1200,
        height: 630,
        alt: "Peta Jangkauan Internet IDPlay",
      },
    ],
    siteName: "IDPlay",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cek Jangkauan Area Internet IDPlay",
    description: "Gunakan peta interaktif untuk mengecek jangkauan jaringan internet IDPlay di lokasi Anda.",
    images: ["https://www.idplay.it.com/cek-jangkauan.png"],
  },
};

export default function CekJangkauanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
