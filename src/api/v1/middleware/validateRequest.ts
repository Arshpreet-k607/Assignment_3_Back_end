import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationErrorItem } from "joi";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Validation error",
        details: error.details.map((detail: ValidationErrorItem) => detail.message),
      });
      return;
    }

    req.body = value;
    next();
  };
};
