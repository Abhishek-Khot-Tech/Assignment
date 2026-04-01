import mongoose, { Document } from 'mongoose';
export interface ITransaction extends Document {
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: Date;
    notes: string;
    description: string;
    createdBy: mongoose.Types.ObjectId;
    deletedAt: Date | null;
}
export declare const Transaction: mongoose.Model<ITransaction, {}, {}, {}, mongoose.Document<unknown, {}, ITransaction, {}, {}> & ITransaction & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=transaction.model.d.ts.map