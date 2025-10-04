// Next.js Server Action: Approval Workflow & Rules
import { ApprovalWorkflow, ApprovalRule, Expense, ExpenseHistory, User } from '../../db/models';

export async function createApprovalWorkflow({ expenseId, approvers }) {
    // approvers: [{ userId, sequence, isManagerApprover }]
    for (const a of approvers) {
        await ApprovalWorkflow.create({ expenseId, approverId: a.userId, sequence: a.sequence, isManagerApprover: !!a.isManagerApprover });
    }
}

export async function approveExpense({ workflowId, approverId, comment }) {
    const workflow = await ApprovalWorkflow.findByPk(workflowId);
    workflow.status = 'Approved';
    workflow.comment = comment;
    await workflow.save();
    await ExpenseHistory.create({ expenseId: workflow.expenseId, status: 'Approved', changedBy: approverId, comment });
    // Move to next approver logic here
}

export async function rejectExpense({ workflowId, approverId, comment }) {
    const workflow = await ApprovalWorkflow.findByPk(workflowId);
    workflow.status = 'Rejected';
    workflow.comment = comment;
    await workflow.save();
    await ExpenseHistory.create({ expenseId: workflow.expenseId, status: 'Rejected', changedBy: approverId, comment });
}

export async function setApprovalRule({ companyId, type, value }) {
    return ApprovalRule.create({ companyId, type, value });
}

export async function getPendingApprovals(approverId) {
    return ApprovalWorkflow.findAll({ where: { approverId, status: 'Pending' }, include: [Expense] });
}
