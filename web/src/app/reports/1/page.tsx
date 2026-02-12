import { coursePerformanceSchema, paginationSchema } from "../../../lib/validators";
import { getCoursePerformance } from "../../../services/reporte1";
import { PaginationControls } from "../../components/pagination";
import { BackButton } from "../../components/button";

const PERIODOS = [
  "Enero-Abril",
  "Mayo-Agosto",
  "Septiembre-Diciembre",
];

export default async function Reporte1({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

  const sParams = await searchParams;

  const filterResult = coursePerformanceSchema.safeParse({
    term: sParams.term,
  });  

  if (!filterResult.success) {
    return (
      <main>
        <BackButton />
        <h1>Rendimiento por Curso</h1>
        <p>
          Este reporte muestra el desempeño académico promedio por curso
          en un periodo específico.
        </p>

        <div className="filters">
          {PERIODOS.map((p) => (
            <a key={p} href={`/reports/1?term=${encodeURIComponent(p)}`}>
              {p}
            </a>
          ))}
        </div>
      </main>
    );
  }

  const { term } = filterResult.data;

  const paginationResult = paginationSchema.safeParse({
    page: sParams.page ?? 1,
    limit: sParams.limit ?? 5,
  });

  if (!paginationResult.success) {
    return <div>Parámetros de paginación inválidos.</div>;
  }

  const { page, limit } = paginationResult.data;

  const { data, totalPages, promedioGlobal } =
    await getCoursePerformance(term, page, limit);

  return (
    <main>
      <BackButton />
      <h1>Rendimiento por Curso</h1>

      <div className="filters">
        {PERIODOS.map((p) => (
          <a
            key={p}
            href={`/reports/1?term=${encodeURIComponent(p)}`}
            className={p === term ? "active" : ""}
          >
            {p}
          </a>
        ))}
      </div>

      <h3>
        Promedio global del periodo <strong>{term}</strong>:{" "}
        <strong>{promedioGlobal}</strong>
      </h3>

      <table border={1}>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Programa</th>
            <th>Periodo</th>
            <th>Promedio Final</th>
            <th>Alumnos Reprobados</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td>{r.course}</td>
              <td>{r.program}</td>
              <td>{r.term}</td>
              <td>{r.promedio_final}</td>
              <td>{r.alumnos_reprobados}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationControls page={page} totalPages={totalPages} />
    </main>
  );
}
