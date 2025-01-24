import { Request, Response } from 'express';
import * as eventService from '../services/eventService';
import { eventSchema } from '../validators/eventValidator';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { error } = eventSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    const event = req.body;
    const createdEvent = await eventService.createEvent(event);
    console.log('createdEvent', createdEvent);
    res.status(201).json(createdEvent);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'An error occurred while creating the event',
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { error } = eventSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    const eventId = req.params.id;
    const updatedEvent = req.body;
    const result = await eventService.updateEvent(eventId, updatedEvent);
    if (result) {
      res.json(result);
    } else {
      res.status(404).send({ status: 404, message: 'Event not found' });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: 'An error occurred while updating the event',
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const success = await eventService.deleteEvent(eventId);
    if (success) {
      res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await eventService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  const events = await eventService.getAllEvents();
  return res.json(events);
};
