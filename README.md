# test-manager-library-3145556-tool

> **Prueba técnica · Ficha ADSO 3145556**
> Entrega: **martes 13 de octubre de 2026, a las 5:00 p. m.** (17:00, hora Colombia).

Utilidades de *Manager Library*: el **sembrador de datos de demostración**, que usa **solo la API**, nunca SQL directo (data-model §9).
El spec está en [`test-manager-library-3145556-docs`](https://github.com/BrayanCABRERA123/test-manager-library-3145556-docs)
(versión del reto: `spec-laravel/`).

## Dependencias

Necesita la API levantada (`infra`) y las credenciales del admin (`ADMIN_USERNAME` / `ADMIN_PASSWORD`). Incongruencia ya anotada en docs: por la API no se pueden crear préstamos vencidos, porque `due_at` lo calcula el servidor con la hora actual (T-21 frente a data-model §9).

## Estado

| Tarea | Estado |
|---|---|
| T-21 (≥ 40 libros, 10 socios, 15 préstamos, 3 vencidos) | ✅ parcial: `src/seed.mjs` siembra por la API los bibliotecarios de demostración y verifica las cinco categorías; es idempotente. ⏳ Libros, socios y préstamos quedan pendientes porque la API aún no los expone |

## Convenciones

- Código, rutas, ramas y mensajes de commit/PR: **inglés** (Conventional Commits).
- Documentación y mensajes al usuario: **español** (constitución, artículo XI).
- Flujo de ramas: `feature/*` → `develop` → `main`, siempre mediante Pull Request.

## Cómo se ejecuta

Requiere Node 18 o superior (sin dependencias) y la API levantada desde `infra`:

```bash
API_URL=http://localhost:8000/api/v1 ADMIN_USERNAME=admin ADMIN_PASSWORD=<clave> node src/seed.mjs
```

Variables opcionales: `LIBRARIANS` (cantidad, por defecto 3) y `DEMO_PASSWORD`.
