import React, { useState, useEffect } from "react";
import type { Position, Odp, CoverageResult } from "../types";

interface CoverageCheckerPanelProps {
  selectedPosition: Position | null;
}

const getHaversineDistance = (pos1: Position, pos2: Position): number => {
  const R = 6371e3; // metres
  const φ1 = (pos1.lat * Math.PI) / 180;
  const φ2 = (pos2.lat * Math.PI) / 180;
  const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
  const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
};

const CoverageCheckerPanel: React.FC<CoverageCheckerPanelProps> = ({
  selectedPosition,
}) => {
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const MAX_DISTANCE_METERS = 250;
  const NEARBY_RADIUS_METERS = 2000; // Check ODPs within a 2km radius
  const MAX_ROUTE_CHECKS = 10; // Check driving distance for max 10 closest ODPs

  useEffect(() => {
    if (selectedPosition) {
      const checkCoverage = async () => {
        setIsLoading(true);
        setResult(null);
        setError(null);
        setFullName("");
        setWhatsapp("");

        try {
          // --- Step 1: Fetch Address from our Backend ---
          let address = `Lat: ${selectedPosition.lat.toFixed(
            5
          )}, Lng: ${selectedPosition.lng.toFixed(5)}`; // Fallback address
          try {
            const geoResponse = await fetch(
              `/api/geocode?lat=${selectedPosition.lat}&lon=${selectedPosition.lng}`
            );
            if (geoResponse.ok) {
              const geoData = await geoResponse.json();
              if (geoData && geoData.address) {
                const addr = geoData.address;
                const addressParts = [
                  addr.road || addr.street,
                  addr.village || addr.suburb,
                  addr.city_district || addr.subdistrict,
                  addr.city || addr.town || addr.county,
                  addr.state,
                  addr.postcode,
                ].filter(Boolean);

                if (addressParts.length > 0) {
                  address = addressParts.join(", ");
                } else {
                  address = geoData.displayName || address; // Use displayName from our API
                }
              }
            }
          } catch (geoErr) {
            console.warn(
              "Could not fetch address from backend, continuing coverage check.",
              geoErr
            );
          }

          // --- Step 2: Fetch ODP locations ---
          const odpResponse = await fetch("/odp-locations.json");
          if (!odpResponse.ok) throw new Error("Could not load ODP data.");
          const allOdpLocations: Odp[] = await odpResponse.json();

          // --- Step 3: Find closest ODP (simplified to Haversine distance) ---
          if (allOdpLocations.length === 0) {
            throw new Error("Tidak ada data ODP yang tersedia.");
          }

          const closestOdp = allOdpLocations
            .map((odp) => ({
              ...odp,
              distance: getHaversineDistance(selectedPosition, odp.center),
            }))
            .reduce((prev, curr) =>
              prev.distance < curr.distance ? prev : curr
            );

          // --- Step 4: Set Result ---
          setResult({
            isCovered: closestOdp.distance <= MAX_DISTANCE_METERS,
            nearestOdp: closestOdp,
            distance: Math.round(closestOdp.distance),
            address: address,
          });
        } catch (err: any) {
          setError(err.message || "An unexpected error occurred.");
          console.error("Coverage check error:", err);
        } finally {
          setIsLoading(false);
        }
      };

      checkCoverage();
    } else {
      setResult(null);
      setError(null);
      setIsLoading(false);
    }
  }, [selectedPosition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || !selectedPosition) return;

    const formData = {
      fullName,
      whatsapp,
      address: result.address,
      coordinates: {
        lat: selectedPosition.lat,
        lng: selectedPosition.lng,
      },
      nearestOdp: result.nearestOdp.ODP,
      distance: result.distance,
    };

    console.log("Form Submitted:", formData);
    alert("Pendaftaran berhasil! (Data dicetak di console browser)");
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Status Jangkauan
          </h3>
          {result.isCovered ? (
            <p className="text-2xl font-bold text-green-600">
              ✅ Lokasi Terjangkau
            </p>
          ) : (
            <p className="text-2xl font-bold text-red-600">
              ❌ Di Luar Jangkauan
            </p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">ODP Terdekat</h3>
          <p className="text-lg font-semibold">{result.nearestOdp.ODP}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Jarak dari ODP</h3>
          <p className="text-lg font-semibold">{result.distance} meter</p>
          {!result.isCovered && (
            <p className="text-sm text-red-500 mt-1">
              Jarak maksimal untuk instalasi adalah {MAX_DISTANCE_METERS} meter.
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderForm = () => {
    if (!result || !result.isCovered || !selectedPosition) return null;

    return (
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h2 className="text-xl font-bold text-blue-600 mb-4">
          Formulir Pendaftaran
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="whatsapp"
              className="block text-sm font-medium text-gray-700"
            >
              Nomor WhatsApp
            </label>
            <input
              type="tel"
              id="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="bg-gray-50 p-3 rounded-md space-y-2 text-sm">
            <p>
              <strong className="font-medium text-gray-600">
                Alamat Lengkap:
              </strong>{" "}
              <span className="text-gray-800">{result.address}</span>
            </p>
            <p>
              <strong className="font-medium text-gray-600">Koordinat:</strong>{" "}
              <span className="text-gray-800">
                {selectedPosition.lat.toFixed(5)},{" "}
                {selectedPosition.lng.toFixed(5)}
              </span>
            </p>
            <p>
              <strong className="font-medium text-gray-600">
                ODP Terdekat:
              </strong>{" "}
              <span className="text-gray-800">{result.nearestOdp.ODP}</span>
            </p>
            <p>
              <strong className="font-medium text-gray-600">Jarak:</strong>{" "}
              <span className="text-gray-800">{result.distance} meter</span>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Daftar Sekarang
          </button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Hasil Pengecekan
      </h2>
      {!selectedPosition ? (
        <div className="text-center text-gray-500 py-10">
          <p>Silakan klik pada peta untuk memilih lokasi instalasi.</p>
        </div>
      ) : isLoading ? (
        <div className="text-center text-gray-500 py-10">
          <div className="animate-pulse">Menganalisa lokasi...</div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
          <p>
            <strong>Terjadi Kesalahan:</strong> {error}
          </p>
        </div>
      ) : (
        <>
          {renderResult()}
          {renderForm()}
        </>
      )}
    </div>
  );
};

export default CoverageCheckerPanel;
