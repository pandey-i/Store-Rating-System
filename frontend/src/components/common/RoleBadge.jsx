export default function RoleBadge({ role }) {
  const styles = {
    ADMIN: "bg-red-100 text-red-700",
    OWNER: "bg-green-100 text-green-700",
    USER: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        styles[role] || "bg-gray-100 text-gray-700"
      }`}
    >
      {role}
    </span>
  );
}