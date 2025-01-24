import { Event } from '../models/event';
import { calculateNextOccurrence } from '../utils/recurrenceUtils';

let events: Event[] = [];

export const createEvent = (event: Event): Event => {
  event.id = generateEventId();
  events.push(event);
  return event;
};

export const updateEvent = (
  id: string,
  updatedEvent: Partial<Event>
): Event | null => {
  const index = events.findIndex((event) => event.id === id);
  if (index === -1) throw { status: 404, message: 'Event not found' };

  events[index] = { ...events[index], ...updatedEvent };
  return events[index];
};

export const deleteEvent = (id: string): boolean => {
  const index = events.findIndex((event) => event.id === id);
  if (index === -1) throw { status: 404, message: 'Event not found' };

  events.splice(index, 1);
  return true;
};

export const getEventById = (id: string): Event | null => {
  return events.find((event) => event.id === id) || null;
};

export const getAllEvents = (): Event[] => {
  return events;
};

export const executeJob = (event: Event): void => {
  const now = new Date();
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  if (now >= start && now <= end) {
    // DEBUG rough
    console.log(`Executing job for event: ${event.eventName}`);
    console.log(`Start Date: ${event.startDate}, End Date: ${event.endDate}`);
    console.log(
      `Recurrence: ${event.recurrence.interval} ${event.recurrence.frequency}`
    );
  }

  // Handle recurrence logic
  if (now < end) {
    const nextOccurrence = calculateNextOccurrence(
      event.startDate,
      event.recurrence.frequency,
      event.recurrence.interval
    );
    console.log(`Next occurrence will be on: ${nextOccurrence}`);
  }
};

const generateEventId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
