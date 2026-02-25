import express, { Request, Response } from "express";
import cors from "cors";
import v1Router from "./api/v1/routes";
import { HTTP_STATUS } from "./constants/httpStatus";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", v1Router);

app.use((req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Route not found" });
});

export default app;
