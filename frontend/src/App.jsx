import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./dashboard.jsx";
import Suppliers from "./Suppliers.jsx";
import SupplierForm from "./SupplierForm.jsx";  
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Supplier Table Page */}
        <Route path="/suppliers" element={<Suppliers />} />

        {/* Optional – Dedicated form route (not required for modal use) */}
        <Route path="/add-supplier" element={<SupplierForm />} />
      </Routes>
    </Router>
  );
}

export default App;
