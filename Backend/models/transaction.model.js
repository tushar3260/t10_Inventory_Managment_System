import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    type: { type: String, enum: ["IN", "OUT"], required: true },
    qty: Number,
    note: String,
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
