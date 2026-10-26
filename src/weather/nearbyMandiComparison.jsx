
import React, { useEffect, useMemo, useState } from "react";
import "./NearbyMandiComparison.css";

const getValue = (record, possibleKeys) => {
  if (!record) return "";

  const key = Object.keys(record).find((key) =>
    possibleKeys.includes(key.toLowerCase().trim())
  );

  return key ? record[key] ?? "" : "";
};

const getCrop = (record) =>
  String(
    getValue(record, [
      "commodity",
      "crop",
      "commodity_name",
      "crop_name",
    ])
  ).trim();

const getMarket = (record) =>
  String(
    getValue(record, [
      "market",
      "market_name",
      "mandi",
      "mandi_name",
    ])
  ).trim() || "Unknown Mandi";

const getCity = (record) =>
  String(
    getValue(record, [
      "district",
      "district_name",
      "city",
      "city_name",
    ])
  ).trim();

const getPrice = (record) => {
  const rawPrice = getValue(record, [
    "modal_price",
    "modal price",
    "modalprice",
  ]);

  const price = Number(String(rawPrice).replace(/,/g, ""));
  return Number.isFinite(price) && price > 0 ? price : null;
};

const getCoordinates = (record) => {
  const latitude = Number(
    getValue(record, ["latitude", "lat", "market_latitude"])
  );

  const longitude = Number(
    getValue(record, [
      "longitude",
      "lon",
      "lng",
      "long",
      "market_longitude",
    ])
  );

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180 ||
    (latitude === 0 && longitude === 0)
  ) {
    return null;
  }

  return { lat: latitude, lon: longitude };
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const earthRadius = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return (
    2 *
    earthRadius *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
};

const formatPrice = (price) =>
  price == null ? "N/A" : `₹${Number(price).toLocaleString("en-IN")}`;

