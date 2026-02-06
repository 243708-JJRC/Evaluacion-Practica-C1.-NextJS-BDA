import { z } from "zod";

export const coursePerformanceSchema = z.object({
  term: z.string().min(1, "Periodo requerido")
});

export const rankStudentsSchema = z.object({
  program: z.string().min(1),
  term: z.string().optional()
});

export const studentsAtRiskSearchSchema = z.object({
  search: z.string().min(1)
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1),
  limit: z.coerce.number().int().min(1).max(50)
});

