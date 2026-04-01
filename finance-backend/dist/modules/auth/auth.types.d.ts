export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface JwtPayload {
    userId: string;
    role: string;
}
export interface RefreshPayload {
    userId: string;
    type: 'refresh';
}
//# sourceMappingURL=auth.types.d.ts.map