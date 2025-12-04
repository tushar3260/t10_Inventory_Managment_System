import React, { useState } from 'react';
import { Package, TrendingUp, AlertTriangle, XCircle, Search, Bell, Settings, Download, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Inventory Dashboard</h1>
              <p className="text-xs text-slate-500">Real-time stock monitoring</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by SKU or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 w-80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-slate-600" />
            </button>
            
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                IM
              </div>
              <div className="text-sm">
                <div className="font-medium text-slate-800">Inventory Manager</div>
                <div className="text-xs text-slate-500">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard 
            icon={<Package className="w-6 h-6" />}
            label="Total Products" 
            value="1,240" 
            change="+12%"
            trend="up"
            gradient="from-blue-500 to-blue-600"
          />
          <KpiCard 
            icon={<TrendingUp className="w-6 h-6" />}
            label="Inventory Value" 
            value="₹18,40,000" 
            change="+8%"
            trend="up"
            gradient="from-emerald-500 to-emerald-600"
          />
          <KpiCard 
            icon={<AlertTriangle className="w-6 h-6" />}
            label="Low Stock Items" 
            value="32" 
            change="+5"
            trend="down"
            gradient="from-amber-500 to-amber-600"
            alert
          />
          <KpiCard 
            icon={<XCircle className="w-6 h-6" />}
            label="Out of Stock" 
            value="7" 
            change="-2"
            trend="up"
            gradient="from-red-500 to-red-600"
            alert
          />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Low Stock Table */}
          <Panel title="Low Stock Items" subtitle="Items requiring immediate attention">
            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <thead className="text-left text-slate-600 bg-slate-50">
                  <tr>
                    <th className="py-3 px-3 font-semibold">Product</th>
                    <th className="py-3 px-3 font-semibold">SKU</th>
                    <th className="py-3 px-3 font-semibold">Qty</th>
                    <th className="py-3 px-3 font-semibold">Reorder</th>
                    <th className="py-3 px-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-medium text-slate-800">Wireless Mouse</td>
                    <td className="py-3 px-3 text-slate-600">WM-001</td>
                    <td className="py-3 px-3">
                      <span className="text-red-600 font-bold">3</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">10</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                        Critical
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-medium text-slate-800">Bluetooth Speaker</td>
                    <td className="py-3 px-3 text-slate-600">BS-014</td>
                    <td className="py-3 px-3">
                      <span className="text-red-600 font-bold">1</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">8</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                        Critical
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-medium text-slate-800">HDMI Cable</td>
                    <td className="py-3 px-3 text-slate-600">HC-089</td>
                    <td className="py-3 px-3">
                      <span className="text-amber-600 font-bold">12</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">20</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
                        Low
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>

          {/* Top 5 Products */}
          <Panel title="Top 5 Products by Quantity" subtitle="Highest stock levels">
            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <thead className="text-left text-slate-600 bg-slate-50">
                  <tr>
                    <th className="py-3 px-3 font-semibold">Product</th>
                    <th className="py-3 px-3 font-semibold">SKU</th>
                    <th className="py-3 px-3 font-semibold">In Stock</th>
                    <th className="py-3 px-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-medium text-slate-800">USB-C Cable</td>
                    <td className="py-3 px-3 text-slate-600">UC-210</td>
                    <td className="py-3 px-3">
                      <span className="text-emerald-600 font-bold">420</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                        Healthy
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-medium text-slate-800">Laptop Stand</td>
                    <td className="py-3 px-3 text-slate-600">LS-032</td>
                    <td className="py-3 px-3">
                      <span className="text-emerald-600 font-bold">316</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                        Healthy
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-medium text-slate-800">Phone Case</td>
                    <td className="py-3 px-3 text-slate-600">PC-155</td>
                    <td className="py-3 px-3">
                      <span className="text-emerald-600 font-bold">284</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                        Healthy
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        {/* Recent Transactions */}
        <Panel 
          title="Recent Transactions" 
          subtitle="Last 24 hours activity"
          action={
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          }
        >
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-600 bg-slate-50">
                <tr>
                  <th className="py-3 px-3 font-semibold">Time</th>
                  <th className="py-3 px-3 font-semibold">Product</th>
                  <th className="py-3 px-3 font-semibold">SKU</th>
                  <th className="py-3 px-3 font-semibold">Type</th>
                  <th className="py-3 px-3 font-semibold">Qty</th>
                  <th className="py-3 px-3 font-semibold">User</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 text-slate-600">10:05 AM</td>
                  <td className="py-3 px-3 font-medium text-slate-800">USB-C Cable</td>
                  <td className="py-3 px-3 text-slate-600">UC-210</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium inline-flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" />
                      STOCK IN
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-semibold">+100</td>
                  <td className="py-3 px-3 text-slate-600">staff_01</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 text-slate-600">09:50 AM</td>
                  <td className="py-3 px-3 font-medium text-slate-800">Wireless Mouse</td>
                  <td className="py-3 px-3 text-slate-600">WM-001</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium inline-flex items-center gap-1">
                      <ArrowDown className="w-3 h-3" />
                      STOCK OUT
                    </span>
                  </td>
                  <td className="py-3 px-3 text-red-600 font-semibold">-5</td>
                  <td className="py-3 px-3 text-slate-600">staff_02</td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 text-slate-600">09:30 AM</td>
                  <td className="py-3 px-3 font-medium text-slate-800">Laptop Stand</td>
                  <td className="py-3 px-3 text-slate-600">LS-032</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium inline-flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" />
                      STOCK IN
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-600 font-semibold">+50</td>
                  <td className="py-3 px-3 text-slate-600">staff_01</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 text-slate-600">09:15 AM</td>
                  <td className="py-3 px-3 font-medium text-slate-800">Bluetooth Speaker</td>
                  <td className="py-3 px-3 text-slate-600">BS-014</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium inline-flex items-center gap-1">
                      <ArrowDown className="w-3 h-3" />
                      STOCK OUT
                    </span>
                  </td>
                  <td className="py-3 px-3 text-red-600 font-semibold">-3</td>
                  <td className="py-3 px-3 text-slate-600">staff_03</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
};

const KpiCard = ({ icon, label, value, change, trend, gradient, alert }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
    <div className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${
          trend === 'up' ? (alert ? 'text-red-600' : 'text-emerald-600') : 'text-slate-500'
        }`}>
          {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
    <div className={`h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
  </div>
);

const Panel = ({ title, subtitle, children, action }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="p-5 border-b border-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
    <div className="p-5">
      {children}
    </div>
  </div>
);

export default Dashboard;