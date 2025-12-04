import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './pages/ProductList.jsx'
import Dashboard from './dashboard.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  )
}

export default App