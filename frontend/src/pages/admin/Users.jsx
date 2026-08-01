import { useEffect, useState } from "react";

import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import UserFilters from "../../components/admin/UserFilters";
import Pagination from "../../components/common/Pagination";
import TableHeader from "../../components/common/TableHeader";
import UserTable from "../../components/admin/UserTable";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";

export default function Users() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);

  const limit = 10;

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  // Reset to first page when filters change
useEffect(() => {
  setPage(1);
}, [debouncedSearch, role, sortBy, order]);

const {
  data: users = [],
  pagination,
  loading,
} = useFetch(
  () =>
    api.get("/api/admin/users", {
      params: {
        search: debouncedSearch,
        role,
        page,
        limit,
        sortBy,
        order,
      },
    }),
  [debouncedSearch, role, page, sortBy, order]
);

  return (
    <Layout>
<TableHeader
  title="Users"
  subtitle="Manage registered users in the system."
  buttonText="+ Create User"
  buttonLink="/admin/users/create"
/>

      <UserFilters
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />

      <UserTable
        users={users}
        loading={loading}
      />

      <Pagination
        pagination={pagination}
        page={page}
        setPage={setPage}
      />
    </Layout>
  );
}