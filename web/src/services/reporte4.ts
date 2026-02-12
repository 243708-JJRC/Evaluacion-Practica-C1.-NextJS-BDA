import { pool } from "../lib/db";

export async function getAttendanceByGroup(
  page: number,
  limit: number
) {
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `
    SELECT *, count(*) OVER() AS total_count
    FROM vw_attendance_by_group
    ORDER BY porcentaje_asistencia DESC
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
  );

  const totalRows = rows.length > 0 ? Number(rows[0].total_count) : 0;
  const totalPages = Math.ceil(totalRows / limit);

  const mejorAsistencia =
    rows.length > 0 ? rows[0].porcentaje_asistencia : 0;

  return {
    data: rows,
    totalPages,
    kpi: {
      mejorAsistencia,
    },
  };
}
