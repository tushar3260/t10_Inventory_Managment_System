// Dashboard.jsx
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Inventory Dashboard</h1>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search by SKU or name..."
            className="px-3 py-2 rounded border bg-white w-72 text-sm"
          />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-300" />
            <span className="text-sm">Inventory Manager</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Total Products" value="1,240" />
        <KpiCard label="Inventory Value" value="₹ 18,40,000" />
        <KpiCard label="Low Stock Items" value="32" color="bg-amber-500" />
        <KpiCard label="Out of Stock" value="7" color="bg-red-600" />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Low Stock Table */}
        <Panel title="Low Stock Items">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 border-b">
              <tr>
                <th className="py-2">Product</th>
                <th>SKU</th>
                <th>Qty</th>
                <th>Reorder Level</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-0">
                <td className="py-2">Wireless Mouse</td>
                <td>WM-001</td>
                <td className="text-red-600 font-semibold">3</td>
                <td>10</td>
              </tr>
              <tr className="border-b last:border-0">
                <td className="py-2">Bluetooth Speaker</td>
                <td>BS-014</td>
                <td className="text-red-600 font-semibold">1</td>
                <td>8</td>
              </tr>
            </tbody>
          </table>
        </Panel>

        {/* Top 5 Products */}
        <Panel title="Top 5 Products by Quantity">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 border-b">
              <tr>
                <th className="py-2">Product</th>
                <th>SKU</th>
                <th>In Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-0">
                <td className="py-2">USB-C Cable</td>
                <td>UC-210</td>
                <td>420</td>
              </tr>
              <tr className="border-b last:border-0">
                <td className="py-2">Laptop Stand</td>
                <td>LS-032</td>
                <td>316</td>
              </tr>
            </tbody>
          </table>
        </Panel>
      </div>

      {/* Recent Transactions */}
      <Panel title="Recent Transactions">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 border-b">
            <tr>
              <th className="py-2">Time</th>
              <th>Product</th>
              <th>Type</th>
              <th>Qty</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b last:border-0">
              <td className="py-2">10:05 AM</td>
              <td>USB-C Cable</td>
              <td>
                <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs">
                  STOCK IN
                </span>
              </td>
              <td>+100</td>
              <td>staff_01</td>
            </tr>
            <tr className="border-b last:border-0">
              <td className="py-2">09:50 AM</td>
              <td>Wireless Mouse</td>
              <td>
                <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs">
                  STOCK OUT
                </span>
              </td>
              <td>-5</td>
              <td>staff_02</td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </div>
  );
};

const KpiCard = ({ label, value, color = "bg-slate-800" }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col gap-1">
    <span className="text-xs text-slate-500">{label}</span>
    <span className="text-xl font-semibold">{value}</span>
    <div className={`mt-2 h-1.5 w-16 rounded-full ${color}`} />
  </div>
);

const Panel = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

export default Dashboard