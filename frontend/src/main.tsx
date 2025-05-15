import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/assets/styles/App.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </GoogleOAuthProvider>
)
