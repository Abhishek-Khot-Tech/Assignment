import { useQuery } from '@tanstack/react-query';
import { transactionsApi } from '../../api/transactions.api';

export const useTransactions = (params) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionsApi.getAll(params)
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => transactionsApi.getCategories()
  });
};
