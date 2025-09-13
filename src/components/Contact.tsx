import React, { useState, useRef, useEffect } from "react";
import type { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import CoverageCheckerPanel from "./CoverageCheckerPanel";
import type { Position } from "../types";
import { LocateFixed } from "lucide-react";

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
  const [isLocating, setIsLocating] = useState(false);
  const watchIdRef = useRef<number | null>(null);

  const handleLocationSelect = (latlng: LatLng) => {
    setSelectedPosition({ lat: latlng.lat, lng: latlng.lng });
  };

  const stopWatching = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsLocating(false);
  };

  const handleFindMe = () => {
    setIsLocating(true);

    // Hapus listener sebelumnya jika ada
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000, // Waktu tunggu sedikit lebih lama
      maximumAge: 0,
    };

        console.log("Starting location watch with options:", options);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        console.log("New position received:", {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        const { latitude, longitude, accuracy } = position.coords;

        // Update posisi untuk feedback instan di peta
        setSelectedPosition({ lat: latitude, lng: longitude });

        // Hentikan pencarian jika akurasi sudah cukup baik (misal < 20 meter)
        if (accuracy < 20) {
          console.log(
            `Accuracy is ${accuracy}m, which is good enough. Stopping watch.`
          );
          stopWatching();
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
        alert(
          "Gagal mendapatkan lokasi Anda. Pastikan izin lokasi diaktifkan dan coba lagi."
        );
        stopWatching();
      },
      options
    );

    // Hentikan pencarian setelah timeout untuk mencegah proses berjalan selamanya
    setTimeout(() => {
      if (isLocating) {
        stopWatching();
      }
    }, options.timeout);
  };
  
  // Cleanup effect untuk memastikan watchPosition dihentikan saat komponen unmount
  useEffect(() => {
    return () => {
      stopWatching();
    };
  }, []);


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
            <div className="relative w-full md:w-2/3 h-1/2 md:h-full">
              <MapPicker
                selectedPosition={selectedPosition}
                onLocationSelect={handleLocationSelect}
              />
              <button
                onClick={handleFindMe}
                disabled={isLocating}
                className="absolute bottom-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Find my location"
              >
                {isLocating ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <LocateFixed className="w-5 h-5 text-gray-600" />
                )}
              </button>
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
