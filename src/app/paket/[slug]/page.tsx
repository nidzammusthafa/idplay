import { notFound } from "next/navigation";
import { PACKAGE_PLANS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const periodMap: { [key: string]: string } = {
    monthly: "bulanan",
    sixMonths: "semesteran",
    twelveMonths: "tahunan",
  };

  return PACKAGE_PLANS.flatMap((plan) => {
    return (Object.keys(plan.prices) as Array<keyof typeof plan.prices>)
      .filter(
        (periodKey) =>
          plan.prices[periodKey] && plan.prices[periodKey].price !== "-"
      )
      .map((periodKey) => ({
        slug: `${plan.speed}-mbps-${periodMap[periodKey]}`,
      }));
  });
}

// Helper function to parse slug
const parseSlug = (slug: string) => {
  const parts = slug.split("-mbps-");
  if (parts.length !== 2) return null;

  const speed = parseInt(parts[0], 10);
  const period = parts[1]; // 'bulanan', 'semesteran', 'tahunan'

  let cycleKey: "monthly" | "sixMonths" | "twelveMonths" | null = null;
  if (period === "bulanan") cycleKey = "monthly";
  if (period === "semesteran") cycleKey = "sixMonths";
  if (period === "tahunan") cycleKey = "twelveMonths";

  if (!speed || !cycleKey) return null;

  return { speed, cycleKey, period };
};

// Helper to get package data
const getPackageDetails = (slug: string) => {
  const parsed = parseSlug(slug);
  if (!parsed) return null;

  const { speed, cycleKey, period } = parsed;

  const plan = PACKAGE_PLANS.find((p) => p.speed === speed);
  if (!plan) return null;

  const priceInfo = plan.prices[cycleKey];
  if (!priceInfo || priceInfo.price === "-") return null;

  return {
    plan,
    priceInfo,
    speed,
    cycleKey,
    period,
  };
};

// Helper to generate unique content
const getIdealUsageContent = (speed: number) => {
  switch (true) {
    case speed <= 15:
      return {
        title: "Sempurna untuk Kebutuhan Dasar",
        description:
          "Paket ini adalah pilihan paling ekonomis dan sangat ideal untuk penggunaan internet ringan. Jika aktivitas online Anda sebagian besar adalah browsing web, membuka media sosial seperti Instagram dan TikTok, serta memeriksa email, kecepatan 15 Mbps sudah lebih dari cukup. Sangat direkomendasikan untuk anak kos atau pengguna tunggal dengan 1-3 perangkat.",
        tags: ["Browsing", "Social Media", "Email", "Anak Kos"],
      };
    case speed <= 20:
      return {
        title: "Andalan untuk WFH dan Streaming HD",
        description:
          "Ini adalah paket terlaris kami karena keseimbangan antara harga dan performa. Dengan 20 Mbps, Anda bisa melakukan panggilan video (Zoom/Google Meet) untuk Work From Home (WFH) tanpa kendala, sambil menikmati streaming film atau serial favorit dalam kualitas HD (720p/1080p). Cocok untuk pasangan atau keluarga kecil dengan 3-5 perangkat.",
        tags: [
          "Work From Home",
          "Streaming HD",
          "Video Call",
          "Keluarga Kecil",
        ],
      };
    case speed <= 30:
      return {
        title: "Pilihan Tepat untuk Gamer dan Movie Lovers",
        description:
          "Naik ke level berikutnya dengan 30 Mbps. Kecepatan ini memberikan ping yang lebih rendah dan koneksi stabil yang dibutuhkan para gamer online kompetitif. Selain itu, Anda bisa menikmati streaming konten hiburan dalam kualitas 4K Ultra HD tanpa buffering. Ideal untuk 5-7 perangkat yang digunakan secara bersamaan.",
        tags: ["Gaming Online", "Streaming 4K", "Download Cepat", "Hiburan"],
      };
    case speed <= 50:
      return {
        title: "Kekuatan untuk Seluruh Keluarga Digital",
        description:
          "Paket 50 Mbps adalah solusi serba bisa untuk rumah tangga modern. Kecepatan ini sangat kuat untuk menangani banyak aktivitas berat secara bersamaan: ayah sedang video conference, ibu streaming resep masakan 4K, dan anak-anak bermain game online atau belajar dari rumah. Juga sangat andal untuk perangkat smart home.",
        tags: [
          "Keluarga Besar",
          "Smart Home",
          "Multi-device",
          "Performa Tinggi",
        ],
      };
    case speed <= 75:
      return {
        title: "Daya Pacu bagi Profesional dan Kreator Konten",
        description:
          "Didesain khusus untuk para profesional yang membutuhkan lebih dari sekadar kecepatan download. Kecepatan upload yang simetris dan tinggi dari paket 75 Mbps ini sangat krusial bagi kreator konten, desainer grafis, atau arsitek yang sering mengunggah file berukuran besar ke cloud atau mengirimkannya ke klien. Live streaming di Twitch atau YouTube juga menjadi sangat lancar.",
        tags: [
          "Kreator Konten",
          "Upload Cepat",
          "Live Streaming",
          "Profesional",
        ],
      };
    default: // 100 Mbps and above
      return {
        title: `Performa Ultimate untuk Power User dan Bisnis`,
        description: `Dengan kecepatan ${speed} Mbps, Anda memasuki level performa tertinggi. Paket ini dirancang untuk 'power users', tech enthusiasts, atau kantor/bisnis kecil yang tidak mengenal kompromi. Jalankan server sendiri, unduh file puluhan gigabyte dalam sekejap, dan hubungkan semua perangkat yang Anda miliki tanpa merasakan sedikit pun penurunan performa.`,
        tags: ["Bisnis Kecil", "Power User", "Server", "Teknologi Terkini"],
      };
  }
};

