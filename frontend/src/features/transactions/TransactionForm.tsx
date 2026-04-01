import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsApi } from '../../api/transactions.api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const transactionSchema = z.object({
  amount: z.coerce.number().positive('Amount must be greater than 0'),
  type: z.enum(['income', 'expense'], { required_error: 'Type is required' }),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().optional(),
  notes: z.string().optional()
});

export const TransactionForm = ({ transaction, categories, onClose }) => {
  const queryClient = useQueryClient();
  const isEditing = !!transaction;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: transaction?.amount || '',
      type: transaction?.type || 'expense',
      category: transaction?.category || '',
      date: transaction?.date || new Date().toISOString().split('T')[0],
      description: transaction?.description || '',
      notes: transaction?.notes || ''
    }
  });

  const typeValue = watch('type');

  const createMutation = useMutation({
    mutationFn: transactionsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Transaction created');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => transactionsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transaction updated');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update');
    }
  });

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (data: any) => {
    if (isEditing) {
      updateMutation.mutate({ id: transaction._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-testid="transaction-form">
      {/* Amount */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-overline font-medium text-muted-foreground">
          Amount
        </Label>
        <Input
          type="number"
          step="0.01"
          placeholder="0.00"
          className="h-12"
          {...register('amount')}
          data-testid="transaction-amount-input"
        />
        {errors.amount && (
          <p className="text-sm text-destructive">{errors.amount.message}</p>
        )}
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-overline font-medium text-muted-foreground">
          Type
        </Label>
        <RadioGroup
          value={typeValue}
          onValueChange={(value) => setValue('type', value as 'income' | 'expense')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="income" id="income" data-testid="transaction-type-income" />
            <Label htmlFor="income" className="text-emerald-600 dark:text-emerald-400 font-medium">
              Income
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expense" id="expense" data-testid="transaction-type-expense" />
            <Label htmlFor="expense" className="text-red-600 dark:text-red-400 font-medium">
              Expense
            </Label>
          </div>
        </RadioGroup>
        {errors.type && (
          <p className="text-sm text-destructive">{errors.type.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-overline font-medium text-muted-foreground">
          Category
        </Label>
        <Input
          placeholder="e.g., Salary, Food, Utilities"
          list="categories-list"
          {...register('category')}
          data-testid="transaction-category-input"
        />
        <datalist id="categories-list">
          {categories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-overline font-medium text-muted-foreground">
          Date
        </Label>
        <Input
          type="date"
          {...register('date')}
          data-testid="transaction-date-input"
        />
        {errors.date && (
          <p className="text-sm text-destructive">{errors.date.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-overline font-medium text-muted-foreground">
          Description
        </Label>
        <Input
          placeholder="Brief description"
          {...register('description')}
          data-testid="transaction-description-input"
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-overline font-medium text-muted-foreground">
          Notes
        </Label>
        <Textarea
          placeholder="Additional notes..."
          rows={3}
          {...register('notes')}
          data-testid="transaction-notes-input"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} data-testid="transaction-cancel-button">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} data-testid="transaction-submit-button">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            isEditing ? 'Update Transaction' : 'Create Transaction'
          )}
        </Button>
      </div>
    </form>
  );
};
