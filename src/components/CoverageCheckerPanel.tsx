import React, { useState, useEffect, useMemo } from "react";
import type { Position, Odp, CoverageResult, PackagePlan } from "../types";
import { PACKAGE_PLANS } from "../../constants";

type BillingPeriod = "monthly" | "sixMonths" | "twelveMonths";

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
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [selectedPlanSpeed, setSelectedPlanSpeed] = useState<number>(
    () =>
      PACKAGE_PLANS.find((p) => p.prices.monthly.price !== "-")?.speed ||
      PACKAGE_PLANS[0].speed
  );
  const [selectedPeriod, setSelectedPeriod] =
    useState<BillingPeriod>("monthly");

  const MAX_DISTANCE_METERS = 150;
  const NEARBY_RADIUS_METERS = 2000;
  const MAX_ROUTE_CHECKS = 10;

  useEffect(() => {
    if (selectedPosition) {
      const checkCoverage = async () => {
        setLoadingMessage("Menganalisa lokasi Anda...");
        setResult(null);
        setError(null);
        setFullName("");
        setWhatsapp("");

        try {
          let address = `Lat: ${selectedPosition.lat.toFixed(
            5
          )}, Lng: ${selectedPosition.lng.toFixed(5)}`;
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
                  address = geoData.displayName || address;
                }
              }
            }
          } catch (geoErr) {
            console.warn(
              "Could not fetch address from backend, continuing.",
              geoErr
            );
          }

          setLoadingMessage("Mencari ODP terdekat...");
          const odpResponse = await fetch("/odp-locations.json");
          if (!odpResponse.ok) throw new Error("Could not load ODP data.");
          const allOdpLocations: Odp[] = await odpResponse.json();

          const nearbyOdps = allOdpLocations
            .map((odp) => ({
              ...odp,
              haversineDist: getHaversineDistance(selectedPosition, odp.center),
            }))
            .filter((odp) => odp.haversineDist < NEARBY_RADIUS_METERS)
            .sort((a, b) => a.haversineDist - b.haversineDist)
            .slice(0, MAX_ROUTE_CHECKS);

          if (nearbyOdps.length === 0) {
            if (allOdpLocations.length === 0) {
              throw new Error("Tidak ada data ODP yang tersedia.");
            }
            const closestOdpOverall = allOdpLocations
              .map((odp) => ({
                ...odp,
                haversineDist: getHaversineDistance(
                  selectedPosition,
                  odp.center
                ),
              }))
              .reduce((prev, curr) =>
                prev.haversineDist < curr.haversineDist ? prev : curr
              );
            setResult({
              isCovered: false,
              nearestOdp: closestOdpOverall,
              distance: Math.round(closestOdpOverall.haversineDist),
              address: address,
            });
            setLoadingMessage(null);
            return;
          }

          setLoadingMessage(
            "Menghitung jarak tempuh... (mungkin perlu beberapa saat)"
          );
          const routePromises = nearbyOdps.map((odp) =>
            fetch(
              `/api/route?startLat=${selectedPosition.lat}&startLon=${selectedPosition.lng}&endLat=${odp.center.lat}&endLon=${odp.center.lng}`
            )
              .then((res) => (res.ok ? res.json() : null))
              .catch(() => null)
          );

          const routeResults = await Promise.all(routePromises);

          const nearestOdpDriving = routeResults
            .map((result, index) => ({
              ...nearbyOdps[index],
              drivingDistance: result?.distance,
            }))
            .filter(
              (odp) =>
                odp.drivingDistance !== null &&
                odp.drivingDistance !== undefined
            )
            .reduce((prev, curr) =>
              (prev.drivingDistance ?? Infinity) <
              (curr.drivingDistance ?? Infinity)
                ? prev
                : curr
            );

          if (!nearestOdpDriving) {
            const closestByHaversine = nearbyOdps[0];
            setResult({
              isCovered:
                closestByHaversine.haversineDist <= MAX_DISTANCE_METERS,
              nearestOdp: closestByHaversine,
              distance: Math.round(closestByHaversine.haversineDist),
              address: address,
            });
          } else {
            setResult({
              isCovered:
                nearestOdpDriving.drivingDistance! <= MAX_DISTANCE_METERS,
              nearestOdp: nearestOdpDriving,
              distance: Math.round(nearestOdpDriving.drivingDistance!),
              address: address,
            });
          }
        } catch (err: any) {
          setError(err.message || "An unexpected error occurred.");
          console.error("Coverage check error:", err);
        } finally {
          setLoadingMessage(null);
        }
      };

      checkCoverage();
    } else {
      setResult(null);
      setError(null);
      setLoadingMessage(null);
    }
  }, [selectedPosition]);

  const selectedPlan = useMemo(
    () => PACKAGE_PLANS.find((p) => p.speed === selectedPlanSpeed),
    [selectedPlanSpeed]
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "pagi";
    if (hour < 15) return "siang";
    if (hour < 18) return "sore";
    return "malam";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || !selectedPosition || !selectedPlan) return;

    const periodLabels: { [key: string]: string } = {
      monthly: "Bulanan",
      sixMonths: "5 Bulan (+1 Bulan Gratis)",
      twelveMonths: "10 Bulan (+2 Bulan Gratis)",
    };

    const message = `
Halo Min, selamat ${getGreeting()}.

Dengan hormat, saya mengajukan permohonan pendaftaran layanan internet IdPlay dengan rincian sebagai berikut:

*Formulir Pendaftaran*
-----------------------------------
*Nama Lengkap:* ${fullName}
*Nomor WhatsApp:* ${whatsapp}
*Alamat Lengkap:* ${result.address}
*Koordinat:* ${selectedPosition.lat.toFixed(5)}, ${selectedPosition.lng.toFixed(
      5
    )}

*Detail Jangkauan*
-----------------------------------
*ODP Terdekat:* ${result.nearestOdp.ODP}
*Jarak dari ODP:* ${result.distance} meter

*Paket yang Dipilih*
-----------------------------------
*Kecepatan:* ${selectedPlan.speed} Mbps
*Periode Langganan:* ${periodLabels[selectedPeriod]}

Mohon informasinya untuk proses lebih lanjut.
Terima kasih.
    `.trim();

    const adminWhatsappNumber = "62895703153160"; // Ganti dengan nomor WA admin yang sebenarnya
    const whatsappUrl = `https://wa.me/${adminWhatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
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
            <p className="text-md font-bold text-green-600">
              ✅ Lokasi Terjangkau
            </p>
          ) : (
            <p className="text-md font-bold text-red-600">
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

    const availablePeriods = selectedPlan
      ? Object.keys(selectedPlan.prices).filter(
          (key) => selectedPlan.prices[key as BillingPeriod].price !== "-"
        )
      : [];

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

          <div className="flex items-end space-x-4">
            <div className="flex-grow">
              <label
                htmlFor="packagePlan"
                className="block text-sm font-medium text-gray-700"
              >
                Pilih Paket
              </label>
              <select
                id="packagePlan"
                value={selectedPlanSpeed}
                onChange={(e) => setSelectedPlanSpeed(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {PACKAGE_PLANS.map((plan) => (
                  <option key={plan.speed} value={plan.speed}>
                    {plan.speed} Mbps
                  </option>
                ))}
              </select>
            </div>
            {selectedPlan &&
              selectedPeriod &&
              selectedPlan.prices[selectedPeriod as BillingPeriod].price !==
                "-" && (
                <div className="text-right whitespace-nowrap pb-2">
                  <span className="text-lg font-bold text-gray-800">
                    Rp{" "}
                    {selectedPlan.prices[selectedPeriod as BillingPeriod].price}
                  </span>
                  <span className="text-sm text-gray-500">/bln</span>
                </div>
              )}
          </div>

          <div>
            <label
              htmlFor="billingPeriod"
              className="block text-sm font-medium text-gray-700"
            >
              Periode Langganan
            </label>
            <select
              id="billingPeriod"
              value={selectedPeriod}
              onChange={(e) =>
                setSelectedPeriod(e.target.value as BillingPeriod)
              }
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {availablePeriods.includes("monthly") && (
                <option value="monthly">Bulanan</option>
              )}
              {availablePeriods.includes("sixMonths") && (
                <option value="sixMonths">5 Bulan (+1 Bulan Gratis)</option>
              )}
              {availablePeriods.includes("twelveMonths") && (
                <option value="twelveMonths">10 Bulan (+2 Bulan Gratis)</option>
              )}
            </select>
          </div>

          <div className="bg-gray-50 p-3 rounded-md space-y-2 text-sm">
            <p>
              <strong className="font-medium text-gray-600">Alamat:</strong>{" "}
              <span className="text-gray-800">{result.address}</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Daftar Sekarang via WhatsApp
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
      ) : loadingMessage ? (
        <div className="text-center text-gray-500 py-10">
          <div className="animate-pulse">{loadingMessage}</div>
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
