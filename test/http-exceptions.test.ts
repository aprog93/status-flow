import { describe, it, expect } from 'vitest';
import {
    HttpException,
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
} from '../src/http-exceptions';

describe('HttpException', () => {
    it('debe crear una excepción base', () => {
        const err = new HttpException(418, 'Soy una tetera', { foo: 'bar' });
        expect(err.status).toBe(418);
        expect(err.message).toBe('Soy una tetera');
        expect(err.details).toEqual({ foo: 'bar' });
    });
});

describe('Excepciones específicas', () => {
    it('BadRequestException', () => {
        const err = new BadRequestException('Error de validación');
        expect(err.status).toBe(400);
        expect(err.message).toBe('Error de validación');
    });
    it('UnauthorizedException', () => {
        const err = new UnauthorizedException();
        expect(err.status).toBe(401);
    });
    it('ForbiddenException', () => {
        const err = new ForbiddenException();
        expect(err.status).toBe(403);
    });
    it('NotFoundException', () => {
        const err = new NotFoundException('No encontrado');
        expect(err.status).toBe(404);
        expect(err.message).toBe('No encontrado');
    });
    it('ConflictException', () => {
        const err = new ConflictException();
        expect(err.status).toBe(409);
    });
    it('InternalServerErrorException', () => {
        const err = new InternalServerErrorException();
        expect(err.status).toBe(500);
    });
});
