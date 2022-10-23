export class ApiError extends Error {
  status;
  message;
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }

  static UnAuthorization() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static UnProcessableEntity(message) {
    return new ApiError(422, message);
  }

  static InternalServerError(message) {
    return new ApiError(500, message);
  }
}
