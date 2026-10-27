
const API_KEY = import.meta.env.VITE_MANDI_API_KEY;

const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
const API_BASE_URL = "/mandi-api/resource";
const normalize = (value) =>
  String(value ?? "").trim().toLowerCase();

async function requestMandiData({
  state,
  district,
  market,
  commodity,
  offset = 0,
  limit = 100,
} = {}) {
  if (!API_KEY) {
    throw new Error("API key missing hai. Root .env file check karo.");
  }

  const url = new URL(
  `${API_BASE_URL}/${RESOURCE_ID}`,
  window.location.origin
);

  url.searchParams.set("api-key", API_KEY);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", String(Math.min(limit, 100)));
  url.searchParams.set("offset", String(offset));

  // Use the API's field names for server-side filtering.
  if (state) {
    url.searchParams.set("filters[state.keyword]", state);
  }

  if (district) {
    url.searchParams.set("filters[district]", district);
  }

  if (market) {
    url.searchParams.set("filters[market]", market);
  }

  if (commodity) {
    url.searchParams.set("filters[commodity]", commodity);
  }

  let response;


try {
  console.log("Mandi API URL:", url);

  response = await fetch(url);

  console.log("API Status:", response.status);
  const responseText = await response.clone().text();
console.log("API Error Details:", responseText);
  console.log("API Response OK:", response.ok);

} catch (error) {
  console.error("Actual Mandi API Error:", error);
  console.error("API URL:", url);

  throw new Error(
    `API connection failed: ${error.message}`
  );
}


  if (response.status === 401 || response.status === 403) {
    throw new Error("API key invalid hai ya access denied hai.");
  }

  if (response.status === 429) {
    throw new Error(
      "API request limit exceed ho gayi. Thodi der baad try karo."
    );
  }

  if (!response.ok) {
  const errorText = await response.text();
  console.error("Mandi API server error:", errorText);
  throw new Error(`API Error: ${response.status}`);
}

  const data = await response.json();

  if (!Array.isArray(data.records)) {
    console.error("Unexpected Mandi API response:", data);
    throw new Error("API response mein records nahi mile.");
  }

  console.log("Mandi API total:", data.total);
  console.log("Mandi API records received:", data.records.length);

  return {
    records: data.records,
    total: Number(data.total) || 0,
  };
}

export async function searchMandiData({
  state,
  district,
  market,
  commodity,
  offset = 0,
  limit = 100,
} = {}) {
  // If a location was entered, first try it as a district.
  if (district) {
    const districtResult = await requestMandiData({
      state,
      district,
      commodity,
      offset,
      limit,
    });

    if (districtResult.total > 0) {
      return districtResult;
    }

    // If district did not match, try the entered name as a market.
    const marketResult = await requestMandiData({
      state,
      market: district,
      commodity,
      offset,
      limit,
    });

    return marketResult;
  }

  return requestMandiData({
    state,
    commodity,
    offset,
    limit,
  });
}

export async function fetchMandiData() {
  const result = await requestMandiData({
    offset: 0,
    limit: 100,
  });

  return result.records;
}

export async function getSampleMandiRecords() {
  const result = await requestMandiData({
    limit: 100,
    offset: 0,
  });

  console.table(
    result.records.map((item) => ({
      state: item.state,
      district: item.district,
      market: item.market,
      crop: item.commodity,
      date: item.arrival_date,
    }))
  );

  return result.records;
}
