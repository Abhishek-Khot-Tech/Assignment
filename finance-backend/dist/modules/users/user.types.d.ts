export type UserRole = 'viewer' | 'analyst' | 'admin';
export type UserStatus = 'active' | 'inactive';
export interface UserFilter {
    role?: UserRole;
    status?: UserStatus;
}
//# sourceMappingURL=user.types.d.ts.map