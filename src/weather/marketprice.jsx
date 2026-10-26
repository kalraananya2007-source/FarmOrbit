
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
  cotton: cottonImage,
  mustard: mustardImage,
  potato: potatoImage,
  tomato: tomatoImage,
  onion: onionImage,
};

const field = (record, names) => {
  if (!record) return "";

  const key = Object.keys(record).find((k) =>
    names.some((name) => k.toLowerCase() === name.toLowerCase())
  );

  return key && record[key] != null ? String(record[key]).trim() : "";
};

const cropOf = (r) =>
  field(r, ["Commodity", "Crop", "Commodity_Name", "Crop_Name"]);

const marketOf = (r) =>
  field(r, ["Market", "Market_Name", "Mandi", "Mandi_Name"]);

const districtOf = (r) =>
  field(r, ["District", "District_Name", "City"]);

const stateOf = (r) => field(r, ["State"]);

const minPriceOf = (r) =>
  field(r, ["Min_Price", "MinPrice", "Minimum_Price"]);

const maxPriceOf = (r) =>
  field(r, ["Max_Price", "MaxPrice", "Maximum_Price"]);

const modalPriceOf = (r) =>
  field(r, ["Modal_Price", "ModalPrice"]);

const dateOf = (r) => field(r, ["Arrival_Date", "Date", "Price_Date"]);

const parseDate = (value) => {
  if (!value) return 0;

  const date = String(value).trim();
  let match = date.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);

  if (match) {
    return new Date(+match[1], +match[2] - 1, +match[3]).getTime();
  }

  match = date.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);

  if (match) {
    return new Date(+match[3], +match[2] - 1, +match[1]).getTime();
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

  useEffect(() => {
    let cancelled = false;

    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError("");

        const records = await fetchMandiData();

        if (!cancelled) setMarketData(records);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Mandi data load nahi ho paya.");
        }
      } finally {
        if (!cancelled) setLoading(false);
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

    try {
      const result = await searchMandiData({
        state: city ? "Punjab" : undefined,
        district: city || undefined,
        commodity: crop || undefined,
        limit: 100,
      });

      let records = result.records;

      // Filter crop locally as well, ignoring letter case.
      if (crop) {
        records = records.filter((r) =>
          cropOf(r).toLowerCase().includes(crop.toLowerCase())
        );
      }

      // If the API fallback returned broader results, match district
      // OR market name locally. A district-only exact match is not required.
      if (city) {
        const matchingCity = records.filter((r) => {
          const district = districtOf(r).toLowerCase();
          const market = marketOf(r).toLowerCase();

          return (
            district.includes(city.toLowerCase()) ||
            market.includes(city.toLowerCase())
          );
        });

        records = matchingCity;
      }

      setMarketData(records);
      console.log("API total:", result.total);
      console.log("Records shown after matching:", records.length);
      console.log("First matching record:", records[0]);
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
      setMarketData(records);
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

  const latestCrop = latestRecord ? cropOf(latestRecord) || "Unknown Crop" : "";
  const latestImage = cropImages[latestCrop.toLowerCase()];

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
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="e.g. Wheat, Rice, Tomato"
          />
        </div>

        <div className="market-search-box">
          <label htmlFor="citySearch">Search City / Mandi</label>
          <input
            id="citySearch"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
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
              <p>Try another crop name or city/mandi name.</p>
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
                    {stateOf(latestRecord) ? `, ${stateOf(latestRecord)}` : ""}
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
            Enter a crop name, a city, or both, then click Search Prices.
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
