import Product from "../models/product.model.js";
import Transaction from "../models/transaction.model.js";

export const stockIn = async (req, res) => {
  try {
    let { productId, qty, note } = req.body;

    qty = Number(qty); // ensure it's a number
    if (isNaN(qty) || qty <= 0)
      return res.status(400).json({ error: "Invalid quantity" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.quantity += qty;
    await product.save();

    await Transaction.create({ product: productId, type: "IN", qty, note });

    res.json({ message: "Stock updated", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const stockOut = async (req, res) => {
  try {
    const { productId, qty, note } = req.body;

    const product = await Product.findById(productId);

    if (product.quantity < qty)
      return res.status(400).json({ error: "Not enough stock" });

    product.quantity -= qty;
    await product.save();

    await Transaction.create({ product: productId, type: "OUT", qty, note });

    res.json({ message: "Stock decreased", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
