import { NextFunction, Request, Response } from "express";
// import ErrorHandler from "../utils/utilities-class.js";
import { logger } from "../config/logger.js";

export const errorMiddleWare = (
  err,
  req,
  res,
  next
) => {
  logger.error(`Error: ${err.message}`, { stack: err.stack });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
