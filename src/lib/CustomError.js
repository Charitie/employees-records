export class CustomError extends Error {
  statusCode;

  constructor(message, statusCode = null) {
    super(message);
    if (statusCode) {
      this.statusCode = statusCode;
    }
  }
}
