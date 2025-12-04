import React from "react";
import ProductList from "./pages/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import dashboard from "./dashboard";
function App() {
  return (
    <Router>  
       <Routes>
            <Route path="/products" element={<ProductList />} />
           <Route path="/dashboard" element={<dashboard />} />
          </Routes>
    </Router>
  );
}

export default App;
