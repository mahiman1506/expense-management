// Next.js Server Action: Role Permissions
export const permissions = {
    Admin: [
        'create_company', 'manage_users', 'set_roles', 'configure_approval_rules', 'view_all_expenses', 'override_approvals'
    ],
    Manager: [
        'approve_reject_expenses', 'view_team_expenses', 'escalate_expenses'
    ],
    Employee: [
        'submit_expenses', 'view_own_expenses', 'check_approval_status'
    ]
};
