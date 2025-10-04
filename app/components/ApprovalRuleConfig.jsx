// Approval Rule Configuration Component (Admin)
'use client';
import { useState } from 'react';

export default function ApprovalRuleConfig({ companyId }) {
    const [type, setType] = useState('Percentage');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // For now, just show a success message since we don't have approval rule API yet
            setSuccess('Approval rule configuration feature coming soon!');
            setValue('');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <div className="card">
            <h2 className="text-xl font-bold mb-4">Approval Rule Configuration</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
                Configure approval workflows for your company's expense policies.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="form-label">Rule Type</label>
                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="input"
                    >
                        <option value="Percentage">Percentage Based</option>
                        <option value="SpecificApprover">Specific Approver</option>
                        <option value="Hybrid">Hybrid (Percentage + Specific)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Rule Value</label>
                    <input
                        type="text"
                        placeholder="e.g., 60, CFO, 60|CFO"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        className="input"
                        required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        {type === 'Percentage' && 'Enter percentage threshold (e.g., 60)'}
                        {type === 'SpecificApprover' && 'Enter role name (e.g., CFO)'}
                        {type === 'Hybrid' && 'Enter percentage|role (e.g., 60|CFO)'}
                    </p>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}

                <button type="submit" disabled={loading} className="btn">
                    {loading ? 'Setting Rule...' : 'Set Approval Rule'}
                </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <h3 className="font-semibold mb-2">Current Rules:</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Default: Manager approval required for all expenses
                </p>
            </div>
        </div>
    );
}
