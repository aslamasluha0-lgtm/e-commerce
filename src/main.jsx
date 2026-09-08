import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import ThemeProvider from './context/ThemeContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className:
            'dark:bg-surface-800 dark:text-white text-surface-900 border border-surface-200 dark:border-surface-700 shadow-card',
          style: {
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            fontSize: '0.875rem',
          },
        }}
      />
    </ThemeProvider>
  </StrictMode>,
)