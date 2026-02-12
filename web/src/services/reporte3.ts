import { pool } from "../lib/db";

export async function getStudentsAtRisk(
  search: string,
  page: number,
  limit: number
) {
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `
    SELECT *, count(*) OVER() AS total_count
    FROM vw_students_at_risk
    WHERE name_student ILIKE $1 OR email ILIKE $1
    ORDER BY promedio_calificacion ASC
    LIMIT $2 OFFSET $3
    `,
    [`%${search}%`, limit, offset]
  );

  const totalRows = rows.length > 0 ? Number(rows[0].total_count) : 0;
  const totalPages = Math.ceil(totalRows / limit);

  return {
    data: rows,
    totalPages,
    kpi: {
      totalRiesgo: totalRows,
    },
  };
}
