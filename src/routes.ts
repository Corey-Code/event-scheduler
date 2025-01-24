import express from 'express';
import * as eventController from './controllers/eventController';
import { errorHandler } from './middleware/errorHandler';

const router = express.Router();

// Create an event
router.post('/events', async (req, res, next) => {
  try {
    await eventController.createEvent(req, res);
  } catch (err) {
    next(err);
  }
});

// Update an event
router.put('/events/:id', async (req, res, next) => {
  try {
    await eventController.updateEvent(req, res);
  } catch (err) {
    next(err);
  }
});

// Delete an event
router.delete('/events/:id', async (req, res, next) => {
  try {
    await eventController.deleteEvent(req, res);
  } catch (err) {
    next(err);
  }
});

// Get a specific event
router.get('/events/:id', async (req, res, next) => {
  try {
    await eventController.getEventById(req, res);
  } catch (err) {
    next(err);
  }
});

// Get all events
router.get('/events', async (req, res, next) => {
  try {
    await eventController.getAllEvents(req, res);
  } catch (err) {
    next(err);
  }
});

// Error handler middleware should be placed after the routes
router.use(errorHandler);

export default router;
