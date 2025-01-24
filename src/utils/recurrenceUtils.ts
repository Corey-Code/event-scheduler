export const calculateNextOccurrence = (
  startDate: string,
  frequency: 'day' | 'week' | 'month',
  interval: number
): string => {
  const date = new Date(startDate);

  switch (frequency) {
    case 'day':
      date.setDate(date.getDate() + interval);
      break;
    case 'week':
      date.setDate(date.getDate() + interval * 7);
      break;
    case 'month':
      date.setMonth(date.getMonth() + interval);
      break;
    default:
      throw new Error('Unsupported frequency');
  }

  return date.toISOString();
};
