// Utilidad para respuestas uniformes en controladores Express
import { HttpException } from './http-exceptions';

export interface HttpResponse {
    status: number;
    message: string;
    details?: unknown;
}

export function createHttpResponse(error: HttpException): HttpResponse {
    return {
        status: error.status,
        message: error.message,
        details: error.details,
    };
}

export function createSuccessResponse<T>(
    data: T,
    message = 'OK',
    status = 200
): HttpResponse & { data: T } {
    return {
        status,
        message,
        data,
    };
}
