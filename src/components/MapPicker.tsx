// components/Contact/MapPicker.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import type { LatLng, Icon } from "leaflet";
import L from "leaflet";
import type { Position, Odp } from "../types";
import SearchBox from "./SearchBox"; // Import SearchBox component

interface MapPickerProps {
  selectedPosition: Position | null;
  onLocationSelect: (latlng: LatLng) => void;
}

// User's selected location marker icon
const userIcon: Icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// ODP location marker icon
const odpIcon: Icon = L.icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDYzRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNSAxMi41NWEzIDExIDAgMCAxIDE0LjA4IDAiPjwvcGF0aD48cGF0aCBkPSJNMS40MiA5YTE2IDE2IDAgMCAxIDIxLjE2IDAiPjwvcGF0aD48cGF0aCBkPSJNOC41MyAxNi4xMWE2IDYgMCAwIDEgNi45NSAwIj48L3BhdGg+PGxpbmUgeDE9IjEyIiB5MT0iMjAiIHgyPSIxMi4wMSIgeTI9IjIwIj48L2xpbmU+PC9zdmc+",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Helper component to handle map clicks
const MapClickHandler: React.FC<{
  onLocationSelect: (latlng: LatLng) => void;
}> = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

// Helper component to update map view when position changes
const MapViewUpdater: React.FC<{ position: Position | null }> = ({
  position,
}) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 16); // Zoom in closer
    }
  }, [position, map]);

  return null;
};

// Helper component to handle map events for performance and stability
const MapEventsHandler: React.FC<{
  allOdps: Odp[];
  setVisibleOdps: React.Dispatch<React.SetStateAction<Odp[]>>;
}> = ({ allOdps, setVisibleOdps }) => {
  const map = useMap();

  const updateVisibleMarkers = useCallback(() => {
    if (!map || allOdps.length === 0) return;
    const bounds = map.getBounds();
    const visible = allOdps.filter((odp) => {
      const latLng = L.latLng(odp.center.lat, odp.center.lng);
      return bounds.contains(latLng);
    });
    setVisibleOdps(visible);
  }, [map, allOdps, setVisibleOdps]);

  useEffect(() => {
    // Invalidate map size on initial load and resize to fix rendering issues
    const handleResize = () => map.invalidateSize();

    // Use a short timeout to ensure the map container has its final dimensions
    const timer = setTimeout(() => {
      map.invalidateSize();
      updateVisibleMarkers();
    }, 150);

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [map, updateVisibleMarkers]);

  useMapEvents({
    moveend: updateVisibleMarkers,
    zoomend: updateVisibleMarkers,
  });

  return null;
};

const MapPicker: React.FC<MapPickerProps> = ({
  selectedPosition,
  onLocationSelect,
}) => {
  const [allOdpLocations, setAllOdpLocations] = useState<Odp[]>([]);
  const [visibleOdps, setVisibleOdps] = useState<Odp[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null); // State for search errors

  // Center near ODP locations
  const initialCenter: Position = { lat: -6.9175, lng: 107.6191 };
  const initialZoom = 15;

  useEffect(() => {
    const fetchOdpData = async () => {
      try {
        const response = await fetch("/odp-locations.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Odp[] = await response.json();
        setAllOdpLocations(data);
      } catch (error) {
        console.error("Failed to fetch ODP locations:", error);
      }
    };
    fetchOdpData();
  }, []);

  return (
    // Wrapper div for positioning the search box relative to the map
    <div className="relative h-full w-full">
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0" // z-0 ensures map is behind other overlays
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onLocationSelect={onLocationSelect} />
        <MapViewUpdater position={selectedPosition} />
        <MapEventsHandler
          allOdps={allOdpLocations}
          setVisibleOdps={setVisibleOdps}
        />

        {/* User's selected marker */}
        {selectedPosition && (
          <Marker position={selectedPosition} icon={userIcon}>
            <Popup>
              Lokasi Pilihan Anda <br /> Lat: {selectedPosition.lat.toFixed(6)},
              Lng: {selectedPosition.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}

        {/* Render only visible ODP markers */}
        {visibleOdps.map((odp, index) => (
          <Marker key={index} position={odp.center} icon={odpIcon}>
            <Popup>
              <b>ODP:</b> {odp.ODP}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* SearchBox positioned over the map */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-11/12 md:w-2/3 lg:w-1/2">
        <SearchBox
          onLocationSelect={onLocationSelect}
          onError={setSearchError}
        />
        {searchError && (
          <div className="mt-2 p-2 bg-red-100 text-red-700 text-sm rounded-md shadow-sm">
            {searchError}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPicker;
