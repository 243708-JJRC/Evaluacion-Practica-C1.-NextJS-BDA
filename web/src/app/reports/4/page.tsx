import { pool } from "../../lib/db";

export default async function Reporte4() {
  const { rows } = await pool.query(
    "SELECT * FROM vw_attendance_by_group"
  );

  return (
    <main>
      <h1>Ticket promedio por categoría</h1>

      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Total ingresos</th>
            <th>Órdenes</th>
            <th>Ticket promedio</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.categoria}>
              <td>{r.categoria}</td>
              <td>${r.total_ingresos}</td>
              <td>{r.total_ordenes}</td>
              <td>${Number(r.ticket_promedio).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
