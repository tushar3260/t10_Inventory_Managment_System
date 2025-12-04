import React, { useState } from 'react';
import { Package, TrendingUp, TrendingDown, AlertCircle, Search, Scan, MapPin, User, Calendar, CheckCircle, Clock, ArrowUpCircle, ArrowDownCircle, FileText, Plus, Download } from 'lucide-react';

const WarehouseStaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("stockIn");
  const [scannerInput, setScannerInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  
  const [activities, setActivities] = useState([
    { id: 1, time: "11:45 AM", product: "USB-C Cable", sku: "UC-210", type: "STOCK IN", qty: 50, status: "success" },
    { id: 2, time: "11:30 AM", product: "Wireless Mouse", sku: "WM-001", type: "STOCK OUT", qty: 5, status: "success" },
    { id: 3, time: "10:55 AM", product: "Laptop Stand", sku: "LS-032", type: "AUDIT", qty: "Adjusted", status: "pending" },
    { id: 4, time: "10:20 AM", product: "HDMI Cable", sku: "HC-089", type: "STOCK IN", qty: 30, status: "success" }
  ]);

  const [stats, setStats] = useState({
    todayStockIn: 47,
    todayStockOut: 62,
    pendingAudits: 8,
    myTransactions: 23
  });

  const handleSearch = () => {
    if (scannerInput) {
      setSearchResult({
        name: "Wireless Mouse",
        sku: scannerInput || "WM-001",
        location: "A-12-03",
        stock: 47
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const addActivity = (type, product, sku, qty) => {
    const newActivity = {
      id: activities.length + 1,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      product,
      sku,
      type,
      qty,
      status: "success"
    };
    setActivities([newActivity, ...activities]);
    
    // Update stats
    if (type === "STOCK IN") {
      setStats({...stats, todayStockIn: stats.todayStockIn + 1, myTransactions: stats.myTransactions + 1});
    } else if (type === "STOCK OUT") {
      setStats({...stats, todayStockOut: stats.todayStockOut + 1, myTransactions: stats.myTransactions + 1});
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Warehouse Operations</h1>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <User className="w-3 h-3" />
                  <span>Staff: Warehouse_User_01</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                  <Calendar className="w-3 h-3" />
                  Current Date
                </div>
                <div className="text-sm font-semibold text-slate-800">{currentDate}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                WU
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <QuickStat 
            icon={<ArrowUpCircle className="w-6 h-6" />}
            label="Today's Stock In" 
            value={stats.todayStockIn.toString()}
            gradient="from-emerald-500 to-teal-600"
          />
          <QuickStat 
            icon={<ArrowDownCircle className="w-6 h-6" />}
            label="Today's Stock Out" 
            value={stats.todayStockOut.toString()}
            gradient="from-blue-500 to-cyan-600"
          />
          <QuickStat 
            icon={<AlertCircle className="w-6 h-6" />}
            label="Pending Audits" 
            value={stats.pendingAudits.toString()}
            gradient="from-amber-500 to-orange-600"
          />
          <QuickStat 
            icon={<FileText className="w-6 h-6" />}
            label="My Transactions" 
            value={stats.myTransactions.toString()}
            gradient="from-slate-600 to-slate-700"
          />
        </div>

        {/* Quick Search */}
        <Panel className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Scan className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Quick Search / Scan</h2>
              <p className="text-xs text-slate-500">Scan barcode or enter SKU to view product details</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Enter SKU or scan barcode..."
                value={scannerInput}
                onChange={(e) => setScannerInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                autoFocus
              />
            </div>
            <button 
              onClick={handleSearch}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors shadow-sm"
            >
              Search
            </button>
          </div>
          
          {searchResult && (
            <div className="mt-4 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-slate-800 text-lg">{searchResult.name}</div>
                  <div className="text-sm text-slate-600">SKU: {searchResult.sku}</div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                  In Stock
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span className="text-slate-600">Location:</span>
                  <span className="font-semibold text-slate-800">{searchResult.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-indigo-600" />
                  <span className="text-slate-600">Available:</span>
                  <span className="font-bold text-emerald-600">{searchResult.stock} units</span>
                </div>
              </div>
            </div>
          )}
        </Panel>

        {/* Tab Navigation */}
        <Panel noPadding>
          <div className="flex border-b overflow-x-auto">
            <TabButton
              icon={<ArrowUpCircle className="w-4 h-4" />}
              label="Stock In"
              active={activeTab === "stockIn"}
              onClick={() => setActiveTab("stockIn")}
            />
            <TabButton
              icon={<ArrowDownCircle className="w-4 h-4" />}
              label="Stock Out"
              active={activeTab === "stockOut"}
              onClick={() => setActiveTab("stockOut")}
            />
            <TabButton
              icon={<AlertCircle className="w-4 h-4" />}
              label="Audit / Adjust"
              active={activeTab === "audit"}
              onClick={() => setActiveTab("audit")}
            />
            <TabButton
              icon={<FileText className="w-4 h-4" />}
              label="My Activity"
              active={activeTab === "activity"}
              onClick={() => setActiveTab("activity")}
            />
          </div>

          <div className="p-6">
            {activeTab === "stockIn" && <StockInForm onSubmit={addActivity} />}
            {activeTab === "stockOut" && <StockOutForm onSubmit={addActivity} />}
            {activeTab === "audit" && <AuditForm onSubmit={addActivity} />}
            {activeTab === "activity" && <ActivityLog activities={activities} />}
          </div>
        </Panel>
      </div>
    </div>
  );
};

const QuickStat = ({ icon, label, value, gradient }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
    <div className={`h-1 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
  </div>
);

const TabButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all whitespace-nowrap ${
      active
        ? "border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50"
        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
    }`}
  >
    {icon}
    {label}
  </button>
);

const StockInForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sku: '',
    supplier: '',
    quantity: '',
    location: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.sku && formData.quantity) {
      onSubmit("STOCK IN", `Product ${formData.sku}`, formData.sku, parseInt(formData.quantity));
      setFormData({ sku: '', supplier: '', quantity: '', location: '', notes: '' });
      alert('Stock In recorded successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
          <ArrowUpCircle className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Record Incoming Stock</h3>
          <p className="text-xs text-slate-500">Add new inventory received from suppliers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Product SKU *</label>
          <input
            type="text"
            placeholder="Scan or enter SKU"
            value={formData.sku}
            onChange={(e) => setFormData({...formData, sku: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Supplier</label>
          <select 
            value={formData.supplier}
            onChange={(e) => setFormData({...formData, supplier: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select Supplier</option>
            <option value="abc">ABC Electronics Ltd.</option>
            <option value="tech">Tech Supplies Co.</option>
            <option value="global">Global Distributors</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity Received *</label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Warehouse Location</label>
          <input
            type="text"
            placeholder="e.g., A-12-03"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Notes (Optional)</label>
          <textarea
            rows="3"
            placeholder="Add any remarks..."
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          />
        </div>
      </div>
      <button 
        type="submit"
        className="mt-5 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
      >
        <CheckCircle className="w-5 h-5" />
        Submit Stock In
      </button>
    </form>
  );
};

const StockOutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sku: '',
    reason: '',
    quantity: '',
    orderId: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.sku && formData.quantity) {
      onSubmit("STOCK OUT", `Product ${formData.sku}`, formData.sku, parseInt(formData.quantity));
      setFormData({ sku: '', reason: '', quantity: '', orderId: '', notes: '' });
      alert('Stock Out recorded successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <ArrowDownCircle className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Record Outgoing Stock</h3>
          <p className="text-xs text-slate-500">Track inventory leaving the warehouse</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Product SKU *</label>
          <input
            type="text"
            placeholder="Scan or enter SKU"
            value={formData.sku}
            onChange={(e) => setFormData({...formData, sku: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Reason *</label>
          <select 
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Reason</option>
            <option value="sale">Sale / Order Fulfillment</option>
            <option value="transfer">Transfer to Another Warehouse</option>
            <option value="return">Return to Supplier</option>
            <option value="sample">Sample / Demo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity *</label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Order ID (if applicable)</label>
          <input
            type="text"
            placeholder="e.g., ORD-12345"
            value={formData.orderId}
            onChange={(e) => setFormData({...formData, orderId: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Notes (Optional)</label>
          <textarea
            rows="3"
            placeholder="Add any remarks..."
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>
      <button 
        type="submit"
        className="mt-5 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
      >
        <CheckCircle className="w-5 h-5" />
        Submit Stock Out
      </button>
    </form>
  );
};

const AuditForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sku: '',
    physicalCount: '',
    reason: '',
    remarks: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.sku && formData.physicalCount) {
      onSubmit("AUDIT", `Product ${formData.sku}`, formData.sku, "Adjusted");
      setFormData({ sku: '', physicalCount: '', reason: '', remarks: '' });
      alert('Audit adjustment recorded successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Inventory Audit / Adjustment</h3>
          <p className="text-xs text-slate-500">Correct stock levels due to discrepancies</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-1">Important Notice</p>
          <p>Use this form to correct stock levels due to damage, loss, or physical count discrepancies. All adjustments are logged and require approval.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Product SKU *</label>
          <input
            type="text"
            placeholder="Scan or enter SKU"
            value={formData.sku}
            onChange={(e) => setFormData({...formData, sku: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Current System Stock</label>
          <input
            type="text"
            value="47 units"
            disabled
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-slate-100 text-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Actual Physical Count *</label>
          <input
            type="number"
            placeholder="Enter counted quantity"
            value={formData.physicalCount}
            onChange={(e) => setFormData({...formData, physicalCount: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Adjustment Reason *</label>
          <select 
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          >
            <option value="">Select Reason</option>
            <option value="damaged">Damaged Goods</option>
            <option value="theft">Theft / Loss</option>
            <option value="mismatch">Physical Count Mismatch</option>
            <option value="expired">Expired Items</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Remarks *</label>
          <textarea
            rows="3"
            placeholder="Explain the discrepancy in detail..."
            value={formData.remarks}
            onChange={(e) => setFormData({...formData, remarks: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            required
          />
        </div>
      </div>
      <button 
        type="submit"
        className="mt-5 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
      >
        <CheckCircle className="w-5 h-5" />
        Submit Adjustment
      </button>
    </form>
  );
};

const ActivityLog = ({ activities }) => {
  const handleExport = () => {
    const csvContent = [
      ['Time', 'Product', 'SKU', 'Type', 'Quantity', 'Status'],
      ...activities.map(a => [a.time, a.product, a.sku, a.type, a.qty, a.status])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">My Recent Activity</h3>
            <p className="text-xs text-slate-500">{activities.length} transactions logged</p>
          </div>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-600 bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold">Product</th>
                <th className="py-3 px-4 font-semibold">SKU</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="font-medium">No activities yet</p>
                    <p className="text-xs">Your transactions will appear here</p>
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <ActivityRow key={activity.id} {...activity} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ActivityRow = ({ time, product, sku, type, qty, status }) => {
  const getTypeStyle = (type) => {
    switch (type) {
      case "STOCK IN":
        return "bg-emerald-100 text-emerald-700";
      case "STOCK OUT":
        return "bg-blue-100 text-blue-700";
      case "AUDIT":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "STOCK IN":
        return <ArrowUpCircle className="w-3 h-3" />;
      case "STOCK OUT":
        return <ArrowDownCircle className="w-3 h-3" />;
      case "AUDIT":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-2 text-slate-600">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          {time}
        </div>
      </td>
      <td className="py-3 px-4 font-medium text-slate-800">{product}</td>
      <td className="py-3 px-4 text-slate-600 font-mono text-xs">{sku}</td>
      <td className="py-3 px-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getTypeStyle(type)}`}>
          {getTypeIcon(type)}
          {type}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className={`font-semibold ${
          type === "STOCK IN" ? "text-emerald-600" : 
          type === "STOCK OUT" ? "text-blue-600" : 
          "text-slate-600"
        }`}>
          {type === "STOCK IN" && "+"}
          {type === "STOCK OUT" && "-"}
          {qty}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-medium ${getStatusStyle(status)}`}>
          {getStatusIcon(status)}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>
    </tr>
  );
};

const Panel = ({ children, noPadding = false, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm ${noPadding ? '' : 'p-5'} ${className}`}>
    {children}
  </div>
);

export default WarehouseStaffDashboard;
