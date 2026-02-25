import {
  createEvent as createEventRepo,
  deleteEvent as deleteEventRepo,
  getAllEvents as getAllEventsRepo,
  getEventById as getEventByIdRepo,
  updateEvent as updateEventRepo,
} from "../repositories/eventRepository";
import { EventCreateInput, EventUpdateInput } from "../models/event";

export const createEvent = async (payload: EventCreateInput) => {
  return createEventRepo(payload);
};

export const getAllEvents = async () => {
  return getAllEventsRepo();
};

export const getEventById = async (id: string) => {
  return getEventByIdRepo(id);
};

export const updateEvent = async (id: string, payload: EventUpdateInput) => {
  return updateEventRepo(id, payload);
};

export const deleteEvent = async (id: string) => {
  return deleteEventRepo(id);
};
