import Joi, { Schema } from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - location
 *         - capacity
 *         - category
 *         - organizerEmail
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the event.
 *           example: "abc123"
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 100
 *           description: Human-readable name of the event.
 *           example: "TypeScript Workshop"
 *         description:
 *           type: string
 *           minLength: 10
 *           maxLength: 500
 *           description: Optional longer description of the event.
 *           example: "A hands-on workshop covering advanced TypeScript patterns."
 *         date:
 *           type: string
 *           format: date-time
 *           description: ISO 8601 date string for when the event starts.
 *           example: "2026-04-15T18:00:00.000Z"
 *         location:
 *           type: string
 *           description: Physical or virtual location of the event.
 *           example: "Online - Zoom"
 *         capacity:
 *           type: integer
 *           minimum: 1
 *           maximum: 10000
 *           description: Maximum number of attendees allowed.
 *           example: 100
 *         category:
 *           type: string
 *           description: Type of event.
 *           enum: [conference, workshop, meetup, webinar, other]
 *           example: "workshop"
 *         status:
 *           type: string
 *           description: Publication status of the event.
 *           enum: [draft, published, cancelled]
 *           example: "draft"
 *         isVirtual:
 *           type: boolean
 *           description: Whether the event is virtual.
 *           example: true
 *         organizerEmail:
 *           type: string
 *           format: email
 *           description: Contact email address for the organizer.
 *           example: "organizer@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the event was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the event was last updated.
 *     EventCreateInput:
 *       allOf:
 *         - $ref: '#/components/schemas/Event'
 *         - type: object
 *           required:
 *             - name
 *             - date
 *             - location
 *             - capacity
 *             - category
 *             - organizerEmail
 *           properties:
 *             id:
 *               readOnly: true
 *             createdAt:
 *               readOnly: true
 *             updatedAt:
 *               readOnly: true
 *     EventUpdateInput:
 *       allOf:
 *         - $ref: '#/components/schemas/EventCreateInput'
 *         - type: object
 *           description: Partial update of an event. All fields are optional.
 */

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
