// Approval Page Component
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ApprovalQueue from '../components/ApprovalQueue';

export default function ApprovalPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            router.push('/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        } catch (error) {
            console.error('Error parsing user data:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect to login
    }

    // Only managers and admins can access approval page
    if (user.role !== 'Manager' && user.role !== 'Admin') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-red-500">Access Denied: You don't have permission to view this page.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Pending Approvals</h1>
                <ApprovalQueue approverId={user.id} />
            </div>
        </div>
    );
}