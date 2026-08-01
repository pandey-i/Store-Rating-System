export default function DataTable({
  columns,
  data,
  renderRow,
  loading = false,
  loadingComponent = null,
  emptyComponent = null,
}) {
  const rows = Array.isArray(data) ? data : [];

  if (loading) {
    return loadingComponent;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[700px] w-full border-collapse">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-700 whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {rows.length === 0 ? (
              emptyComponent ?? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-16 text-center"
                  >
                    <div className="text-5xl mb-3">📭</div>

                    <p className="text-lg font-semibold text-slate-700">
                      No records found
                    </p>

                    <p className="text-sm text-slate-400 mt-2">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )
            ) : (
              rows.map(renderRow)
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Hint */}
      <div className="lg:hidden px-4 py-2 text-xs text-slate-400 border-t bg-slate-50">
        ← Swipe horizontally to view all columns →
      </div>
    </div>
  );
}