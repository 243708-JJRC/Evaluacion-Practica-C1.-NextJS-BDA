import { z } from "zod";

export const coursePerformanceSchema = z.object({
  term: z.enum([
    "Enero-Abril",
    "Mayo-Agosto",
    "Septiembre-Diciembre"
  ])
});

export const rankStudentsSchema = z.object({
  program: z.enum([
    "Ingeniería",
    "Derecho",
    "Administración"
  ]),
  term: z.string()
});

export const studentsAtRiskSearchSchema = z.object({
  search: z.string().min(1)
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1),
  limit: z.coerce.number().int().min(1).max(50)
});

