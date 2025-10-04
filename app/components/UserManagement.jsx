// User Management Component (Admin)
'use client';
import { useEffect, useState } from 'react';
import apiService from '../services/api';

export default function UserManagement({ companyId }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Employee'
    });

    useEffect(() => {
        async function fetchUsers() {
            setLoading(true);
            setError('');
            try {
                const data = await apiService.getUsers();
                // Filter users by company (if backend supports it)
                setUsers(data);
            } catch (err) {
                setError(err.message);
            }
            setLoading(false);
        }
        fetchUsers();
    }, []);

    async function handleCreateUser(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await apiService.createUser({
                ...newUser,
                companyId
            });
            setSuccess('User created successfully!');
            setNewUser({ name: '', email: '', password: '', role: 'Employee' });
            // Refresh users list
            const data = await apiService.getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <div className="card">
            <h2 className="text-xl font-bold mb-4">User Management</h2>

            {/* Create New User Form */}
            <form onSubmit={handleCreateUser} className="mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
                <h3 className="text-lg font-semibold mb-3">Create New User</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={newUser.name}
                            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                            className="input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            value={newUser.email}
                            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                            className="input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                            className="input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Role</label>
                        <select
                            value={newUser.role}
                            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                            className="input"
                        >
                            <option value="Employee">Employee</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="btn mt-4">
                    {loading ? 'Creating...' : 'Create User'}
                </button>
            </form>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}

            {/* Users List */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Company Users</h3>
                {loading && <p className="text-center">Loading...</p>}
                {!loading && (
                    <div className="space-y-2">
                        {users.length === 0 ? (
                            <p className="text-gray-500 text-center">No users found</p>
                        ) : (
                            users.map(user => (
                                <div key={user.id} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <div>
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                                            user.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
