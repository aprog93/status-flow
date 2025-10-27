import express from 'express';
import { StatusFlow, StatusFlowCodes, statusFlowMiddleware } from './index';

const app = express();

app.get('/ok', (req, res) => {
    res.json(
        StatusFlow({ code: StatusFlowCodes.OK, extra: { usuario: 'aprog93' } })
    );
});

app.get('/fail', (req, res, next) => {
    next({
        code: StatusFlowCodes.NOT_FOUND,
        message: 'No existe el recurso',
        extra: { recurso: 'user' },
    });
});

app.use(statusFlowMiddleware);

app.listen(3000, () => console.log('Servidor mock StatusFlow en puerto 3000'));
