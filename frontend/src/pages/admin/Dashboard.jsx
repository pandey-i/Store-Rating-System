import { useEffect, useState } from "react";
import {
  FiUsers,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";

import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import StatCard from "../../components/common/StatCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Link } from "react-router-dom";
import { FiUserPlus, FiPlusSquare } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/api/admin/dashboard");
      setStats(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner message="Loading dashboard..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome back! Here's an overview of your platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          subtitle="Registered users"
          icon={<FiUsers />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Total Stores"
          value={stats.totalStores}
          subtitle="Stores on platform"
          icon={<FiShoppingBag />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="Total Ratings"
          value={stats.totalRatings}
          subtitle="Ratings submitted"
          icon={<FiStar />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-500"
        />
      </div>
      {/* Quick Actions */}
<div className="mt-10">
  <h2 className="text-2xl font-bold text-slate-800 mb-6">
    Quick Actions
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <Link
      to="/admin/users/create"
      className="group bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            Create User
          </h3>

          <p className="text-slate-500 mt-2">
            Add a new Admin, Owner or User.
          </p>
        </div>

        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
          <FiUserPlus className="text-blue-600 text-2xl" />
        </div>
      </div>
    </Link>

    <Link
      to="/admin/stores/create"
      className="group bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            Create Store
          </h3>

          <p className="text-slate-500 mt-2">
            Register a new store and assign an owner.
          </p>
        </div>

        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
          <FiPlusSquare className="text-green-600 text-2xl" />
        </div>
      </div>
    </Link>

  </div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">

  {/* Recent Users */}
  <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">

    <div className="flex justify-between items-center mb-5">
      <h2 className="text-xl font-bold text-slate-800">
        Recent Users
      </h2>

      <Link
        to="/admin/users"
        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
      >
        View All <FiArrowRight />
      </Link>
    </div>

    <div className="space-y-4">

      {stats.recentUsers.map((user) => (
        <div
          key={user.id}
          className="flex justify-between items-center border-b border-slate-100 pb-3"
        >
          <div>
            <p
  className="font-semibold text-slate-800 truncate max-w-[220px]"
  title={user.name}
>
  {user.name}
</p>

            <p className="text-sm text-slate-500">
              {user.role}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              user.role === "ADMIN"
                ? "bg-purple-100 text-purple-700"
                : user.role === "OWNER"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {user.role}
          </span>
        </div>
      ))}

    </div>

  </div>

  {/* Recent Stores */}
  <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">

    <div className="flex justify-between items-center mb-5">
      <h2 className="text-xl font-bold text-slate-800">
        Recent Stores
      </h2>

      <Link
        to="/admin/stores"
        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
      >
        View All <FiArrowRight />
      </Link>
    </div>

    <div className="space-y-4">

      {stats.recentStores.map((store) => (
        <div
          key={store.id}
          className="flex justify-between items-center border-b border-slate-100 pb-3"
        >
          <div>
            <p className="font-semibold text-slate-800 truncate max-w-[220px]"
            title={store.name}>
              {store.name}
            </p>

            <p className="text-sm text-slate-500">
              Average Rating
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
            ⭐ {store.averageRating}
          </span>
        </div>
      ))}

    </div>

  </div>

</div>

    </Layout>
  );
}