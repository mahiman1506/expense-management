// Employee Dashboard
'use client';
import ExpenseForm from './ExpenseForm';
import ExpenseHistory from './ExpenseHistory';

export default function EmployeeDashboard({ user }) {
    return (
        <div className="flex flex-col gap-8 p-4 w-full mx-auto">
            <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
            <ExpenseForm userId={user.id} />
            <ExpenseHistory userId={user.id} />
        </div>
    );
}
