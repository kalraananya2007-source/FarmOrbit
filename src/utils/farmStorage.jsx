
// Temporary farmer ID for testing.
// Later, we can connect this with the real logged-in farmer.
const TEMP_FARMER_ID = "demo-farmer-1";

// localStorage key where all farms will be stored.
const FARMS_KEY = "farms";

// Get the current farmer's ID.
export function getCurrentFarmerId() {
  return TEMP_FARMER_ID;
}

// Read all farms safely from localStorage.
function getAllFarms() {
  try {
    return JSON.parse(localStorage.getItem(FARMS_KEY) || "[]");
  } catch {
    return [];
  }
}

// Get only the current farmer's farms.
export function getFarms() {
  const farmerId = getCurrentFarmerId();

  return getAllFarms().filter(
    (farm) => farm.farmerId === farmerId
  );
}

// Save a new farm.
export function saveFarm(farmData) {
  const allFarms = getAllFarms();

  // Create a unique ID for this farm.
  const farmId =
    globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const newFarm = {
    id: farmId,
    farmerId: getCurrentFarmerId(),
    name: farmData.name,
    location: farmData.location,
    region: farmData.region || "",
    state: farmData.state || "",
    district: farmData.district || "",
    area: Number(farmData.area),
    areaUnit: farmData.areaUnit,
    cropType: farmData.cropType,
    latitude: null,
    longitude: null,
  };

  // Add the new farm without deleting existing records.
  localStorage.setItem(
    FARMS_KEY,
    JSON.stringify([...allFarms, newFarm])
  );

  return newFarm;
}
