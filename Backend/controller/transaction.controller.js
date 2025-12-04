import Transaction from "../models/transaction.model.js";
import Product from "../models/product.model.js";
export const getTransactions = async (req, res) => {
  try {
    const result = await Transaction.find()
      .populate("product")
      .sort({ createdAt: -1 });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const createTransaction = async (req, res) => {
  try {
    const { productId, type, qty, note } = req.body;

    // Validation
    if (!productId || !type || !qty) {
      return res.status(400).json({ error: "productId, type and qty are required" });
    }

    if (!["IN", "OUT"].includes(type)) {
      return res.status(400).json({ error: "type must be either IN or OUT" });
    }

    const quantity = Number(qty);
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Optional: update stock if manual transaction
    if (type === "IN") product.quantity += quantity;
    if (type === "OUT") {
      if (product.quantity < quantity)
        return res.status(400).json({ error: "Not enough stock" });
      product.quantity -= quantity;
    }

    await product.save();

    // Create transaction
    const transaction = await Transaction.create({
      product: productId,
      type,
      qty: quantity,
      note,
    });

    res.json({ message: "Transaction created", transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};