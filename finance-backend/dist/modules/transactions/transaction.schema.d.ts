import { z } from 'zod';
export declare const createTransactionSchema: z.ZodObject<{
    amount: z.ZodNumber;
    type: z.ZodEnum<["income", "expense"]>;
    category: z.ZodString;
    date: z.ZodString;
    notes: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    description: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type?: "income" | "expense";
    date?: string;
    description?: string;
    amount?: number;
    category?: string;
    notes?: string;
}, {
    type?: "income" | "expense";
    date?: string;
    description?: string;
    amount?: number;
    category?: string;
    notes?: string;
}>;
export declare const updateTransactionSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<["income", "expense"]>>;
    category: z.ZodOptional<z.ZodString>;
    date: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "income" | "expense";
    date?: string;
    description?: string;
    amount?: number;
    category?: string;
    notes?: string;
}, {
    type?: "income" | "expense";
    date?: string;
    description?: string;
    amount?: number;
    category?: string;
    notes?: string;
}>;
export declare const transactionQuerySchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["income", "expense"]>>;
    category: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    minAmount: z.ZodOptional<z.ZodString>;
    maxAmount: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    type?: "income" | "expense";
    search?: string;
    limit?: string;
    page?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    category?: string;
    startDate?: string;
    endDate?: string;
    minAmount?: string;
    maxAmount?: string;
}, {
    type?: "income" | "expense";
    search?: string;
    limit?: string;
    page?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    category?: string;
    startDate?: string;
    endDate?: string;
    minAmount?: string;
    maxAmount?: string;
}>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
//# sourceMappingURL=transaction.schema.d.ts.map