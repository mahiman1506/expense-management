-- Expense Management System Database Setup (MariaDB Compatible)
-- This SQL file creates the complete database schema

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `expense-management` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `expense-management`;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS `ExpenseHistories`;
DROP TABLE IF EXISTS `ApprovalWorkflows`;
DROP TABLE IF EXISTS `ApprovalRules`;
DROP TABLE IF EXISTS `Expenses`;
DROP TABLE IF EXISTS `EmployeeManagers`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Companies`;

-- Create Companies table
CREATE TABLE `Companies` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `currency` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_company_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Users table
CREATE TABLE `Users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('Admin', 'Manager', 'Employee') NOT NULL,
  `companyId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  INDEX `idx_user_email` (`email`),
  INDEX `idx_user_company` (`companyId`),
  INDEX `idx_user_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create EmployeeManagers table
CREATE TABLE `EmployeeManagers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `employeeId` INT NOT NULL,
  `managerId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`employeeId`) REFERENCES `Users`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`managerId`) REFERENCES `Users`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE KEY `unique_employee_manager` (`employeeId`, `managerId`),
  INDEX `idx_employee` (`employeeId`),
  INDEX `idx_manager` (`managerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Expenses table
CREATE TABLE `Expenses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `amount` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'USD',
  `category` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `date` DATE NOT NULL,
  `status` ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
  `userId` INT NOT NULL,
  `receiptPath` VARCHAR(500) NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  INDEX `idx_expense_user` (`userId`),
  INDEX `idx_expense_status` (`status`),
  INDEX `idx_expense_date` (`date`),
  INDEX `idx_expense_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create ApprovalWorkflows table
CREATE TABLE `ApprovalWorkflows` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `sequence` INT NOT NULL,
  `approverId` INT NOT NULL,
  `expenseId` INT NOT NULL,
  `isManagerApprover` BOOLEAN DEFAULT FALSE,
  `status` ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
  `comment` TEXT,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`approverId`) REFERENCES `Users`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`expenseId`) REFERENCES `Expenses`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  INDEX `idx_workflow_approver` (`approverId`),
  INDEX `idx_workflow_expense` (`expenseId`),
  INDEX `idx_workflow_status` (`status`),
  INDEX `idx_workflow_sequence` (`sequence`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create ApprovalRules table
CREATE TABLE `ApprovalRules` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` ENUM('Percentage', 'SpecificApprover', 'Hybrid') NOT NULL,
  `value` VARCHAR(255),
  `companyId` INT NOT NULL,
  `isActive` BOOLEAN DEFAULT TRUE,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`companyId`) REFERENCES `Companies`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  INDEX `idx_rule_company` (`companyId`),
  INDEX `idx_rule_type` (`type`),
  INDEX `idx_rule_active` (`isActive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create ExpenseHistories table
CREATE TABLE `ExpenseHistories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `expenseId` INT NOT NULL,
  `status` ENUM('Pending', 'Approved', 'Rejected') NOT NULL,
  `changedBy` INT NOT NULL,
  `comment` TEXT,
  `changedAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`expenseId`) REFERENCES `Expenses`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`changedBy`) REFERENCES `Users`(`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  INDEX `idx_history_expense` (`expenseId`),
  INDEX `idx_history_changed_by` (`changedBy`),
  INDEX `idx_history_changed_at` (`changedAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default company
INSERT INTO `Companies` (`name`, `country`, `currency`) VALUES 
('Admin Company', 'USA', 'USD');

-- Insert default admin user (password: admin123)
INSERT INTO `Users` (`name`, `email`, `password`, `role`, `companyId`) VALUES 
('System Administrator', 'admin@expense.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 1);

-- Insert sample approval rule
INSERT INTO `ApprovalRules` (`type`, `value`, `companyId`, `isActive`) VALUES 
('Percentage', '100', 1, TRUE);

-- Create views for easier querying
CREATE VIEW `ExpenseDetails` AS
SELECT 
    e.id,
    e.amount,
    e.currency,
    e.category,
    e.description,
    e.date,
    e.status,
    e.createdAt,
    u.name as userName,
    u.email as userEmail,
    u.role as userRole,
    c.name as companyName,
    c.country as companyCountry
FROM `Expenses` e
JOIN `Users` u ON e.userId = u.id
JOIN `Companies` c ON u.companyId = c.id;

CREATE VIEW `ApprovalQueue` AS
SELECT 
    aw.id as workflowId,
    aw.sequence,
    aw.status as workflowStatus,
    aw.comment,
    aw.createdAt as workflowCreatedAt,
    e.id as expenseId,
    e.amount,
    e.currency,
    e.category,
    e.description,
    e.date as expenseDate,
    e.status as expenseStatus,
    u.name as employeeName,
    u.email as employeeEmail,
    approver.name as approverName,
    approver.email as approverEmail,
    approver.role as approverRole
FROM `ApprovalWorkflows` aw
JOIN `Expenses` e ON aw.expenseId = e.id
JOIN `Users` u ON e.userId = u.id
JOIN `Users` approver ON aw.approverId = approver.id
WHERE aw.status = 'Pending'
ORDER BY aw.sequence ASC, aw.createdAt ASC;

-- Show completion message
SELECT 'Database setup completed successfully!' as Status;
SELECT 'Default admin user created: admin@expense.com / admin123' as AdminInfo;
SELECT 'Database: expense-management' as DatabaseInfo;