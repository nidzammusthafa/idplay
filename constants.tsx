import React from "react";
import {
  RocketIcon,
  ZapIcon,
  ShieldCheckIcon,
  HeadphonesIcon,
  MapPinIcon,
  CalendarIcon,
  WrenchIcon,
  WifiIcon,
} from "@/components/icons/IconComponents";
import {
  PackagePlan,
  Service,
  Testimonial,
  FaqItem,
  InstallationStep,
} from "./src/types";

export const HERO_SLIDES: string[] = [
  "TRUE UNLIMITED - Tanpa Kuota, Tanpa FUP.",
  "KECEPATAN SIMETRIS - Upload & Download Seimbang.",
  "100% FIBER OPTIC - Koneksi Stabil, Ping Rendah.",
  "GRATIS INSTALASI - Hemat Biaya Pemasangan.",
];

export const PACKAGE_PLANS: PackagePlan[] = [
  {
    speed: 15,
    color: "orange",
    features: ["Ideal untuk browsing & sosial media", "Untuk 1-2 perangkat"],
    prices: {
      monthly: { price: "166.500" },
      sixMonths: { price: "-" },
      twelveMonths: { price: "-" },
    },
  },
  {
    speed: 20,
    color: "purple",
    features: ["Streaming HD & WFH lancar", "Untuk 2-3 perangkat"],
    prices: {
      monthly: { price: "198.690" },
      sixMonths: { price: "165.575", total: "993.450", savings: "198.690" },
      twelveMonths: {
        price: "165.575",
        total: "1.986.900",
        savings: "397.380",
      },
    },
    badge: "Terlaris!",
  },
  {
    speed: 30,
    color: "blue",
    features: ["Streaming 4K & gaming online", "Untuk 3-5 perangkat"],
    prices: {
      monthly: { price: "265.290" },
      sixMonths: { price: "221.075", total: "1.326.450", savings: "265.290" },
      twelveMonths: {
        price: "221.075",
        total: "2.652.900",
        savings: "530.580",
      },
    },
  },
  {
    speed: 50,
    color: "green",
    features: ["Kebutuhan keluarga digital", "Untuk 5-7 perangkat"],
    prices: {
      monthly: { price: "309.690" },
      sixMonths: { price: "258.075", total: "1.548.450", savings: "309.690" },
      twelveMonths: {
        price: "258.075",
        total: "3.096.900",
        savings: "619.380",
      },
    },
  },
  {
    speed: 75,
    color: "yellow",
    features: ["Profesional & kreator konten", "Untuk 7-10 perangkat"],
    prices: {
      monthly: { price: "331.890" },
      sixMonths: { price: "276.575", total: "1.659.450", savings: "331.890" },
      twelveMonths: {
        price: "276.575",
        total: "3.318.900",
        savings: "663.780",
      },
    },
    badge: "Pilihan Pro!",
  },
  {
    speed: 100,
    color: "orange",
    features: ["Performa maksimal banyak perangkat", "Untuk >10 perangkat"],
    prices: {
      monthly: { price: "354.090" },
      sixMonths: { price: "295.075", total: "1.770.450", savings: "354.090" },
      twelveMonths: {
        price: "295.075",
        total: "3.540.900",
        savings: "708.180",
      },
    },
  },
  {
    speed: 200,
    color: "red",
    features: ["Bisnis kecil & tech enthusiast", "Koneksi ultra-cepat"],
    prices: {
      monthly: { price: "409.590" },
      sixMonths: { price: "341.325", total: "2.047.950", savings: "409.590" },
      twelveMonths: {
        price: "341.325",
        total: "4.095.900",
        savings: "819.180",
      },
    },
  },
];

