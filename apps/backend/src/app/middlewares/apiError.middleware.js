import { ApiError } from '../errors/apiError.js'

export const apiErrorMiddleware = (err, req, res) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
}
