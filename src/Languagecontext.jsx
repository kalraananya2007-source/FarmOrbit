

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

    cropManagement: "Crop Management",

    cropManagementText:
      "Farmers can track their crops, sowing dates and expected harvest time.",

    marketplaceText:
      "Connect directly with buyers and sell produce at fair prices.",

    weatherUpdates: "Weather Updates",

    weatherText:
      "Get simple weather information to plan farming activities better.",

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