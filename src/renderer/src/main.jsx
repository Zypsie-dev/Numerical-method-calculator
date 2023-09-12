import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './assets/App.css'
import './assets/SideBar.css'
import './assets/NavBar.css'
import './assets/Content.css'
import './assets/Calculator.css'
import './assets/snow.scss'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </React.StrictMode>
)
