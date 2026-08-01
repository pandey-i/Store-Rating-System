import { FiSearch } from "react-icons/fi";
import CustomSelect from "../common/CustomSelect";

export default function StoreFilters({
  search,
  setSearch,
  sortBy,
  setSortBy,
  order,
  setOrder,
  totalStores,
}) {
  const sortOptions = [
    { value: "createdAt", label: "Newest" },
    { value: "name", label: "Store Name" },
    { value: "email", label: "Email" },
    { value: "address", label: "Address" },
  ];

  const orderOptions = [
    { value: "desc", label: "Descending" },
    { value: "asc", label: "Ascending" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Search */}
        <div className="relative">
          <FiSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search stores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Sort */}
        <CustomSelect
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
        />

        {/* Order */}
        <CustomSelect
          options={orderOptions}
          value={order}
          onChange={setOrder}
        />

        {/* Info */}
<div className="hidden lg:flex flex-col items-center justify-center rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
  <span className="text-xs uppercase tracking-wide text-slate-500">
    Total Stores
  </span>

  <span className="text-2xl font-bold text-blue-700">
    {totalStores}
  </span>
</div>

      </div>
    </div>
  );
}