# StatusFlow (anteriormente status-flow)

# StatusFlow

Librería para respuestas HTTP estándar, bilingüe y personalizables en Node.js/Express.

---

## 🧪 Tutorial: Probar StatusFlow localmente

1. **Clona el repositorio y entra a la carpeta de la librería:**
    ```bash
    git clone <url-del-repo>
    cd @libraries/status-flow
    ```
2. **Instala las dependencias:**
    ```bash
    pnpm install
    # o
    npm install
    ```
3. **Compila la librería:**
    ```bash
    pnpm run build
    # o
    npm run build
    ```
4. **Ejecuta el servidor de pruebas mock:**
    ```bash
    node dist/server.mock.js
    ```
5. **Prueba los endpoints con Insomnia, Postman o curl:**
    - `GET http://localhost:3000/ok` → Respuesta estándar de éxito
    - `GET http://localhost:3000/fail` → Respuesta de error 404 personalizada

6. **Ejemplo de respuesta exitosa:**

    ```json
    {
      "success": true,
      "message": "HTTP 200 - Correcto",
      "code": 200,
      "usuario": "aprog93",
      "info": { ... }
    }
    ```

7. **Ejemplo de respuesta de error:**
    ```json
    {
      "success": false,
      "message": "No existe el recurso",
      "code": 404,
      "recurso": "user",
      "info": { ... }
    }
    ```

---

## 🚀 Instalación rápida

```bash
# Instalar desde npm (ejemplo)
pnpm add status-flow
# o
npm install status-flow

# Instalar localmente durante desarrollo
# desde la raíz del repo:
# cd /ruta/al/repo/@libraries/status-flow
# pnpm install
# pnpm run build
# pnpm pack  # genera un tarball que puedes instalar en otro proyecto con `pnpm add ./status-flow-0.1.0.tgz`
```

---

## 🟢 Tutorial de inicio rápido

### 1. Importa y usa StatusFlow en tu endpoint

```ts
import { StatusFlow, StatusFlowCodes } from 'status-flow';

// Ejemplo de respuesta exitosa
app.get('/saludo', (req, res) => {
    res.json(
        StatusFlow({
            code: StatusFlowCodes.OK,
            extra: { saludo: '¡Hola mundo!' },
        })
    );
});

// Ejemplo de error personalizado
app.get('/error', (req, res, next) => {
    next({
        code: StatusFlowCodes.BAD_REQUEST,
        message: 'Faltan parámetros',
        extra: { campo: 'email' },
    });
});
```

### 2. Agrega el middleware para respuestas uniformes

```ts
import { statusFlowMiddleware } from 'status-flow';

app.use(statusFlowMiddleware); // Siempre al final, después de las rutas
```

---

## 📦 ¿Qué es StatusFlow?

StatusFlow genera respuestas HTTP uniformes y bilingües (español/inglés) a partir de un catálogo JSON de códigos, mensajes y metadatos. Permite personalizar cada respuesta con datos extra y mensajes propios.

- Respuestas estándar para todos los códigos HTTP
- Idioma configurable (`es` o `en`)
- Personalización libre vía `extra`
- Middleware Express listo para usar

---

## 🛠️ API principal

### `StatusFlow(options)`

- `code`: número de código HTTP (ej. 200, 404)
- `lang`: 'es' | 'en' (opcional, por defecto 'es')
- `extra`: objeto libre para datos personalizados
- `overrideMessage`: reemplaza el mensaje por defecto

Devuelve un objeto JSON estructurado según el catálogo de códigos.

### `StatusFlowCodes`

Objeto con nombres constantes para todos los códigos HTTP (`StatusFlowCodes.OK`, `StatusFlowCodes.NOT_FOUND`, etc).

### `statusFlowMiddleware`

Middleware Express para respuestas de error uniformes. Si el error tiene `code`, responde con StatusFlow; si no, responde 500 genérico.

---

## 📝 Ejemplo completo Express

