import DataTable from "../common/DataTable";
import Badge from "../common/Badge";
import LoadingSpinner from "../common/LoadingSpinner";
import EmptyState from "../common/EmptyState";

const columns = [
  "Name",
  "Email",
  "Role",
  "Address",
];

export default function UserTable({
  users,
  loading,
}) {
  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "red";

      case "OWNER":
        return "green";

      default:
        return "blue";
    }
  };

  return (
    <DataTable
      columns={columns}
      data={users}
      loading={loading}
      loadingComponent={
        <LoadingSpinner message="Loading users..." />
      }
      emptyComponent={
        <EmptyState
  title="No users found"
  message="Try changing your search or filters."
/>
      }
      renderRow={(user) => (
        <tr
          key={user.id}
          className="hover:bg-blue-50 even:bg-slate-50 transition-colors duration-200"
        >
          <td className="px-6 py-4 font-medium text-slate-800">
            {user.name}
          </td>

          <td className="px-6 py-4 text-slate-600">
            {user.email}
          </td>

          <td className="px-6 py-4">
            <Badge color={getRoleColor(user.role)}>
              {user.role}
            </Badge>
          </td>

          <td className="px-6 py-4 text-slate-600">
            {user.address}
          </td>
        </tr>
      )}
    />
  );
}