import Link from "next/link";

export function BackButton() {
  return (
    <nav className="header">
        <Link href="../" className="btn-back">
            Volver al Dashboard
        </Link>
    </nav>
  );
}