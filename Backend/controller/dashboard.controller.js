import Product from "../models/product.model.js";

export const dashboardData = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const lowStock = await Product.find({ 
      $expr: { $lte: ["$quantity", "$lowThreshold"] } 
    });

    const top5 = await Product.find()
      .sort({ quantity: -1 })
      .limit(5);

    res.json({ totalProducts, lowStock, top5 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
