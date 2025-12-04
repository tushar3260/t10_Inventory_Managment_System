import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

/* ------------------ Main Pages ------------------ */
import LandingPage from "./pages/LandingPage"; 
import Dashboard from "./pages/dashboard";
import ProductList from "./pages/ProductList";
import LoginPage from "./pages/Loginpage";
import Reports from "./pages/reporting";
import WarehouseStaffDashboard from "./pages/warehousedash";

/* ------------------ Supplier Module ------------------ */
import Suppliers from "./Suppliers.jsx";
import SupplierForm from "./SupplierForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboards */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/staffdashboard" element={<WarehouseStaffDashboard />} />

        {/* Product Page */}
        <Route path="/product" element={<ProductList />} />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />

        {/* Suppliers Module */}
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/add-supplier" element={<SupplierForm />} /> 
        {/* This route is ONLY if you want form as a standalone page */}
      </Routes>
    </Router>
  );
}

export default App;
