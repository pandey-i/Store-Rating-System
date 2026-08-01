import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import Layout from "../../components/layout/Layout";
import StoreForm from "../../components/admin/StoreForm";

export default function CreateStore() {
  const navigate = useNavigate();

  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);



  const fetchOwners = async () => {
    try {
      const res = await api.get("/api/admin/users", {
        params: { role: "OWNER" },
      });

      setOwners(res.data.data);
    } catch (error) {
      toast.error("Failed to load owners");
    }
  };

    useEffect(() => {
    fetchOwners();
  }, []);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      await api.post("/api/admin/stores", {
        ...data,
        ownerId: Number(data.ownerId),
      });

      toast.success("Store created successfully");
      navigate("/admin/stores");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create store"
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
            Create Store
          </h1>

          <p className="text-slate-500 mt-1">
            Add a new store to the platform.
          </p>
        </div>

        <StoreForm
          owners={owners}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/stores")}
        />
      </div>
    </Layout>
  );
}