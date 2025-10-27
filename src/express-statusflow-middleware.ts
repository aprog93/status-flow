import { Request, Response, NextFunction } from 'express';
import { StatusFlow } from './StatusFlow';

/**
 * Middleware para manejar errores y respuestas usando StatusFlow.
 * Si el error tiene un campo 'code' válido, responde con StatusFlow; si no, responde 500 genérico.
 */
export function statusFlowMiddleware(err: any, req: Request, res: Response, _next: NextFunction) {
    if (err && typeof err.code === 'number') {
        const lang = req.headers['x-lang'] === 'en' ? 'en' : 'es';
        const response = StatusFlow({
            code: err.code,
            lang,
            extra: err.extra || {},
            overrideMessage: err.message || undefined,
        });
        res.status(err.code).json(response);
    } else {
        const response = StatusFlow({
            code: 500,
            lang: 'es',
            overrideMessage: 'Error interno del servidor',
            extra: { originalError: err },
        });
        res.status(500).json(response);
    }
}
