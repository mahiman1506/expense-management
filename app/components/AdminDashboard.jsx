// Admin Dashboard
'use client';
import UserManagement from './UserManagement';
import ApprovalRuleConfig from './ApprovalRuleConfig';
import ExpenseHistory from './ExpenseHistory';

export default function AdminDashboard({ user }) {
    return (
        <div className="flex flex-col gap-8 p-4 w-full max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold">Admin: {user.name}</h1>
            <UserManagement companyId={user.companyId} />
            <ApprovalRuleConfig companyId={user.companyId} />
            <ExpenseHistory userId={user.id} />
        </div>
    );
}
