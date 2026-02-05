# SQL Reports Dashboard

Proyecto que implementa un **dashboard de reportes SQL** utilizando **PostgreSQL**, **Next.js y **Docker**, con énfasis en el diseño de base de datos y uso de índices.

---

## Objetivo

Desarrollar una aplicación web que permita visualizar **reportes basados en consultas SQL**, demostrando:

- Diseñar VIEWS
- Conectar un frontend Next.js a Postgres de forma segura 
- Empaquetar todo en Docker Compose reproducible 

---

## Tecnologías utilizadas

- **PostgreSQL 16**
- **Next.js 16**
- **React 19**
- **Node.js 20**
- **Docker & Docker Compose**
- **TypeScript**

---

## Base de datos

### Modelo

El esquema define las siguientes entidades principales:

- `categorias`
- `usuarios`
- `productos`
- `ordenes`
- `orden_detalles`
  
### Índices

Los índices se definen en un archivo separado (`indexes.sql`) para optimizar consultas frecuentes:

- Órdenes por fecha
- Detalle de órdenes por producto
- Productos por categoría

---

## Levantar el proyecto
- docker compose up --build

---

## Reportes

La aplicación incluye un dashboard con los siguientes reportes:

1. Ventas por día
2. Ventas por categoría
3. Top productos
4. Ticket promedio por categoría
5. Ventas acumuladas

Los reportes se implementan como Server Components, realizando consultas directas a PostgreSQL mediante el driver pg.

---

## Decisiones técnicas

- Server Components para evitar una capa extra de API REST
- Vistas SQL para encapsular consultas complejas de reportes
- Docker para garantizar reproducibilidad del entorno
