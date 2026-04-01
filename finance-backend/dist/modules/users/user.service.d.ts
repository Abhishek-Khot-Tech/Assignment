import { PaginationOptions } from '../../utils/pagination';
import { UpdateUserInput } from './user.schema';
declare class UserService {
    findAll(pagination: PaginationOptions): Promise<{
        users: (import("mongoose").Document<unknown, {}, import("./user.model").IUser, {}, {}> & import("./user.model").IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./user.model").IUser, {}, {}> & import("./user.model").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, data: UpdateUserInput): Promise<import("mongoose").Document<unknown, {}, import("./user.model").IUser, {}, {}> & import("./user.model").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    softDelete(id: string): Promise<import("mongoose").Document<unknown, {}, import("./user.model").IUser, {}, {}> & import("./user.model").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
export declare const userService: UserService;
export {};
//# sourceMappingURL=user.service.d.ts.map