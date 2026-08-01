import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import UserForm from "../../components/admin/UserForm";

export default function CreateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await api.post("/api/admin/users", data);

      toast.success("User created successfully");

      navigate("/admin/users");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Create User
          </h1>

          <p className="text-slate-500 mt-1">
            Add a new user to the Store Rating System.
          </p>
        </div>

        <UserForm
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/users")}
        />
      </div>
    </Layout>
  );
}