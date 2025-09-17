export const formatXRP = (amount: string): string => {
  const num = parseFloat(amount);
  return `${num.toLocaleString()} XRP`;
};

export const formatAddress = (address: string): string => {
  if (address.length <= 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const calculateInterest = (
  principal: number,
  rate: number,
  timeInDays: number
): number => {
  // Simple interest calculation
  return (principal * rate * timeInDays) / (365 * 100);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};