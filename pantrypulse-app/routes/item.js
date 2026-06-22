const express = require('express');
const router = express.Router();
const verifySession = require('../middleware/auth');
const { StockItem, Account } = require('../models/schemas');

// Expiry logic process matrix
const processExpiryTimeline = (targetDate) => {
  const temporalShift = new Date(targetDate) - new Date();
  const calculatedDays = Math.ceil(temporalShift / (1000 * 60 * 60 * 24));
  
  if (calculatedDays < 0) return 'expired';
  if (calculatedDays <= 3) return 'expiring-soon';
  return 'fresh';
};

// 1. POST -> Register new item entity
router.post('/', verifySession, async (req, res) => {
  try {
    const { name, category, expiryDate, quantity } = req.body;
    const clientNode = await Account.findById(req.userId);
    if (!clientNode.householdId) {
      return res.status(400).json({ error: 'Terminal must connect to a valid hub first.' });
    }

    const itemEntity = await StockItem.create({
      householdId: clientNode.householdId,
      addedBy: req.userId,
      name,
      category,
      expiryDate,
      quantity: quantity || 1,
      status: processExpiryTimeline(expiryDate)
    });
    res.status(201).json(itemEntity);
  } catch (err) {
    res.status(500).json({ error: 'Item registration parameters rejected by engine.' });
  }
});

// 2. GET -> List all live active items
router.get('/', verifySession, async (req, res) => {
  try {
    const clientNode = await Account.findById(req.userId);
    let filteringMatrix = { householdId: clientNode.householdId, status: { $in: ['fresh', 'expiring-soon', 'expired'] } };

    if (req.query.status) filteringMatrix.status = req.query.status;
    if (req.query.category) filteringMatrix.category = req.query.category;

    const queryStream = await StockItem.find(filteringMatrix).sort({ expiryDate: 1 });
    res.json(queryStream);
  } catch (err) {
    res.status(500).json({ error: 'Failed to query the live storage stack.' });
  }
});

// 3. PUT -> Mutate existing asset details
router.put('/:id', verifySession, async (req, res) => {
  try {
    const { name, category, expiryDate, quantity } = req.body;
    const alteredRecord = await StockItem.findByIdAndUpdate(
      req.params.id, 
      { name, category, expiryDate, quantity, status: processExpiryTimeline(expiryDate) }, 
      { new: true }
    );
    if (!alteredRecord) return res.status(404).json({ error: 'Item record not found.' });
    res.json(alteredRecord);
  } catch (err) {
    res.status(500).json({ error: 'Storage item mutation processing error.' });
  }
});

// 4. PATCH -> State machine update (used / wasted)
router.patch('/:id/status', verifySession, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['used', 'wasted'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status update type.' });
    }
    const synchronizedObject = await StockItem.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!synchronizedObject) return res.status(404).json({ error: 'Item record not found.' });
    res.json(synchronizedObject);
  } catch (err) {
    res.status(500).json({ error: 'State update failed.' });
  }
});

// 5. DELETE -> Purge item from nodes
router.delete('/:id', verifySession, async (req, res) => {
  try {
    const deletedItem = await StockItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: 'Item record not found.' });
    res.json({ message: 'Object wiped out of server nodes.' });
  } catch (err) {
    res.status(500).json({ error: 'Purge script terminated unexpectedly.' });
  }
});

module.exports = router;
