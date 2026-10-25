import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { LanguageProvider } from "./Languagecontext.jsx";
import './styles/global.css'
import App from './App.jsx'
import "bootstrap-icons/font/bootstrap-icons.css";
createRoot(document.getElementById('root')).render(
<StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </Provider>
</StrictMode> 
)
