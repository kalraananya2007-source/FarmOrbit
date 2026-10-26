
const API_KEY = import.meta.env.VITE_MANDI_API_KEY;
const RESOURCE_ID = "35985678-0d79-46b4-9ed6-6f13308a1d24";
const BASE_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}`;

async function requestMandiData({
  state,
  district,
  commodity,
  offset = 0,
  limit = 100,
} = {}) {
  if (!API_KEY) {
    throw new Error("API key missing hai. Root .env file check karo.");
  }

  const url = new URL(BASE_URL);
  url.searchParams.set("api-key", API_KEY);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));

  if (state) url.searchParams.set("filters[State]", state);
  if (district) url.searchParams.set("filters[District]", district);
  if (commodity) url.searchParams.set("filters[Commodity]", commodity);

  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error("Internet ya API connection check karo.");
  }

  if (response.status === 401 || response.status === 403) {
    throw new Error("API key invalid hai. .env file check karo.");
  }

  if (response.status === 429) {
    throw new Error("API request limit exceed ho gayi. Thodi der baad try karo.");
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.records)) {
    throw new Error("API response mein records nahi mile.");
  }

  return {
    records: data.records,
    total: Number(data.total) || 0,
  };
}

export async function searchMandiData({
  state,
  district,
  commodity,
  offset = 0,
  limit = 100,
} = {}) {
  // First try the exact filters.
  const exact = await requestMandiData({
    state,
    district,
    commodity,
    offset,
    limit,
  });

  if (exact.records.length > 0 || exact.total > 0) {
    return exact;
  }

  // If district + crop returns nothing, retry with state + crop.
  // The caller can then match the district/mandi locally.
  if (district && commodity) {
    const stateCrop = await requestMandiData({
      state,
      commodity,
      offset,
      limit,
    });

    if (stateCrop.records.length > 0 || stateCrop.total > 0) {
      return stateCrop;
    }
  }

  // Final fallback: try crop without location filters.
  if (district || state) {
    return requestMandiData({
      commodity,
      offset,
      limit,
    });
  }

  return exact;
}

export async function fetchMandiData() {
  const limit = 1000;
  const maxRecords = 10000;
  const allRecords = [];

  for (let offset = 0; offset < maxRecords; offset += limit) {
    const result = await requestMandiData({
      offset,
      limit,
    });

    allRecords.push(...result.records);

    if (result.records.length < limit) break;
  }

  return allRecords;
}
