import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IDPlay - Internet Cepat untuk Warga Jawa Barat",
  description: "IDPlay menyediakan layanan internet cepat dan stabil untuk seluruh warga Jawa Barat. Cek jangkauan dan nikmati koneksi tanpa batas untuk rumah dan bisnis Anda.",
  keywords: ["internet provider", "ISP", "Jawa Barat", "Bandung", "Bekasi", "Bogor", "Depok", "Cimahi", "internet cepat", "internet murah", "provider internet terbaik"],
  authors: [{ name: "IDPlay" }],
  creator: "IDPlay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Dw41ieUQGOXF2t48Q4uTretz8oqi4KDqvy44Usvvg4E" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