// Dynamic Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    return {
      title: "Halaman Tidak Ditemukan",
      description: "Halaman yang Anda cari tidak tersedia.",
    };
  }

  const details = getPackageDetails(slug);

  if (!details) {
    return {
      title: "Paket Tidak Ditemukan",
      description: "Paket internet yang Anda cari tidak tersedia.",
    };
  }

  const { speed, period, priceInfo } = details;
  const periodText = period.charAt(0).toUpperCase() + period.slice(1);
  const title = `Paket Internet ${speed} Mbps Rp. ${priceInfo.price}/bulan - ${periodText} - IDPlay`;
  const description = `Daftar paket internet IDPlay ${speed} Mbps dengan pembayaran ${period.toLowerCase()} seharga Rp ${
    priceInfo.price
  }/bulan. Nikmati koneksi super cepat dan stabil.`;

  const periodToImageName: { [key: string]: string } = {
    bulanan: "bulan",
    semesteran: "semester",
    tahunan: "tahun",
  };
  const imageName = `${speed}${periodToImageName[period]}.webp`;
  const imageUrl = `https://www.idplay.it.com/${imageName}`;

  return {
    metadataBase: new URL("https://www.idplay.it.com"),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.idplay.it.com/paket/${slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      siteName: "IDPlay",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

// The Page Component
export default async function PaketPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const details = getPackageDetails(slug);

  if (!details) {
    notFound();
  }

  const { plan, priceInfo, speed, period } = details;
  const content = getIdealUsageContent(speed);

  const periodMap: { [key: string]: string } = {
    bulanan: "Bulan",
    semesteran: "6 Bulan",
    tahunan: "12 Bulan",
  };

  const periodToImageName: { [key: string]: string } = {
    bulanan: "bulan",
    semesteran: "semester",
    tahunan: "tahun",
  };
  const imageName = `${speed}${periodToImageName[period]}.webp`;
  const finalImageUrl = `/${imageName}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold text-[#ec6210]">
            IdPlay
          </Link>
          <Link
            href="/cek-jangkauan"
            className="bg-[#ec6210] text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300"
          >
            Cek Jangkauan
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="w-full rounded-lg overflow-hidden shadow-2xl bg-gray-200">
            <Image
              src={finalImageUrl}
              alt={`IDPlay Paket ${speed} Mbps ${period}`}
              width={1200}
              height={630}
              className="object-cover"
              priority
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-4">
            {plan.badge && (
              <span className="text-sm font-bold text-[#ec6210]">
                {plan.badge}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Paket {speed} Mbps <span className="capitalize">{period}</span>
            </h1>
            <p className="text-lg text-gray-600">{plan.features.join(" - ")}</p>

            <div className="bg-white p-6 rounded-lg shadow-md mt-4">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-500">Harga per bulan</span>
                <p className="text-3xl md:text-4xl font-bold text-gray-800">
                  Rp {priceInfo.price}
                </p>
              </div>
              {priceInfo.total && (
                <div className="text-right mt-2 text-sm text-green-600 font-semibold">
                  Total {periodMap[period]}: Rp {priceInfo.total} (Anda hemat Rp{" "}
                  {priceInfo.savings})
                </div>
              )}
            </div>

            <Link
              href="/cek-jangkauan"
              className="mt-6 w-full text-center bg-[#ec6210] text-white font-bold py-4 px-8 rounded-lg text-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              Langganan Sekarang
            </Link>
          </div>
        </div>

        {/* Ideal Usage Section */}
        <div className="mt-20 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            {content.title}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {content.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {content.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
