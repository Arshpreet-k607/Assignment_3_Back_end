import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/eventController";
import { validateRequest } from "../middleware/validateRequest";
import {
  createEventSchema,
  updateEventSchema,
} from "../validation/eventValidation";

const router = Router();

/**
 * @openapi
 * /api/v1/events:
 *   post:
 *     tags:
 *       - Events
 *     summary: Create a new event
 *     description: Creates a new event in the Event Registration API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventCreateInput'
 *     responses:
 *       201:
 *         description: Event created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Failed to create event.
 */
router.post("/", validateRequest(createEventSchema), createEvent);

/**
 * @openapi
 * /api/v1/events:
 *   get:
 *     tags:
 *       - Events
 *     summary: List all events
 *     description: Returns a list of all events.
 *     responses:
 *       200:
 *         description: A list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Failed to fetch events.
 */
router.get("/", getAllEvents);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get an event by ID
 *     description: Fetches a single event by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event.
 *     responses:
 *       200:
 *         description: Event found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Failed to fetch event.
 */
router.get("/:id", getEventById);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   put:
 *     tags:
 *       - Events
 *     summary: Update an existing event
 *     description: Updates an event with new details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventUpdateInput'
 *     responses:
 *       200:
 *         description: Event updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation error.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Failed to update event.
 */
router.put("/:id", validateRequest(updateEventSchema), updateEvent);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Delete an event
 *     description: Deletes an event permanently.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event to delete.
 *     responses:
 *       200:
 *         description: Event deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Failed to delete event.
 */
router.delete("/:id", deleteEvent);

export default router;
