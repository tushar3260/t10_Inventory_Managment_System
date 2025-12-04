import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

export default mongoose.model("Supplier", supplierSchema);