export const SERVICES: Service[] = [
  {
    icon: <RocketIcon />,
    title: "Infrastruktur Kelas Korporat",
    description:
      "Jaringan fiber optic superior dengan teknologi MPLS & DWDM yang andal, sama seperti yang digunakan oleh perusahaan besar.",
  },
  {
    icon: <ZapIcon />,
    title: "Kecepatan Simetris",
    description:
      "Kecepatan upload dan download yang seimbang, sempurna untuk streaming, gaming, dan video conference tanpa gangguan.",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "True Unlimited Tanpa FUP",
    description:
      "Nikmati internet tanpa batas kuota dan tanpa penurunan kecepatan. Gunakan sepuasnya, kapan saja.",
  },
  {
    icon: <HeadphonesIcon />,
    title: "Dedicated Support",
    description:
      "Tim support khusus kami siap membantu Anda 24/7, memastikan koneksi Anda selalu optimal dan bebas hambatan.",
  },
];

export const INSTALLATION_STEPS: InstallationStep[] = [
  {
    icon: <MapPinIcon />,
    title: "Pendaftaran & Cek Jangkauan",
    description:
      "Hubungi kami via WhatsApp atau isi formulir. Tim kami akan segera memverifikasi alamat Anda.",
    timeline: "Verifikasi dalam 1x24 jam",
  },
  {
    icon: <CalendarIcon />,
    title: "Jadwalkan Instalasi",
    description:
      "Setelah verifikasi, kami akan menghubungi Anda untuk menentukan jadwal instalasi yang paling sesuai.",
    timeline: "Penjadwalan H+1",
  },
  {
    icon: <WrenchIcon />,
    title: "Proses Pemasangan",
    description:
      "Teknisi profesional kami akan datang untuk melakukan instalasi, pemasangan perangkat, dan testing.",
    timeline: "Estimasi 2-3 Jam",
  },
  {
    icon: <WifiIcon />,
    title: "Aktivasi & Nikmati!",
    description:
      "Setelah instalasi selesai, layanan Anda langsung aktif. Selamat menikmati internet super cepat!",
    timeline: "Aktivasi Instan",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Sebagai gamer kompetitif, ping rendah dan koneksi stabil itu wajib. Pindah ke IdPlay adalah keputusan terbaik, main game online jadi lancar jaya tanpa lag!",
    author: "Rizky 'Zen' Pratama",
    role: "Gamer Kompetitif",
  },
  {
    quote:
      "Kerja dari rumah butuh koneksi internet yang bisa diandalkan, terutama saat video conference. Kecepatan simetris IdPlay sangat membantu, upload file besar jadi secepat kilat.",
    author: "Anita Wijaya",
    role: "Content Creator",
  },
  {
    quote:
      "Satu keluarga streaming film, belajar online, dan main game bersamaan tanpa ada yang buffering. IdPlay benar-benar 'True Unlimited', internetan jadi tanpa khawatir.",
    author: "Keluarga Budianto",
    role: "Pelanggan Setia",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Apa itu kecepatan simetris?",
    answer:
      "Kecepatan simetris berarti kecepatan download dan upload Anda sama besar. Ini sangat ideal untuk aktivitas seperti video call, mengunggah file besar, dan live streaming, karena memastikan koneksi dua arah yang lancar dan stabil.",
  },
  {
    question: "Apa yang dimaksud 'True Unlimited' tanpa FUP?",
    answer:
      "True Unlimited berarti tidak ada batasan kuota data bulanan. FUP (Fair Usage Policy) adalah kebijakan di mana kecepatan internet diturunkan setelah mencapai batas pemakaian tertentu. Dengan IdPlay, Anda tidak akan mengalami penurunan kecepatan, tidak peduli seberapa banyak data yang Anda gunakan.",
  },
  {
    question: "Bagaimana cara melakukan pembayaran tagihan bulanan?",
    answer:
      "Pembayaran sangat mudah! Anda bisa membayar melalui transfer bank virtual account, dompet digital (OVO, GoPay, Dana), atau di gerai retail seperti Alfamart dan Indomaret. Detail tagihan akan dikirimkan setiap bulan melalui email dan WhatsApp.",
  },
  {
    question: "Berapa lama proses instalasi setelah pendaftaran?",
    answer:
      "Setelah pendaftaran Anda terverifikasi, tim teknisi kami akan menghubungi Anda untuk menjadwalkalkan instalasi. Prosesnya biasanya memakan waktu 1-3 hari kerja, tergantung pada antrian dan kondisi di lokasi Anda.",
  },
];
