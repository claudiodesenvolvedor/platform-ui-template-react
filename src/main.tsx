import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './theme'
import { AuthProvider } from './hooks/auth'
import { ToastProvider } from './hooks/toast'
import { LoaderProvider } from './hooks/loader'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider brand="supervia">
      <AuthProvider>
        <ToastProvider>
          <LoaderProvider>
            <App />
          </LoaderProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
