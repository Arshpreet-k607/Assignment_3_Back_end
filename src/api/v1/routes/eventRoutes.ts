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

router.post("/", validateRequest(createEventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", validateRequest(updateEventSchema), updateEvent);
router.delete("/:id", deleteEvent);

export default router;
