import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

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
    <App />
  </StrictMode>,
)
