// Definición base y clases de excepción HTTP

export class HttpException extends Error {
    public readonly status: number;
    public readonly details?: unknown;

    constructor(status: number, message: string, details?: unknown) {
        super(message);
        this.status = status;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
        if (typeof (Error as any).captureStackTrace === 'function') {
            (Error as any).captureStackTrace(this, this.constructor);
        }
    }
}

export class BadRequestException extends HttpException {
    constructor(message = 'Bad Request', details?: unknown) {
        super(400, message, details);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message = 'Unauthorized', details?: unknown) {
        super(401, message, details);
    }
}

export class ForbiddenException extends HttpException {
    constructor(message = 'Forbidden', details?: unknown) {
        super(403, message, details);
    }
}

export class NotFoundException extends HttpException {
    constructor(message = 'Not Found', details?: unknown) {
        super(404, message, details);
    }
}

export class ConflictException extends HttpException {
    constructor(message = 'Conflict', details?: unknown) {
        super(409, message, details);
    }
}

export class InternalServerErrorException extends HttpException {
    constructor(message = 'Internal Server Error', details?: unknown) {
        super(500, message, details);
    }
}
