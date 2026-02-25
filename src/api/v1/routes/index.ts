import { Request, Response, Router } from "express";
import eventRoutes from "./eventRoutes";
import { HTTP_STATUS } from "../../../constants/httpStatus";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({ status: "ok" });
});

router.use("/events", eventRoutes);

export default router;
