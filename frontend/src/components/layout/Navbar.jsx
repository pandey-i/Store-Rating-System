import { FiMenu } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">

        {/* Left */}
        <div className="flex items-center gap-3">

          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <FiMenu size={22} />
          </button>

          <div>
            <h1 className="text-lg md:text-2xl font-bold text-slate-800">
              Store Rating System
            </h1>

            <p className="hidden md:block text-sm text-slate-500">
              Welcome back,{" "}
              <span className="font-medium text-blue-600">
                {user?.name}
              </span>{" "}
              👋
            </p>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center">
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
            {user?.role}
          </span>
        </div>

      </div>
    </header>
  );
}