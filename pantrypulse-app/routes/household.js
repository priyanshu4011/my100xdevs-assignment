const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const auth = require('../middleware/auth');
const { GroupUnit, Account } = require('../models/schemas');

router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const code = crypto.randomBytes(3).toString('hex').toUpperCase();

    const group = await GroupUnit.create({ name, inviteCode: code, members: [req.userId] });
    await Account.findByIdAndUpdate(req.userId, { householdId: group._id });
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create workspace unit.' });
  }
});

router.post('/join', auth, async (req, res) => {
  try {
    const { inviteCode } = req.body;
    const group = await GroupUnit.findOne({ inviteCode: inviteCode.trim().toUpperCase() });
    if (!group) return res.status(404).json({ error: 'Passcode not found.' });

    if (group.members.includes(req.userId)) return res.status(400).json({ error: 'Already inside group.' });

    group.members.push(req.userId);
    await group.save();

    await Account.findByIdAndUpdate(req.userId, { householdId: group._id });
    res.json({ message: 'Sync complete.', household: group });
  } catch (err) {
    res.status(500).json({ error: 'Linkage error encountered.' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await Account.findById(req.userId);
    if (!user.householdId) return res.status(404).json({ error: 'No group assigned.' });
    const group = await GroupUnit.findById(user.householdId);
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: 'Query failed.' });
  }
});

router.get('/:id/members', auth, async (req, res) => {
  try {
    const group = await GroupUnit.findById(req.params.id).populate('members', 'name email');
    res.json(group.members);
  } catch (err) {
    res.status(500).json({ error: 'Serialization failure.' });
  }
});

module.exports = router;