import * as eventService from "../src/api/v1/services/eventService";
import * as eventRepository from "../src/api/v1/repositories/eventRepository";
import { Event } from "../src/api/v1/models/event";

jest.mock("../src/api/v1/repositories/eventRepository");

const mockEvent: Event = {
  id: "abc123",
  name: "Tech Summit",
  description: "A full day event about modern tech trends.",
  date: "2026-03-20T10:00:00.000Z",
  location: "Winnipeg",
  capacity: 250,
  category: "conference",
  status: "published",
  isVirtual: false,
  organizerEmail: "organizer@example.com",
  createdAt: "2026-03-01T10:00:00.000Z",
  updatedAt: "2026-03-01T10:00:00.000Z",
};

describe("eventService", () => {
  it("should create an event", async () => {
    (eventRepository.createEvent as jest.Mock).mockResolvedValue(mockEvent);

    const result = await eventService.createEvent({
      name: mockEvent.name,
      description: mockEvent.description,
      date: mockEvent.date,
      location: mockEvent.location,
      capacity: mockEvent.capacity,
      category: mockEvent.category,
      status: mockEvent.status,
      isVirtual: mockEvent.isVirtual,
      organizerEmail: mockEvent.organizerEmail,
    });

    expect(result).toEqual(mockEvent);
  });

  it("should fetch all events", async () => {
    (eventRepository.getAllEvents as jest.Mock).mockResolvedValue([mockEvent]);

    const result = await eventService.getAllEvents();

    expect(result).toEqual([mockEvent]);
  });

  it("should fetch event by id", async () => {
    (eventRepository.getEventById as jest.Mock).mockResolvedValue(mockEvent);

    const result = await eventService.getEventById("abc123");

    expect(result).toEqual(mockEvent);
  });

  it("should update an event", async () => {
    (eventRepository.updateEvent as jest.Mock).mockResolvedValue(mockEvent);

    const result = await eventService.updateEvent("abc123", {
      name: "Updated Event",
    });

    expect(result).toEqual(mockEvent);
  });

  it("should delete an event", async () => {
    (eventRepository.deleteEvent as jest.Mock).mockResolvedValue(true);

    const result = await eventService.deleteEvent("abc123");

    expect(result).toBe(true);
  });
});
