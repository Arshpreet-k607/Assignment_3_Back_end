import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import * as eventService from "../services/eventService";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const created = await eventService.createEvent(req.body);
    res.status(HTTP_STATUS.CREATED).json(created);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in createEvent controller", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to create event",
    });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(HTTP_STATUS.OK).json(events);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in getAllEvents controller", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch events",
    });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    res.status(HTTP_STATUS.OK).json(event);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in getEventById controller", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch event",
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body);
    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    res.status(HTTP_STATUS.OK).json(event);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in updateEvent controller", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update event",
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const deleted = await eventService.deleteEvent(req.params.id);
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
      return;
    }

    res.status(HTTP_STATUS.OK).json({ message: "Event deleted" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in deleteEvent controller", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to delete event",
    });
  }
};
