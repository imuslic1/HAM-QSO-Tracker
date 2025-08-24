import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import SunCalc from "suncalc";

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function DaylightMap({ lat = 44.8, lon = 18.3 }) {
  const [nightPolygon, setNightPolygon] = useState([]);

  // Generate night polygon coordinates
  useEffect(() => {
    const now = new Date();
    const points = [];
    for (let lonPoint = -180; lonPoint <= 180; lonPoint += 5) {
      // Find latitude of sun at this longitude
      const sunPos = SunCalc.getPosition(now, lat, lonPoint);
      const sunAltDeg = (sunPos.alt * 180) / Math.PI;
      // If sun is below horizon, consider it night
      points.push([sunAltDeg < 0 ? -90 : 90, lonPoint]);
    }
    // Simple polygon covering night
    const polygonCoords = [
      points.map(([latP, lonP]) => [latP, lonP]),
      [90, -180],
      [90, 180],
    ];
    setNightPolygon(polygonCoords[0]);
  }, [lat, lon]);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={2}
      style={{ height: "500px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Your location marker */}
      <Marker position={[lat, lon]}>
        <Popup>Your location</Popup>
      </Marker>

      {/* Night shading */}
      {nightPolygon.length > 0 && (
        <Polygon
          positions={nightPolygon}
          pathOptions={{
            fillColor: "#000",
            fillOpacity: 0.35,
            color: "#000",
            weight: 0,
          }}
        />
      )}
    </MapContainer>
  );
}
