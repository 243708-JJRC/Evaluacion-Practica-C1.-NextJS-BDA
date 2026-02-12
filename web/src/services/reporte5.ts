import { pool } from "../lib/db";

export async function getRankStudents(
  program: string,
  page: number,
  limit: number
) {
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `
    SELECT *, count(*) OVER() AS total_count
    FROM vw_rank_students
    WHERE program = $1
    ORDER BY ranking ASC
    LIMIT $2 OFFSET $3
    `,
    [program, limit, offset]
  );

  const totalRows = rows.length > 0 ? Number(rows[0].total_count) : 0;
  const totalPages = Math.ceil(totalRows / limit);

  const top1 = rows.find((r) => r.ranking === 1) || null;

  return {
    data: rows,
    totalPages,
    kpi: {
      top1,
    },
  };
}
