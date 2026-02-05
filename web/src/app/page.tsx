import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>SQL Reports Dashboard</h1>
      <ul>
        <li><Link href="/reports/1">Rendimiento del curso</Link></li>
        <li><Link href="/reports/2">Docentes</Link></li>
        <li><Link href="/reports/3">Estudiantes en riesgo</Link></li>
        <li><Link href="/reports/4">Asistencia por grupo</Link></li>
        <li><Link href="/reports/5">Ranking de estudiantes</Link></li>
      </ul>
    </main>
  );
}
