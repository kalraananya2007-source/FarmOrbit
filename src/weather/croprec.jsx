import React from "react";
import "./croprec.css";
import { useLanguage } from "../Languagecontext";

import wheatImage from "../assets/wheat.png";
import cottonImage from "../assets/cotton.png";
import maizeImage from "../assets/maize.png";
import mustardImage from "../assets/mustard.png";
import onionImage from "../assets/onion.png";
import potatoImage from "../assets/potato.png";
import riceImage from "../assets/rice.png";
import tomatoImage from "../assets/tomato.png";

// Data stays in English (keys map to translations) — used as lookup identifiers
const cropData = [
    {
        nameKey: "wheat",
        image: wheatImage,
        seasonKey: "rabi",
        soilKey: "loamySoil",
        waterKey: "waterModerate",
        durationKey: "duration120_150",
        tipKey: "wheatTip"
    },
    {
        nameKey: "rice",
        image: riceImage,
        seasonKey: "kharif",
        soilKey: "clayeySoil",
        waterKey: "waterHigh",
        durationKey: "duration120_150",
        tipKey: "riceTip"
    },
    {
        nameKey: "maize",
        image: maizeImage,
        seasonKey: "kharif",
        soilKey: "wellDrainedSoil",
        waterKey: "waterModerate",
        durationKey: "duration90_120",
        tipKey: "maizeTip"
    },
    {
        nameKey: "cotton",
        image: cottonImage,
        seasonKey: "kharif",
        soilKey: "blackSoil",
        waterKey: "waterModerate",
        durationKey: "duration160_180",
        tipKey: "cottonTip"
    },
    {
        nameKey: "mustard",
        image: mustardImage,
        seasonKey: "rabi",
        soilKey: "loamySoil",
        waterKey: "waterLow",
        durationKey: "duration110_140",
        tipKey: "mustardTip"
    },
    {
        nameKey: "onion",
        image: onionImage,
        seasonKey: "rabiKharif",
        soilKey: "loamySoil",
        waterKey: "waterModerate",
        durationKey: "duration100_150",
        tipKey: "onionTip"
    },
    {
        nameKey: "potato",
        image: potatoImage,
        seasonKey: "rabi",
        soilKey: "sandyLoam",
        waterKey: "waterModerate",
        durationKey: "duration90_120",
        tipKey: "potatoTip"
    },
    {
        nameKey: "tomato",
        image: tomatoImage,
        seasonKey: "kharifRabi",
        soilKey: "loamySoil",
        waterKey: "waterModerate",
        durationKey: "duration90_120",
        tipKey: "tomatoTip"
    }
];

function CropCard({ nameKey, image, seasonKey, soilKey, waterKey, durationKey, tipKey }) {
    const { t } = useLanguage();

    return (
        <div className="crop-card">
            <img src={image} alt={t(nameKey)} className="crop-image" />

            <h2>{t(nameKey)}</h2>

            <p>
                <strong>{t("seasonLabel")}:</strong> {t(seasonKey)}
            </p>

            <p>
                <strong>{t("soilLabel")}:</strong> {t(soilKey)}
            </p>

            <p>
                <strong>{t("waterRequirementLabel")}:</strong> {t(waterKey)}
            </p>

            <p>
                <strong>{t("growingDurationLabel")}:</strong> {t(durationKey)}
            </p>

            <div className="crop-tip">
                <strong>{t("farmingTipLabel")}</strong>
                <p>{t(tipKey)}</p>
            </div>
        </div>
    );
}

function CropRec() {
    const { t } = useLanguage();

    return (
        <div className="crop-page">
            <h1>{t("cropInformation")}</h1>

            <p className="crop-intro">
                {t("cropIntro")}
            </p>

            <div className="crop-list">
                {cropData.map((crop) => (
                    <CropCard
                        key={crop.nameKey}
                        nameKey={crop.nameKey}
                        image={crop.image}
                        seasonKey={crop.seasonKey}
                        soilKey={crop.soilKey}
                        waterKey={crop.waterKey}
                        durationKey={crop.durationKey}
                        tipKey={crop.tipKey}
                    />
                ))}
            </div>
        </div>
    );
}

export default CropRec;