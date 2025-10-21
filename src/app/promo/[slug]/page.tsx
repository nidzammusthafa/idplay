import { notFound } from "next/navigation";
import { PROMO_PACKAGE_PLANS } from "@/lib/promo-constants";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const periodMap: { [key: string]: string } = {
    sixMonths: "6-bulan",
    twelveMonths: "12-bulan",
  };

  return PROMO_PACKAGE_PLANS.flatMap((plan) => {
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
  const period = parts[1]; // '6-bulan', '12-bulan'

  let cycleKey: "sixMonths" | "twelveMonths" | null = null;
  if (period === "6-bulan") cycleKey = "sixMonths";
  if (period === "12-bulan") cycleKey = "twelveMonths";

  if (!speed || !cycleKey) return null;

  return { speed, cycleKey, period };
};

// Helper to get package data
const getPackageDetails = (slug: string) => {
  const parsed = parseSlug(slug);
  if (!parsed) return null;

  const { speed, cycleKey, period } = parsed;

  const plan = PROMO_PACKAGE_PLANS.find((p) => p.speed === speed);
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

  const { speed, period, priceInfo, plan } = details;
  const periodText = period.replace("-", " ");
  const title = `Promo ${plan.badge}: Paket ${speed} Mbps ${periodText} - IDPlay`;
  const description = `Dapatkan promo anniversary IDPlay untuk paket ${speed} Mbps dengan pembayaran ${periodText.toLowerCase()} seharga Rp ${
    priceInfo.price
  }/bulan.`;

  const imageUrl = "/promo20oct-20nov.jpg";

  return {
    metadataBase: new URL("https://www.idplay.it.com"),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.idplay.it.com/promo/${slug}`,
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
export default async function PromoPaketPage({
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

  const periodMap: { [key: string]: string } = {
    "6-bulan": "6 Bulan",
    "12-bulan": "12 Bulan",
  };

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
              src="/promo20oct-20nov.jpg"
              alt={`IDPlay Promo Paket ${speed} Mbps ${period}`}
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
              Paket Promo {speed} Mbps{" "}
              <span className="capitalize">{period.replace("-", " ")}</span>
            </h1>
            <p className="text-lg text-gray-600">{plan.features.join(" - ")}</p>

            <div className="bg-white p-6 rounded-lg shadow-md mt-4">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-500">Harga per bulan</span>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                  Rp {priceInfo.price}
                </p>
              </div>
              {priceInfo.total && (
                <div className="text-right mt-2 text-sm text-gray-500 font-semibold">
                  Total {periodMap[period]}: Rp {priceInfo.total}
                  {priceInfo.savings && (
                    <span className="text-green-600">
                      {" "}
                      (Gratis {priceInfo.savings})
                    </span>
                  )}
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
      </main>
    </div>
  );
}
