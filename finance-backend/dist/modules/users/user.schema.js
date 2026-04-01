"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100).optional(),
    role: zod_1.z.enum(['viewer', 'analyst', 'admin']).optional(),
    status: zod_1.z.enum(['active', 'inactive']).optional(),
});
//# sourceMappingURL=user.schema.js.map