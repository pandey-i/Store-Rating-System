import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import api from "../../services/api";
import Button from "../common/Button";
import PasswordField from "./PasswordField";

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

const {
  register,
  handleSubmit,
  watch,
  reset,
  formState: { errors, isSubmitting },
} = useForm({
  mode: "onChange",
   reValidateMode: "onChange",
});

  const onSubmit = async (data) => {
    try {
      await api.put("/api/auth/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Password updated successfully");
      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update password"
      );
    }
  };


return (
  <div className="max-w-xl mx-auto">
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Change Password
        </h2>

        <p className="text-slate-500 mt-1">
          Update your account password securely.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
<PasswordField
  label="Current Password"
  name="currentPassword"
  placeholder="Enter current password"
  show={showCurrent}
  toggle={() => setShowCurrent(!showCurrent)}
  validation={{
    required: "Current password is required",
  }}
  register={register}
  errors={errors}
/>

<PasswordField
  label="New Password"
  name="newPassword"
  placeholder="Enter new password"
  show={showNew}
  toggle={() => setShowNew(!showNew)}
  validation={{
    required: "New password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    validate: (value) =>
      value !== watch("currentPassword") ||
      "New password must be different from the current password",
  }}
  register={register}
  errors={errors}
/>

<PasswordField
  label="Confirm Password"
  name="confirmPassword"
  placeholder="Confirm new password"
  show={showConfirm}
  toggle={() => setShowConfirm(!showConfirm)}
  validation={{
    required: "Please confirm your password",
    validate: (value) =>
      value === watch("newPassword") ||
      "Passwords do not match",
  }}
  register={register}
  errors={errors}
/>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Updating..."
            : "Update Password"}
        </Button>
      </form>
    </div>
    </div>
  );
}