export default function NearbyMandiComparison({
  marketData = [],
}) {
  const [crop, setCrop] = useState("");
  const [city, setCity] = useState("");
  const [radius, setRadius] = useState("50");
  const [mode, setMode] = useState("location");
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState(
    "Detecting your location..."
  );
  const [locationError, setLocationError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Automatically request location when the component loads.
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not supported by this browser.");
      setLocationError("Please use City Search instead.");
      setMode("city");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

        setLocationStatus("Location detected successfully.");
        setLocationError("");
      },
      (error) => {
        let message = "Location permission nahi mili. City Search use karo.";

        if (error.code === 1) {
          message = "Location permission denied. City Search use karo.";
        } else if (error.code === 3) {
          message = "Location request timed out. Try again or use City Search.";
        }

        setLocationStatus("Location unavailable.");
        setLocationError(message);
        setMode("city");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      }
    );
  }, []);

  const availableCrops = useMemo(() => {
    const crops = marketData
      .map(getCrop)
      .filter(Boolean);

    return [...new Set(crops)].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [marketData]);

  const results = useMemo(() => {
    if (!hasSearched || !crop.trim()) return [];

    const selectedCrop = crop.trim().toLowerCase();
    const maxDistance = Number(radius);

    if (mode === "location" && !location) return [];

    const cityOriginRecords =
      mode === "city"
        ? marketData.filter(
            (record) =>
              getCity(record).toLowerCase() ===
              city.trim().toLowerCase()
          )
        : [];

    const cityOrigin = cityOriginRecords
      .map(getCoordinates)
      .find(Boolean);

    return marketData
      .filter(
        (record) =>
          getCrop(record).toLowerCase() === selectedCrop &&
          getPrice(record) !== null
      )
      .map((record) => {
        const coordinates = getCoordinates(record);

        let distance = null;

        if (coordinates && mode === "location" && location) {
          distance = calculateDistance(
            location.lat,
            location.lon,
            coordinates.lat,
            coordinates.lon
          );
        } else if (coordinates && mode === "city" && cityOrigin) {
          distance = calculateDistance(
            cityOrigin.lat,
            cityOrigin.lon,
            coordinates.lat,
            coordinates.lon
          );
        }

        return {
          ...record,
          marketName: getMarket(record),
          cityName: getCity(record),
          price: getPrice(record),
          distance,
          hasCoordinates: Boolean(coordinates),
        };
      })
      .filter((record) => {
        if (mode === "location") {
          return (
            record.distance !== null &&
            record.distance <= maxDistance
          );
        }

        // In city mode, only show records matching the entered district.
        return (
          record.cityName.toLowerCase() ===
          city.trim().toLowerCase()
        );
      })
      .sort((a, b) => a.price - b.price);
  }, [marketData, crop, city, radius, mode, location, hasSearched]);

  const handleSearch = (event) => {
    event.preventDefault();
    setHasSearched(true);

    if (!crop.trim()) {
      setLocationError("Please select or enter a crop.");
      return;
    }

    if (mode === "location" && !location) {
      setLocationError(
        "Location unavailable. Allow location access or choose City Search."
      );
      return;
    }

    if (mode === "city" && !city.trim()) {
      setLocationError("Please enter your district/city.");
      return;
    }

    setLocationError("");
  };

  const lowest = results.length ? results[0] : null;
  const highest = results.length
    ? results[results.length - 1]
    : null;

  return (
    <section className="nearby-mandi-container">
      <div className="nearby-mandi-header">
        <h2>Smart Tracker – Nearby Mandi Prices</h2>
        <p>
          Compare crop prices and find mandis offering better rates.
        </p>
      </div>

      <div className="location-status">
        <span>{locationStatus}</span>
        {location && (
          <span className="location-success">
            {" "}✓ GPS location ready
          </span>
        )}
      </div>

      <div className="tracker-mode">
        <button
          type="button"
          className={mode === "location" ? "active" : ""}
          onClick={() => {
            setMode("location");
            setHasSearched(false);
            setLocationError("");
          }}
        >
          Use My Location
        </button>

        <button
          type="button"
          className={mode === "city" ? "active" : ""}
          onClick={() => {
            setMode("city");
            setHasSearched(false);
            setLocationError("");
          }}
        >
          Search by City
        </button>
      </div>

      <form className="nearby-mandi-form" onSubmit={handleSearch}>
        <label htmlFor="tracker-crop">Select Crop</label>
        <input
          id="tracker-crop"
          list="tracker-crop-options"
          value={crop}
          onChange={(event) => setCrop(event.target.value)}
          placeholder="e.g. Wheat, Rice, Tomato"
        />

        <datalist id="tracker-crop-options">
          {availableCrops.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>

        {mode === "city" && (
          <>
            <label htmlFor="tracker-city">City / District</label>
            <input
              id="tracker-city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="e.g. Patiala"
            />
          </>
        )}

        <label htmlFor="tracker-radius">Nearby Radius</label>
        <select
          id="tracker-radius"
          value={radius}
          onChange={(event) => setRadius(event.target.value)}
        >
          <option value="10">10 km</option>
          <option value="25">25 km</option>
          <option value="50">50 km</option>
          <option value="100">100 km</option>
          <option value="200">200 km</option>
        </select>

        <button type="submit" className="compare-button">
          Compare Prices
        </button>
      </form>

      {locationError && (
        <p className="tracker-message tracker-error">
          {locationError}
        </p>
      )}

      {hasSearched && !locationError && results.length === 0 && (
        <p className="tracker-message">
          No nearby mandi records found. Try a larger radius, another crop,
          or City Search. Mandi coordinates may also be missing from the API.
        </p>
      )}

      {results.length > 0 && (
        <>
          <div className="tracker-summary">
            <div className="tracker-card">
              <h3>Lowest Modal Price</h3>
              <p>{formatPrice(lowest.price)}</p>
              <span>{lowest.marketName}</span>
              <small>{lowest.cityName}</small>
            </div>

            <div className="tracker-card">
              <h3>Highest Modal Price</h3>
              <p>{formatPrice(highest.price)}</p>
              <span>{highest.marketName}</span>
              <small>{highest.cityName}</small>
            </div>

            <div className="tracker-card">
              <h3>Price Difference</h3>
              <p>
                {formatPrice(highest.price - lowest.price)}
              </p>
              <span>Between listed mandis</span>
            </div>
          </div>

          <h3 className="tracker-results-heading">
            Mandi Results ({results.length})
          </h3>

          <div className="tracker-table-wrapper">
            <table className="tracker-table">
              <thead>
                <tr>
                  <th>Mandi</th>
                  <th>District</th>
                  <th>Modal Price</th>
                  <th>Distance</th>
                </tr>
              </thead>

              <tbody>
                {results.map((record, index) => (
                  <tr
                    key={`${record.marketName}-${record.cityName}-${index}`}
                  >
                    <td>{record.marketName}</td>
                    <td>{record.cityName || "N/A"}</td>
                    <td>{formatPrice(record.price)}</td>
                    <td>
                      {record.distance !== null
                        ? `${record.distance.toFixed(1)} km`
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
