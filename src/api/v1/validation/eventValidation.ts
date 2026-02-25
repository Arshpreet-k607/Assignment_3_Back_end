import Joi, { Schema } from "joi";

export const createEventSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).optional(),
  date: Joi.string().isoDate().required(),
  location: Joi.string().min(2).max(200).required(),
  capacity: Joi.number().integer().min(1).max(10000).required(),
  category: Joi.string()
    .valid("conference", "workshop", "meetup", "webinar", "other")
    .required(),
  status: Joi.string().valid("draft", "published", "cancelled").default("draft"),
  isVirtual: Joi.boolean().default(false),
  organizerEmail: Joi.string().email().required(),
}).required();

export const updateEventSchema = createEventSchema.fork(
  [
    "name",
    "description",
    "date",
    "location",
    "capacity",
    "category",
    "status",
    "isVirtual",
    "organizerEmail",
  ],
  (schema: Schema) => schema.optional()
);
