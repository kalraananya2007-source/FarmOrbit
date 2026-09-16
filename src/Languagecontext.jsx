

import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  // ==================== ENGLISH ====================
  en: {
    home: "Home",
    farmer: "Farmer",
    weather: "Weather",
    marketplace: "Marketplace",
    profile: "Profile",
    login: "Login",
    register: "Register",

    welcome: "Welcome to FarmOrbit",

    homeDescription:
      "FarmOrbit is a simple platform that helps farmers manage their farming activities and connect with the right people, all in one place.",

    getStarted: "Get Started",

    whatWeOffer: "What FarmOrbit Offers",

    featuresSubtitle:
      "Some of the main features planned for the FarmOrbit platform.",
fullName: "Full Name",
enterFullName: "Enter your full name",
phoneNumber: "Phone Number",
enterPhoneNumber: "Enter your phone number",
iAmA: "I am a",
farmerRole: "Farmer",
buyerRole: "Buyer",
expertRole: "Agriculture Expert",
createPassword: "Create a password",
confirmPasswordLabel: "Confirm Password",
confirmYourPassword: "Confirm your password",
createAccountBtn: "Create Account",
joinFarmOrbitToday: "Join FarmOrbit today",
alreadyHaveAccount: "Already have an account?",
passwordsDontMatch: "Passwords do not match!",
invalidEmail: "Please enter a valid email address.",
registrationSuccessful: "Registration successful!",
    cropManagement: "Crop Management",

    cropManagementText:
      "Farmers can track their crops, sowing dates and expected harvest time.",

    marketplaceText:
      "Connect directly with buyers and sell produce at fair prices.",

    weatherUpdates: "Weather Updates",

    weatherText:
      "Get simple weather information to plan farming activities better.",
selectState: "Select State",
selectDistrict: "Select District",
selectALocation: "Select a location",
weatherStatus: "Weather Status",
farmingAdvice: "Farming Advice",
humidityLabel: "Humidity",
windLabel: "Wind",
rainChanceLabel: "Rain Chance",
forecast: "Forecast",

sunny: "Sunny",
cloudy: "Cloudy",
partlyCloudy: "Partly Cloudy",

yesterday: "Yesterday",
today: "Today",
tomorrow: "Tomorrow",

extremeWeather: "🔴 Extreme Weather",
moderateConditions: "🟡 Moderate Conditions",
normalWeather: "🟢 Normal Weather",

adviceHighRain: "🌧️ High chance of rain. Avoid unnecessary irrigation.",
adviceHighTemp: "🌱 High temperature. Make sure crops receive adequate water.",
adviceLowRain: "💧 Low chance of rain. Consider providing irrigation to crops.",
adviceModerate: "🌾 Weather conditions are moderate. Continue regular crop care.",
    farmerCommunity: "Farmer Community",

    farmerCommunityText:
      "A space for farmers to ask questions and share their experience.",

    marketPrice: "Market Price",

    cropRecommendation: "Crop Recommendation",

    whyFarmOrbit: "Why FarmOrbit?",

    aboutFarmOrbit:
      "Many farmers face problems like lack of proper crop information, difficulty finding fair-price buyers, and limited access to weather updates. FarmOrbit aims to solve these problems by bringing all these services together on one easy-to-use platform.",

    readyToExplore: "Ready to explore FarmOrbit?",

    joinCommunity:
      "Join us and be a part of a smarter farming community.",

    joinNow: "Join Now",

    selectLanguage: "Select Language",

    // ---- Login page ----
    welcomeBack: "Welcome Back",
    loginSubtitle: "Login to continue to FarmOrbit",
    emailAddress: "Email Address",
    enterEmail: "Enter your email",
    password: "Password",
    enterPassword: "Enter your password",
    showPassword: "Show",
    hidePassword: "Hide",
    rememberMe: "Remember me",
    forgotPassword: "Forgot Password?",
    loginButton: "Login",
    or: "or",
    dontHaveAccount: "Don't have an account?",
    createAccount: "Create Account",
    fillAllFields: "Please fill in all fields",
    loginSuccessful: "Login successful!",
    cropInformation: "Crop Information",
cropIntro: "Explore useful information about different crops to help farmers plan their cultivation.",
seasonLabel: "Season",
soilLabel: "Soil",
waterRequirementLabel: "Water Requirement",
growingDurationLabel: "Growing Duration",
farmingTipLabel: "💡 Farming Tip",

// Crop names
wheat: "Wheat",
rice: "Rice",
maize: "Maize",
cotton: "Cotton",
mustard: "Mustard",
onion: "Onion",
potato: "Potato",
tomato: "Tomato",

// Seasons
rabi: "Rabi",
kharif: "Kharif",
rabiKharif: "Rabi/Kharif",
kharifRabi: "Kharif/Rabi",

// Soil types
loamySoil: "Loamy Soil",
clayeySoil: "Clayey Soil",
wellDrainedSoil: "Well-drained Soil",
blackSoil: "Black Soil",
sandyLoam: "Sandy Loam",

// Water levels
waterLow: "Low",
waterModerate: "Moderate",
waterHigh: "High",

// Duration (numbers same, "days" translated)
duration90_120: "90-120 days",
duration100_150: "100-150 days",
duration110_140: "110-140 days",
duration120_150: "120-150 days",
duration160_180: "160-180 days",

// Tips (per crop)
wheatTip: "Maintain proper soil moisture and avoid excessive watering.",
riceTip: "Keep the field adequately moist, especially during the early growth stage.",
maizeTip: "Ensure good drainage and provide regular watering during dry periods.",
cottonTip: "Provide adequate sunlight and avoid waterlogging in the field.",
mustardTip: "Avoid excessive irrigation because mustard grows well with moderate moisture.",
onionTip: "Maintain regular watering and avoid waterlogging to protect the bulbs.",
potatoTip: "Use well-drained soil and keep the soil moisture consistent during growth.",
tomatoTip: "Provide good sunlight and support the plants as they grow.",
  },

  // ==================== HINDI ====================
  hi: {
    home: "होम",
    farmer: "किसान",
    weather: "मौसम",
    marketplace: "बाज़ार",
    profile: "प्रोफ़ाइल",
    login: "लॉगिन",
    register: "पंजीकरण",
selectState: "राज्य चुनें",
selectDistrict: "जिला चुनें",
selectALocation: "एक स्थान चुनें",
weatherStatus: "मौसम की स्थिति",
farmingAdvice: "खेती सलाह",
humidityLabel: "नमी",
windLabel: "हवा",
rainChanceLabel: "बारिश की संभावना",
forecast: "पूर्वानुमान",

sunny: "धूप",
cloudy: "बादल",
partlyCloudy: "आंशिक बादल",

yesterday: "कल (बीता)",
today: "आज",
tomorrow: "कल (आने वाला)",

extremeWeather: "🔴 अत्यधिक मौसम",
moderateConditions: "🟡 मध्यम स्थिति",
normalWeather: "🟢 सामान्य मौसम",
cropInformation: "फसल जानकारी",
cropIntro: "किसानों को अपनी खेती की योजना बनाने में मदद के लिए विभिन्न फसलों की उपयोगी जानकारी देखें।",
seasonLabel: "मौसम",
soilLabel: "मिट्टी",
waterRequirementLabel: "पानी की आवश्यकता",
growingDurationLabel: "उगने की अवधि",
farmingTipLabel: "💡 खेती सलाह",

wheat: "गेहूं",
rice: "चावल",
maize: "मक्का",
cotton: "कपास",
mustard: "सरसों",
onion: "प्याज़",
potato: "आलू",
tomato: "टमाटर",

rabi: "रबी",
kharif: "खरीफ",
rabiKharif: "रबी/खरीफ",
kharifRabi: "खरीफ/रबी",

loamySoil: "दोमट मिट्टी",
clayeySoil: "चिकनी मिट्टी",
wellDrainedSoil: "अच्छी जल निकासी वाली मिट्टी",
blackSoil: "काली मिट्टी",
sandyLoam: "बलुई दोमट मिट्टी",

waterLow: "कम",
waterModerate: "मध्यम",
waterHigh: "अधिक",

duration90_120: "90-120 दिन",
duration100_150: "100-150 दिन",
duration110_140: "110-140 दिन",
duration120_150: "120-150 दिन",
duration160_180: "160-180 दिन",

wheatTip: "उचित मिट्टी की नमी बनाए रखें और अत्यधिक पानी देने से बचें।",
riceTip: "खेत को पर्याप्त नम रखें, विशेष रूप से शुरुआती विकास चरण के दौरान।",
maizeTip: "अच्छी जल निकासी सुनिश्चित करें और सूखे दिनों में नियमित रूप से पानी दें।",
cottonTip: "पर्याप्त धूप प्रदान करें और खेत में जलभराव से बचें।",
mustardTip: "अत्यधिक सिंचाई से बचें क्योंकि सरसों मध्यम नमी में अच्छी तरह उगती है।",
onionTip: "बल्बों की सुरक्षा के लिए नियमित पानी दें और जलभराव से बचें।",
potatoTip: "अच्छी जल निकासी वाली मिट्टी का उपयोग करें और विकास के दौरान मिट्टी की नमी को स्थिर रखें।",
tomatoTip: "अच्छी धूप प्रदान करें और पौधों को बढ़ने पर सहारा दें।",

adviceHighRain: "🌧️ बारिश की अधिक संभावना। अनावश्यक सिंचाई से बचें।",
adviceHighTemp: "🌱 अधिक तापमान। सुनिश्चित करें कि फसलों को पर्याप्त पानी मिले।",
adviceLowRain: "💧 बारिश की कम संभावना। फसलों को सिंचाई देने पर विचार करें।",
adviceModerate: "🌾 मौसम की स्थिति सामान्य है। नियमित फसल देखभाल जारी रखें।",
    welcome: "FarmOrbit में आपका स्वागत है",

    homeDescription:
      "FarmOrbit एक सरल प्लेटफॉर्म है जो किसानों को अपनी खेती की गतिविधियों को प्रबंधित करने और सही लोगों से जुड़ने में मदद करता है।",

    getStarted: "शुरू करें",

    whatWeOffer: "FarmOrbit क्या प्रदान करता है",

    featuresSubtitle:
      "FarmOrbit प्लेटफॉर्म की कुछ मुख्य सुविधाएँ।",

    cropManagement: "फसल प्रबंधन",

    cropManagementText:
      "किसान अपनी फसलों, बुवाई की तारीख और संभावित कटाई के समय को ट्रैक कर सकते हैं।",

    marketplaceText:
      "खरीदारों से सीधे जुड़ें और अपनी उपज उचित कीमत पर बेचें।",

    weatherUpdates: "मौसम की जानकारी",
fullName: "पूरा नाम",
enterFullName: "अपना पूरा नाम दर्ज करें",
phoneNumber: "फ़ोन नंबर",
enterPhoneNumber: "अपना फ़ोन नंबर दर्ज करें",
iAmA: "मैं हूँ",
farmerRole: "किसान",
buyerRole: "खरीदार",
expertRole: "कृषि विशेषज्ञ",
createPassword: "पासवर्ड बनाएं",
confirmPasswordLabel: "पासवर्ड की पुष्टि करें",
confirmYourPassword: "अपने पासवर्ड की पुष्टि करें",
createAccountBtn: "खाता बनाएं",
joinFarmOrbitToday: "आज ही FarmOrbit से जुड़ें",
alreadyHaveAccount: "पहले से खाता है?",
passwordsDontMatch: "पासवर्ड मेल नहीं खाते!",
invalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें।",
registrationSuccessful: "पंजीकरण सफल!",
    weatherText:
      "खेती की गतिविधियों की बेहतर योजना बनाने के लिए सरल मौसम की जानकारी प्राप्त करें।",

    farmerCommunity: "किसान समुदाय",

    farmerCommunityText:
      "किसानों के लिए सवाल पूछने और अपने अनुभव साझा करने की जगह।",

    marketPrice: "बाज़ार भाव",

    cropRecommendation: "फसल सुझाव",

    whyFarmOrbit: "FarmOrbit क्यों?",

    aboutFarmOrbit:
      "कई किसानों को सही फसल की जानकारी की कमी, उचित कीमत वाले खरीदारों को खोजने में कठिनाई और मौसम की जानकारी तक सीमित पहुँच जैसी समस्याओं का सामना करना पड़ता है। FarmOrbit इन सभी सेवाओं को एक आसान प्लेटफॉर्म पर लाकर इन समस्याओं को हल करने का प्रयास करता है।",

    readyToExplore:
      "क्या आप FarmOrbit को एक्सप्लोर करने के लिए तैयार हैं?",

    joinCommunity:
      "हमसे जुड़ें और एक बेहतर खेती करने वाले समुदाय का हिस्सा बनें।",

    joinNow: "अभी जुड़ें",

    selectLanguage: "भाषा चुनें",

    // ---- Login page ----
    welcomeBack: "वापसी पर स्वागत है",
    loginSubtitle: "FarmOrbit जारी रखने के लिए लॉगिन करें",
    emailAddress: "ईमेल पता",
    enterEmail: "अपना ईमेल दर्ज करें",
    password: "पासवर्ड",
    enterPassword: "अपना पासवर्ड दर्ज करें",
    showPassword: "दिखाएं",
    hidePassword: "छिपाएं",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    loginButton: "लॉगिन",
    or: "या",
    dontHaveAccount: "खाता नहीं है?",
    createAccount: "खाता बनाएं",
    fillAllFields: "कृपया सभी फ़ील्ड भरें",
    loginSuccessful: "लॉगिन सफल!",
  },

  // ==================== PUNJABI ====================
  pa: {
    home: "ਹੋਮ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    selectState: "ਰਾਜ ਚੁਣੋ",
selectDistrict: "ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",
selectALocation: "ਇੱਕ ਸਥਾਨ ਚੁਣੋ",
weatherStatus: "ਮੌਸਮ ਦੀ ਸਥਿਤੀ",
farmingAdvice: "ਖੇਤੀ ਸਲਾਹ",
humidityLabel: "ਨਮੀ",
windLabel: "ਹਵਾ",
rainChanceLabel: "ਬਾਰਿਸ਼ ਦੀ ਸੰਭਾਵਨਾ",
forecast: "ਪੂਰਵ ਅਨੁਮਾਨ",
cropInformation: "ਫਸਲ ਜਾਣਕਾਰੀ",
cropIntro: "ਕਿਸਾਨਾਂ ਨੂੰ ਆਪਣੀ ਖੇਤੀ ਦੀ ਯੋਜਨਾ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਲਈ ਵੱਖ-ਵੱਖ ਫਸਲਾਂ ਦੀ ਲਾਭਦਾਇਕ ਜਾਣਕਾਰੀ ਦੇਖੋ।",
seasonLabel: "ਮੌਸਮ",
soilLabel: "ਮਿੱਟੀ",
waterRequirementLabel: "ਪਾਣੀ ਦੀ ਲੋੜ",
growingDurationLabel: "ਉਗਾਉਣ ਦੀ ਮਿਆਦ",
farmingTipLabel: "💡 ਖੇਤੀ ਸਲਾਹ",

wheat: "ਕਣਕ",
rice: "ਚੌਲ",
maize: "ਮੱਕੀ",
cotton: "ਕਪਾਹ",
mustard: "ਸਰ੍ਹੋਂ",
onion: "ਪਿਆਜ਼",
potato: "ਆਲੂ",
tomato: "ਟਮਾਟਰ",

rabi: "ਹਾੜੀ",
kharif: "ਸਾਉਣੀ",
rabiKharif: "ਹਾੜੀ/ਸਾਉਣੀ",
kharifRabi: "ਸਾਉਣੀ/ਹਾੜੀ",

loamySoil: "ਦੋਮਟ ਮਿੱਟੀ",
clayeySoil: "ਚੀਕਣੀ ਮਿੱਟੀ",
wellDrainedSoil: "ਚੰਗੀ ਨਿਕਾਸੀ ਵਾਲੀ ਮਿੱਟੀ",
blackSoil: "ਕਾਲੀ ਮਿੱਟੀ",
sandyLoam: "ਰੇਤਲੀ ਦੋਮਟ ਮਿੱਟੀ",

waterLow: "ਘੱਟ",
waterModerate: "ਦਰਮਿਆਨਾ",
waterHigh: "ਵੱਧ",

duration90_120: "90-120 ਦਿਨ",
duration100_150: "100-150 ਦਿਨ",
duration110_140: "110-140 ਦਿਨ",
duration120_150: "120-150 ਦਿਨ",
duration160_180: "160-180 ਦਿਨ",

wheatTip: "ਮਿੱਟੀ ਦੀ ਸਹੀ ਨਮੀ ਬਣਾਈ ਰੱਖੋ ਅਤੇ ਜ਼ਿਆਦਾ ਪਾਣੀ ਦੇਣ ਤੋਂ ਬਚੋ।",
riceTip: "ਖੇਤ ਨੂੰ ਕਾਫ਼ੀ ਨਮ ਰੱਖੋ, ਖਾਸ ਕਰਕੇ ਸ਼ੁਰੂਆਤੀ ਵਿਕਾਸ ਦੇ ਦੌਰਾਨ।",
maizeTip: "ਚੰਗੀ ਨਿਕਾਸੀ ਯਕੀਨੀ ਬਣਾਓ ਅਤੇ ਸੁੱਕੇ ਦਿਨਾਂ ਵਿੱਚ ਨਿਯਮਤ ਪਾਣੀ ਦਿਓ।",
cottonTip: "ਲੋੜੀਂਦੀ ਧੁੱਪ ਦਿਓ ਅਤੇ ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਖੜ੍ਹਾ ਹੋਣ ਤੋਂ ਬਚੋ।",
mustardTip: "ਜ਼ਿਆਦਾ ਸਿੰਚਾਈ ਤੋਂ ਬਚੋ ਕਿਉਂਕਿ ਸਰ੍ਹੋਂ ਦਰਮਿਆਨੀ ਨਮੀ ਵਿੱਚ ਚੰਗੀ ਤਰ੍ਹਾਂ ਉੱਗਦੀ ਹੈ।",
onionTip: "ਕੰਦਾਂ ਦੀ ਸੁਰੱਖਿਆ ਲਈ ਨਿਯਮਤ ਪਾਣੀ ਦਿਓ ਅਤੇ ਪਾਣੀ ਖੜ੍ਹਾ ਹੋਣ ਤੋਂ ਬਚੋ।",
potatoTip: "ਚੰਗੀ ਨਿਕਾਸੀ ਵਾਲੀ ਮਿੱਟੀ ਵਰਤੋ ਅਤੇ ਵਿਕਾਸ ਦੌਰਾਨ ਮਿੱਟੀ ਦੀ ਨਮੀ ਇਕਸਾਰ ਰੱਖੋ।",
tomatoTip: "ਚੰਗੀ ਧੁੱਪ ਦਿਓ ਅਤੇ ਪੌਦਿਆਂ ਨੂੰ ਵਧਣ ਵੇਲੇ ਸਹਾਰਾ ਦਿਓ।",
sunny: "ਧੁੱਪ",
cloudy: "ਬੱਦਲ",
partlyCloudy: "ਅੰਸ਼ਕ ਬੱਦਲ",

yesterday: "ਬੀਤਿਆ ਕੱਲ੍ਹ",
today: "ਅੱਜ",
tomorrow: "ਆਉਣ ਵਾਲਾ ਕੱਲ੍ਹ",

extremeWeather: "🔴 ਅਤਿਅੰਤ ਮੌਸਮ",
moderateConditions: "🟡 ਦਰਮਿਆਨੀ ਸਥਿਤੀ",
normalWeather: "🟢 ਆਮ ਮੌਸਮ",

adviceHighRain: "🌧️ ਬਾਰਿਸ਼ ਦੀ ਜ਼ਿਆਦਾ ਸੰਭਾਵਨਾ। ਬੇਲੋੜੀ ਸਿੰਚਾਈ ਤੋਂ ਬਚੋ।",
adviceHighTemp: "🌱 ਵੱਧ ਤਾਪਮਾਨ। ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਫਸਲਾਂ ਨੂੰ ਲੋੜੀਂਦਾ ਪਾਣੀ ਮਿਲੇ।",
adviceLowRain: "💧 ਬਾਰਿਸ਼ ਦੀ ਘੱਟ ਸੰਭਾਵਨਾ। ਫਸਲਾਂ ਨੂੰ ਸਿੰਚਾਈ ਦੇਣ ਬਾਰੇ ਸੋਚੋ।",
adviceModerate: "🌾 ਮੌਸਮ ਦੀ ਸਥਿਤੀ ਦਰਮਿਆਨੀ ਹੈ। ਨਿਯਮਤ ਫਸਲ ਦੇਖਭਾਲ ਜਾਰੀ ਰੱਖੋ।",
enterFullName: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
phoneNumber: "ਫ਼ੋਨ ਨੰਬਰ",
enterPhoneNumber: "ਆਪਣਾ ਫ਼ੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ",
iAmA: "ਮੈਂ ਹਾਂ",
farmerRole: "ਕਿਸਾਨ",
buyerRole: "ਖਰੀਦਦਾਰ",
expertRole: "ਖੇਤੀਬਾੜੀ ਮਾਹਰ",
createPassword: "ਪਾਸਵਰਡ ਬਣਾਓ",
confirmPasswordLabel: "ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
confirmYourPassword: "ਆਪਣੇ ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
createAccountBtn: "ਖਾਤਾ ਬਣਾਓ",
joinFarmOrbitToday: "ਅੱਜ ਹੀ FarmOrbit ਨਾਲ ਜੁੜੋ",
alreadyHaveAccount: "ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?",
passwordsDontMatch: "ਪਾਸਵਰਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦੇ!",
invalidEmail: "ਕਿਰਪਾ ਕਰਕੇ ਇੱਕ ਵੈਧ ਈਮੇਲ ਪਤਾ ਦਰਜ ਕਰੋ।",
registrationSuccessful: "ਪੰਜੀਕਰਨ ਸਫਲ!",
    farmer: "ਕਿਸਾਨ",
    weather: "ਮੌਸਮ",
    marketplace: "ਬਾਜ਼ਾਰ",
    profile: "ਪ੍ਰੋਫਾਈਲ",
    login: "ਲੌਗਇਨ",
    register: "ਰਜਿਸਟਰ",

    welcome: "FarmOrbit ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",

    homeDescription:
      "FarmOrbit ਇੱਕ ਸਧਾਰਨ ਪਲੇਟਫਾਰਮ ਹੈ ਜੋ ਕਿਸਾਨਾਂ ਨੂੰ ਆਪਣੀਆਂ ਖੇਤੀਬਾੜੀ ਗਤੀਵਿਧੀਆਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰਨ ਅਤੇ ਸਹੀ ਲੋਕਾਂ ਨਾਲ ਜੁੜਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",

    getStarted: "ਸ਼ੁਰੂ ਕਰੋ",

    whatWeOffer: "FarmOrbit ਕੀ ਪੇਸ਼ ਕਰਦਾ ਹੈ",

    featuresSubtitle:
      "FarmOrbit ਪਲੇਟਫਾਰਮ ਦੀਆਂ ਕੁਝ ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ।",

    cropManagement: "ਫਸਲ ਪ੍ਰਬੰਧਨ",

    cropManagementText:
      "ਕਿਸਾਨ ਆਪਣੀਆਂ ਫਸਲਾਂ, ਬਿਜਾਈ ਦੀਆਂ ਤਰੀਕਾਂ ਅਤੇ ਸੰਭਾਵਿਤ ਕਟਾਈ ਦੇ ਸਮੇਂ ਨੂੰ ਟਰੈਕ ਕਰ ਸਕਦੇ ਹਨ।",

    marketplaceText:
      "ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਸਿੱਧਾ ਜੁੜੋ ਅਤੇ ਆਪਣੀ ਪੈਦਾਵਾਰ ਵਾਜਬ ਕੀਮਤ 'ਤੇ ਵੇਚੋ।",

    weatherUpdates: "ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ",

    weatherText:
      "ਖੇਤੀਬਾੜੀ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਦੀ ਬਿਹਤਰ ਯੋਜਨਾ ਬਣਾਉਣ ਲਈ ਸੌਖੀ ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ।",

    farmerCommunity: "ਕਿਸਾਨ ਭਾਈਚਾਰਾ",

    farmerCommunityText:
      "ਕਿਸਾਨਾਂ ਲਈ ਸਵਾਲ ਪੁੱਛਣ ਅਤੇ ਆਪਣੇ ਤਜਰਬੇ ਸਾਂਝੇ ਕਰਨ ਦੀ ਜਗ੍ਹਾ।",

    marketPrice: "ਬਾਜ਼ਾਰ ਭਾਅ",

    cropRecommendation: "ਫਸਲ ਦੀ ਸਿਫਾਰਸ਼",

    whyFarmOrbit: "FarmOrbit ਕਿਉਂ?",

    aboutFarmOrbit:
      "ਕਈ ਕਿਸਾਨਾਂ ਨੂੰ ਸਹੀ ਫਸਲ ਦੀ ਜਾਣਕਾਰੀ ਦੀ ਘਾਟ, ਵਾਜਬ ਕੀਮਤ ਵਾਲੇ ਖਰੀਦਦਾਰ ਲੱਭਣ ਵਿੱਚ ਮੁਸ਼ਕਲ ਅਤੇ ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ ਤੱਕ ਸੀਮਿਤ ਪਹੁੰਚ ਵਰਗੀਆਂ ਸਮੱਸਿਆਵਾਂ ਦਾ ਸਾਹਮਣਾ ਕਰਨਾ ਪੈਂਦਾ ਹੈ। FarmOrbit ਇਹ ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਇੱਕ ਆਸਾਨ ਪਲੇਟਫਾਰਮ 'ਤੇ ਲਿਆ ਕੇ ਇਨ੍ਹਾਂ ਸਮੱਸਿਆਵਾਂ ਨੂੰ ਹੱਲ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰਦਾ ਹੈ।",

    readyToExplore:
      "ਕੀ ਤੁਸੀਂ FarmOrbit ਨੂੰ ਐਕਸਪਲੋਰ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ?",

    joinCommunity:
      "ਸਾਡੇ ਨਾਲ ਜੁੜੋ ਅਤੇ ਇੱਕ ਬਿਹਤਰ ਖੇਤੀਬਾੜੀ ਭਾਈਚਾਰੇ ਦਾ ਹਿੱਸਾ ਬਣੋ।",

    joinNow: "ਹੁਣੇ ਜੁੜੋ",

    selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",

    // ---- Login page ----
    welcomeBack: "ਮੁੜ ਸੁਆਗਤ ਹੈ",
    loginSubtitle: "FarmOrbit ਜਾਰੀ ਰੱਖਣ ਲਈ ਲੌਗਇਨ ਕਰੋ",
    emailAddress: "ਈਮੇਲ ਪਤਾ",
    enterEmail: "ਆਪਣਾ ਈਮੇਲ ਦਰਜ ਕਰੋ",
    password: "ਪਾਸਵਰਡ",
    enterPassword: "ਆਪਣਾ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ",
    showPassword: "ਵਿਖਾਓ",
    hidePassword: "ਲੁਕਾਓ",
    rememberMe: "ਮੈਨੂੰ ਯਾਦ ਰੱਖੋ",
    forgotPassword: "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
    loginButton: "ਲੌਗਇਨ",
    or: "ਜਾਂ",
    dontHaveAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
    createAccount: "ਖਾਤਾ ਬਣਾਓ",
    fillAllFields: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਖੇਤਰ ਭਰੋ",
    loginSuccessful: "ਲੌਗਇਨ ਸਫਲ!",
  },
};

// ==================== LANGUAGE CONTEXT ====================

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Always start with "en" on both server and first client render,
  // then sync from localStorage after mount (avoids SSR crash + hydration mismatch).
  const [language, setLanguage] = useState("en");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved && translations[saved]) {
      setLanguage(saved);
    }
    setIsReady(true);
  }, []);

  const changeLanguage = (lang) => {
    if (!translations[lang]) return; // ignore unknown language codes
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key) => {
    return (
      translations[language]?.[key] ??
      translations.en[key] ??
      key
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t,
        isReady, // useful if you want to hide content until language is resolved
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// ==================== CUSTOM HOOK ====================

export const useLanguage = () => useContext(LanguageContext);