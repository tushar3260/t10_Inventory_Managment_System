import React from "react";
import ProductList from "./pages/ProductList";
import LoginPage from "./pages/Loginpage";
import Reports from "./pages/reporting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import WarehouseStaffDashboard from "./pages/warehousedash";
function App() {
  return (
    <Router>  
       <Routes>
            <Route path="/product" element={<ProductList />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/staffdashboard" element={<WarehouseStaffDashboard />} />
          </Routes>
    </Router>
  );
}
export default App;
