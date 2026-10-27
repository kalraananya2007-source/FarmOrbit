
import React, { useEffect, useState } from "react";
import "./marketprice.css";

import { fetchMandiData, searchMandiData } from "../fetchMandiData.js";
import NearbyMandiComparison from "./NearbyMandiComparison.jsx";

import wheatImage from "../assets/wheat.png";
import riceImage from "../assets/rice.png";
import maizeImage from "../assets/maize.png";
import cottonImage from "../assets/cotton.png";
import mustardImage from "../assets/mustard.png";
import potatoImage from "../assets/potato.png";
import tomatoImage from "../assets/tomato.png";
import onionImage from "../assets/onion.png";

const cropImages = {
  wheat: wheatImage,
  rice: riceImage,
  paddy: riceImage,
  maize: maizeImage,
  corn: maizeImage,
  cotton: cottonImage,
  mustard: mustardImage,
  potato: potatoImage,
  tomato: tomatoImage,
  onion: onionImage,
};

const normalize = (value) =>
  String(value ?? "").trim().toLowerCase();

const field = (record, names) => {
  if (!record) return "";

  const key = Object.keys(record).find((k) =>
    names.some((name) => k.toLowerCase() === name.toLowerCase())
  );

  return key && record[key] != null
    ? String(record[key]).trim()
    : "";
};

const cropOf = (record) =>
  field(record, ["commodity", "crop", "commodity_name", "crop_name"]);

const marketOf = (record) =>
  field(record, ["market", "market_name", "mandi", "mandi_name"]);

const districtOf = (record) =>
  field(record, ["district", "district_name", "city"]);

const stateOf = (record) => field(record, ["state"]);

const minPriceOf = (record) =>
  field(record, ["min_price", "minprice", "minimum_price"]);

const maxPriceOf = (record) =>
  field(record, ["max_price", "maxprice", "maximum_price"]);

const modalPriceOf = (record) =>
  field(record, ["modal_price", "modalprice"]);

const dateOf = (record) =>
  field(record, ["arrival_date", "date", "price_date"]);

const parseDate = (value) => {
  if (!value) return 0;

  const date = String(value).trim();
  let match = date.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);

  if (match) {
    return new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3])
    ).getTime();
  }

  match = date.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);

  if (match) {
    return new Date(
      Number(match[3]),
      Number(match[2]) - 1,
      Number(match[1])
    ).getTime();
  }

  const timestamp = new Date(date).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const formatPrice = (value) => {
  if (value === "" || value == null) return "N/A";

  const number = Number(value);

  return Number.isFinite(number)
    ? `₹${number.toLocaleString("en-IN")}`
    : value;
};

