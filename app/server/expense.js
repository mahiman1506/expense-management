// Next.js Server Action: Expense Submission & History
import { Expense, ExpenseHistory } from '../../db/models';

export async function submitExpense({ userId, amount, currency, category, description, date }) {
    const expense = await Expense.create({ userId, amount, currency, category, description, date });
    await ExpenseHistory.create({ expenseId: expense.id, status: 'Pending', changedBy: userId, comment: 'Submitted' });
    return expense;
}

export async function getExpenseHistory(userId) {
    return Expense.findAll({ where: { userId }, include: [ExpenseHistory] });
}
