const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  householdId: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupUnit', default: null },
  createdAt: { type: Date, default: Date.now }
});

const groupUnitSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  inviteCode: { type: String, required: true, unique: true, uppercase: true, minlength: 6, maxlength: 6 },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
  wasteScore: { type: Number, min: 0, max: 100, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const stockItemSchema = new mongoose.Schema({
  householdId: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupUnit', required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['produce', 'dairy', 'meat', 'pantry', 'frozen', 'other'] },
  quantity: { type: Number, default: 1 },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ['fresh', 'expiring-soon', 'expired', 'used', 'wasted'], default: 'fresh' }
}, { timestamps: true });

module.exports = {
  Account: mongoose.model('Account', accountSchema),
  GroupUnit: mongoose.model('GroupUnit', groupUnitSchema),
  StockItem: mongoose.model('StockItem', stockItemSchema)
};