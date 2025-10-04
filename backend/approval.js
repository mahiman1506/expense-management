const express = require('express');
const { ApprovalWorkflow, ApprovalRule, Expense, ExpenseHistory, User } = require('../db/models');
const router = express.Router();

router.post('/', async (req, res) => {
    const { action, ...data } = req.body;
    if (action === 'approve') {
        const { workflowId, approverId, comment } = data;
        const workflow = await ApprovalWorkflow.findByPk(workflowId);
        workflow.status = 'Approved';
        workflow.comment = comment;
        await workflow.save();
        await ExpenseHistory.create({ expenseId: workflow.expenseId, status: 'Approved', changedBy: approverId, comment });
        return res.json({ success: true });
    } else if (action === 'reject') {
        const { workflowId, approverId, comment } = data;
        const workflow = await ApprovalWorkflow.findByPk(workflowId);
        workflow.status = 'Rejected';
        workflow.comment = comment;
        await workflow.save();
        await ExpenseHistory.create({ expenseId: workflow.expenseId, status: 'Rejected', changedBy: approverId, comment });
        return res.json({ success: true });
    }
    res.status(400).json({ error: 'Invalid action' });
});

router.get('/', async (req, res) => {
    const { approverId } = req.query;
    const approvals = await ApprovalWorkflow.findAll({ where: { approverId, status: 'Pending' }, include: [Expense] });
    res.json({ approvals });
});

module.exports = router;
