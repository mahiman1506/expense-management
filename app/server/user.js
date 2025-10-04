// Next.js Server Action: User & Role Management
import { User, EmployeeManager } from '../../db/models';

export async function createUser({ name, email, password, role, companyId }) {
    // ... hash password, create user
}

export async function assignManager({ employeeId, managerId }) {
    return EmployeeManager.create({ employeeId, managerId });
}

export async function changeRole({ userId, role }) {
    const user = await User.findByPk(userId);
    user.role = role;
    await user.save();
    return user;
}

export async function getUsers(companyId) {
    return User.findAll({ where: { companyId } });
}
