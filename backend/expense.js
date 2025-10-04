const express = require('express');
const { Expense, ExpenseHistory } = require('../db/models');
const router = express.Router();

router.post('/', async (req, res) => {
    const { userId, amount, currency, category, description, date } = req.body;
    const expense = await Expense.create({ userId, amount, currency, category, description, date });
    await ExpenseHistory.create({ expenseId: expense.id, status: 'Pending', changedBy: userId, comment: 'Submitted' });
    res.json({ expense });
});

router.get('/', async (req, res) => {
    const { userId } = req.query;
    const expenses = await Expense.findAll({ where: { userId }, include: [ExpenseHistory] });
    res.json({ expenses });
});

module.exports = router;
