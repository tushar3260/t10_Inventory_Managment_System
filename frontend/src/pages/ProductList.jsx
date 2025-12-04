import React, { useState } from 'react';
import { Search, Plus, Package, TrendingUp, TrendingDown, Edit2, Eye, Trash2, AlertCircle } from 'lucide-react';

const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sample product data
  const [products, setProducts] = useState([
    {
      id: 1,
      image: '📱',
      name: 'iPhone 14 Pro',
      sku: 'APL-IP14P-128',
      category: 'Electronics',
      price: 99999,
      quantity: 15,
      supplier: 'Apple Inc',
      minStock: 10,
      status: 'OK'
    },
    {
      id: 2,
      image: '💻',
      name: 'MacBook Air M2',
      sku: 'APL-MBA-M2',
      category: 'Electronics',
      price: 114900,
      quantity: 5,
      supplier: 'Apple Inc',
      minStock: 8,
      status: 'Low'
    },
    {
      id: 3,
      image: '🎧',
      name: 'AirPods Pro',
      sku: 'APL-APP-2',
      category: 'Accessories',
      price: 24900,
      quantity: 0,
      supplier: 'Apple Inc',
      minStock: 20,
      status: 'Out of Stock'
    },
    {
      id: 4,
      image: '⌚',
      name: 'Apple Watch Series 9',
      sku: 'APL-AW9-GPS',
      category: 'Electronics',
      price: 41900,
      quantity: 12,
      supplier: 'Apple Inc',
      minStock: 10,
      status: 'OK'
    },
    {
      id: 5,
      image: '⌨️',
      name: 'Magic Keyboard',
      sku: 'APL-MK-BLK',
      category: 'Accessories',
      price: 9900,
      quantity: 25,
      supplier: 'Apple Inc',
      minStock: 15,
      status: 'OK'
    },
    {
      id: 6,
      image: '🖱️',
      name: 'Magic Mouse',
      sku: 'APL-MM-WHT',
      category: 'Accessories',
      price: 7900,
      quantity: 3,
      supplier: 'Apple Inc',
      minStock: 10,
      status: 'Low'
    },
    {
      id: 7,
      image: '🔌',
      name: 'USB-C Charging Cable',
      sku: 'APL-USBC-1M',
      category: 'Accessories',
      price: 1900,
      quantity: 50,
      supplier: 'Apple Inc',
      minStock: 30,
      status: 'OK'
    },
    {
      id: 8,
      image: '📱',
      name: 'iPhone 15',
      sku: 'APL-IP15-256',
      category: 'Electronics',
      price: 79900,
      quantity: 8,
      supplier: 'Apple Inc',
      minStock: 12,
      status: 'Low'
    }
  ]);

  const categories = ['all', 'Electronics', 'Accessories'];
  const suppliers = ['all', 'Apple Inc', 'Samsung', 'Dell'];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesSupplier = supplierFilter === 'all' || product.supplier === supplierFilter;
    return matchesSearch && matchesCategory && matchesSupplier;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch(status) {
      case 'OK': return 'text-green-600 bg-green-50';
      case 'Low': return 'text-yellow-600 bg-yellow-50';
      case 'Out of Stock': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Products</h1>
            <p className="text-gray-500 mt-1">Manage your inventory products</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <TrendingUp size={18} />
              Stock In
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
              <TrendingDown size={18} />
              Stock Out
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              <Plus size={18} />
              Add New Product
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">{products.length}</p>
              </div>
              <Package className="text-blue-600" size={32} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {products.filter(p => p.status === 'Low').length}
                </p>
              </div>
              <AlertCircle className="text-yellow-600" size={32} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.status === 'Out of Stock').length}
                </p>
              </div>
              <AlertCircle className="text-red-600" size={32} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Value</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="text-green-600" size={32} />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Suppliers</option>
              {suppliers.filter(s => s !== 'all').map(sup => (
                <option key={sup} value={sup}>{sup}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">SKU</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Supplier</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Min Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="text-3xl">{product.image}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{product.name}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600 font-mono">{product.sku}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-800">₹{product.price.toLocaleString()}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`font-semibold ${product.quantity === 0 ? 'text-red-600' : product.quantity < product.minStock ? 'text-yellow-600' : 'text-gray-800'}`}>
                        {product.quantity}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600">{product.supplier}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600">{product.minStock}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-blue-50 rounded transition" title="View">
                          <Eye size={18} className="text-blue-600" />
                        </button>
                        <button className="p-1 hover:bg-green-50 rounded transition" title="Edit">
                          <Edit2 size={18} className="text-green-600" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-1 hover:bg-red-50 rounded transition" 
                          title="Delete"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;