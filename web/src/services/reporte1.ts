import { pool } from "../lib/db";

export async function getCoursePerformance(
  term: string,
  page: number,
  limit: number
) {
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `
    SELECT *, count(*) OVER() AS total_count
    FROM vw_course_performance
    WHERE term = $1
    ORDER BY promedio_final DESC
    LIMIT $2 OFFSET $3
    `,
    [term, limit, offset]
  );

  const totalRows = rows.length > 0 ? Number(rows[0].total_count) : 0;
  const totalPages = Math.ceil(totalRows / limit);

  const promedioGlobal =
    rows.length > 0
      ? (
          rows.reduce((acc, r) => acc + Number(r.promedio_final), 0) /
          rows.length
        ).toFixed(2)
      : "0.00";

  return {
    data: rows,
    totalPages,
    promedioGlobal,
  };
}
