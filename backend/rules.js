const express = require('express');
const { ApprovalRule } = require('../db/models');
const router = express.Router();

router.post('/', async (req, res) => {
    const { companyId, type, value } = req.body;
    await ApprovalRule.create({ companyId, type, value });
    res.json({ success: true });
});

module.exports = router;
