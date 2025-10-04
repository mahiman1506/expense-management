// Currency Converter Component
'use client';
import { useEffect, useState } from 'react';

export default function CurrencyConverter({ baseCurrency }) {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchRates() {
            setLoading(true);
            setError('');
            try {
                // Mock exchange rates for demo purposes
                const mockRates = {
                    'USD': { 'EUR': 0.85, 'GBP': 0.73, 'INR': 83.0 },
                    'EUR': { 'USD': 1.18, 'GBP': 0.86, 'INR': 97.6 },
                    'GBP': { 'USD': 1.37, 'EUR': 1.16, 'INR': 113.7 },
                    'INR': { 'USD': 0.012, 'EUR': 0.010, 'GBP': 0.0088 }
                };

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setRates(mockRates[baseCurrency] || {});
            } catch (err) {
                setError('Failed to fetch exchange rates');
            }
            setLoading(false);
        }
        if (baseCurrency) fetchRates();
    }, [baseCurrency]);

    if (!baseCurrency) return null;

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold mb-3">Currency Conversion ({baseCurrency})</h4>
            {loading && <p className="text-center text-gray-500">Loading exchange rates...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && Object.keys(rates).length > 0 && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(rates).map(([currency, rate]) => (
                        <div key={currency} className="flex justify-between">
                            <span className="font-medium">{currency}:</span>
                            <span>{rate.toFixed(4)}</span>
                        </div>
                    ))}
                </div>
            )}
            <p className="text-xs text-gray-500 mt-2">
                * Exchange rates are for demonstration purposes only
            </p>
        </div>
    );
}
