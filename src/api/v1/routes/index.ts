import { Request, Response, Router } from "express";
import eventRoutes from "./eventRoutes";
import { HTTP_STATUS } from "../../../constants/httpStatus";

const router = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check
 *     description: Returns a simple status payload to indicate that the API is running.
 *     responses:
 *       200:
 *         description: API is healthy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 */
router.get("/health", (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({ status: "ok" });
});

router.use("/events", eventRoutes);

export default router;
