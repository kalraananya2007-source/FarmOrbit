import React, { useState } from "react";
import "./marketprice.css";

// Market price data
const marketData = [
    {
        crop: "Wheat",
        market: "Patiala Mandi",
        price: 2450,
        unit: "per quintal",
        change: "+2.5%"
    },
    {
        crop: "Rice",
        market: "Amritsar Mandi",
        price: 3200,
        unit: "per quintal",
        change: "+1.8%"
    },
    {
        crop: "Maize",
        market: "Ludhiana Mandi",
        price: 2100,
        unit: "per quintal",
        change: "-1.2%"
    },
    {
        crop: "Cotton",
        market: "Bathinda Mandi",
        price: 6800,
        unit: "per quintal",
        change: "+3.1%"
    },
    {
        crop: "Mustard",
        market: "Patiala Mandi",
        price: 5400,
        unit: "per quintal",
        change: "+1.5%"
    },
    {
        crop: "Potato",
        market: "Ludhiana Mandi",
        price: 1800,
        unit: "per quintal",
        change: "-0.8%"
    }
];

// Individual market price card
function MarketPriceCard({ crop, market, price, unit, change }) {
    return (
        <div className="market-price-card">

            <h2>{crop}</h2>

            <p className="market-name">
                {market}
            </p>

            <p className="crop-price">
                ₹{price}
            </p>

            <p className="price-unit">
                {unit}
            </p>

            <p
                className={
                    change.startsWith("+")
                        ? "price-change positive"
                        : "price-change negative"
                }
            >
                {change}
            </p>

        </div>
    );
}

// Main Market Price component
function MarketPrice() {

    const [search, setSearch] = useState("");

    // Filter crops according to search
    const filteredData = marketData.filter((item) =>
        item.crop.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="market-page">

            <h1>Market Prices</h1>

            <p className="market-intro">
                Check the latest crop prices from different mandis.
            </p>

            {/* Search box */}
            <div className="market-search">

                <input
                    type="text"
                    placeholder="Search crop..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {/* Market price cards */}
            <div className="market-price-list">

                {filteredData.length > 0 ? (

                    filteredData.map((item) => (

                        <MarketPriceCard
                            key={item.crop}
                            crop={item.crop}
                            market={item.market}
                            price={item.price}
                            unit={item.unit}
                            change={item.change}
                        />

                    ))

                ) : (

                    <p className="no-results">
                        No crop found.
                    </p>

                )}

            </div>

        </div>
    );
}

export default MarketPrice;