import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // IMPORTANTE: Apontando para ./App.jsx na mesma pasta

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)