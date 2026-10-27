import { useState } from "react";
import "./croprec.css";

const crops = [
  {
    name: "Wheat",
    emoji: "🌾",
    season: "Rabi",
    soil: ["Loamy", "Clayey"],
    water: "Medium",
    temperature: "15-25",
    land: ["Less than 1 acre", "1-5 acres", "More than 5 acres"],
    goal: "Food grains",
    duration: "Medium",
    days: "120-150 days",
    description: "A major food crop commonly grown during the Rabi season."
  },
  {
    name: "Rice",
    emoji: "🌾",
    season: "Kharif",
    soil: ["Clayey", "Loamy"],
    water: "High",
    temperature: "Above 25",
    land: ["1-5 acres", "More than 5 acres"],
    goal: "Food grains",
    duration: "Medium",
    days: "120-150 days",
    description: "A major food crop that generally requires plenty of water."
  },
  {
    name: "Maize",
    emoji: "🌽",
    season: "Kharif",
    soil: ["Loamy", "Sandy"],
    water: "Medium",
    temperature: "15-25",
    land: ["Less than 1 acre", "1-5 acres", "More than 5 acres"],
    goal: "Food grains",
    duration: "Medium",
    days: "90-120 days",
    description: "A versatile crop used for food, animal feed and industry."
  },
  {
    name: "Mustard",
    emoji: "🌼",
    season: "Rabi",
    soil: ["Loamy", "Sandy"],
    water: "Low",
    temperature: "15-25",
    land: ["Less than 1 acre", "1-5 acres", "More than 5 acres"],
    goal: "Oilseeds",
    duration: "Short",
    days: "100-140 days",
    description: "An important oilseed crop grown during the cooler season."
  },
  {
    name: "Cotton",
    emoji: "☁️",
    season: "Kharif",
    soil: ["Black", "Loamy"],
    water: "Medium",
    temperature: "Above 25",
    land: ["1-5 acres", "More than 5 acres"],
    goal: "Cash crops",
    duration: "Long",
    days: "150-180 days",
    description: "A major cash crop used by the textile industry."
  },
  {
    name: "Potato",
    emoji: "🥔",
    season: "Rabi",
    soil: ["Loamy", "Sandy"],
    water: "Medium",
    temperature: "15-25",
    land: ["Less than 1 acre", "1-5 acres", "More than 5 acres"],
    goal: "Vegetables",
    duration: "Short",
    days: "80-120 days",
    description: "A popular vegetable crop that grows well in cool conditions."
  }
];

const initialForm = {
  season: "",
  soil: "",
  water: "",
  temperature: "",
  land: "",
  goal: "",
  duration: ""
};

function CropRecommendation() {
  const [form, setForm] = useState(initialForm);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(form).some((value) => value === "")) {
      setError("Please answer all 7 questions.");
      setResults(null);
      return;
    }

    const matchingCrops = crops.filter(
      (crop) =>
        crop.season === form.season &&
        crop.soil.includes(form.soil) &&
        crop.water === form.water &&
        crop.temperature === form.temperature &&
        crop.land.includes(form.land) &&
        crop.goal === form.goal &&
        crop.duration === form.duration
    );

    setResults(matchingCrops);
    setError("");
  }

  function resetForm() {
    setForm(initialForm);
    setResults(null);
    setError("");
  }

  return (
    <div className="crop-page">
      <header className="crop-header">
        <span className="crop-badge">🌱 FARMORBIT AGRICULTURE</span>
        <h1>Crop Recommendation</h1>
        <p>
          Find suitable crops based on your farming conditions.
        </p>
      </header>

      <section className="crop-form-section">
        <h2>🌿 Tell Us About Your Farm</h2>
        <p>Answer these questions to find matching crops.</p>

        <form onSubmit={handleSubmit}>
          <div className="crop-form-grid">
            <div className="crop-field">
              <label>1. Farming Season</label>
              <select name="season" value={form.season} onChange={handleChange}>
                <option value="">Select season</option>
                <option value="Kharif">Kharif</option>
                <option value="Rabi">Rabi</option>
              </select>
            </div>

            <div className="crop-field">
              <label>2. Soil Type</label>
              <select name="soil" value={form.soil} onChange={handleChange}>
                <option value="">Select soil</option>
                <option value="Loamy">Loamy</option>
                <option value="Clayey">Clayey</option>
                <option value="Sandy">Sandy</option>
                <option value="Black">Black</option>
              </select>
            </div>

            <div className="crop-field">
              <label>3. Water Availability</label>
              <select name="water" value={form.water} onChange={handleChange}>
                <option value="">Select availability</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="crop-field">
              <label>4. Temperature</label>
              <select
                name="temperature"
                value={form.temperature}
                onChange={handleChange}
              >
                <option value="">Select temperature</option>
                <option value="Below 15">Below 15°C</option>
                <option value="15-25">15–25°C</option>
                <option value="Above 25">Above 25°C</option>
              </select>
            </div>

            <div className="crop-field">
              <label>5. Land Size</label>
              <select name="land" value={form.land} onChange={handleChange}>
                <option value="">Select land size</option>
                <option value="Less than 1 acre">Less than 1 acre</option>
                <option value="1-5 acres">1–5 acres</option>
                <option value="More than 5 acres">More than 5 acres</option>
              </select>
            </div>

            <div className="crop-field">
              <label>6. Farming Goal</label>
              <select name="goal" value={form.goal} onChange={handleChange}>
                <option value="">Select goal</option>
                <option value="Food grains">Food grains</option>
                <option value="Oilseeds">Oilseeds</option>
                <option value="Cash crops">Cash crops</option>
                <option value="Vegetables">Vegetables</option>
              </select>
            </div>

            <div className="crop-field">
              <label>7. Crop Duration</label>
              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
              >
                <option value="">Select duration</option>
                <option value="Short">Short</option>
                <option value="Medium">Medium</option>
                <option value="Long">Long</option>
              </select>
            </div>
          </div>

          {error && <p className="crop-error">{error}</p>}

          <div className="crop-buttons">
            <button type="submit" className="crop-submit">
              🌱 Find Suitable Crops
            </button>

            <button
              type="button"
              className="crop-reset"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      {results !== null && (
        <section className="crop-results">
          <h2>🌾 Recommended Crops</h2>

          {results.length > 0 ? (
            <div className="crop-card-grid">
              {results.map((crop) => (
                <article className="crop-card" key={crop.name}>
                  <span className="crop-emoji">{crop.emoji}</span>
                  <h3>{crop.name}</h3>
                  <p>{crop.description}</p>
                  <div className="crop-details">
                    <span>📅 {crop.days}</span>
                    <span>🌱 {crop.season} Season</span>
                    <span>💧 {crop.water} Water</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>
              No exact matches found. Try changing one or more answers.
            </p>
          )}

          <p className="crop-note">
            Recommendations are based on sample data. Verify local soil,
            climate and agricultural guidance before planting.
          </p>
        </section>
      )}

      <section className="all-crops-section">
        <h2>🌿 Explore Major Crops</h2>

        <div className="crop-card-grid">
          {crops.map((crop) => (
            <article className="crop-card" key={crop.name}>
              <span className="crop-emoji">{crop.emoji}</span>
              <h3>{crop.name}</h3>
              <p>{crop.description}</p>
              <div className="crop-details">
                <span>📅 {crop.days}</span>
                <span>🌱 {crop.season} Season</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CropRecommendation;
