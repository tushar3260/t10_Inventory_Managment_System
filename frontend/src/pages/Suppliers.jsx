import React, { useState, useEffect } from "react";
import SupplierForm from "./SupplierForm.jsx";


export default function Suppliers() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Default 10 suppliers
  const defaultSuppliers = [
    {
      id: 1,
      name: "Rohan Patel",
      company: "FreshMart Pvt Ltd",
      phone: "9988776655",
      email: "rohan@freshmart.com",
      address: "Mumbai, MH",
      status: "Active",
    },
    {
      id: 2,
      name: "Kavya Exports",
      company: "Kavya & Co.",
      phone: "9001122334",
      email: "sales@kavya.com",
      address: "Delhi",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Anil Sharma",
      company: "Alpha Traders",
      phone: "9821123344",
      email: "anil@alpha.com",
      address: "Jaipur, RJ",
      status: "Active",
    },
    {
      id: 4,
      name: "Sneha Kapoor",
      company: "SunBright Textiles",
      phone: "9812233445",
      email: "sneha@sunbright.com",
      address: "Surat, GJ",
      status: "Active",
    },
    {
      id: 5,
      name: "Vikas Menon",
      company: "Oceanic Foods",
      phone: "9933445566",
      email: "vikas@oceanicfoods.com",
      address: "Kochi, KL",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Priya Verma",
      company: "EverGreen Supply Co.",
      phone: "9881122334",
      email: "priya@evergreen.com",
      address: "Pune, MH",
      status: "Active",
    },
    {
      id: 7,
      name: "Manoj Singh",
      company: "Prime Hardware",
      phone: "8877665544",
      email: "manoj@primehardware.com",
      address: "Lucknow, UP",
      status: "Active",
    },
    {
      id: 8,
      name: "Aditi Joshi",
      company: "City Essentials",
      phone: "9122334455",
      email: "aditi@cityessentials.com",
      address: "Bangalore, KA",
      status: "Inactive",
    },
    {
      id: 9,
      name: "Ramesh Yadav",
      company: "Metro Distributors",
      phone: "9090909090",
      email: "ramesh@metro.com",
      address: "Hyderabad, TS",
      status: "Active",
    },
    {
      id: 10,
      name: "Neha Gupta",
      company: "QualityPro Services",
      phone: "9445566778",
      email: "neha@qualitypro.com",
      address: "Chennai, TN",
      status: "Active",
    },
    {
      id: 11,
      name: "Harshad Mehta",
      company: "BrightStar Electronics",
      phone: "9876543210",
      email: "harshad@brightstar.com",
      address: "Mumbai, MH",
      status: "Active"
    },
    {
      id: 12,
      name: "Pooja Rana",
      company: "GreenLeaf Organics",
      phone: "9345678123",
      email: "pooja@greenleaf.com",
      address: "Dehradun, UK",
      status: "Inactive"
    },
  ];

  // Load from localStorage or fallback to default
  const loadSuppliers = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("suppliers"));
      return saved && saved.length > 0 ? saved : defaultSuppliers;
    } catch {
      return defaultSuppliers;
    }
  };

  const [suppliers, setSuppliers] = useState(loadSuppliers);

  // Save updated list to localStorage
  useEffect(() => {
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
  }, [suppliers]);

  // Add supplier
  const handleAddSupplier = (data) => {
    setSuppliers([...suppliers, { id: Date.now(), ...data }]);
    setOpen(false);
  };

  // Delete supplier
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers(suppliers.filter((s) => s.id !== id));
    }
  };

  // Open edit mode
  const handleEdit = (supplier) => {
    setEditData(supplier);
    setOpen(true);
  };

  // Update supplier
  const handleUpdateSupplier = (updatedSupplier) => {
    setSuppliers(
      suppliers.map((s) => (s.id === updatedSupplier.id ? updatedSupplier : s))
    );
    setEditData(null);
    setOpen(false);
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Supplier Management</h1>

        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 shadow"
        >
          + Add Supplier
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Company</th>
              <th className="p-4 font-semibold">Phone</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{s.name}</td>
                <td className="p-4">{s.company}</td>
                <td className="p-4">{s.phone}</td>
                <td className="p-4">{s.email}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      s.status === "Active" ? "bg-green-600" : "bg-red-500"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                <td className="p-4 flex justify-center gap-3">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => handleEdit(s)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <SupplierForm
          close={() => setOpen(false)}
          onSave={editData ? handleUpdateSupplier : handleAddSupplier}
          editData={editData}
        />
      )}
    </div>
  );
}
