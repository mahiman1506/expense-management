// Expense History Component
'use client';
import { useEffect, useState } from 'react';
import apiService from '../services/api';

export default function ExpenseHistory({ userId }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchHistory() {
            setLoading(true);
            setError('');
            try {
                const data = await apiService.expanseHistory(userId);
                console.log(data)
                setHistory(data);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        }
        if (userId) fetchHistory();
    }, [userId]);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Approved': return 'status-approved';
            case 'Rejected': return 'status-rejected';
            default: return 'status-pending';
        }
    };

    return (
        <div className="card">
            <h2 className="text-xl font-bold mb-4">Expense History</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && (
                <div className="space-y-4">
                    {history.length === 0 ? (
                        <p className="text-gray-500 text-center">No expenses found</p>
                    ) : (
                        history.map(expense => (
                            <div key={expense.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold">{expense.category}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {expense.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">{expense.amount} {expense.currency}</p>
                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(expense.status)}`}>
                                            {expense.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Date: {new Date(expense.date).toLocaleDateString()}
                                </div>
                                {expense.ApprovalWorkflows && expense.ApprovalWorkflows.length > 0 && (
                                    <div className="mt-2">
                                        <h4 className="text-sm font-semibold">Approval History:</h4>
                                        <ul className="text-xs space-y-1">
                                            {expense.ApprovalWorkflows.map(workflow => (
                                                <li key={workflow.id} className="flex justify-between">
                                                    <span>{workflow.Approver?.name || 'Unknown'}</span>
                                                    <span className={getStatusClass(workflow.status)}>
                                                        {workflow.status}
                                                    </span>
                                                </li>
                                            ))}
                                            {/* Only show employee name in manager side */}
                                            {expense.employee && expense.employee.name && (userId && expense.employee.id !== userId) && (
                                                <li key={expense.id}>
                                                    <strong>Employee name : {expense.employee.name}</strong>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
