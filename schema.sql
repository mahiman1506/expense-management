-- Expense Management System Schema
-- Save as schema.sql in project root

CREATE TABLE Company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'employee') NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES Company(id)
);

CREATE TABLE EmployeeManager (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES User(id),
    FOREIGN KEY (manager_id) REFERENCES User(id)
);

CREATE TABLE Expense (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    description TEXT,
    receipt_url VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE ApprovalWorkflow (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expense_id INT NOT NULL,
    approver_id INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    comment TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (expense_id) REFERENCES Expense(id),
    FOREIGN KEY (approver_id) REFERENCES User(id)
);

CREATE TABLE ApprovalRule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    min_amount DECIMAL(12,2),
    max_amount DECIMAL(12,2),
    currency VARCHAR(10),
    required_role ENUM('admin', 'manager', 'employee'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES Company(id)
);

CREATE TABLE ExpenseHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    expense_id INT NOT NULL,
    action ENUM('created', 'submitted', 'approved', 'rejected', 'updated') NOT NULL,
    user_id INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comment TEXT,
    FOREIGN KEY (expense_id) REFERENCES Expense(id),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

-- Insert initial admin user
INSERT INTO Company (name, address) VALUES ('DemoCorp', '123 Main St');
INSERT INTO User (company_id, email, password_hash, role, name) VALUES (1, 'admin@democorp.com', '$2b$10$adminhash', 'admin', 'Admin User');
-- Replace $2b$10$adminhash with a real bcrypt hash for production
