// Approval Queue Component (Manager/Admin)
'use client';
import { useEffect, useState } from 'react';
import apiService from '../services/api';

export default function ApprovalQueue({ approverId }) {
    const [pending, setPending] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchPending() {
            setLoading(true);
            setError('');
            try {
                const data = await apiService.getApprovals(approverId);
                setPending(data);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        }
        if (approverId) fetchPending();
    }, [approverId]);

    async function handleApprove(id) {
        setLoading(true);
        try {
            await apiService.updateApproval(id, 'Approved', 'Approved');
            // Refresh the list
            const data = await apiService.getApprovals(approverId);
            setPending(data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    async function handleReject(id) {
        setLoading(true);
        try {
            await apiService.updateApproval(id, 'Rejected', 'Rejected');
            // Refresh the list
            const data = await apiService.getApprovals(approverId);
            setPending(data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <div className="card">
            <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && (
                <div className="space-y-4">
                    {pending.length === 0 ? (
                        <p className="text-gray-500 text-center">No pending approvals</p>
                    ) : (
                        pending.map(item => (
                            <div key={item.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold">
                                            Expense #{item.expenseId} - {item.Expense?.category}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {item.Expense?.description}
                                        </p>
                                        <p className="text-sm">
                                            Submitted by: {item.Expense?.User?.name}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">
                                            {item.Expense?.amount} {item.Expense?.currency}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(item.Expense?.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() => handleApprove(item.id)}
                                        disabled={loading}
                                        className="btn bg-green-600 hover:bg-green-700"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(item.id)}
                                        disabled={loading}
                                        className="btn bg-red-600 hover:bg-red-700"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
