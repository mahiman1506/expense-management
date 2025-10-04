// Dashboard Router: Redirect based on role
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EmployeeDashboard from '../components/EmployeeDashboard';
import ManagerDashboard from '../components/ManagerDashboard';
import AdminDashboard from '../components/AdminDashboard';

export default function DashboardRouter() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Get user from localStorage
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

    const role = user.role;

    if (role === 'Admin') return <AdminDashboard user={user} />;
    if (role === 'Manager') return <ManagerDashboard user={user} />;
    if (role === 'Employee') return <EmployeeDashboard user={user} />;

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-lg text-red-500">Invalid user role: {role}</div>
        </div>
    );
}
