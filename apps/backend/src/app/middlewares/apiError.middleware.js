import { ApiError } from '../errors/apiError.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiErrorMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
}