const MarketPrice = () => {
  const [marketData, setMarketData] = useState([]);
  const [cropSearch, setCropSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load initial mandi records.
  useEffect(() => {
    let cancelled = false;

    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError("");

        const records = await fetchMandiData();

        if (!cancelled) {
          setMarketData(Array.isArray(records) ? records : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Mandi data load nahi ho paya.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialData();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = async () => {
    const crop = cropSearch.trim();
    const city = citySearch.trim();

    if (!crop && !city) {
      setError("Search karne ke liye crop ya city ka naam enter karo.");
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);
    setMarketData([]);

    try {
      const result = await searchMandiData({
        // This assumes the city field contains a district name.
        district: city || undefined,
        commodity: crop || undefined,
        limit: 100,
      });

      const records = Array.isArray(result?.records)
        ? result.records
        : [];

      // Filter the records returned by the API.
      let filteredRecords = records;

      if (crop) {
        filteredRecords = filteredRecords.filter((record) =>
          normalize(cropOf(record)).includes(normalize(crop))
        );
      }

      if (city) {
        filteredRecords = filteredRecords.filter((record) => {
          const district = normalize(districtOf(record));
          const market = normalize(marketOf(record));

          return (
            district.includes(normalize(city)) ||
            market.includes(normalize(city))
          );
        });
      }

      // Keep only the filtered records. Do not overwrite them with records.
      setMarketData(filteredRecords);

      console.log("API total:", result?.total);
      console.log("API records received:", records.length);
      console.log("Matching records:", filteredRecords.length);
      console.log("First API record:", records[0]);
      console.table(
        records.map((record) => ({
          state: stateOf(record),
          district: districtOf(record),
          market: marketOf(record),
          crop: cropOf(record),
          date: dateOf(record),
        }))
      );

      if (filteredRecords.length === 0) {
        setError(
          "Matching mandi data nahi mila. F12 > Console mein API records check karo, ya sirf crop name se search karke dekho."
        );
      }
    } catch (err) {
      setMarketData([]);
      setError(err.message || "Search nahi ho paayi. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setCropSearch("");
    setCitySearch("");
    setHasSearched(false);
    setError("");
    setLoading(true);

    try {
      const records = await fetchMandiData();
      setMarketData(Array.isArray(records) ? records : []);
    } catch (err) {
      setMarketData([]);
      setError(err.message || "Mandi data load nahi ho paya.");
    } finally {
      setLoading(false);
    }
  };

  const sortedData = [...marketData].sort(
    (a, b) => parseDate(dateOf(b)) - parseDate(dateOf(a))
  );

  const latestRecord = hasSearched && sortedData.length
    ? sortedData[0]
    : null;

  const latestCrop = latestRecord
    ? cropOf(latestRecord) || "Unknown Crop"
    : "";

  const latestImage = cropImages[normalize(latestCrop)];

  return (
    <div className="market-price-page">
      <div className="market-header">
        <h1>🌾 Mandi Market Prices</h1>
        <p>Check available crop prices and compare mandi rates.</p>
      </div>

      <div className="market-search-container">
        <div className="market-search-box">
          <label htmlFor="cropSearch">Search Crop</label>
          <input
            id="cropSearch"
            value={cropSearch}
            onChange={(e) => setCropSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) handleSearch();
            }}
            placeholder="e.g. Wheat, Rice, Tomato"
          />
        </div>

        <div className="market-search-box">
          <label htmlFor="citySearch">Search District / Mandi</label>
          <input
            id="citySearch"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) handleSearch();
            }}
            placeholder="e.g. Ludhiana, Amritsar"
          />
        </div>

        <div className="market-search-buttons">
          <button
            type="button"
            className="market-search-btn"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search Prices"}
          </button>

          <button
            type="button"
            className="market-clear-btn"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </div>

      {loading && (
        <div className="market-message">
          <p>Loading mandi prices...</p>
        </div>
      )}

      {!loading && error && (
        <div className="market-message market-error">
          <p>{error}</p>
          <button type="button" onClick={handleSearch}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && hasSearched && (
        <section className="market-results">
          <h2>Latest Market Price</h2>

          <p className="market-result-count">
            {marketData.length} record(s) found
          </p>

          {!latestRecord ? (
            <div className="market-no-results">
              <h3>No prices found</h3>
              <p>Try another crop name or district/mandi name.</p>
            </div>
          ) : (
            <div className="market-cards">
              <div className="market-card">
                {latestImage && (
                  <img
                    src={latestImage}
                    alt={latestCrop}
                    className="market-crop-image"
                  />
                )}

                <div className="market-card-content">
                  <h3>{latestCrop}</h3>

                  <p className="market-location">
                    📍 {marketOf(latestRecord) || "Unknown Mandi"}
                    {districtOf(latestRecord)
                      ? `, ${districtOf(latestRecord)}`
                      : ""}
                    {stateOf(latestRecord)
                      ? `, ${stateOf(latestRecord)}`
                      : ""}
                  </p>

                  <div className="market-price-details">
                    <p>
                      <span>Minimum Price</span>
                      <strong>{formatPrice(minPriceOf(latestRecord))}</strong>
                    </p>

                    <p>
                      <span>Maximum Price</span>
                      <strong>{formatPrice(maxPriceOf(latestRecord))}</strong>
                    </p>

                    <p>
                      <span>Modal Price</span>
                      <strong className="market-modal-price">
                        {formatPrice(modalPriceOf(latestRecord))}
                      </strong>
                    </p>
                  </div>

                  {dateOf(latestRecord) && (
                    <p className="market-date">
                      Arrival Date: {dateOf(latestRecord)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {!loading && !error && !hasSearched && (
        <div className="market-message">
          <h3>Find crop prices in your area</h3>
          <p>
            Enter a crop name, a district, or both, then click Search Prices.
          </p>
        </div>
      )}

      {!loading && !error && (
        <section className="nearby-comparison-section">
          <NearbyMandiComparison marketData={marketData} />
        </section>
      )}
    </div>
  );
};

export default MarketPrice;
