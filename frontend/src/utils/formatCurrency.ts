"export const formatCurrency = (value, currency = 'USD') => {
  if (value === null || value === undefined) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatCompactCurrency = (value, currency = 'USD') => {
  if (value === null || value === undefined) return '$0';
  
  if (Math.abs(value) >= 1000000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  }
  
  return formatCurrency(value, currency);
};
"