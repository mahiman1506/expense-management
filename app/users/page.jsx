// Users Page Component
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserManagement from '../components/UserManagement';

export default function UsersPage() {
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

    // Only admins can access user management page
    if (user.role !== 'Admin') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-red-500">Access Denied: Only administrators can manage users.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">User Management</h1>
                <UserManagement companyId={user.companyId} />
            </div>
        </div>
    );
}