import mongoose from 'mongoose';
interface DateRange {
    startDate?: string;
    endDate?: string;
}
declare class DashboardService {
    private buildDateFilter;
    getSummary(range: DateRange): Promise<any>;
    getCategoryBreakdown(range: DateRange): Promise<{
        category: any;
        total: any;
        count: any;
        percentage: number;
    }[]>;
    getMonthlyTrends(range: DateRange): Promise<any[]>;
    getRecentActivity(): Promise<(mongoose.Document<unknown, {}, import("../transactions/transaction.model").ITransaction, {}, {}> & import("../transactions/transaction.model").ITransaction & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getWeeklySummary(range: DateRange): Promise<{
        day: string;
        income: any;
        expenses: any;
    }[]>;
}
export declare const dashboardService: DashboardService;
export {};
//# sourceMappingURL=dashboard.service.d.ts.map