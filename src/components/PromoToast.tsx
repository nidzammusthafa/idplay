"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PromoToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-5 right-5 sm:left-auto sm:right-5 bg-white shadow-lg rounded-lg p-4 max-w-sm z-50 animate-fade-in-up">
      <div className="flex items-start">
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">
            🎉 Promo Anniversary 5 HIGH FIVE!
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Dapatkan gratis upgrade kecepatan dan bonus bulan langganan. Jangan
            lewatkan!
          </p>
          <div className="mt-4 flex">
            <Link
              href="/promo"
              className="bg-[#ec6210] text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-opacity-90 transition-all duration-300"
            >
              Lihat Promo
            </Link>
            <button
              onClick={() => setVisible(false)}
              className="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ec6210]"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
