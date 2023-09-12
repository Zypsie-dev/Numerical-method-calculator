import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import BackGround from './components/BackGround'
import Layout from './components/Layout'
import Home from './components/Home'
import Calculator from './components/Linear'
import "@fontsource/montserrat";
function App() {
  return (
    <div className="container">
      <BackGround />
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
