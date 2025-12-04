import React from "react";
import ProductList from "./pages/ProductList";
import LoginPage from "./pages/Loginpage";
import Reports from "./pages/reporting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <Router>  
       <Routes>
            <Route path="/product" element={<ProductList />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
    </Router>
  );
}

export default App;
