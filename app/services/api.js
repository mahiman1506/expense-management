// API Service for Frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiService {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Authentication
    async login(email, password) {
        return this.request('/auth', {
            method: 'POST',
            body: JSON.stringify({ type: 'login', email, password }),
        });
    }

    async signup(name, email, password, country, currency) {
        return this.request('/auth', {
            method: 'POST',
            body: JSON.stringify({ type: 'signup', name, email, password, country, currency }),
        });
    }

    // Users
    async getUsers() {
        return this.request('/users');
    }

    async createUser(userData) {
        return this.request('/users', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    // Expenses
    async getExpenses(userId = null, status = null) {
        const params = new URLSearchParams();
        if (userId) params.append('userId', userId);
        if (status) params.append('status', status);

        const queryString = params.toString();
        return this.request(`/expenses${queryString ? `?${queryString}` : ''}`);
    }

    async createExpense(expenseData) {
        return this.request('/expenses', {
            method: 'POST',
            body: JSON.stringify(expenseData),
        });
    }

    async updateExpense(id, updates) {
        return this.request(`/expenses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }

    // Approvals
    async getApprovals(approverId) {
        return this.request(`/approvals?approverId=${approverId}`);
    }

    async updateApproval(id, status, comment = '') {
        return this.request(`/approvals/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status, comment }),
        });
    }

    // Companies
    async getCompanies() {
        return this.request('/companies');
    }
}

export default new ApiService();
