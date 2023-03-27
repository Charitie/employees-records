import { CustomError } from "../CustomError.js";

export function globalErrorHandler() {
  return (error, req, res, next) => {
    if (res.headersSent) {
      return next(error);
    }

    if (error instanceof CustomError) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }

    if (process.env.NODE_ENV === "development") {
      console.info(`unhandled error ${error}`);
    }

    const message = error.message || error;
    return res.status(500).json({ message });
  };
}
