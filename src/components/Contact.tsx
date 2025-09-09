import React, { useState } from "react";
import type { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import CoverageCheckerPanel from "./CoverageCheckerPanel";
import type { Position } from "../types";

const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-200 animate-pulse flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

const CoverageChecker = () => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );

  const handleLocationSelect = (latlng: LatLng) => {
    setSelectedPosition({ lat: latlng.lat, lng: latlng.lng });
  };

  return (
    <section id="kontak" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#212529]">
            Cek Jangkauan & Daftar
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Gunakan peta interaktif di bawah ini untuk memeriksa apakah lokasi
            Anda ter-cover oleh jaringan kami. Jika ya, Anda bisa langsung
            mendaftar!
          </p>
        </div>
        <div
          className="fade-in-section"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          <div className="flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white h-[85vh] max-h-[800px] min-h-[650px]">
            <div className="w-full md:w-2/3 h-1/2 md:h-full">
              <MapPicker
                selectedPosition={selectedPosition}
                onLocationSelect={handleLocationSelect}
              />
            </div>
            <div className="w-full md:w-1/3 h-1/2 md:h-full p-6 overflow-y-auto">
              <CoverageCheckerPanel selectedPosition={selectedPosition} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageChecker;
