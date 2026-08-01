import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import useFetch from "../../hooks/useFetch";

import StatsCard from "../../components/owner/StatsCard";
import StoreInfoCard from "../../components/owner/StoreInfoCard";
import RatingsTable from "../../components/owner/RatingsTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import TableHeader from "../../components/common/TableHeader";

export default function OwnerDashboard() {
  const {
    data,
    loading,
  } = useFetch(
    () => api.get("/owner/dashboard"),
    []
  );

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner message="Loading dashboard..." />
      </Layout>
    );
  }

  const dashboard = data || {};
  const store = dashboard.store || {};
  const ratings = dashboard.ratings || [];

  return (
    <Layout>
      
      <TableHeader
  title="Owner Dashboard"
/>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Average Rating"
          value={`⭐ ${store.averageRating ?? 0}`}
          icon="⭐"
        />

        <StatsCard
          title="Total Ratings"
          value={store.totalRatings ?? 0}
          icon="📝"
        />
      </div>

      <div className="mb-8">
        <StoreInfoCard store={store} />
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Recent Ratings
      </h2>

      <RatingsTable
        ratings={ratings}
        loading={false}
      />
    </Layout>
  );
}