const express = require('express');
const { User, EmployeeManager } = require('../db/models');
const router = express.Router();

router.post('/', async (req, res) => {
    const { action, ...data } = req.body;
    if (action === 'create') {
        // ... hash password, create user
        return res.json({ success: true });
    } else if (action === 'assignManager') {
        await EmployeeManager.create(data);
        return res.json({ success: true });
    } else if (action === 'changeRole') {
        const user = await User.findByPk(data.userId);
        user.role = data.role;
        await user.save();
        return res.json({ user });
    }
    res.status(400).json({ error: 'Invalid action' });
});

router.get('/', async (req, res) => {
    const { companyId } = req.query;
    const users = await User.findAll({ where: { companyId } });
    res.json({ users });
});

module.exports = router;
