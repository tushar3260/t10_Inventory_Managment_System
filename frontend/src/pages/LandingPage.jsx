import React from "react";
import { Package, TrendingUp, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom"; // react-router-dom for navigation

const LandingPage = () => {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-blue-50 via-white to-slate-50">
      
      {/* Header */}
      <header className="w-full bg-white shadow-sm py-4 px-6 lg:px-20 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            ID
          </div>
          <span className="text-xl font-bold text-slate-800">Inventory Management</span>
        </div>
       <nav className="flex items-center gap-4">
  <Link
    to="/"
    className="px-4 py-2 rounded-lg font-medium text-slate-700 hover:text-white hover:bg-blue-600 transition-colors duration-300 shadow-sm"
  >
    Home
  </Link>
  <Link
    to="/login"
    className="px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-md"
  >
    Login
  </Link>
</nav>

      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 lg:px-20">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-4">
          Manage Your Inventory <span className="text-blue-600">Effortlessly</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl">
          Track stock levels, monitor low-stock items, and get real-time insights to optimize your inventory management.
        </p>
        <Link
          to="/login"
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-20 bg-white">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Why Choose This Dashboard?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Package className="w-8 h-8 text-white" />}
            title="Track Inventory"
            description="Monitor all your products in one place with real-time stock updates."
            gradient="from-blue-500 to-blue-600"
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8 text-white" />}
            title="Analytics & Insights"
            description="Visualize inventory trends and make data-driven decisions."
            gradient="from-emerald-500 to-emerald-600"
          />
          <FeatureCard
            icon={<AlertTriangle className="w-8 h-8 text-white" />}
            title="Low Stock Alerts"
            description="Get notified about low-stock and out-of-stock items instantly."
            gradient="from-amber-500 to-amber-600"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 lg:px-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-t-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Optimize Your Inventory?
        </h2>
        <p className="text-lg sm:text-xl mb-8">
          Start tracking your products and managing your stock like a pro.
        </p>
        <Link
          to="/login"
          className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Go to Login
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 lg:px-20 text-center text-slate-500 bg-slate-50">
        &copy; {new Date().getFullYear()} Inventory Management. All rights reserved.
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition">
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 bg-gradient-to-br ${gradient} shadow-md`}
    >
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

export default LandingPage;
