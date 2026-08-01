import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
      const res = await api.post("/api/auth/login", data);

      const { user, token } = res.data.data;

      login(user, token);

      toast.success("Login successful");

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "OWNER") {
        navigate("/owner");
      } else {
        navigate("/stores");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

return (
  <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">

    {/* Left Section */}
    <motion.div
  initial={{ opacity: 0, x: -60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
  }}
  className="hidden lg:flex flex-col justify-center px-16 xl:px-24 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white"
>

      <div className="flex items-center gap-4 mb-10">
        <motion.img
  src="/logo.svg"
  alt="Store Rating System"
  className="w-16 h-16"
  animate={{
    y: [0, -6, 0],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
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
        Find the best stores through trusted customer reviews.
      </h2>

      <div className="space-y-5 text-lg text-blue-100">

        <div className="flex items-center gap-3">
          ✅ Secure Authentication
        </div>

        <div className="flex items-center gap-3">
          ⭐ Rate & Review Stores
        </div>

        <div className="flex items-center gap-3">
          👥 Admin • Owner • User Dashboards
        </div>

      </div>
    </motion.div>

    {/* Right Section */}
    <div className="flex items-center justify-center px-6 py-10">

      <motion.div
  initial={{
    opacity: 0,
    y: 40,
    scale: 0.95,
  }}
  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  transition={{
    duration: 0.6,
    delay: 0.2,
    ease: "easeOut",
  }}
  className="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-200 p-10"
>

        <div className="text-center mb-8">

          <img
            src="/logo.svg"
            alt="Logo"
            className="w-16 h-16 mx-auto mb-4 lg:hidden"
          />

         <motion.h1
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.4,
    duration: 0.5,
  }}
  className="text-4xl font-bold text-slate-800"
>
            Welcome Back 👋
          </motion.h1>

          <p className="mt-3 text-slate-500">
            Sign in to access your dashboard.
          </p>

        </div>

        <motion.form
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    delay: 0.55,
    duration: 0.5,
  }}
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-5"
>
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
            })}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </motion.form>

        <p className="text-center mt-8 text-slate-600">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Register
          </Link>
        </p>

      </motion.div>

    </div>

  </div>
);
}