import { pool } from "../../lib/db";
import { PaginationControls } from "../../components/pagination";
import { BackButton } from "../../components/button";


export default async function ReporteRanking({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sParams = await searchParams;
  const page = Number(sParams.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `SELECT *, count(*) OVER() AS total_count 
     FROM vw_rank_students 
     ORDER BY program, ranking 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const totalPages = Math.ceil((rows[0]?.total_count || 0) / limit);

  return (
    <main>
      <BackButton /> {}
      <h1>Cuadro de Honor por Programa</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Alumno</th>
            <th>Programa</th>
            <th>Promedio Final</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>#{r.ranking}</td>
              <td>{r.name_student}</td>
              <td>{r.program}</td>
              <td>{r.promedio_final}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationControls page={page} totalPages={totalPages} />
    </main>
  );
};