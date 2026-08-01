import { useState } from "react";
import Select from "react-select";
import {
  FiStar,
  FiHome,
  FiUsers,
} from "react-icons/fi";

import Layout from "../../components/layout/Layout";
import TableHeader from "../../components/common/TableHeader";
import StatCard from "../../components/common/StatCard";
import DataTable from "../../components/common/DataTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import StarRating from "../../components/user/StarRating";

import api from "../../services/api";
import useFetch from "../../hooks/useFetch";

export default function Dashboard() {
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const sortOptions = [
    { value: "name", label: "Customer Name" },
    { value: "email", label: "Email" },
    { value: "rating", label: "Rating" },
  ];

  const orderOptions = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "46px",
      borderRadius: "12px",
      borderColor: state.isFocused
        ? "#2563eb"
        : "#cbd5e1",
      boxShadow: state.isFocused
        ? "0 0 0 2px rgba(37,99,235,.2)"
        : "none",
      "&:hover": {
        borderColor: "#2563eb",
      },
    }),

    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? "#2563eb"
        : state.isFocused
        ? "#dbeafe"
        : "#fff",
      color: state.isSelected
        ? "#fff"
        : "#111827",
    }),
  };

  const {
    data,
    loading,
  } = useFetch(
    () =>
      api.get("/owner/dashboard", {
        params: {
          sortBy,
          order,
        },
      }),
    [sortBy, order]
  );

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner message="Loading dashboard..." />
      </Layout>
    );
  }

  const store = data?.store;
  const ratings = data?.ratings || [];

  return (
    <Layout>
      <TableHeader
        title="Owner Dashboard"
        subtitle="View your store's ratings and customer feedback."
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <StatCard
          title="My Store"
          value={store?.name}
          valueClassName="text-2xl"
          subtitle={`📍 ${store?.address}`}
          icon={<FiHome />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Average Store Rating"
          value={`${(store?.averageRating ?? 0).toFixed(1)} / 5`}
          valueClassName="text-4xl"
          subtitle={`Based on ${store?.totalRatings} rating${
            store?.totalRatings === 1 ? "" : "s"
          }`}
          icon={<FiStar />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-500"
        />

      </div>

      {/* Ratings Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-800">
            <FiUsers className="text-blue-600" />
            Customer Ratings
          </h2>

          <div className="flex gap-4">

            <div className="w-60">
              <Select
                options={sortOptions}
                value={sortOptions.find(
                  (option) =>
                    option.value === sortBy
                )}
                onChange={(option) =>
                  setSortBy(option.value)
                }
                styles={selectStyles}
                isSearchable={false}
              />
            </div>

            <div className="w-52">
              <Select
                options={orderOptions}
                value={orderOptions.find(
                  (option) =>
                    option.value === order
                )}
                onChange={(option) =>
                  setOrder(option.value)
                }
                styles={selectStyles}
                isSearchable={false}
              />
            </div>

          </div>

        </div>

        <DataTable
          columns={[
            "Customer",
            "Email",
            "Rating",
          ]}
          data={ratings}
          emptyComponent={
            <EmptyState
              title="No ratings yet"
              message="Your store hasn't received any ratings yet."
            />
          }
          renderRow={(rating) => (
            <tr
              key={rating.userId}
              className="even:bg-slate-50 hover:bg-blue-50 transition-colors duration-200"
            >
              <td className="p-4 font-medium">
                {rating.name}
              </td>

              <td className="p-4">
                {rating.email}
              </td>

              <td className="p-4">
                <div className="flex items-center gap-3">
                  <StarRating
                    rating={rating.rating}
                  />

                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                    {rating.rating}.0
                  </span>
                </div>
              </td>
            </tr>
          )}
        />

      </div>
    </Layout>
  );
}