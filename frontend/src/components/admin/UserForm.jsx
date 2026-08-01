import { useForm } from "react-hook-form";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

export default function UserForm({
  loading,
  onSubmit,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        label="Full Name"
        type="text"
        autoComplete="name"
        placeholder="Enter full name"
        error={errors.name?.message}
        {...register("name", {
          required: "Name is required",
        })}
      />

      <Input
        label="Email Address"
        type="email"
        autoComplete="email"
        placeholder="Enter email"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
        })}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        placeholder="Enter password"
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
        })}
      />

      <div>
        <label className="block mb-2 text-sm font-semibold text-slate-700">
          Address
        </label>

        <textarea
          rows={3}
          placeholder="Enter address"
          {...register("address", {
            required: "Address is required",
          })}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        {errors.address && (
          <p className="mt-2 text-sm text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>

      <Select
        label="Role"
        error={errors.role?.message}
        {...register("role", {
          required: "Role is required",
        })}
      >
        <option value="">Select Role</option>
        <option value="USER">User</option>
        <option value="OWNER">Owner</option>
        <option value="ADMIN">Admin</option>
      </Select>

      <div className="flex gap-4 pt-2">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="flex-1"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
        </Button>
      </div>
    </form>
  );
}