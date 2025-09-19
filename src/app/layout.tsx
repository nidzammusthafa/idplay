import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "IDPlay - Internet Cepat untuk Warga Jawa Barat",
  description:
    "IDPlay menyediakan layanan internet cepat dan stabil untuk seluruh warga Jawa Barat. Cek jangkauan dan nikmati koneksi tanpa batas untuk rumah dan bisnis Anda.",
  keywords: [
    "internet provider",
    "ISP",
    "Jawa Barat",
    "Bandung",
    "Bekasi",
    "Bogor",
    "Depok",
    "Cimahi",
    "Cirebon",
    "Indramayu",
    "Karawang",
    "Kuningan",
    "Majalengka",
    "Pangandaran",
    "Purwakarta",
    "Subang",
    "Sukabumi",
    "Cianjur",
    "Sumedang",
    "Banjar",
    "Bandung Barat",
    "Ciamis",
    "Garut",
    "Tasikmalaya",
    "internet gratis",
    "pemasangan gratis",
    "pasang gratis",
    "internet cepat",
    "internet murah",
    "provider internet terbaik",
  ],
  authors: [{ name: "IDPlay" }],
  creator: "IDPlay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="google-site-verification" content="Dw41ieUQGOXF2t48Q4uTretz8oqi4KDqvy44Usvvg4E" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.idplay.it.com/" />
        <meta property="og:title" content="IDPlay - Internet Cepat untuk Warga Jawa Barat" />
        <meta property="og:description" content="Layanan internet cepat dan stabil untuk seluruh warga Jawa Barat. Cek jangkauan dan nikmati koneksi tanpa batas." />
        <meta property="og:image" content="https://www.idplay.it.com/cek-jangkauan.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.idplay.it.com/" />
        <meta property="twitter:title" content="IDPlay - Internet Cepat untuk Warga Jawa Barat" />
        <meta property="twitter:description" content="Layanan internet cepat dan stabil untuk seluruh warga Jawa Barat. Cek jangkauan dan nikmati koneksi tanpa batas." />
        <meta property="twitter:image" content="https://www.idplay.it.com/cek-jangkauan.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "InternetServiceProvider",
            "name": "IDPlay",
            "url": "https://www.idplay.it.com/",
            "logo": "https://www.idplay.it.com/favicon.ico",
            "image": "https://www.idplay.it.com/cek-jangkauan.png",
            "description": "IDPlay menyediakan layanan internet cepat dan stabil untuk seluruh warga Jawa Barat. Cek jangkauan dan nikmati koneksi tanpa batas untuk rumah dan bisnis Anda.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Jl. Telekomunikasi No. 1",
              "addressLocality": "Bandung",
              "addressRegion": "Jawa Barat",
              "postalCode": "40257",
              "addressCountry": "ID"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+62-812-3456-7890",
              "contactType": "Customer Service"
            },
            "areaServed": {
              "@type": "State",
              "name": "Jawa Barat"
            }
          }) }}
        />

        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
