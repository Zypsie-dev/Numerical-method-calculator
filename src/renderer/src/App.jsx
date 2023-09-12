import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import BackGround from './components/BackGround'
import Layout from './components/Layout'
import Home from './components/Home'
import Bisection from './components/Bisection'
import "@fontsource/montserrat";
function App() {
  return (
    <div className="container">
      <BackGround />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/bisection" element={<Bisection />} />
          </Route>
        </Routes>
    </div>
  )
}

export default App
