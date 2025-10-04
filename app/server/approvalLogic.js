// Approval Logic Helper: Move to next approver and apply conditional rules
import { ApprovalWorkflow, ApprovalRule, Expense, User } from '../../db/models';

export async function processNextApproval(expenseId) {
    // Get all workflows for this expense, ordered by sequence
    const workflows = await ApprovalWorkflow.findAll({ where: { expenseId }, order: [['sequence', 'ASC']] });
    const expense = await Expense.findByPk(expenseId);
    const rule = await ApprovalRule.findOne({ where: { companyId: expense.companyId } });

    // Check if any workflow is still pending
    const pending = workflows.find(w => w.status === 'Pending');
    if (pending) {
        // Assign to next approver
        // ...existing code...
        return { nextApproverId: pending.approverId };
    }

    // Apply conditional rules
    if (rule) {
        if (rule.type === 'Percentage') {
            const approved = workflows.filter(w => w.status === 'Approved').length;
            const percent = (approved / workflows.length) * 100;
            if (percent >= parseInt(rule.value)) {
                expense.status = 'Approved';
                await expense.save();
                return { status: 'Approved' };
            }
        } else if (rule.type === 'SpecificApprover') {
            let specific = false;
            for (const w of workflows) {
                const approver = await User.findByPk(w.approverId);
                if (approver.role === rule.value && w.status === 'Approved') {
                    specific = true;
                    break;
                }
            }
            if (specific) {
                expense.status = 'Approved';
                await expense.save();
                return { status: 'Approved' };
            }
        } else if (rule.type === 'Hybrid') {
            // Hybrid: e.g. '60|CFO'
            const [percentVal, roleVal] = rule.value.split('|');
            const approved = workflows.filter(w => w.status === 'Approved').length;
            const percent = (approved / workflows.length) * 100;
            let specific = false;
            for (const w of workflows) {
                const approver = await User.findByPk(w.approverId);
                if (approver.role === roleVal && w.status === 'Approved') {
                    specific = true;
                    break;
                }
            }
            if (percent >= parseInt(percentVal) || specific) {
                expense.status = 'Approved';
                await expense.save();
                return { status: 'Approved' };
            }
        }
    }
    // If not approved, set as rejected
    expense.status = 'Rejected';
    await expense.save();
    return { status: 'Rejected' };
}
