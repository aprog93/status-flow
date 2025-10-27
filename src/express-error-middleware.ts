// Middleware Express para manejo uniforme de errores
import { Request, Response, NextFunction } from 'express';
import { HttpException } from './http-exceptions';
import { createHttpResponse } from './response';

export function httpErrorMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction) {
    if (err instanceof HttpException) {
        const response = createHttpResponse(err);
        res.status(err.status).json(response);
    } else {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            details: err,
        });
    }
}