```ts
import express from 'express';
import { StatusFlow, StatusFlowCodes, statusFlowMiddleware } from 'status-flow';

const app = express();

app.get('/ok', (req, res) => {
    res.json(StatusFlow({ code: StatusFlowCodes.OK, extra: { usuario: 'aprog93' } }));
});

app.get('/fail', (req, res, next) => {
    next({
        code: StatusFlowCodes.NOT_FOUND,
        message: 'No existe el recurso',
        extra: { recurso: 'user' },
    });
});

app.use(statusFlowMiddleware);

app.listen(3000, () => console.log('Servidor listo en puerto 3000'));
```

---

## 💡 Personalización avanzada

- Puedes pasar cualquier campo en `extra` y será incluido en la respuesta.
- Cambia el idioma con `lang: 'en'` o `lang: 'es'`.
- Usa `overrideMessage` para sobrescribir el mensaje estándar.

---

## 🧩 Cómo contribuir

- Edita `src/http-statuses.json` para agregar o mejorar códigos y mensajes.
- Mantén `userCustomizable.extra` vacío por defecto; los usuarios pueden añadir lo que necesiten.

---

## 📄 Licencia

MIT
Librería para manejo profesional de errores HTTP en APIs Node.js/Express.

## Características

- Clases de excepción HTTP personalizadas (BadRequest, Unauthorized, NotFound, etc.)
- Respuestas uniformes y tipadas para controladores Express
- Integración sencilla con middlewares de manejo de errores
- Tipos TypeScript incluidos

## Instalación

```bash
pnpm add status-flow
```

---

## Manual de uso

### 1. Excepciones HTTP personalizadas

Importa y lanza excepciones en tus controladores:

```ts
import { BadRequestException, NotFoundException } from 'status-flow';

app.get('/usuario/:id', (req, res, next) => {
    if (!req.params.id) {
        throw new BadRequestException('Falta el parámetro id');
    }
    // ...
    if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
    }
});
```

### 2. Respuestas uniformes para éxito

Usa la utilidad para respuestas consistentes:

```ts
import { createSuccessResponse } from 'status-flow';

app.get('/usuario/:id', (req, res) => {
    res.json(createSuccessResponse({ id: 1, nombre: 'Juan' }, 'Usuario encontrado'));
});
```

### 3. Middleware de manejo de errores

Agrega el middleware al final de tu app Express:

```ts
import { httpErrorMiddleware } from 'status-flow';

app.use(httpErrorMiddleware);
```

Este middleware detecta excepciones de la librería y responde con JSON uniforme. Otros errores se responden como 500.

### 4. Ejemplo completo Express

```ts
import express from 'express';
import { BadRequestException, NotFoundException, createSuccessResponse, httpErrorMiddleware } from 'status-flow';

const app = express();

app.get('/ok', (req, res) => {
    res.json(createSuccessResponse({ user: 'aprog93' }, 'Usuario encontrado'));
});

app.get('/error', (req, res, next) => {
    next(new BadRequestException('Error de validación', { campo: 'email' }));
});

app.get('/notfound', (req, res, next) => {
    next(new NotFoundException('No existe el recurso'));
});

app.use(httpErrorMiddleware);

app.listen(3000);
```

---

## Uso básico

```ts
import { BadRequestException } from 'status-flow';

app.get('/test', (req, res, next) => {
    throw new BadRequestException('Parámetro inválido');
});
```

## Integración avanzada con Express

```ts
import express from 'express';
import { BadRequestException, httpErrorMiddleware, createSuccessResponse } from 'status-flow';

const app = express();

app.get('/ok', (req, res) => {
    res.json(createSuccessResponse({ user: 'aprog93' }, 'Usuario encontrado'));
});

app.get('/error', (req, res, next) => {
    next(new BadRequestException('Error de validación', { campo: 'email' }));
});

// Middleware de manejo de errores (debe ir al final)
app.use(httpErrorMiddleware);

app.listen(3000);
```

## API

- Todas las excepciones extienden de `HttpException`
- Cada excepción incluye código de estado, mensaje y opcionalmente detalles

## Licencia

MIT
