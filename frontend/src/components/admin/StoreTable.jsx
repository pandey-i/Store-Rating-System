import DataTable from "../common/DataTable";
import LoadingSpinner from "../common/LoadingSpinner";
import EmptyState from "../common/EmptyState";

const columns = [
  "Store",
  "Email",
  "Owner",
  "Average Rating",
  "Ratings",
  "Address",
];

export default function StoreTable({
  stores,
  loading,
}) {
  return (
    <DataTable
      columns={columns}
      data={stores}
      loading={loading}
      loadingComponent={
        <LoadingSpinner message="Loading stores..." />
      }
      emptyComponent={
        <EmptyState
  title="No users found"
  message="Try changing your search or filters."
/>
      }
      renderRow={(store) => (
        <tr
          key={store.id}
          className="border-t hover:bg-gray-50 transition"
        >
          <td className="p-4 font-medium">
            {store.name}
          </td>

          <td className="p-4">
            {store.email}
          </td>

          <td className="p-4">
            {store.owner?.name || "-"}
          </td>

          <td className="p-4">
            ⭐ {Number(store.averageRating || 0).toFixed(1)}
          </td>

          <td className="p-4">
            {store.totalRatings}
          </td>

          <td className="p-4">
            {store.address}
          </td>
        </tr>
      )}
    />
  );
}