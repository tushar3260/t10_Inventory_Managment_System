const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  transactionType: {
    type: String,
    enum: ['STOCK IN', 'STOCK OUT', 'AUDIT'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    enum: ['sale', 'transfer', 'return', 'sample', 'damaged', 'theft', 'mismatch', 'expired', 'purchase'],
    required: function() {
      return this.transactionType === 'STOCK OUT' || this.transactionType === 'AUDIT';
    }
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  location: {
    type: String
  },
  orderId: {
    type: String
  },
  notes: {
    type: String
  },
  remarks: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['success', 'pending', 'failed'],
    default: 'success'
  },
  previousQuantity: {
    type: Number
  },
  newQuantity: {
    type: Number
  }
}, {
  timestamps: true
});

// Index for faster queries
transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ productId: 1, createdAt: -1 });
transactionSchema.index({ transactionType: 1, createdAt: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
