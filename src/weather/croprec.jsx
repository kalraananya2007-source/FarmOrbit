import React from "react";
import "./croprec.css";

import wheatImage from "../assets/wheat.png";
import cottonImage from "../assets/cotton.png";
import maizeImage from "../assets/maize.png";
import mustardImage from "../assets/mustard.png";
import onionImage from "../assets/onion.png";
import potatoImage from "../assets/potato.png";
import riceImage from "../assets/rice.png";
import tomatoImage from "../assets/tomato.png";

const cropData = [
    {
        name: "Wheat",
        image: wheatImage,
        season: "Rabi",
        soil: "Loamy Soil",
        water: "Moderate",
        duration: "120-150 days",
        tip: "Maintain proper soil moisture and avoid excessive watering."
    },
    {
        name: "Rice",
        image: riceImage,
        season: "Kharif",
        soil: "Clayey Soil",
        water: "High",
        duration: "120-150 days",
        tip: "Keep the field adequately moist, especially during the early growth stage."
    },
    {
        name: "Maize",
        image: maizeImage,
        season: "Kharif",
        soil: "Well-drained Soil",
        water: "Moderate",
        duration: "90-120 days",
        tip: "Ensure good drainage and provide regular watering during dry periods."
    },
    {
        name: "Cotton",
        image: cottonImage,
        season: "Kharif",
        soil: "Black Soil",
        water: "Moderate",
        duration: "160-180 days",
        tip: "Provide adequate sunlight and avoid waterlogging in the field."
    },
    {
        name: "Mustard",
        image: mustardImage,
        season: "Rabi",
        soil: "Loamy Soil",
        water: "Low",
        duration: "110-140 days",
        tip: "Avoid excessive irrigation because mustard grows well with moderate moisture."
    },
    {
        name: "Onion",
        image: onionImage,
        season: "Rabi/Kharif",
        soil: "Loamy Soil",
        water: "Moderate",
        duration: "100-150 days",
        tip: "Maintain regular watering and avoid waterlogging to protect the bulbs."
    },
    {
        name: "Potato",
        image: potatoImage,
        season: "Rabi",
        soil: "Sandy Loam",
        water: "Moderate",
        duration: "90-120 days",
        tip: "Use well-drained soil and keep the soil moisture consistent during growth."
    },
    {
        name: "Tomato",
        image: tomatoImage,
        season: "Kharif/Rabi",
        soil: "Loamy Soil",
        water: "Moderate",
        duration: "90-120 days",
        tip: "Provide good sunlight and support the plants as they grow."
    }
];

function CropCard({ name, image, season, soil, water, duration, tip }) {
    return (
        <div className="crop-card">
            <img
                src={image}
                alt={name}
                className="crop-image"
            />

            <h2>{name}</h2>

            <p>
                <strong>Season:</strong> {season}
            </p>

            <p>
                <strong>Soil:</strong> {soil}
            </p>

            <p>
                <strong>Water Requirement:</strong> {water}
            </p>

            <p>
                <strong>Growing Duration:</strong> {duration}
            </p>

            <div className="crop-tip">
                <strong>💡 Farming Tip</strong>
                <p>{tip}</p>
            </div>

        </div>
    );
}

function CropRec() {
    return (
        <div className="crop-page">

            <h1>Crop Information</h1>

            <p className="crop-intro">
                Explore useful information about different crops
                to help farmers plan their cultivation.
            </p>

            <div className="crop-list">
                {cropData.map((crop) => (
                    <CropCard
                        key={crop.name}
                        name={crop.name}
                        image={crop.image}
                        season={crop.season}
                        soil={crop.soil}
                        water={crop.water}
                        duration={crop.duration}
                        tip={crop.tip}
                    />
                ))}
            </div>

        </div>
    );
}

export default CropRec;