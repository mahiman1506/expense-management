# Expense Management System - Setup Instructions

## Overview
This is a complete expense management system with:
- **Frontend**: Next.js 15 with React 19 and Tailwind CSS
- **Backend**: Express.js API server
- **Database**: MySQL with Sequelize ORM
- **Features**: User authentication, expense submission, approval workflows, role-based access

## Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
1. Create a MySQL database named `expense_management`
2. Update database credentials in `config.js` or set environment variables:
   ```bash
   DB_HOST=localhost
   DB_NAME=expense_management
   DB_USER=root
   DB_PASS=your_password
   ```

### 3. Start the System

#### Option A: Start Both Frontend and Backend Together
```bash
npm run dev:full
```
This will start:
- Backend API server on http://localhost:3001
- Frontend Next.js app on http://localhost:3000

#### Option B: Start Separately
```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend  
npm run dev
```

### 4. Access the Application
- Open http://localhost:3000 in your browser
- The system will automatically redirect to login if not authenticated
- Create a new account or login with existing credentials

## API Endpoints

### Authentication
- `POST /api/auth` - Login/Signup

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Expenses
- `GET /api/expenses` - Get expenses (with optional userId, status filters)
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense

### Approvals
- `GET /api/approvals` - Get pending approvals for user
- `PUT /api/approvals/:id` - Approve/reject expense

### Companies
- `GET /api/companies` - Get all companies

## User Roles
- **Admin**: Full system access, user management, company settings
- **Manager**: Can approve expenses, view team expenses
- **Employee**: Can submit expenses, view own expense history

## Features
- ✅ User authentication (login/signup)
- ✅ Role-based dashboard routing
- ✅ Expense submission with categories
- ✅ Approval workflow system
- ✅ Currency support
- ✅ Responsive design
- ✅ Dark mode support

## File Structure
```
expense-management/
├── app/                    # Next.js frontend
│   ├── components/         # React components
│   ├── dashboard/          # Dashboard pages
│   ├── services/           # API service layer
│   └── globals.css         # Global styles
├── backend/                # Express.js backend
│   └── server.js           # Main server file
├── db/                     # Database files
│   ├── models.js           # Sequelize models
│   └── sequelize.js        # Database connection
└── config.js               # Configuration
```

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check database credentials in `config.js`
- Verify database exists

### Port Conflicts
- Backend runs on port 3001 by default
- Frontend runs on port 3000 by default
- Change ports in `config.js` if needed

### CORS Issues
- Backend has CORS enabled for all origins
- For production, configure specific origins

## Development Notes
- The system uses localStorage for session management (not production-ready)
- Database tables are auto-created on first run
- All API responses include proper error handling
- Frontend components are fully responsive
