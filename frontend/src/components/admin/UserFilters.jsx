import { FiSearch } from "react-icons/fi";
import CustomSelect from "../common/CustomSelect";

export default function UserFilters({
  search,
  setSearch,
  role,
  setRole,
  sortBy,
  setSortBy,
  order,
  setOrder,
}) {
  const roleOptions = [
    { value: "", label: "All Roles" },
    { value: "ADMIN", label: "Admin" },
    { value: "OWNER", label: "Owner" },
    { value: "USER", label: "User" },
  ];

  const sortOptions = [
    { value: "createdAt", label: "Newest" },
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "role", label: "Role" },
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
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <CustomSelect
          options={roleOptions}
          value={role}
          onChange={setRole}
        />

        <CustomSelect
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
        />

        <CustomSelect
          options={orderOptions}
          value={order}
          onChange={setOrder}
        />

      </div>
    </div>
  );
}