import Link from "next/link";

export function PaginationControls({ page, totalPages }: { page: number, totalPages: number }) {
  return (
    <div className="pagination">
      <Link href={`?page=${Math.max(1, page - 1)}`} className={`page-btn ${page <= 1 ? "disabled" : ""}`}>
        Anterior
      </Link>
      <span className="page-info">Página {page} de {totalPages}</span>
      <Link href={`?page=${Math.min(totalPages, page + 1)}`}  className={`page-btn ${page >= totalPages ? "disabled" : ""}`}>
        Siguiente
      </Link>
    </div>
  );
}