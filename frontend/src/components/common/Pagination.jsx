import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({
  pagination,
  page,
  setPage,
}) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const startItem =
    (pagination.page - 1) * pagination.limit + 1;

const endItem = Math.min(
  pagination.page * pagination.limit,
  pagination.totalItems
);

  return (
    <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-4">
      {/* Left */}
      <div className="text-sm text-slate-600">
        Showing{" "}
        <span className="font-semibold text-slate-800">
          {startItem}
        </span>{" "}
        -
        <span className="font-semibold text-slate-800">
          {" "}
          {endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-blue-600">
          {pagination.totalItems}
        </span>{" "}
        results
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <FiChevronLeft />
          Previous
        </button>

        <div className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow">
          {pagination.page} / {pagination.totalPages}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === pagination.totalPages}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}