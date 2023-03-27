// takes a function handling req/res cyle and wraps it in a try/catch clause
// helps having to do this on every error handling is required
export function asyncRequestHandlerWrapper(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
