import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import api from "../../services/api";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/api/auth/register", data);

      toast.success("Registration successful");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

return (
  <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">

    {/* Left Panel */}
    <div className="hidden lg:flex flex-col justify-center px-16 xl:px-24 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">

      <div className="flex items-center gap-4 mb-10">
        <img
          src="/logo.svg"
          alt="Store Rating System"
          className="w-16 h-16"
        />

        <div>
          <h1 className="text-4xl font-bold">
            Store Rating
          </h1>

          <p className="text-blue-100 mt-1">
            Review • Rate • Discover
          </p>
        </div>
      </div>

      <h2 className="text-5xl font-bold leading-tight mb-8">
        Join thousands of users discovering and rating trusted stores.
      </h2>

      <div className="space-y-5 text-lg text-blue-100">

        <div className="flex items-center gap-3">
          ✅ Create your free account
        </div>

        <div className="flex items-center gap-3">
          ⭐ Rate & Review Stores
        </div>

        <div className="flex items-center gap-3">
          🏪 Explore stores near you
        </div>

        <div className="flex items-center gap-3">
          📱 Access anywhere, anytime
        </div>

      </div>

    </div>

    {/* Right Panel */}
    <div className="flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-200 p-10">

        <div className="text-center mb-8">

          <img
            src="/logo.svg"
            alt="Logo"
            className="w-16 h-16 mx-auto mb-4 lg:hidden"
          />

          <h1 className="text-4xl font-bold text-slate-800">
            Create Account 🚀
          </h1>

          <p className="mt-3 text-slate-500">
            Register to start using Store Rating System.
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <Input
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 20,
                message: "Name must be at least 20 characters",
              },
              maxLength: {
                value: 60,
                message: "Name cannot exceed 60 characters",
              },
            })}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 16,
                message: "Password cannot exceed 16 characters",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
                message:
                  "Password must contain one uppercase letter and one special character",
              },
            })}
          />

          <Input
            label="Address"
            placeholder="Enter your address"
            error={errors.address?.message}
            {...register("address", {
              required: "Address is required",
              maxLength: {
                value: 400,
                message: "Address cannot exceed 400 characters",
              },
            })}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-lg rounded-xl hover:scale-[1.02] transition-all"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </Button>

        </form>

        <p className="text-center mt-8 text-slate-600">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  </div>
);
}