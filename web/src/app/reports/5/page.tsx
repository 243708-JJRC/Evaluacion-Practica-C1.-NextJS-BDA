import { rankStudentsSchema, paginationSchema } from "../../../lib/validators";
import { getRankStudents } from "../../../services/reporte5";
import { PaginationControls } from "../../components/pagination";
import { BackButton } from "../../components/button";

const PROGRAMAS = [
  "Ingeniería de Software",
  "Ciberseguridad",
  "Inteligencia Artificial",
  "Sistemas Digitales",
];

export default async function Reporte5({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

  const sParams = await searchParams;

  const filterResult = rankStudentsSchema.safeParse({
    program: sParams.program,
    term: sParams.term ?? "",
  });

  if (!filterResult.success) {
    return (
      <main>
        <BackButton />
        <h1>Cuadro de Honor por Programa</h1>
        <p>Selecciona un programa para ver el ranking.</p>

        <div className="filters">
          {PROGRAMAS.map((p) => (
            <a
              key={p}
              href={`/reports/5?program=${encodeURIComponent(p)}`}
            >
              {p}
            </a>
          ))}
        </div>
      </main>
    );
  }

  const { program } = filterResult.data;

  const paginationResult = paginationSchema.safeParse({
    page: sParams.page ?? 1,
    limit: sParams.limit ?? 5,
  });

  if (!paginationResult.success) {
    return <div>Parámetros de paginación inválidos.</div>;
  }

  const { page, limit } = paginationResult.data;

  const { data, totalPages, kpi } =
    await getRankStudents(program, page, limit);

  return (
    <main>
      <BackButton />
      <h1>Cuadro de Honor por Programa</h1>

      <p className="description">
        Este reporte muestra el ranking de los alumnos con mejor desempeño académico
        por programa y periodo.
      </p>

      <div className="filters">
        {PROGRAMAS.map((p) => (
          <a
            key={p}
            href={`/reports/5?program=${encodeURIComponent(p)}`}
            className={p === program ? "active" : ""}
          >
            {p}
          </a>
        ))}
      </div>

      {kpi.top1 && (
        <h3>
          Primer lugar en <strong>{program}</strong>:{" "}
          <strong>{kpi.top1.name_student}</strong> (
          {kpi.top1.promedio_final})
        </h3>
      )}

      <table border={1}>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Alumno</th>
            <th>Programa</th>
            <th>Periodo</th>
            <th>Promedio Final</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td>#{r.ranking}</td>
              <td>{r.name_student}</td>
              <td>{r.program}</td>
              <td>{r.term}</td>
              <td>{r.promedio_final}</td>
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
