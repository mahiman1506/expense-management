// Next.js Server Action: Signup/Login & Company Creation
import { Company, User } from '../../db/models';
import bcrypt from 'bcryptjs';

export async function signup({ name, email, password, country, currency }) {
    // Check if user exists
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error('User already exists');

    // Create company
    const company = await Company.create({ name: `${name}'s Company`, country, currency });

    // Create admin user
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role: 'Admin', companyId: company.id });

    return { user, company };
}

export async function login({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');
    return user;
}
