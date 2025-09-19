"use client";

import { useState } from "react";
import type { PackagePlan } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { PACKAGE_PLANS } from "@/lib/constants";

type Period = "monthly" | "sixMonths" | "twelveMonths";

const periodMap: { [key in Period]: string } = {
  monthly: "bulanan",
  sixMonths: "semesteran",
  twelveMonths: "tahunan",
};

export default function HargaPage() {
  const [activePeriod, setActivePeriod] = useState<Period>("monthly");

  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
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

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Temukan Paket yang Tepat untuk Anda
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pilih periode pembayaran untuk melihat harga terbaik. Semua paket
            kami hadir dengan koneksi Fiber Optic, kecepatan simetris, dan True
            Unlimited tanpa FUP.
          </p>
        </div>

        {/* Toggle Section */}
        <div className="flex justify-center mb-10 bg-gray-200 rounded-full p-1 max-w-md mx-auto">
          {(Object.keys(periodMap) as Period[]).map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`w-full capitalize py-2 px-4 rounded-full text-sm md:text-base font-bold transition-colors duration-300 ${
                activePeriod === period
                  ? "bg-[#ec6210] text-white shadow"
                  : "text-gray-600 hover:bg-gray-300"
              }`}
            >
              {periodMap[period]}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PACKAGE_PLANS.map((plan) => {
            const priceInfo = plan.prices[activePeriod];
            const isAvailable = priceInfo && priceInfo.price !== "-";
            const slug = `${plan.speed}-mbps-${periodMap[activePeriod]}`;

            return (
              <Link
                key={plan.speed}
                href={isAvailable ? `/paket/${slug}` : "#"}
                className={`group block rounded-xl border-2 transition-all duration-300 ${
                  isAvailable
                    ? "bg-white shadow-md hover:shadow-xl hover:border-[#ec6210] transform hover:-translate-y-1"
                    : "bg-gray-200 cursor-not-allowed"
                } ${
                  plan.color === "purple"
                    ? "border-[#ec6210]"
                    : "border-transparent"
                }`}
              >
                <div className="p-6 relative">
                  {plan.badge && (
                    <div className="absolute top-0 right-6 -mt-4 bg-[#ec6210] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {plan.badge}
                    </div>
                  )}
                  <div className="mb-6">
                    <p className="text-4xl font-extrabold text-gray-800">
                      {plan.speed}{" "}
                      <span className="text-2xl font-bold text-gray-500">
                        Mbps
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {plan.features.join(", ")}
                    </p>
                  </div>

                  {isAvailable ? (
                    <div>
                      <p className="text-gray-500 text-sm">Harga per bulan</p>
                      <p className="text-3xl font-bold text-gray-900">
                        Rp {priceInfo.price}
                      </p>
                      {priceInfo.savings && (
                        <p className="text-sm text-green-600 font-semibold mt-1">
                          Hemat hingga Rp {priceInfo.savings}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="h-[76px] flex items-center">
                      <p className="text-gray-500">
                        Tidak tersedia untuk periode ini
                      </p>
                    </div>
                  )}

                  <div className="text-center mt-6 text-[#ec6210] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Lihat Detail Paket &rarr;
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {/* Image Banner */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Daftar Harga Resmi
          </h2>
          <div className="max-w-2xl mx-auto rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/price-list.webp"
              alt="Daftar harga paket internet IDPlay"
              width={800}
              height={1131}
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
