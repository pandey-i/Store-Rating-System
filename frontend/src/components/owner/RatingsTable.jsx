import DataTable from "../common/DataTable";
import EmptyState from "../common/EmptyState";
import LoadingSpinner from "../common/LoadingSpinner";

const columns = [
  "User",
  "Email",
  "Rating",
];

const renderStars = (rating) =>
  "⭐".repeat(rating);

export default function RatingsTable({
  ratings,
  loading,
}) {
  return (
    <DataTable
      columns={columns}
      data={ratings}
      loading={loading}
      loadingComponent={
        <LoadingSpinner message="Loading ratings..." />
      }
      emptyComponent={
        <EmptyState message="No ratings found." />
      }
      renderRow={(item) => (
        <tr
          key={item.id}
          className="border-t hover:bg-gray-50"
        >
          <td className="p-4">
            {item.user.name}
          </td>

          <td className="p-4">
            {item.user.email}
          </td>

          <td className="p-4">
            <div className="flex gap-1">
  {renderStars(item.rating)}
</div>
          </td>
        </tr>
      )}
    />
  );
}