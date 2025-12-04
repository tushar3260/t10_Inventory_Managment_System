import React from "react";
import ProductList from "./pages/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Reports from "./pages/reporting";

function App() {
  return (
    <Router>  
       <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />

           
          
          </Routes>
    </Router>
  );
}

export default App;
