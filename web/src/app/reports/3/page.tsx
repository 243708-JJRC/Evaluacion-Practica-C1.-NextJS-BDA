import { pool } from "../../lib/db";
import { PaginationControls } from "../../components/pagination";
import { BackButton } from "../../components/button";

export default async function Reporte3({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sParams = await searchParams;
  const page = Number(sParams.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  const search = sParams.search?.toString() || "";

  const { rows } = await pool.query(
    `SELECT *, count(*) OVER() AS total_count 
     FROM vw_students_at_risk 
     WHERE name_student ILIKE $1 OR program ILIKE $1
     ORDER BY promedio_calificacion ASC 
     LIMIT $2 OFFSET $3`,
    [`%${search}%`, limit, offset]
  );

  const totalRows = rows.length > 0 ? parseInt(rows[0].total_count) : 0;
  const totalPages = Math.ceil(totalRows / limit);

  return (
    <main>
      <BackButton /> {}
      <h1>Alumnos en Riesgo Académico</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Programa</th>
            <th>Promedio</th>
            <th>Asistencia %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ color: r.promedio_calificacion < 6 ? 'red' : 'inherit' }}>
              <td>{r.name_student}</td>
              <td>{r.program}</td>
              <td>{r.promedio_calificacion}</td>
              <td>{r.porcentaje_asistencia}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationControls page={page} totalPages={totalPages} />
    </main>
  );
}