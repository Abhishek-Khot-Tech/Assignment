import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export declare class ApiResponse {
    static success<T>(res: Response, data: T, message?: string, statusCode?: StatusCodes, meta?: PaginationMeta): Response<any, Record<string, any>>;
    static created<T>(res: Response, data: T, message?: string): Response<any, Record<string, any>>;
    static paginated<T>(res: Response, data: T[], total: number, page: number, limit: number, message?: string): Response<any, Record<string, any>>;
}
export {};
//# sourceMappingURL=ApiResponse.d.ts.map