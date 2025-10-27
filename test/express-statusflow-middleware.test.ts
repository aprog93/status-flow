import { describe, it, expect, vi } from 'vitest';
import { statusFlowMiddleware } from '../src/express-statusflow-middleware';

function mockRes() {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
}

describe('statusFlowMiddleware', () => {
    it('responde con StatusFlow para error con code', () => {
        const err = {
            code: 404,
            message: 'No encontrado',
            extra: { recurso: 'user' },
        };
        const req: any = { headers: {} };
        const res = mockRes();
        const next = vi.fn();
        statusFlowMiddleware(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json.mock.calls[0][0].code).toBe(404);
        expect(res.json.mock.calls[0][0].message).toBe('No encontrado');
        expect(res.json.mock.calls[0][0].recurso).toBe('user');
    });

    it('responde 500 para error sin code', () => {
        const err = new Error('fail');
        const req: any = { headers: {} };
        const res = mockRes();
        const next = vi.fn();
        statusFlowMiddleware(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json.mock.calls[0][0].code).toBe(500);
        expect(res.json.mock.calls[0][0].success).toBe(false);
    });
});
