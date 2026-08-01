import { Link } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import TableHeader from "../../components/common/TableHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ProfileCard from "../../components/profile/ProfileCard";

import api from "../../services/api";
import useFetch from "../../hooks/useFetch";

export default function Profile() {

  const { data, loading } = useFetch(
    () => api.get("/api/auth/profile"),
    []
  );

  const profile = data || {};

  return (
    <Layout>
      <TableHeader title="My Profile" />

      {loading ? (
        <LoadingSpinner message="Loading profile..." />
      ) : (
        <>
          <ProfileCard profile={profile} />

          <div className="mt-6">
            <Link
              to="/change-password"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Change Password
            </Link>
          </div>
        </>
      )}
    </Layout>
  );
}