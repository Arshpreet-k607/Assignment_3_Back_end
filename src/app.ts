import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import v1Router from "./api/v1/routes";
import { HTTP_STATUS } from "./constants/httpStatus";
import { CORS_ALLOWED_ORIGINS, NODE_ENV } from "./config/env";

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Registration API",
      version: "1.0.0",
      description:
        "API for managing event registration, including creating, updating, listing, and deleting events.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/**/*.ts"],
};

const app = express();

const helmetConfig: Parameters<typeof helmet>[0] = {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  hsts:
    NODE_ENV === "production"
      ? {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        }
      : false,
  referrerPolicy: { policy: "no-referrer" },
};

app.use(helmet(helmetConfig));

const allowedOrigins = CORS_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim());

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", v1Router);

app.use((req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Route not found" });
});

export default app;
