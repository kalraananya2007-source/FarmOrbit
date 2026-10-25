import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedState: "",
    selectedDistrict: "",
    weatherData: null,
    loading: false,
    error: null
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,

    reducers: {
        setSelectedState: (state, action) => {
            state.selectedState = action.payload;
        },

        setSelectedDistrict: (state, action) => {
            state.selectedDistrict = action.payload;
            state.weatherData = null;
            state.error = null;
        },

        setWeatherData: (state, action) => {
            state.weatherData = action.payload;
            state.loading = false;
            state.error = null;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
            if (action.payload) {
                state.error = null;
            }
        },

        setWeatherError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.weatherData = null;
        }
    }
});

export const {
    setSelectedState,
    setSelectedDistrict,
    setWeatherData,
    setLoading,
    setWeatherError
} = weatherSlice.actions;

export default weatherSlice.reducer;
