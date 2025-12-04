import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    sku: { type: String, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    price: Number,
    quantity: { type: Number, default: 0 },
    lowThreshold: { type: Number, default: 5 }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
