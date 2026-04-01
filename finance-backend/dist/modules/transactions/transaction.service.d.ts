import { PaginationOptions } from '../../utils/pagination';
import { CreateTransactionInput, UpdateTransactionInput } from './transaction.schema';
declare class TransactionService {
    create(data: CreateTransactionInput, userId: string): Promise<Omit<import("mongoose").Document<unknown, {}, import("./transaction.model").ITransaction, {}, {}> & import("./transaction.model").ITransaction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, never>>;
    findAll(query: any, pagination: PaginationOptions): Promise<{
        transactions: (import("mongoose").Document<unknown, {}, import("./transaction.model").ITransaction, {}, {}> & import("./transaction.model").ITransaction & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./transaction.model").ITransaction, {}, {}> & import("./transaction.model").ITransaction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, data: UpdateTransactionInput): Promise<import("mongoose").Document<unknown, {}, import("./transaction.model").ITransaction, {}, {}> & import("./transaction.model").ITransaction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    softDelete(id: string): Promise<import("mongoose").Document<unknown, {}, import("./transaction.model").ITransaction, {}, {}> & import("./transaction.model").ITransaction & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getCategories(): Promise<string[]>;
}
export declare const transactionService: TransactionService;
export {};
//# sourceMappingURL=transaction.service.d.ts.map