// Admin Dashboard
'use client';
import UserManagement from './UserManagement';
import ApprovalRuleConfig from './ApprovalRuleConfig';
import ExpenseHistory from './ExpenseHistory';

export default function AdminDashboard({ user }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10">
            <h1 className="text-2xl font-bold">Admin: {user.name}</h1>
            <UserManagement companyId={user.companyId} />
            <ApprovalRuleConfig companyId={user.companyId} />
            <ExpenseHistory userId={user.id} />
        </div>
    );
}
