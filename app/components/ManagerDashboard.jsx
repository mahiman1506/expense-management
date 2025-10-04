// Manager Dashboard
'use client';
import ApprovalQueue from './ApprovalQueue';
import ExpenseHistory from './ExpenseHistory';

export default function ManagerDashboard({ user }) {
    return (
        <div className="flex flex-col gap-8 p-4 w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold">Manager: {user.name}</h1>
            <ApprovalQueue approverId={user.id} />
            <ExpenseHistory userId={user.id} />
        </div>
    );
}
