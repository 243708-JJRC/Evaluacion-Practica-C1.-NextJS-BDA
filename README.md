# Academic SQL Reports Dashboard

Aplicación web desarrollada en Next.js que visualiza reportes académicos obtenidos exclusivamente desde VIEWS en PostgreSQL**, cumpliendo criterios de seguridad real, paginación server-side, filtros validados con Zod y ejecución completa con Docker Compose.

---

## Escenario

El sistema está diseñado para el área de coordinación académica, con el objetivo de identificar:

- Rendimiento por curso y periodo  
- Carga académica por docente  
- Alumnos en riesgo académico  
- Asistencia por grupo  
- Ranking de alumnos por programa  

La app permite filtrar por periodo, buscar alumnos, y paginar resultados, todo desde consultas `SELECT` sobre VIEWS.

---

## Arquitectura General

- **Frontend / Backend**: Next.js (App Router, Server Components)
- **Base de datos**: PostgreSQL 16
- **Infraestructura**: Docker + Docker Compose
- **Seguridad**: Usuario de app con permisos `SELECT` solo sobre VIEWS
- **Validación**: Zod (filtros, búsqueda, paginación)

---

## Ejecución con Docker

### Requisitos
- Docker
- Docker Compose

### Levantar el proyecto
```bash
docker compose up --build
```

### Servicios levantados:
- PostgreSQL
- Next.js

## Variables de Entorno
Las variables estaran en el reporte en PDF de la actividad.

## Seguridad y Roles
```bash
SET ROLE web_user;
SELECT * FROM students;            -- DENEGADO
SELECT * FROM vw_students_at_risk; -- PERMITIDO
```

