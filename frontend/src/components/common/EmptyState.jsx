import { FiInbox } from "react-icons/fi";

export default function EmptyState({
  title = "No data found",
  message = "Try changing your search or filters.",
}) {
  return (
    <tr>
      <td colSpan="100%">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <FiInbox
              size={32}
              className="text-blue-500"
            />
          </div>

          <h3 className="text-lg font-semibold text-slate-700">
            {title}
          </h3>

          <p className="text-slate-500 mt-2">
            {message}
          </p>
        </div>
      </td>
    </tr>
  );
}