import Joi from 'joi';

export const eventSchema = Joi.object({
  eventName: Joi.string().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
  recurrence: Joi.object({
    interval: Joi.number().integer().min(1).required(),
    frequency: Joi.valid('day', 'week', 'month').required(),
  }).required(),
});
