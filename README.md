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
| T-21 (≥ 40 libros, 10 socios, 15 préstamos, 3 vencidos) | ⏳ **Pendiente**: no se inició por tiempo. Se priorizó el núcleo de la API (T-01, T-02, T-17) con evidencia, como indica `tasks.md` |

## Convenciones

- Código, rutas, ramas y mensajes de commit/PR: **inglés** (Conventional Commits).
- Documentación y mensajes al usuario: **español** (constitución, artículo XI).
- Flujo de ramas: `feature/*` → `develop` → `main`, siempre mediante Pull Request.
