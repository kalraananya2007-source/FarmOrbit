import React, { useState } from "react";
import "./marketprice.css";

import wheatImage from "../assets/wheat.png";
import riceImage from "../assets/rice.png";
import maizeImage from "../assets/maize.png";
import cottonImage from "../assets/cotton.png";
import mustardImage from "../assets/mustard.png";
import potatoImage from "../assets/potato.png";
import tomatoImage from "../assets/tomato.png";
import onionImage from "../assets/onion.png";

const cropImages = {
    Wheat: wheatImage,
    Rice: riceImage,
    Maize: maizeImage,
    Cotton: cottonImage,
    Mustard: mustardImage,
    Potato: potatoImage,
    Tomato: tomatoImage,
    Onion: onionImage
};

const marketData = [
    { crop: "Wheat", market: "Amritsar Mandi", price: 2480 },
    { crop: "Wheat", market: "Ludhiana Mandi", price: 2500 },
    { crop: "Wheat", market: "Patiala Mandi", price: 2450 },

    { crop: "Rice", market: "Amritsar Mandi", price: 3200 },
    { crop: "Rice", market: "Ludhiana Mandi", price: 3250 },
    { crop: "Rice", market: "Karnal Mandi", price: 3300 },

    { crop: "Maize", market: "Ludhiana Mandi", price: 2100 },
    { crop: "Maize", market: "Patiala Mandi", price: 2050 },
    { crop: "Maize", market: "Hisar Mandi", price: 2150 },

    { crop: "Cotton", market: "Bathinda Mandi", price: 6800 },
    { crop: "Cotton", market: "Sirsa Mandi", price: 6900 },
    { crop: "Cotton", market: "Hisar Mandi", price: 6750 },

    { crop: "Mustard", market: "Patiala Mandi", price: 5400 },
    { crop: "Mustard", market: "Hisar Mandi", price: 5500 },
    { crop: "Mustard", market: "Kaithal Mandi", price: 5450 },

    { crop: "Potato", market: "Ludhiana Mandi", price: 1800 },
    { crop: "Potato", market: "Jalandhar Mandi", price: 1900 },
    { crop: "Potato", market: "Karnal Mandi", price: 1850 },

    { crop: "Tomato", market: "Amritsar Mandi", price: 2200 },
    { crop: "Tomato", market: "Ludhiana Mandi", price: 2300 },
    { crop: "Tomato", market: "Panipat Mandi", price: 2250 },

    { crop: "Onion", market: "Patiala Mandi", price: 2800 },
    { crop: "Onion", market: "Amritsar Mandi", price: 2700 },
    { crop: "Onion", market: "Hisar Mandi", price: 2900 },

];

const mandiList = [
    "Amritsar Mandi",
    "Ludhiana Mandi",
    "Patiala Mandi",
    "Jalandhar Mandi",
    "Khanna Mandi",
    "Bathinda Mandi",
    "Moga Mandi",
    "Fazilka Mandi",
    "Hisar Mandi",
    "Sirsa Mandi",
    "Karnal Mandi",
    "Panipat Mandi",
    "Sonipat Mandi",
    "Rohtak Mandi",
    "Ambala Mandi",
    "Kaithal Mandi"
];

function MarketPrice() {

    const [selectedCrop, setSelectedCrop] = useState("");
    const [selectedMarket, setSelectedMarket] = useState("");

    const crops = [...new Set(marketData.map(item => item.crop))];

    const selectedData = marketData.find(
        item =>
            item.crop === selectedCrop &&
            item.market === selectedMarket
    );

    return (
        <div className="market-page">

            <div className="market-hero">

                <div className="market-icon">
                    🌾
                </div>

                <h1>Market Prices</h1>

                <p>
                    Check the latest crop prices from major
                    mandis of Punjab and Haryana.
                </p>

            </div>


            <div className="market-box">

                <div className="select-group">

                    <label>🌱 Select Crop</label>

                    <select
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                    >
                        <option value="">
                            Choose a crop
                        </option>

                        {crops.map((crop) => (
                            <option key={crop} value={crop}>
                                {crop}
                            </option>
                        ))}
                    </select>

                </div>


                <div className="select-group">

                    <label>📍 Select Mandi</label>

                    <select
                        value={selectedMarket}
                        onChange={(e) => setSelectedMarket(e.target.value)}
                    >
                        <option value="">
                            Choose a mandi
                        </option>

                        {mandiList.map((mandi) => (
                            <option key={mandi} value={mandi}>
                                {mandi}
                            </option>
                        ))}
                    </select>

                </div>

            </div>


            <div className="price-section">

                {selectedCrop && selectedMarket ? (

                    selectedData ? (

                        <div className="price-card">

                        <img
                            src={cropImages[selectedCrop]}
                            alt={selectedCrop}
                            className="price-image"
                        />

                    <div className="price-content">

                    <p className="price-heading">
                    Current Market Price
                    </p>

                    <h2>
                        ₹{selectedData.price}
                    </h2>

                    <p className="price-unit">
                        per quintal
                    </p>

                    <div className="price-info">
                        <span>🌾 {selectedCrop}</span>
                        <span>📍 {selectedMarket}</span>
                    </div>

                </div>

            </div>

                    ) : (

                        <div className="not-found">

                            <div>📊</div>

                            <h3>
                                Price not available
                            </h3>

                            <p>
                                We don't have price data for
                                this crop and mandi combination yet.
                            </p>

                        </div>

                    )

                ) : (

                    <div className="empty-card">

                        <div className="empty-icon">
                            📈
                        </div>

                        <h3>
                            Find Crop Prices
                        </h3>

                        <p>
                            Select a crop and mandi above
                            to check the market price.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default MarketPrice;