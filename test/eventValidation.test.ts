import { createEventSchema } from "../src/api/v1/validation/eventValidation";

const validPayload = {
  name: "Tech Summit",
  description: "A full day event about modern tech trends.",
  date: "2026-03-20T10:00:00.000Z",
  location: "Winnipeg",
  capacity: 250,
  category: "conference",
  status: "published",
  isVirtual: false,
  organizerEmail: "organizer@example.com",
};

describe("createEventSchema", () => {
  it("should accept a valid payload", () => {
    const result = createEventSchema.validate(validPayload);
    expect(result.error).toBeUndefined();
  });

  it("should reject missing required fields", () => {
    const { error } = createEventSchema.validate({});
    expect(error).toBeDefined();
  });

  it("should reject invalid email format", () => {
    const { error } = createEventSchema.validate({
      ...validPayload,
      organizerEmail: "not-an-email",
    });
    expect(error).toBeDefined();
  });

  it("should reject invalid category", () => {
    const { error } = createEventSchema.validate({
      ...validPayload,
      category: "invalid",
    });
    expect(error).toBeDefined();
  });
});
