import { pool } from "../../lib/db";
import { paginationSchema } from "../../lib/validators";
import { PaginationControls } from "../../components/pagination";
import { BackButton } from "../../components/button";

export default async function Reporte2({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sParams = await searchParams;

  const result = paginationSchema.safeParse({
    page: sParams.page ?? 1,
    limit: sParams.limit ?? 5,
  });

  if (!result.success) {
    return <div>Parámetros de paginación inválidos.</div>;
  }

  const { page, limit } = result.data;
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `SELECT *, count(*) OVER() AS total_count 
     FROM vw_teacher_load 
     ORDER BY total_alumnos DESC 
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const totalRows = rows.length > 0 ? Number(rows[0].total_count) : 0;
  const totalPages = Math.ceil(totalRows / limit);

  const topTeacher = rows[0];

  return (
    <main>
      <BackButton />
      <h1>Carga académica por docente</h1>
      <p className="description">
        Este reporte permite analizar la carga académica de cada docente por periodo,
        considerando el número de grupos, alumnos atendidos y el promedio general,
        con el fin de apoyar la asignación equilibrada de recursos docentes.
      </p>
      {topTeacher && (
        <h3> Mayor carga académica:{" "}
          <strong>{topTeacher.docente}</strong> —{" "}
          {topTeacher.total_alumnos} alumnos ({topTeacher.term})
        </h3>
      )}

      <table border={1}>
        <thead>
          <tr>
            <th>Docente</th>
            <th>Periodo</th>
            <th>Grupos</th>
            <th>Alumnos</th>
            <th>Promedio general</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.docente}</td>
              <td>{r.term}</td>
              <td>{r.total_grupos}</td>
              <td>{r.total_alumnos}</td>
              <td>{r.promedio_general}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationControls page={page} totalPages={totalPages} />
    </main>
  );
}
