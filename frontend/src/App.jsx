import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";

import UserStores from "./pages/user/Stores";
import OwnerDashboard from "./pages/owner/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import CreateUser from "./pages/admin/CreateUser";

import Stores from "./pages/admin/Stores";
import CreateStore from "./pages/admin/CreateStore";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/profile/ChangePassword";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* User */}
        <Route
          path="/stores"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserStores />
            </ProtectedRoute>
          }
        />

        {/* Owner */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />



        <Route
  path="/admin/users/create"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <CreateUser />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/stores"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Stores />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/stores/create"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <CreateStore />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute
      allowedRoles={["ADMIN", "OWNER", "USER"]}
    >
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/change-password"
  element={
    <ProtectedRoute
      allowedRoles={["ADMIN", "OWNER", "USER"]}
    >
      <ChangePassword />
    </ProtectedRoute>
  }
/>

<Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}