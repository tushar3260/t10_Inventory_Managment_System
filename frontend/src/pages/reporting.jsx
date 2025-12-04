import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, AlertCircle, Download, Calendar, BarChart3, Trophy, AlertTriangle, Filter, X } from 'lucide-react';

const Reports = () => {
  const [timeRange, setTimeRange] = useState("30");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [topSellingItems, setTopSellingItems] = useState([
    { rank: 1, name: "USB-C Cable", sku: "UC-210", sold: 320, revenue: 48000, turnover: "12.5x" },
    { rank: 2, name: "Wireless Mouse", sku: "WM-001", sold: 285, revenue: 71250, turnover: "9.8x" },
    { rank: 3, name: "Laptop Stand", sku: "LS-032", sold: 240, revenue: 96000, turnover: "8.2x" },
    { rank: 4, name: "Bluetooth Speaker", sku: "BS-014", sold: 198, revenue: 118800, turnover: "7.4x" },
    { rank: 5, name: "Phone Holder", sku: "PH-055", sold: 175, revenue: 26250, turnover: "6.9x" },
    { rank: 6, name: "HDMI Cable", sku: "HC-089", sold: 156, revenue: 31200, turnover: "6.2x" },
    { rank: 7, name: "Keyboard", sku: "KB-120", sold: 142, revenue: 85200, turnover: "5.8x" }
  ]);

  const [deadStockItems, setDeadStockItems] = useState([
    { id: 1, name: "VGA Adapter", sku: "VGA-022", stock: 145, lastSold: "Feb 10, 2024", daysIdle: 298, value: 21750, severity: "high" },
    { id: 2, name: "DVD Writer", sku: "DW-088", stock: 67, lastSold: "Jan 15, 2024", daysIdle: 324, value: 40200, severity: "critical" },
    { id: 3, name: "Floppy Drive", sku: "FD-001", stock: 89, lastSold: "Nov 22, 2023", daysIdle: 378, value: 13350, severity: "critical" },
    { id: 4, name: "PS/2 Keyboard", sku: "PS2-045", stock: 54, lastSold: "Mar 05, 2024", daysIdle: 274, value: 16200, severity: "high" }
  ]);

  const totalRevenue = topSellingItems.reduce((sum, item) => sum + item.revenue, 0);
  const totalItemsSold = topSellingItems.reduce((sum, item) => sum + item.sold, 0);
  const totalDeadStockValue = deadStockItems.reduce((sum, item) => sum + item.value, 0);

  const formatCurrency = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`;
    }
    return `₹${value.toLocaleString()}`;
  };

  const handleLiquidate = (id) => {
    if (confirm('Are you sure you want to liquidate this item?')) {
      setDeadStockItems(deadStockItems.filter(item => item.id !== id));
    }
  };

  const handleExportReport = () => {
    const reportData = [
      ['Top Selling Items Report'],
      ['Rank', 'Product', 'SKU', 'Units Sold', 'Revenue', 'Turnover'],
      ...topSellingItems.map(item => [
        item.rank,
        item.name,
        item.sku,
        item.sold,
        item.revenue,
        item.turnover
      ]),
      [],
      ['Dead Stock Items Report'],
      ['Product', 'SKU', 'Stock', 'Last Sold', 'Days Idle', 'Value'],
      ...deadStockItems.map(item => [
        item.name,
        item.sku,
        item.stock,
        item.lastSold,
        item.daysIdle,
        item.value
      ])
    ];

    const csvContent = reportData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-report-${timeRange}days.csv`;
    a.click();
  };

  const filteredTopItems = selectedCategory === 'all' 
    ? topSellingItems 
    : topSellingItems.filter(item => {
        if (selectedCategory === 'high') return item.sold > 200;
        if (selectedCategory === 'medium') return item.sold >= 150 && item.sold <= 200;
        if (selectedCategory === 'low') return item.sold < 150;
        return true;
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Inventory Reports</h1>
                <p className="text-xs text-slate-500">Analytics & Performance Insights</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <Calendar className="w-4 h-4 text-slate-500" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                  <option value="90">Last 90 Days</option>
                  <option value="365">Last Year</option>
                </select>
              </div>

              <button 
                onClick={() => setShowFilter(!showFilter)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showFilter 
                    ? 'bg-purple-100 text-purple-700 border border-purple-300' 
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
              
              <button 
                onClick={handleExportReport}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-800">Filter Options</h3>
                <button 
                  onClick={() => setShowFilter(false)}
                  className="p-1 hover:bg-purple-100 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setSelectedCategory('high')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'high'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  High Performers (200+)
                </button>
                <button
                  onClick={() => setSelectedCategory('medium')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'medium'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Medium (150-200)
                </button>
                <button
                  onClick={() => setSelectedCategory('low')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'low'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Low Performers (&lt;150)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <MetricCard
            icon={<DollarSign className="w-6 h-6" />}
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            change="+12.5%"
            positive={true}
            gradient="from-emerald-500 to-teal-600"
          />
          <MetricCard
            icon={<Package className="w-6 h-6" />}
            title="Items Sold"
            value={totalItemsSold.toLocaleString()}
            change="+8.3%"
            positive={true}
            gradient="from-blue-500 to-cyan-600"
          />
          <MetricCard
            icon={<AlertCircle className="w-6 h-6" />}
            title="Dead Stock Value"
            value={formatCurrency(totalDeadStockValue)}
            change="-3.2%"
            positive={true}
            gradient="from-amber-500 to-orange-600"
          />
        </div>

        {/* Top Selling Items */}
        <Panel 
          icon={<Trophy className="w-5 h-5" />}
          title="Top Selling Items" 
          subtitle={`Best performing products (${filteredTopItems.length} items)`}
          className="mb-6"
        >
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-600 bg-slate-50">
                <tr>
                  <th className="py-3 px-3 font-semibold rounded-tl-lg">Rank</th>
                  <th className="py-3 px-3 font-semibold">Product Name</th>
                  <th className="py-3 px-3 font-semibold">SKU</th>
                  <th className="py-3 px-3 font-semibold">Units Sold</th>
                  <th className="py-3 px-3 font-semibold">Revenue</th>
                  <th className="py-3 px-3 font-semibold rounded-tr-lg">Turnover Ratio</th>
                </tr>
              </thead>
              <tbody>
                {filteredTopItems.map(item => (
                  <TopSellingRow key={item.rank} {...item} formatCurrency={formatCurrency} />
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Dead Stock Analysis */}
        <Panel 
          icon={<AlertTriangle className="w-5 h-5" />}
          title="Dead Stock / Slow-Moving Items" 
          subtitle={`Items with no sales in last ${timeRange} days or inventory turnover < 2x/year`}
          alert
        >
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-600 bg-slate-50">
                <tr>
                  <th className="py-3 px-3 font-semibold rounded-tl-lg">Product Name</th>
                  <th className="py-3 px-3 font-semibold">SKU</th>
                  <th className="py-3 px-3 font-semibold">Current Stock</th>
                  <th className="py-3 px-3 font-semibold">Last Sold</th>
                  <th className="py-3 px-3 font-semibold">Days Idle</th>
                  <th className="py-3 px-3 font-semibold">Dead Stock Value</th>
                  <th className="py-3 px-3 font-semibold rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {deadStockItems.map(item => (
                  <DeadStockRow 
                    key={item.id} 
                    {...item} 
                    formatCurrency={formatCurrency}
                    onLiquidate={() => handleLiquidate(item.id)}
                  />
                ))}
              </tbody>
            </table>
            {deadStockItems.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No dead stock items found!</p>
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, title, value, change, positive, gradient }) => {
  const isPositive = positive && change.startsWith('+');
  const isNegative = !positive || (positive && change.startsWith('-'));
  
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
            {icon}
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
            isPositive ? 'bg-emerald-100 text-emerald-700' : 
            isNegative ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <p className="text-xs text-slate-400 mt-1">vs previous period</p>
        </div>
      </div>
      <div className={`h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
    </div>
  );
};

const TopSellingRow = ({ rank, name, sku, sold, revenue, turnover, formatCurrency }) => {
  const isTopThree = rank <= 3;
  const medalColors = {
    1: "from-yellow-400 to-yellow-500",
    2: "from-slate-300 to-slate-400",
    3: "from-orange-400 to-orange-500"
  };
  
  return (
    <tr className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent transition-all">
      <td className="py-3 px-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs shadow-sm ${
          isTopThree 
            ? `bg-gradient-to-br ${medalColors[rank]} text-white` 
            : 'bg-slate-100 text-slate-600'
        }`}>
          {rank}
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="font-semibold text-slate-800">{name}</div>
      </td>
      <td className="py-3 px-3 text-slate-500 font-mono text-xs">{sku}</td>
      <td className="py-3 px-3">
        <span className="font-semibold text-slate-700">{sold}</span>
      </td>
      <td className="py-3 px-3">
        <span className="font-bold text-emerald-600">{formatCurrency(revenue)}</span>
      </td>
      <td className="py-3 px-3">
        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
          {turnover}
        </span>
      </td>
    </tr>
  );
};

const DeadStockRow = ({ name, sku, stock, lastSold, daysIdle, value, severity, formatCurrency, onLiquidate }) => {
  const severityConfig = {
    critical: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
    high: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
    medium: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' }
  };
  
  const config = severityConfig[severity] || severityConfig.medium;
  
  return (
    <tr className="border-b border-slate-100 hover:bg-red-50/30 transition-colors group">
      <td className="py-3 px-3">
        <div className="font-semibold text-slate-800">{name}</div>
      </td>
      <td className="py-3 px-3 text-slate-500 font-mono text-xs">{sku}</td>
      <td className="py-3 px-3">
        <span className="font-semibold text-slate-700">{stock}</span>
      </td>
      <td className="py-3 px-3 text-slate-500 text-xs">{lastSold}</td>
      <td className="py-3 px-3">
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text}`}>
          {daysIdle} days
        </span>
      </td>
      <td className="py-3 px-3">
        <span className="font-bold text-red-600">{formatCurrency(value)}</span>
      </td>
      <td className="py-3 px-3">
        <button 
          onClick={onLiquidate}
          className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg text-xs font-semibold hover:from-red-700 hover:to-pink-700 transition-all shadow-sm hover:shadow-md"
        >
          Liquidate
        </button>
      </td>
    </tr>
  );
};

const Panel = ({ icon, title, subtitle, children, className = "", alert }) => (
  <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
    <div className={`p-5 border-b ${alert ? 'border-red-100 bg-red-50/30' : 'border-slate-100'}`}>
      <div className="flex items-start gap-3">
        {icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            alert 
              ? 'bg-red-100 text-red-600' 
              : 'bg-purple-100 text-purple-600'
          }`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-base font-bold text-slate-800">{title}</h2>
          {subtitle && (
            <p className={`text-xs mt-1 ${alert ? 'text-red-600' : 'text-slate-500'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
    <div className="p-5">
      {children}
    </div>
  </div>
);

export default Reports;