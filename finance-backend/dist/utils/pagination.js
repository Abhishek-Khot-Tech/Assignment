"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSkip = exports.parsePagination = void 0;
const parsePagination = (query) => {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
    return { page, limit, sortBy, sortOrder };
};
exports.parsePagination = parsePagination;
const getSkip = (page, limit) => {
    return (page - 1) * limit;
};
exports.getSkip = getSkip;
//# sourceMappingURL=pagination.js.map