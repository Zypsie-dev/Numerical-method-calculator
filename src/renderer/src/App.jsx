import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Calculator from './components/NonLinear'
import "@fontsource/montserrat";
function App() {
  return (
    <div className="container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/calculator" element={<Calculator/>} />
          </Route>
        </Routes>
    </div>
  )
}

export default App
