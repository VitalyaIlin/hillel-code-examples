export class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

// 401, 403, 404, 422

export class Unauthorized extends ApiError {
    constructor(message) {
        super(401, message);
    }
}