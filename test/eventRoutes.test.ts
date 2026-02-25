import request from "supertest";
import app from "../src/app";
import { Event } from "../src/api/v1/models/event";
import * as eventService from "../src/api/v1/services/eventService";

jest.mock("../src/api/v1/services/eventService");

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

describe("Event API routes", () => {
  describe("GET /api/v1/health", () => {
    it("should return ok status", async () => {
      const res = await request(app).get("/api/v1/health");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: "ok" });
    });
  });

  describe("POST /api/v1/events", () => {
    it("should create an event with valid payload", async () => {
      (eventService.createEvent as jest.Mock).mockResolvedValue(mockEvent);

      const payload = {
        name: mockEvent.name,
        description: mockEvent.description,
        date: mockEvent.date,
        location: mockEvent.location,
        capacity: mockEvent.capacity,
        category: mockEvent.category,
        status: mockEvent.status,
        isVirtual: mockEvent.isVirtual,
        organizerEmail: mockEvent.organizerEmail,
      };

      const res = await request(app).post("/api/v1/events").send(payload);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockEvent);
      expect(eventService.createEvent).toHaveBeenCalledWith(
        expect.objectContaining(payload)
      );
    });

    it("should return 400 for invalid payload", async () => {
      const res = await request(app).post("/api/v1/events").send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Validation error");
      expect(Array.isArray(res.body.details)).toBe(true);
      expect(eventService.createEvent).not.toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/events", () => {
    it("should return all events", async () => {
      (eventService.getAllEvents as jest.Mock).mockResolvedValue([mockEvent]);

      const res = await request(app).get("/api/v1/events");

      expect(res.status).toBe(200);
      expect(res.body).toEqual([mockEvent]);
      expect(eventService.getAllEvents).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/events/:id", () => {
    it("should return event when found", async () => {
      (eventService.getEventById as jest.Mock).mockResolvedValue(mockEvent);

      const res = await request(app).get("/api/v1/events/abc123");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockEvent);
      expect(eventService.getEventById).toHaveBeenCalledWith("abc123");
    });

    it("should return 404 when event not found", async () => {
      (eventService.getEventById as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get("/api/v1/events/unknown-id");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Event not found");
      expect(eventService.getEventById).toHaveBeenCalledWith("unknown-id");
    });
  });

  describe("PUT /api/v1/events/:id", () => {
    it("should update event when found and payload is valid", async () => {
      const updated: Event = { ...mockEvent, name: "Updated Event" };
      (eventService.updateEvent as jest.Mock).mockResolvedValue(updated);

      const payload = { name: "Updated Event" };

      const res = await request(app)
        .put("/api/v1/events/abc123")
        .send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updated);
      expect(eventService.updateEvent).toHaveBeenCalledWith(
        "abc123",
        expect.objectContaining(payload)
      );
    });

    it("should return 404 when updating non-existent event", async () => {
      (eventService.updateEvent as jest.Mock).mockResolvedValue(null);

      const payload = { name: "Updated Event" };

      const res = await request(app)
        .put("/api/v1/events/unknown-id")
        .send(payload);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Event not found");
      expect(eventService.updateEvent).toHaveBeenCalledWith(
        "unknown-id",
        expect.objectContaining(payload)
      );
    });

    it("should return 400 for invalid update payload", async () => {
      const res = await request(app)
        .put("/api/v1/events/abc123")
        .send({ capacity: -10 });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Validation error");
      expect(eventService.updateEvent).not.toHaveBeenCalled();
    });
  });

  describe("DELETE /api/v1/events/:id", () => {
    it("should delete event when found", async () => {
      (eventService.deleteEvent as jest.Mock).mockResolvedValue(true);

      const res = await request(app).delete("/api/v1/events/abc123");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: "Event deleted" });
      expect(eventService.deleteEvent).toHaveBeenCalledWith("abc123");
    });

    it("should return 404 when deleting non-existent event", async () => {
      (eventService.deleteEvent as jest.Mock).mockResolvedValue(false);

      const res = await request(app).delete("/api/v1/events/unknown-id");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Event not found");
      expect(eventService.deleteEvent).toHaveBeenCalledWith("unknown-id");
    });
  });

  describe("Fallback routes", () => {
    it("should return 404 for unknown route", async () => {
      const res = await request(app).get("/unknown-route");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Route not found");
    });
  });
});
