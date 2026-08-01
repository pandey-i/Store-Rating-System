export default function StoreFilters({
  search,
  setSearch,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <input
        type="text"
        placeholder="Search stores..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}