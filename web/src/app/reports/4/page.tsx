import { paginationSchema } from "../../../lib/validators";
import { getAttendanceByGroup } from "../../../services/reporte4";
import { PaginationControls } from "../../components/pagination";
import { BackButton } from "../../components/button";

export default async function Reporte4({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

  const sParams = await searchParams;

  const paginationResult = paginationSchema.safeParse({
    page: sParams.page ?? 1,
    limit: 5,
  });

  if (!paginationResult.success) {
    return <div>Parámetros de paginación inválidos.</div>;
  }

  const { page, limit } = paginationResult.data;

  const { data, totalPages, kpi } =
    await getAttendanceByGroup(page, limit);

  return (
    <main>
      <BackButton />
      <h1>Asistencia Promedio por Grupo</h1>

      <p className="description">
        Este reporte presenta el porcentaje promedio de asistencia por grupo y periodo,
        permitiendo detectar grupos con problemas de asistencia y evaluar el
        compromiso estudiantil en cada curso.
      </p>

      <h3>
        Mejor asistencia promedio:{" "}
        <strong>{kpi.mejorAsistencia}%</strong>
      </h3>

      <table border={1}>
        <thead>
          <tr>
            <th>ID Grupo</th>
            <th>Periodo</th>
            <th>Asistencia Promedio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td>{r.group_id}</td>
              <td>{r.term}</td>
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
