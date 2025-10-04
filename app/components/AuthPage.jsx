// Responsive Auth Page
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage({ backendUrl = 'http://localhost:3001/api/auth' }) {
    const [isSignup, setIsSignup] = useState(false);
    const [fields, setFields] = useState({ name: '', email: '', password: '', country: '', currency: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: isSignup ? 'signup' : 'login',
                    ...fields
                })
            });
            console.log(res);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Error');

            // Save user data to localStorage and redirect
            localStorage.setItem('user', JSON.stringify(data.user));
            if (data.company) {
                localStorage.setItem('company', JSON.stringify(data.company));
            }

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-4">
                <h2 className="text-2xl font-bold mb-2 text-center">{isSignup ? 'Sign Up' : 'Login'}</h2>
                {isSignup && (
                    <input type="text" suppressHydrationWarning placeholder="Name" value={fields.name} onChange={e => setFields({ ...fields, name: e.target.value })} className="input" />
                )}
                <input type="email" suppressHydrationWarning placeholder="Email" value={fields.email} onChange={e => setFields({ ...fields, email: e.target.value })} className="input" />
                <input type="password" suppressHydrationWarning placeholder="Password" value={fields.password} onChange={e => setFields({ ...fields, password: e.target.value })} className="input" />
                {isSignup && (
                    <input type="text" suppressHydrationWarning placeholder="Country" value={fields.country} onChange={e => setFields({ ...fields, country: e.target.value })} className="input" />
                )}
                {isSignup && (
                    <input type="text" suppressHydrationWarning placeholder="Currency" value={fields.currency} onChange={e => setFields({ ...fields, currency: e.target.value })} className="input" />
                )}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button type="submit" suppressHydrationWarning className="btn" disabled={loading}>{isSignup ? 'Sign Up' : 'Login'}</button>
                {/* <button type="button"suppressHydrationWarning className="text-blue-500 underline" onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? 'Already have an account? Login' : 'No account? Sign Up'}
                </button> */}

                <div className="mt-4 text-center">
                    {/* Toggle button */}
                    <button
                        type="button"
                        suppressHydrationWarning
                        className="text-blue-500 underline"
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup ? 'Already have an account? Login' : 'No account? Sign Up'}
                    </button>

                    {/* Forgot Password (only on login) */}
                    {!isSignup && (
                        <div className="mt-2">
                            <Link href={"/forgot-password"}>
                                <button
                                    type="button"
                                    suppressHydrationWarning
                                    className="text-blue-500 underline text-sm"
                                    // onClick={handleForgotPassword} // define this function
                                >
                                    Forgot Password?
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

            </form>
        </div>
    );
}
