import { paginationSchema } from "../../../lib/validators";
import { getTeacherLoad } from "../../../services/reporte2";
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

  const { data, totalPages, kpi } =
    await getTeacherLoad(page, limit);

  return (
    <main>
      <BackButton />
      <h1>Carga académica por docente</h1>

      <p className="description">
        Este reporte permite analizar la carga académica de cada docente por periodo,
        considerando el número de grupos, alumnos atendidos y el promedio general,
        con el fin de apoyar la asignación equilibrada de recursos docentes.
      </p>

      {kpi && (
        <h3>
          Mayor carga académica:{" "}
          <strong>{kpi.docente}</strong> —{" "}
          {kpi.total_alumnos} alumnos ({kpi.term})
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
          {data.map((r, i) => (
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
