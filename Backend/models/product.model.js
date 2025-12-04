import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    imgUrl: { type: String },
    category: { type: String },     // simple string
    supplier: { type: String },     // simple string
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    lowThreshold: { type: Number, default: 5 }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
