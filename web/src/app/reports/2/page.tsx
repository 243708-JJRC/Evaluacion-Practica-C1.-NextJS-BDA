import { pool } from "../../lib/db";
import { paginationSchema } from "../../lib/validators";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Reporte2({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const result = paginationSchema.safeParse({
    page: searchParams.page ?? 1,
    limit: searchParams.limit ?? 5,
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

  const totalRows = rows.length > 0 ? parseInt(rows[0].total_count) : 0;
  const totalPages = Math.ceil(totalRows / limit);

  return (
    <main>
      <h1>Carga académica por docente</h1>

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

      <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        <Link 
          href={`?page=${Math.max(1, page - 1)}&limit=${limit}`}
          style={{ pointerEvents: page <= 1 ? "none" : "auto", opacity: page <= 1 ? 0.5 : 1 }}
        >
          Anterior
        </Link>

        <span>Página {page} de {totalPages}</span>

        <Link 
          href={`?page=${Math.min(totalPages, page + 1)}&limit=${limit}`}
          style={{ pointerEvents: page >= totalPages ? "none" : "auto", opacity: page >= totalPages ? 0.5 : 1 }}
        >
          Siguiente
        </Link>
      </div>
    </main>
  );
}