import { useEffect, useState } from "react";

import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import TableHeader from "../../components/common/TableHeader";
import useFetch from "../../hooks/useFetch";
import useDebounce from "../../hooks/useDebounce";

import StoreFilters from "../../components/user/StoreFilters";
import StoreGrid from "../../components/user/StoreGrid";
import RatingModal from "../../components/user/RatingModal";

export default function Stores() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [selectedStore, setSelectedStore] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data,
    loading,
    refetch,
  } = useFetch(
    () =>
      api.get("/users/stores", {
        params: {
          search: debouncedSearch,
        },
      }),
    [debouncedSearch]
  );

  const stores = Array.isArray(data) ? data : [];

  const handleRate = (store) => {
    setSelectedStore(store);
    setModalOpen(true);
  };

  return (
    <Layout>
      <TableHeader title="Stores" />

      <StoreFilters
        search={search}
        setSearch={setSearch}
      />

      <StoreGrid
        stores={stores}
        onRate={handleRate}
      />

      <RatingModal
        open={modalOpen}
        store={selectedStore}
        onClose={() => {
          setModalOpen(false);
          setSelectedStore(null);
        }}
        onSuccess={refetch}
      />
    </Layout>
  );
}