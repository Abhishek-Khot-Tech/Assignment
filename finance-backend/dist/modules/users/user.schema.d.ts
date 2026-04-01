import { z } from 'zod';
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["viewer", "analyst", "admin"]>>;
    status: z.ZodOptional<z.ZodEnum<["active", "inactive"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "inactive";
    name?: string;
    role?: "viewer" | "analyst" | "admin";
}, {
    status?: "active" | "inactive";
    name?: string;
    role?: "viewer" | "analyst" | "admin";
}>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
//# sourceMappingURL=user.schema.d.ts.map