import { pool } from "../lib/db";

export async function getTeacherLoad(page: number, limit: number) {
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `
    SELECT *, count(*) OVER() AS total_count
    FROM vw_teacher_load
    ORDER BY total_alumnos DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  const totalRows = rows.length > 0 ? Number(rows[0].total_count) : 0;
  const totalPages = Math.ceil(totalRows / limit);

  const topTeacher =
    rows.length > 0
      ? {
          docente: rows[0].docente,
          total_alumnos: rows[0].total_alumnos,
          term: rows[0].term,
        }
      : null;

  return {
    data: rows,
    totalPages,
    kpi: topTeacher,
  };
}
