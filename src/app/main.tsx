import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

// Fonts (one family per tournament theme)
import '@fontsource/inter'
import '@fontsource/roboto'
import '@fontsource/montserrat'
import '@fontsource/space-mono'

// Country flags (Eurobasket) — CSS-only library
import 'flag-icons/css/flag-icons.min.css'

// Global styles (design tokens, mixins, themes, base resets)
import '../styles/global.scss'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
