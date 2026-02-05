import { pool } from "../../lib/db";

export default async function Reporte3() {
  const { rows } = await pool.query(
    "SELECT * FROM vw_students_at_risk"
  );

  return (
    <main>
      <h1>Top productos más vendidos</h1>

      <table>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Producto</th>
            <th>Unidades vendidas</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.producto}>
              <td>{r.ranking}</td>
              <td>{r.producto}</td>
              <td>{r.unidades_vendidas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
