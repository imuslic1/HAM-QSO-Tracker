import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

export default function HomePage({ qraLocator }) {
  const [sunData, setSunData] = useState(null);
  const [spaceWeather, setSpaceWeather] = useState(null);

  // Convert QRA locator to lat/lon
  const qraToLatLon = (qra) => {
    // Simple example for Maidenhead (use full library for real)
    // Here we just return a fallback
    return { lat: 44.8, lon: 18.3 }; // Sarajevo as fallback
  };

  useEffect(() => {
    const { lat, lon } = qraToLatLon(qraLocator);

    // Fetch sunrise/sunset times from sunrise-sunset.org API
    axios
      .get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`)
      .then((res) => setSunData(res.data.results))
      .catch((err) => console.error(err));

    // Fetch NOAA Space Weather data (example JSON feed)
    axios
      .get("https://services.swpc.noaa.gov/json/planetary_k_index_1m.json")
      .then((res) => {
        // Take last entry as current K-index
        if (res.data && res.data.length > 0) {
          const last = res.data[res.data.length - 1];
          setSpaceWeather({ Kp: last.Kp, time_tag: last.time_tag });
        }
      })
      .catch((err) => console.error(err));
  }, [qraLocator]);

  return (
    <div className="homepage-container">
      <h1>Welcome to Your HAM Logbook</h1>

      <section className="daylight-section">
        <h2>Current Daylight Map</h2>
        <img
          src="https://www.timeanddate.com/scripts/sunmap.php"
          alt="Current Daylight Map"
          className="daylight-map"
        />
      </section>

      <section className="sun-info-section">
        <h2>Sunrise / Sunset Times</h2>
        {sunData ? (
          <ul>
            <li>Sunrise: {new Date(sunData.sunrise).toLocaleTimeString()}</li>
            <li>Sunset: {new Date(sunData.sunset).toLocaleTimeString()}</li>
            <li>Solar Noon: {new Date(sunData.solar_noon).toLocaleTimeString()}</li>
            <li>Day Length: {sunData.day_length} seconds</li>
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section className="space-weather-section">
        <h2>Solar / Geomagnetic Activity</h2>
        {spaceWeather ? (
          <ul>
            <li>K-index: {spaceWeather.Kp}</li>
            <li>Timestamp: {new Date(spaceWeather.time_tag).toLocaleString()}</li>
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
}
