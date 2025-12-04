const Transaction = require('../models/Transaction');
const Product = require('../models/Product');

// Get Staff Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Today's Stock In count
    const todayStockIn = await Transaction.countDocuments({
      transactionType: 'STOCK IN',
      createdAt: { $gte: today }
    });

    // Today's Stock Out count
    const todayStockOut = await Transaction.countDocuments({
      transactionType: 'STOCK OUT',
      createdAt: { $gte: today }
    });

    // Pending Audits
    const pendingAudits = await Transaction.countDocuments({
      transactionType: 'AUDIT',
      status: 'pending'
    });

    // My Transactions (for this user)
    const myTransactions = await Transaction.countDocuments({
      userId: userId,
      createdAt: { $gte: today }
    });

    res.json({
      success: true,
      data: {
        todayStockIn,
        todayStockOut,
        pendingAudits,
        myTransactions
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message
    });
  }
};

// Search Product by SKU
exports.searchProduct = async (req, res) => {
  try {
    const { sku } = req.query;

    if (!sku) {
      return res.status(400).json({
        success: false,
        message: 'SKU is required'
      });
    }

    const product = await Product.findOne({ sku: sku });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: {
        name: product.name,
        sku: product.sku,
        location: product.location || 'Not assigned',
        stock: product.currentQuantity,
        price: product.price,
        category: product.category
      }
    });
  } catch (error) {
    console.error('Error searching product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search product',
      error: error.message
    });
  }
};

// Record Stock In
exports.recordStockIn = async (req, res) => {
  try {
    const { sku, supplierId, quantity, location, notes } = req.body;
    const userId = req.user._id;
    const userName = req.user.email;

    // Validate required fields
    if (!sku || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'SKU and quantity are required'
      });
    }

    // Find product
    const product = await Product.findOne({ sku });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const previousQuantity = product.currentQuantity;
    const newQuantity = previousQuantity + parseInt(quantity);

    // Update product quantity
    product.currentQuantity = newQuantity;
    if (location) {
      product.location = location;
    }
    await product.save();

    // Create transaction record
    const transaction = await Transaction.create({
      productId: product._id,
      productName: product.name,
      sku: product.sku,
      transactionType: 'STOCK IN',
      quantity: parseInt(quantity),
      reason: 'purchase',
      supplierId,
      location,
      notes,
      userId,
      userName,
      status: 'success',
      previousQuantity,
      newQuantity
    });

    res.status(201).json({
      success: true,
      message: 'Stock In recorded successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Error recording stock in:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record stock in',
      error: error.message
    });
  }
};

// Record Stock Out
exports.recordStockOut = async (req, res) => {
  try {
    const { sku, reason, quantity, orderId, notes } = req.body;
    const userId = req.user._id;
    const userName = req.user.email;

    // Validate required fields
    if (!sku || !quantity || !reason) {
      return res.status(400).json({
        success: false,
        message: 'SKU, quantity, and reason are required'
      });
    }

    // Find product
    const product = await Product.findOne({ sku });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const previousQuantity = product.currentQuantity;
    const requestedQuantity = parseInt(quantity);

    // Check if sufficient stock
    if (previousQuantity < requestedQuantity) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Available: ${previousQuantity}, Requested: ${requestedQuantity}`
      });
    }

    const newQuantity = previousQuantity - requestedQuantity;

    // Update product quantity
    product.currentQuantity = newQuantity;
    await product.save();

    // Create transaction record
    const transaction = await Transaction.create({
      productId: product._id,
      productName: product.name,
      sku: product.sku,
      transactionType: 'STOCK OUT',
      quantity: requestedQuantity,
      reason,
      orderId,
      notes,
      userId,
      userName,
      status: 'success',
      previousQuantity,
      newQuantity
    });

    res.status(201).json({
      success: true,
      message: 'Stock Out recorded successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Error recording stock out:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record stock out',
      error: error.message
    });
  }
};

// Record Audit/Adjustment
exports.recordAudit = async (req, res) => {
  try {
    const { sku, physicalCount, reason, remarks } = req.body;
    const userId = req.user._id;
    const userName = req.user.email;

    // Validate required fields
    if (!sku || physicalCount === undefined || !reason || !remarks) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Find product
    const product = await Product.findOne({ sku });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const previousQuantity = product.currentQuantity;
    const newQuantity = parseInt(physicalCount);
    const difference = newQuantity - previousQuantity;

    // Update product quantity
    product.currentQuantity = newQuantity;
    await product.save();

    // Create transaction record
    const transaction = await Transaction.create({
      productId: product._id,
      productName: product.name,
      sku: product.sku,
      transactionType: 'AUDIT',
      quantity: Math.abs(difference),
      reason,
      remarks,
      userId,
      userName,
      status: 'pending', // Audits require approval
      previousQuantity,
      newQuantity
    });

    res.status(201).json({
      success: true,
      message: 'Audit adjustment recorded successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Error recording audit:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record audit',
      error: error.message
    });
  }
};

// Get My Activity
exports.getMyActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit = 10, page = 1 } = req.query;

    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate('productId', 'name sku category');

    const total = await Transaction.countDocuments({ userId });

    res.json({
      success: true,
      data: {
        transactions,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity',
      error: error.message
    });
  }
};
