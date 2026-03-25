import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

export const CORS_ALLOWED_ORIGINS =
  process.env.CORS_ALLOWED_ORIGINS || "http://localhost:3000";
