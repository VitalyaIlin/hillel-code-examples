export class CustomError extends Error {
    constructor(status, message) {
        super();
        this.statusCode = status;
        this.message = message
    }
}

export class ValidationError extends CustomError {
    constructor(message) {
        super();
        this.statusCode = 422;
        this.message = message
    }
}

export class Unauthorized extends CustomError {
    constructor(message) {
        super();
        this.statusCode = 401;
        this.message = message
    }
}