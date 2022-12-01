import { ApiError } from '../errors/apiError.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiErrorMiddleware = (err, req, res, next) => {
  if (!(err instanceof ApiError)) err.status = 500;
  return res.status(err.status).json({ message: err.message });
}
