import { pool } from "../../lib/db";
import { PaginationControls } from "../../components/pagination";
import { BackButton } from "../../components/button";

export default async function ReporteAsistenciaGrupo({
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
     FROM vw_attendance_by_group 
     ORDER BY term DESC, porcentaje_asistencia DESC 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const totalRows = rows.length > 0 ? parseInt(rows[0].total_count) : 0;
  const totalPages = Math.ceil(totalRows / limit);

  return (
    <main>
      <BackButton /> {}
      <h1>Asistencia Promedio por Grupo</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>ID Grupo</th>
            <th>Periodo</th>
            <th>Porcentaje Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.group_id}</td>
              <td>{r.term}</td>
              <td>{r.porcentaje_asistencia}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationControls page={page} totalPages={totalPages}/>
    </main>
  );
}