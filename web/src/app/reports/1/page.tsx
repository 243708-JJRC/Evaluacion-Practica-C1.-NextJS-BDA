import { pool } from "../../lib/db";

export default async function Reporte1() {
  const { rows } = await pool.query(
    "SELECT * FROM vw_course_performance"
  );

  const totalVentas = rows.reduce(
    (acc, r) => acc + Number(r.total_ventas),
    0
  );

  return (
    <main>
      <h1>Rendimiento del curso</h1>
      <p>Total acumulado: <strong>${totalVentas.toFixed(2)}</strong></p>

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Período</th>
            <th>Total</th>
            <th>Ticket promedio</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.fecha.toString()}>
              <td>{new Date(r.fecha).toLocaleDateString()}</td>
              <td>{r.total_ordenes}</td>
              <td>${r.total_ventas}</td>
              <td>${Number(r.ticket_promedio).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}