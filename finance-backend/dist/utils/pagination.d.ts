export interface PaginationOptions {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}
export declare const parsePagination: (query: any) => PaginationOptions;
export declare const getSkip: (page: number, limit: number) => number;
//# sourceMappingURL=pagination.d.ts.map