export interface Event {
  id: string;
  eventName: string;
  startDate: string;
  endDate: string;
  recurrence: {
    interval: number;
    frequency: 'day' | 'week' | 'month';
  };
}
