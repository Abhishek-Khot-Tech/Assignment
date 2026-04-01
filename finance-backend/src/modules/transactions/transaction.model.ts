import mongoose, { Schema, Document } from 'mongoose';

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

const transactionSchema = new Schema<ITransaction>(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be positive'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Transaction type is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
    notes: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        const { __v, ...result } = ret;
        return result;
      },
    },
  }
);

// Index for text search on notes and description
transactionSchema.index({ notes: 'text', description: 'text' });
// Index for filtering and sorting
transactionSchema.index({ date: -1, type: 1, category: 1 });
transactionSchema.index({ createdBy: 1 });

// Exclude soft-deleted by default
transactionSchema.pre(/^find/, function (this: any, next) {
  if (!this.getOptions().includeSoftDeleted) {
    this.where({ deletedAt: null });
  }
  next();
});

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);
