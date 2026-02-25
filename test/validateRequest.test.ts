import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { validateRequest } from "../src/api/v1/middleware/validateRequest";
import { createEventSchema } from "../src/api/v1/validation/eventValidation";

const createMockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  return res;
};

describe("validateRequest middleware", () => {
  it("should call next with validated body when payload is valid", () => {
    const schema: ObjectSchema = createEventSchema;
    const middleware = validateRequest(schema);

    const req = {
      body: {
        name: "Tech Summit",
        description: "A full day event about modern tech trends.",
        date: "2026-03-20T10:00:00.000Z",
        location: "Winnipeg",
        capacity: 250,
        category: "conference",
        status: "published",
        isVirtual: false,
        organizerEmail: "organizer@example.com",
        extraField: "should be stripped",
      },
    } as unknown as Request;

    const res = createMockResponse();
    const next: NextFunction = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect((req as Request).body).not.toHaveProperty("extraField");
  });

  it("should return 400 with validation details when payload is invalid", () => {
    const schema: ObjectSchema = createEventSchema;
    const middleware = validateRequest(schema);

    const req = {
      body: {},
    } as unknown as Request;

    const res = createMockResponse();
    const next: NextFunction = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Validation error",
        details: expect.any(Array),
      })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
