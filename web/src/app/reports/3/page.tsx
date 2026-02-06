import { pool } from "../../lib/db";
import {
  studentsAtRiskSearchSchema,
  paginationSchema,
} from "../../lib/validators";
import { PaginationControls } from "../../components/pagination";
import { BackButton } from "../../components/button";

export default async function Reporte3({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sParams = await searchParams;

  const searchResult = studentsAtRiskSearchSchema.safeParse({
    search: sParams.search ?? "",
  });

  const search = searchResult.success ? searchResult.data.search : "";

  const paginationResult = paginationSchema.safeParse({
    page: sParams.page ?? 1,
    limit: sParams.limit ?? 5,
  });

  if (!paginationResult.success) {
    return <div>Parámetros de paginación inválidos.</div>;
  }

  const { page, limit } = paginationResult.data;
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

  const totalRiesgo = totalRows;

  return (
    <main>
      <BackButton />
      <h1>Alumnos en Riesgo Académico</h1>
      <p className="description">
        Este reporte presenta el porcentaje promedio de asistencia por grupo y periodo,
        permitiendo detectar grupos con problemas de asistencia y evaluar el
        compromiso estudiantil en cada curso.
      </p>

      <div className="filters">
        <form className="search-container">
          <input
            type="text"
            name="search"
            placeholder="Buscar por nombre o email"
            defaultValue={search}
            className="search-input"
          />
          <button className="search-btn" type="submit">Buscar</button>
        </form>
      </div>

      <h3>Total de alumnos en riesgo: <strong>{totalRiesgo}</strong></h3>

      <table border={1}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Programa</th>
            <th>Promedio</th>
            <th>Asistencia %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.name_student}</td>
              <td>{r.email}</td>
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
