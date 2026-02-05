import { pool } from "../../lib/db";

export default async function Reporte5() {
  const { rows } = await pool.query(
    "SELECT * FROM vw_rank_students"
  );

  const ultimo = rows[rows.length - 1];

  return (
    <main>
      <h1>Ventas acumuladas</h1>
      <p>
        Total histórico: <strong>${ultimo?.total_acumulado ?? 0}</strong>
      </p>

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Total día</th>
            <th>Acumulado</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.fecha.toString()}>
              <td>{new Date(r.fecha).toLocaleDateString()}</td>
              <td>${r.total_dia}</td>
              <td>${r.total_acumulado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
