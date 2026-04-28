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
        className="h-9 rounded-full border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      {pages.map((page) => (
        <button
          key={`page-${page}`}
          className={`h-9 min-w-[2.25rem] rounded-full border px-3 text-sm font-semibold transition ${
            page === currentPage
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
          }`}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        className="h-9 rounded-full border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </nav>
  );
}
