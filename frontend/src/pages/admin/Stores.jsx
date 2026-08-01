import { useEffect, useState } from "react";

import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import TableHeader from "../../components/common/TableHeader";
import Pagination from "../../components/common/Pagination";
import StoreFilters from "../../components/admin/StoreFilters";
import StoreTable from "../../components/admin/StoreTable";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";

export default function Stores() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy, order]);

  const {
    data: stores = [],
    pagination,
    loading,
  } = useFetch(
    () =>
      api.get("/api/admin/stores", {
        params: {
          search: debouncedSearch,
          page,
          limit,
          sortBy,
          order,
        },
      }),
    [debouncedSearch, page, sortBy, order]
  );

  return (
    <Layout>
      <TableHeader
        title="Stores"
        subtitle="Manage stores registered in the system."
        buttonText="+ Create Store"
        buttonLink="/admin/stores/create"
      />

<StoreFilters
  search={search}
  setSearch={setSearch}
  sortBy={sortBy}
  setSortBy={setSortBy}
  order={order}
  setOrder={setOrder}
totalStores={pagination?.totalItems ?? 0}
/>

      <StoreTable
        stores={stores}
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