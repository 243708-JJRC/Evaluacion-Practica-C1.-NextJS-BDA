import { studentsAtRiskSearchSchema, paginationSchema } from "../../../lib/validators";
import { getStudentsAtRisk } from "../../../services/reporte3";
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

  const { data, totalPages, kpi } =
    await getStudentsAtRisk(search, page, limit);

  return (
    <main>
      <BackButton />
      <h1>Alumnos en Riesgo Académico</h1>

      <p className="description">
        Este reporte identifica estudiantes con bajo promedio o baja asistencia,
        permitiendo intervenir de forma preventiva.
      </p>

      <div className="filters">
        <form className="search-container" method="GET">
          <input
            type="text"
            name="search"
            placeholder="Buscar por nombre o email"
            defaultValue={search}
            className="search-input"
          />
          <button className="search-btn" type="submit">
            Buscar
          </button>
        </form>
      </div>

      <h3>
        Total de alumnos en riesgo:{" "}
        <strong>{kpi.totalRiesgo}</strong>
      </h3>

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
          {data.map((r, i) => (
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

      <PaginationControls
        page={page}
        totalPages={totalPages}
      />
    </main>
  );
}
