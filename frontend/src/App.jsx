import React from "react";
import ProductList from "./pages/ProductList";
import LoginPage from "./pages/Loginpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
function App() {
  return (
    <Router>  
       <Routes>
            <Route path="/product" element={<ProductList />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
    </Router>
  );
}

export default App;
