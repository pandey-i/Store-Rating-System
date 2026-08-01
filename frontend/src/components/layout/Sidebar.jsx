import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FiHome,
  FiUsers,
  FiShoppingBag,
  FiUser,
  FiLock,
  FiLogOut,
  FiX,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar({
  open,
  onClose,
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-slate-200 hover:bg-slate-700 hover:text-white"
    }`;

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
      state: {
        message: "Logged out successfully",
      },
    });

    onClose?.();
  };

  const handleNavClick = () => {
    onClose?.();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-72 h-screen
          bg-slate-900 text-white
          flex flex-col shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-700 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-400">
            Store Rating
          </h1>

          <button
            onClick={onClose}
            className="lg:hidden"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* User */}
        <div className="px-6 py-5 border-b border-slate-700">
          <div className="w-14 h-14 rounded-full bg-blue-600 ring-2 ring-blue-400 flex items-center justify-center text-xl font-bold mb-3">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h3 className="font-semibold break-words leading-5">
            {user?.name}
          </h3>

          <p className="text-sm text-slate-400">
            {user?.role}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">

          {user?.role === "ADMIN" && (
            <>
              <NavLink
                to="/admin" end
                className={linkClass}
                onClick={handleNavClick}
              >
                <FiHome size={18} />
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/users"
                className={linkClass}
                onClick={handleNavClick}
              >
                <FiUsers size={18} />
                Users
              </NavLink>

              <NavLink
                to="/admin/stores"
                className={linkClass}
                onClick={handleNavClick}
              >
                <FiShoppingBag size={18} />
                Stores
              </NavLink>
            </>
          )}

          {user?.role === "OWNER" && (
            <NavLink
              to="/owner" end
              className={linkClass}
              onClick={handleNavClick}
            >
              <FiHome size={18} />
              Dashboard
            </NavLink>
          )}

          {user?.role === "USER" && (
            <NavLink
              to="/stores" end
              className={linkClass}
              onClick={handleNavClick}
            >
              <FiShoppingBag size={18} />
              Stores
            </NavLink>
          )}

          <div className="pt-4 mt-4 border-t border-slate-700">

            <NavLink
              to="/profile"
              className={linkClass}
              onClick={handleNavClick}
            >
              <FiUser size={18} />
              My Profile
            </NavLink>

            <NavLink
              to="/change-password"
              className={linkClass}
              onClick={handleNavClick}
            >
              <FiLock size={18} />
              Change Password
            </NavLink>

          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-600 hover:text-white transition"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}