// components/LeafletMap.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported

const LeafletMap: React.FC = () => {
  const center: LatLngExpression = [37.7749, -122.4194]; // San Francisco as default
  const zoom = 12; // Default zoom level

  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const iconPrototype = L.Icon.Default.prototype as unknown as any;
    delete iconPrototype._getIconUrl;
  }

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
      >
        {/* Regular OpenStreetMap layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>San Francisco</Popup>
        </Marker>
      </MapContainer>

      {/* Darken the map with a CSS filter */}
      <style jsx global>{`
        .leaflet-container {
          filter: grayscale;
        }
      `}</style>
    </div>
  );
};

export default LeafletMap;
