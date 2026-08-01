import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NotFound() {
  const { user } = useAuth();

  const homePath = !user
    ? "/login"
    : user.role === "ADMIN"
    ? "/admin"
    : user.role === "OWNER"
    ? "/owner"
    : "/stores";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-600">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-600 max-w-md">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to={homePath}
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}