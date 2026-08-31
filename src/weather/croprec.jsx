import React from "react";
import "./croprec.css";

const cropData = [
    {
        name: "Wheat",
        season: "Rabi",
        soil: "Loamy Soil",
        water: "Moderate",
        duration: "120-150 days"
    },
    {
        name: "Rice",
        season: "Kharif",
        soil: "Clayey Soil",
        water: "High",
        duration: "120-150 days"
    },
    {
        name: "Maize",
        season: "Kharif",
        soil: "Well-drained Soil",
        water: "Moderate",
        duration: "90-120 days"
    },
    {
        name: "Cotton",
        season: "Kharif",
        soil: "Black Soil",
        water: "Moderate",
        duration: "160-180 days"
    }
];

function CropCard({ name, season, soil, water, duration }) {
    return (
        <div className="crop-card">
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
                        season={crop.season}
                        soil={crop.soil}
                        water={crop.water}
                        duration={crop.duration}
                    />
                ))}
            </div>

        </div>
    );
}

export default CropRec;