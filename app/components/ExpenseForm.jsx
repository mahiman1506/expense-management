// Expense Submission Form (Employee)
'use client';
import { useState } from 'react';
import CurrencyConverter from './CurrencyConverter';
import apiService from '../services/api';

export default function ExpenseForm({ userId }) {
    const [fields, setFields] = useState({
        amount: '',
        currency: 'USD',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [receipt, setReceipt] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleReceipt(e) {
        setLoading(true);
        const file = e.target.files[0];
        if (file) {
            setReceipt(file);
            // TODO: Implement OCR logic here
        }
        setLoading(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await apiService.createExpense({
                ...fields,
                userId,
                amount: parseFloat(fields.amount)
            });
            setSuccess('Expense submitted successfully!');
            setFields({
                amount: '',
                currency: 'USD',
                category: '',
                description: '',
                date: new Date().toISOString().split('T')[0]
            });
            setReceipt(null);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <div className="card">
            <h2 className="text-xl font-bold mb-4">Submit New Expense</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="form-group">
                    <label className="form-label">Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={fields.amount}
                        onChange={e => setFields({ ...fields, amount: e.target.value })}
                        className="input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Currency</label>
                    <select
                        value={fields.currency}
                        onChange={e => setFields({ ...fields, currency: e.target.value })}
                        className="input"
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="INR">INR</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                        value={fields.category}
                        onChange={e => setFields({ ...fields, category: e.target.value })}
                        className="input"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Travel">Travel</option>
                        <option value="Meals">Meals</option>
                        <option value="Office Supplies">Office Supplies</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Accommodation">Accommodation</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        placeholder="Describe the expense..."
                        value={fields.description}
                        onChange={e => setFields({ ...fields, description: e.target.value })}
                        className="input"
                        rows="3"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        value={fields.date}
                        onChange={e => setFields({ ...fields, date: e.target.value })}
                        className="input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Receipt (Optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleReceipt}
                        className="input"
                    />
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}

                <button type="submit" disabled={loading} className="btn">
                    {loading ? 'Submitting...' : 'Submit Expense'}
                </button>
            </form>

            {/* Currency conversion UI */}
            <div className="mt-6">
                <CurrencyConverter baseCurrency={fields.currency} />
            </div>
        </div>
    );
}
