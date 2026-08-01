import { FiLoader } from "react-icons/fi";

export default function LoadingSpinner({
  message = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <FiLoader
        size={36}
        className="animate-spin text-blue-600"
      />

      <p className="mt-4 text-slate-500">
        {message}
      </p>
    </div>
  );
}