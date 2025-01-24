import request from 'supertest';
import app from '../app'; // Import the Express app

// Sample event data to use in tests
const newEvent = {
  eventName: 'Morning Scene',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  recurrence: {
    interval: 1,
    frequency: 'day',
  },
};

let createdEventId: string;

describe('Event Scheduler API', () => {
  // Test creating a new event
  it('should create a new event', async () => {
    const response = await request(app)
      .post('/api/events')
      .send(newEvent)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.eventName).toBe(newEvent.eventName);
    createdEventId = response.body.id; // Store the ID for further tests
  });

  // Test fetching all events
  it('should return all events', async () => {
    const response = await request(app).get('/api/events');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); // There should be at least 1 event
  });

  // Test fetching a specific event by ID
  it('should return a specific event by ID', async () => {
    const response = await request(app).get(`/api/events/${createdEventId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdEventId);
    expect(response.body.eventName).toBe(newEvent.eventName);
  });

  // Test updating an event
  it('should update an existing event', async () => {
    const updatedEvent = { ...newEvent, eventName: 'Updated Scene' };
    const response = await request(app)
      .put(`/api/events/${createdEventId}`)
      .send(updatedEvent)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.eventName).toBe('Updated Scene');
  });

  // Test deleting an event
  it('should delete an existing event', async () => {
    const response = await request(app).delete(`/api/events/${createdEventId}`);

    expect(response.status).toBe(204); // No content expected after successful deletion
  });

  // Test fetching a non-existent event (should return 404)
  it('should return 404 for non-existent event', async () => {
    const nonExistentEventId = 'non-existent-id';

    const response = await request(app)
      .get(`/api/events/${nonExistentEventId}`) // Adjust based on your route
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Event not found'); // Corrected to check message field
  });

  // Test validation errors when creating an event with invalid data
  it('should return validation error when event data is invalid', async () => {
    const invalidEvent = { ...newEvent, startDate: 'invalid-date' };

    const response = await request(app)
      .post('/api/events')
      .send(invalidEvent)
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      '"startDate" must be in ISO 8601 date format'
    );
  });
});
