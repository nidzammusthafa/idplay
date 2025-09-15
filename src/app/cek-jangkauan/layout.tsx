import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cek Jangkauan Area Internet IDPlay",
  description: "Gunakan peta interaktif untuk mengecek jangkauan jaringan internet IDPlay di lokasi Anda. Daftar sekarang dan nikmati koneksi super cepat!",
  keywords: ["cek jangkauan", "coverage check", "peta jangkauan", "daftar internet", "IDPlay coverage"],
};

export default function CekJangkauanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
