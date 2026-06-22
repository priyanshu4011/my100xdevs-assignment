const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { StockItem, Account } = require('../models/schemas');

router.get('/stats', auth, async (req, res) => {
  try {
    const user = await Account.findById(req.userId);
    const hId = user.householdId;

    const fresh = await StockItem.countDocuments({ householdId: hId, status: 'fresh' });
    const expiringSoon = await StockItem.countDocuments({ householdId: hId, status: 'expiring-soon' });
    const expired = await StockItem.countDocuments({ householdId: hId, status: 'expired' });

    const used = await StockItem.countDocuments({ householdId: hId, status: 'used' });
    const wasted = await StockItem.countDocuments({ householdId: hId, status: 'wasted' });
    const total = used + wasted;

    const wasteScore = total > 0 ? Math.round((used / total) * 100) : 0;

    res.json({
      badges: { fresh, expiringSoon, expired },
      wasteScore
    });
  } catch (err) {
    res.status(500).json({ error: 'Analytical metrics aggregation fault.' });
  }
});

router.get('/expiring', auth, async (req, res) => {
  try {
    const user = await Account.findById(req.userId);
    const limit = new Date();
    limit.setHours(limit.getHours() + 24);

    const alerts = await StockItem.find({
      householdId: user.householdId,
      expiryDate: { $gte: new Date(), $lte: limit },
      status: { $nin: ['used', 'wasted'] }
    });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Alert pipeline error.' });
  }
});

module.exports = router;