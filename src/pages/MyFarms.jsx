import { useMemo, useState } from "react";
import { getFarms, saveFarm } from "../utils/farmStorage";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MyFarms.css";

const REGION_STATES = {
  "North India": ["Chandigarh", "Delhi", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Ladakh", "Punjab", "Rajasthan", "Uttar Pradesh", "Uttarakhand"],
  "South India": ["Andhra Pradesh", "Karnataka", "Kerala", "Tamil Nadu", "Telangana", "Puducherry", "Lakshadweep", "Andaman and Nicobar Islands"],
  "East India": ["Bihar", "Jharkhand", "Odisha", "West Bengal", "Sikkim"],
  "West India": ["Goa", "Gujarat", "Maharashtra", "Dadra and Nagar Haveli and Daman and Diu"],
  "Central India": ["Chhattisgarh", "Madhya Pradesh"],
  "North East India": ["Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Tripura"]
};

const REGIONS = Object.keys(REGION_STATES);

function normalise(value) {
  return String(value || "").trim().toLocaleLowerCase();
}

// Fixed, approximate district/city centres. These are deterministic demo pins,
// not verified farm GPS coordinates. Unknown districts fall back to their state centre.
const LOCATION_COORDS = {
  // Punjab
  patiala: [30.3398, 76.3869], ludhiana: [30.9010, 75.8573], amritsar: [31.6340, 74.8723],
  rajpura: [30.4840, 76.5930], jalandhar: [31.3260, 75.5762], bathinda: [30.2100, 74.9455],
  mohali: [30.7046, 76.7179], hoshiarpur: [31.5143, 75.9115], gurdaspur: [32.0419, 75.4031],
  // Haryana
  karnal: [29.6857, 76.9905], hisar: [29.1492, 75.7217], kurukshetra: [29.9695, 76.8783],
  panipat: [29.3909, 76.9635], rohtak: [28.8955, 76.6066], ambala: [30.3782, 76.7767],
  gurugram: [28.4595, 77.0266], faridabad: [28.4089, 77.3178], sonipat: [28.9931, 77.0151],
  // Rajasthan
  jaipur: [26.9124, 75.7873], jodhpur: [26.2389, 73.0243], kota: [25.2138, 75.8648],
  udaipur: [24.5854, 73.7125], ajmer: [26.4499, 74.6399], bikaner: [28.0229, 73.3119],
  // Uttar Pradesh
  meerut: [28.9845, 77.7064], lucknow: [26.8467, 80.9462], agra: [27.1767, 78.0081],
  kanpur: [26.4499, 80.3319], varanasi: [25.3176, 82.9739], noida: [28.5355, 77.3910],
  // Maharashtra and Gujarat
  kolhapur: [16.7050, 74.2433], mumbai: [19.0760, 72.8777], pune: [18.5204, 73.8567],
  nashik: [19.9975, 73.7898], nagpur: [21.1458, 79.0882], rajkot: [22.3039, 70.8022],
  ahmedabad: [23.0225, 72.5714], surat: [21.1702, 72.8311], vadodara: [22.3072, 73.1812],
  // East India
  hooghly: [22.8960, 88.2461], kolkata: [22.5726, 88.3639], howrah: [22.5958, 88.2636],
  cuttack: [20.4625, 85.8828], bhubaneswar: [20.2961, 85.8245], rourkela: [22.2604, 84.8536],
  patna: [25.5941, 85.1376], ranchi: [23.3441, 85.3096],
  // South India
  chikkamagaluru: [13.3161, 75.7720], bengaluru: [12.9716, 77.5946], mysuru: [12.2958, 76.6394],
  erode: [11.3410, 77.7172], chennai: [13.0827, 80.2707], coimbatore: [11.0168, 76.9558],
  madurai: [9.9252, 78.1198], hyderabad: [17.3850, 78.4867], vijayawada: [16.5062, 80.6480],
  kochi: [9.9312, 76.2673], thiruvananthapuram: [8.5241, 76.9366],
  // Central India
  indore: [22.7196, 75.8577], bhopal: [23.2599, 77.4126], gwalior: [26.2183, 78.1828],
  raipur: [21.2514, 81.6296], jabalpur: [23.1815, 79.9864],
  // State fallback centres
  punjab: [31.1471, 75.3412], haryana: [29.0588, 76.0856], rajasthan: [27.0238, 74.2179],
  maharashtra: [19.7515, 75.7139], gujarat: [22.2587, 71.1924], "west bengal": [22.9868, 87.8550],
  odisha: [20.9517, 85.0985], karnataka: [15.3173, 75.7139], "tamil nadu": [11.1271, 78.6569],
  "madhya pradesh": [22.9734, 78.6569], "uttar pradesh": [26.8467, 80.9462],
  "andhra pradesh": [15.9129, 79.7400], telangana: [18.1124, 79.0193], kerala: [10.8505, 76.2711],
  bihar: [25.0961, 85.3131], jharkhand: [23.6102, 85.2799], assam: [26.2006, 92.9376],
  goa: [15.2993, 74.1240], "himachal pradesh": [31.1048, 77.1734],
  uttarakhand: [30.0668, 79.0193], delhi: [28.6139, 77.2090],
  chhattisgarh: [21.2787, 81.8661], "jammu and kashmir": [33.7782, 76.5762]
};

// Approximate rural/agricultural-belt demo pins, deliberately outside the main city centres.
// These are stable sample points for map/UI testing, NOT verified individual farm locations.
const FIELD_BELT_COORDS = {
  // Haryana
  karnal: [29.7358, 76.9632], hisar: [29.1850, 75.6900], kurukshetra: [30.0150, 76.8250],
  panipat: [29.4200, 76.9250], rohtak: [28.9250, 76.5650], ambala: [30.4050, 76.7350],
  // Punjab
  patiala: [30.3650, 76.3450], ludhiana: [30.9450, 75.8150], amritsar: [31.6800, 74.8200],
  rajpura: [30.5100, 76.5650], jalandhar: [31.3650, 75.5350], bathinda: [30.2450, 74.9000],
  // Rajasthan / Uttar Pradesh
  jaipur: [27.0200, 75.7200], jodhpur: [26.2850, 72.9650], meerut: [29.0350, 77.6550],
  // Maharashtra / Gujarat
  kolhapur: [16.7550, 74.2050], rajkot: [22.3550, 70.7550], nashik: [20.0450, 73.7450],
  // East / South / Central India
  hooghly: [22.9400, 88.2850], cuttack: [20.5100, 85.8350], chikkamagaluru: [13.3650, 75.7350],
  erode: [11.3900, 77.6750], indore: [22.7850, 75.8050]
};

function getFarmPosition(farm) {
  const lat = farm.latitude;
  const lng = farm.longitude;
  if (lat != null && lng != null && Number.isFinite(Number(lat)) && Number.isFinite(Number(lng))) {
    return [Number(lat), Number(lng)];
  }

  const districtKey = normalise(farm.district || farm.areaName || farm.location).split(",")[0];
  const stateKey = normalise(farm.state);
  // Use a known district/city pin where possible; otherwise a fixed state-centre pin.
  return FIELD_BELT_COORDS[districtKey] || LOCATION_COORDS[districtKey] || LOCATION_COORDS[stateKey] || [22.9734, 78.6569];
}

function MyFarms() {
  const [farms, setFarms] = useState(() => getFarms());
  const [showForm, setShowForm] = useState(false);
  const [farmName, setFarmName] = useState("");
  const [region, setRegion] = useState("");
  const [stateName, setStateName] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("acre");
  const [cropType, setCropType] = useState("");

  const [filterRegion, setFilterRegion] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("");
  const [selectedFarmId, setSelectedFarmId] = useState("");

  const formStates = region ? REGION_STATES[region] || [] : [];
  const filterStates = filterRegion ? REGION_STATES[filterRegion] || [] : [];

  const availableDistricts = useMemo(() => {
    return [...new Set(farms
      .filter((farm) => (!filterRegion || farm.region === filterRegion))
      .filter((farm) => (!filterState || normalise(farm.state) === normalise(filterState)))
      .map((farm) => farm.district || farm.areaName)
      .filter(Boolean))]
      .sort((a, b) => a.localeCompare(b));
  }, [farms, filterRegion, filterState]);

  const visibleFarms = useMemo(() => farms.filter((farm) => {
    const matchesRegion = !filterRegion || farm.region === filterRegion;
    const matchesState = !filterState || normalise(farm.state) === normalise(filterState);
    const farmDistrict = farm.district || farm.areaName || "";
    const matchesDistrict = !filterDistrict || normalise(farmDistrict) === normalise(filterDistrict);
    // Legacy farms remain visible when no filters are applied; once a location filter is used,
    // only farms with matching structured location fields are shown.
    const hasLegacyLocationOnly = !farm.region && !farm.state && !farm.district;
    const locationMatches = (!filterRegion && !filterState && !filterDistrict)
      || (!hasLegacyLocationOnly && matchesRegion && matchesState && matchesDistrict);
    return locationMatches;
  }), [farms, filterRegion, filterState, filterDistrict]);

  function resetForm() {
    setFarmName("");
    setRegion("");
    setStateName("");
    setDistrict("");
    setArea("");
    setAreaUnit("acre");
    setCropType("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveFarm({
      name: farmName.trim(),
      location: [district.trim(), stateName, region].filter(Boolean).join(", "),
      region,
      state: stateName,
      district: district.trim(),
      area,
      areaUnit,
      cropType: cropType.trim(),
    });
    setFarms(getFarms());
    resetForm();
    setShowForm(false);
  }

  function handleCloseForm() {
    setShowForm(false);
    resetForm();
  }

  function handleRegionFilter(value) {
    setFilterRegion(value);
    setFilterState("");
    setFilterDistrict("");
    setSelectedFarmId("");
  }

  function handleStateFilter(value) {
    setFilterState(value);
    setFilterDistrict("");
    setSelectedFarmId("");
  }

  return (
    <div className="my-farms-page">
      <header className="my-farms-header">
        <div>
          <h1>My Farms</h1>
          <p>View and manage all your farms.</p>
        </div>
        <button type="button" className="my-farms-add-button" onClick={() => setShowForm(true)}>
          <span aria-hidden="true">+</span> Add Farm
        </button>
      </header>

      {showForm && (
        <div className="my-farms-modal-overlay">
          <section className="my-farms-modal" role="dialog" aria-modal="true" aria-labelledby="add-farm-title">
            <div className="my-farms-modal-header">
              <div>
                <h2 id="add-farm-title">Add a New Farm</h2>
                <p>Enter your farm details and location.</p>
              </div>
              <button type="button" className="my-farms-close-button" onClick={handleCloseForm} aria-label="Close form">×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="farmName">Farm Name</label>
              <input id="farmName" type="text" placeholder="e.g. North Field" value={farmName} onChange={(e) => setFarmName(e.target.value)} required />

              <label htmlFor="farmRegion">Region</label>
              <select id="farmRegion" value={region} onChange={(e) => { setRegion(e.target.value); setStateName(""); }} required>
                <option value="">Choose region</option>
                {REGIONS.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>

              <label htmlFor="farmState">State / UT</label>
              <select id="farmState" value={stateName} onChange={(e) => setStateName(e.target.value)} disabled={!region} required>
                <option value="">Choose state</option>
                {formStates.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>

              <label htmlFor="farmDistrict">Area / District / Tehsil / Village</label>
              <input id="farmDistrict" type="text" placeholder="e.g. Patiala, Rajpura" value={district} onChange={(e) => setDistrict(e.target.value)} required />

              <label htmlFor="farmArea">Farm Area</label>
              <div className="my-farms-area-row">
                <input id="farmArea" type="number" min="0.01" step="any" placeholder="Enter area" value={area} onChange={(e) => setArea(e.target.value)} required />
                <select aria-label="Area unit" value={areaUnit} onChange={(e) => setAreaUnit(e.target.value)}>
                  <option value="acre">Acres</option>
                  <option value="hectare">Hectares</option>
                </select>
              </div>

              <label htmlFor="cropType">What do you grow on this farm?</label>
              <input id="cropType" type="text" placeholder="e.g. Wheat, Rice, Cotton" value={cropType} onChange={(e) => setCropType(e.target.value)} required />

              <div className="my-farms-form-actions">
                <button type="button" className="my-farms-cancel-button" onClick={handleCloseForm}>Cancel</button>
                <button type="submit" className="my-farms-submit">Save Farm</button>
              </div>
            </form>
          </section>
        </div>
      )}

      <section className="farm-atlas-selector" aria-labelledby="farm-atlas-title">
        <div className="farm-atlas-selector-heading">
          <h2 id="farm-atlas-title">My Farm Atlas</h2>
          <p>Choose a region, state and area to view the farms saved there.</p>
        </div>
        <div className="farm-atlas-filters">
          <div className="farm-atlas-field">
            <label htmlFor="filterRegion">1. Select Region</label>
            <select id="filterRegion" value={filterRegion} onChange={(e) => handleRegionFilter(e.target.value)}>
              <option value="">All regions</option>
              {REGIONS.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="farm-atlas-field">
            <label htmlFor="filterState">2. Select State</label>
            <select id="filterState" value={filterState} onChange={(e) => handleStateFilter(e.target.value)} disabled={!filterRegion}>
              <option value="">All states</option>
              {filterStates.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="farm-atlas-field">
            <label htmlFor="filterDistrict">3. Select Area / District</label>
            <select id="filterDistrict" value={filterDistrict} onChange={(e) => { setFilterDistrict(e.target.value); setSelectedFarmId(""); }} disabled={!filterState || availableDistricts.length === 0}>
              <option value="">All areas</option>
              {availableDistricts.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="farm-atlas-field">
            <label htmlFor="filterFarm">4. Select Farm</label>
            <select id="filterFarm" value={selectedFarmId} onChange={(e) => setSelectedFarmId(e.target.value)} disabled={visibleFarms.length === 0}>
              <option value="">All matching farms</option>
              {visibleFarms.map((farm) => <option key={farm.id} value={String(farm.id)}>{farm.name}</option>)}
            </select>
          </div>
        </div>
        {farms.length > 0 && visibleFarms.length === 0 && (
          <p className="farm-atlas-no-results">No farms match this location yet. Add a farm with the selected region, state and area.</p>
        )}
      </section>

      <section className="my-farm-map-section" aria-label="Farm locations map">
        <div className="my-farm-map-heading">
          <div>
            <h2>Farm Locations</h2>
            <p>Demo pins are placed in approximate rural/agricultural areas, not on verified farm plots. Save exact GPS coordinates for each real farm when available.</p>
          </div>
        </div>
        <div className="my-farm-map">
          <MapContainer
            key={`${filterRegion}-${filterState}-${filterDistrict}-${selectedFarmId}-${visibleFarms.length}`}
            center={visibleFarms.length ? getFarmPosition(visibleFarms.find((farm) => String(farm.id) === selectedFarmId) || visibleFarms[0]) : [22.9734, 78.6569]}
            zoom={visibleFarms.length ? 6 : 4}
            scrollWheelZoom
            style={{ height: "360px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {visibleFarms.filter((farm) => !selectedFarmId || String(farm.id) === selectedFarmId).map((farm) => (
              <CircleMarker key={farm.id} center={getFarmPosition(farm)} radius={selectedFarmId && String(farm.id) === selectedFarmId ? 11 : 7}
                pathOptions={{ color: "#256b3b", fillColor: "#61ad58", fillOpacity: 0.9 }}>
                <Popup>
                  <strong>{farm.name || "Unnamed Farm"}</strong><br />
                  {[farm.district || farm.areaName, farm.state, farm.region].filter(Boolean).join(", ") || farm.location || "Location not specified"}<br />
                  {farm.cropType ? `Crop: ${farm.cropType}` : ""}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </section>

      <section className="my-farms-list">
        <div className="my-farms-list-heading">
          <h2>Your Farms ({visibleFarms.length}{visibleFarms.length !== farms.length ? ` of ${farms.length}` : ""})</h2>
          {(filterRegion || filterState || filterDistrict || selectedFarmId) && (
            <button type="button" className="farm-filter-reset" onClick={() => { setFilterRegion(""); setFilterState(""); setFilterDistrict(""); setSelectedFarmId(""); }}>
              Clear filters
            </button>
          )}
        </div>

        {farms.length === 0 ? (
          <div className="my-farms-empty">
            <div className="my-farms-empty-icon">🌱</div>
            <h3>No farms added yet</h3>
            <p>Click the Add Farm button to add your first farm.</p>
          </div>
        ) : visibleFarms.length === 0 ? (
          <div className="my-farms-empty">
            <div className="my-farms-empty-icon">📍</div>
            <h3>No farms found for this selection</h3>
            <p>Try another area or clear the filters.</p>
          </div>
        ) : (
          <div className="my-farms-grid">
            {visibleFarms.filter((farm) => !selectedFarmId || String(farm.id) === selectedFarmId).map((farm) => (
              <article className="my-farms-item" key={farm.id}>
                <div className="my-farms-card-heading">
                  <span className="my-farms-icon" aria-hidden="true">🌱</span>
                  <h3>{farm.name || "Unnamed Farm"}</h3>
                </div>
                <div className="farm-location-breakdown">
                  <p><span>🗺️</span><span><strong>Region:</strong> {farm.region || "Not specified"}</span></p>
                  <p><span>📍</span><span><strong>State:</strong> {farm.state || "Not specified"}</span></p>
                  <p><span>📌</span><span><strong>Area / District:</strong> {farm.district || farm.areaName || farm.location || "Not specified"}</span></p>
                </div>
                <p className="my-farms-area"><span aria-hidden="true">▦</span><span>Area: {farm.area ?? "—"} {farm.areaUnit ? `${farm.areaUnit}${Number(farm.area) === 1 ? "" : "s"}` : ""}</span></p>
                <p className="my-farms-crop"><span aria-hidden="true">🌾</span><span><strong>Grows:</strong> {farm.cropType || "Not specified"}</span></p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MyFarms;
