import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (dateString, formatStr = 'MMM d, yyyy') => {
  if (!dateString) return '';

  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    if (!isValid(date)) return dateString;
    return format(date, formatStr);
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString) => {
  return formatDate(dateString, 'MMM d, yyyy h:mm a');
};

export const formatShortDate = (dateString) => {
  return formatDate(dateString, 'MMM d');
};

export const formatMonthYear = (dateString) => {
  return formatDate(dateString, 'MMM yyyy');
};

export const formatInputDate = (dateString) => {
  return formatDate(dateString, 'yyyy-MM-dd');
};

export const getMonthName = (monthStr) => {
  // Convert "2025-01" to "Jan"
  if (!monthStr) return '';
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return format(date, 'MMM');
};
