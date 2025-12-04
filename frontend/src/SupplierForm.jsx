import React, { useState, useEffect } from "react";

export default function SupplierForm({ close, onSave, editData }) {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  });

  // Load data when editing
  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name.trim() ||
        !formData.company.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim()) 
    {
      alert("⚠ Please fill all required fields!");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fadeIn">
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b pb-2">
          {editData ? "Edit Supplier" : "Add Supplier"}
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <input
            name="name"
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Supplier Name *"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="company"
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Company Name *"
            value={formData.company}
            onChange={handleChange}
          />

          <input
            name="email"
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />

          <input
            name="phone"
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Phone *"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            name="address"
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <select
            name="status"
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            value={formData.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={close}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow"
          >
            {editData ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
