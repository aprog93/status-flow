import { describe, it, expect } from 'vitest';
import { StatusFlow, StatusFlowCodes } from '../src/StatusFlow';

describe('StatusFlow', () => {
    it('devuelve respuesta 200 en español por defecto', () => {
        const res = StatusFlow({ code: 200 });
        expect(res.code).toBe(200);
        expect(res.message).toMatch(/Correcto|OK/);
        expect(res.info.name).toBe('Correcto');
    });

    it('devuelve respuesta 404 en inglés', () => {
        const res = StatusFlow({ code: 404, lang: 'en' });
        expect(res.code).toBe(404);
        expect(res.message).toMatch(/Not Found/);
        expect(res.info.name).toBe('Not Found');
    });

    it('permite overrideMessage y extra', () => {
        const res = StatusFlow({
            code: 400,
            overrideMessage: 'Custom',
            extra: { foo: 1 },
        });
        expect(res.message).toBe('Custom');
        expect(res.foo).toBe(1);
    });

    it('devuelve error para código desconocido', () => {
        const res = StatusFlow({ code: 9999 });
        expect(res.success).toBe(false);
        expect(res.message).toMatch(/desconocido/i);
    });
});

describe('StatusFlowCodes', () => {
    it('incluye OK y NOT_FOUND', () => {
        expect(StatusFlowCodes.OK).toBe(200);
        expect(StatusFlowCodes.NOT_FOUND).toBe(404);
    });
});
