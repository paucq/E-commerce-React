export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label="Paginacion"
    >
      <button
        className="h-9 rounded-full border border-tech-border px-4 text-sm font-medium text-tech-muted transition hover:border-tech-primary hover:text-tech-ink disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {pages.map((page) => (
        <button
          key={`page-${page}`}
          className={`h-9 min-w-[2.5rem] rounded-full border px-3 text-sm font-semibold transition ${
            page === currentPage
              ? "border-tech-primary bg-tech-primary text-white shadow-glow"
              : "border-tech-border text-tech-muted hover:border-tech-primary hover:text-tech-ink"
          }`}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        className="h-9 rounded-full border border-tech-border px-4 text-sm font-medium text-tech-muted transition hover:border-tech-primary hover:text-tech-ink disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </nav>
  );
}
