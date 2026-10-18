import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './App.css'
import SmoothScroll from "./components/animations/ScrollSmooth";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScroll>
      <App />
      </SmoothScroll>
    </BrowserRouter>
  </React.StrictMode>,
)