import { Response, NextFunction } from 'express';
import { AuthRequest } from './authenticate';
type Role = 'viewer' | 'analyst' | 'admin';
export declare const authorize: (...roles: Role[]) => (req: AuthRequest, _res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=authorize.d.ts.map