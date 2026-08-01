import { useForm, Controller } from "react-hook-form";
import CustomSelect from "../common/CustomSelect";

import Input from "../common/Input";
import Button from "../common/Button";

export default function StoreForm({
  loading,
  owners,
  onSubmit,
  onCancel,
}) {
 const {
  register,
  handleSubmit,
  control,
  formState: { errors },
} = useForm({
  mode: "onBlur",
  reValidateMode: "onChange",
});

  const ownerOptions = owners.map((owner) => ({
  value: owner.id,
  label: owner.name,
}));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        label="Store Name"
        placeholder="Enter store name"
        error={errors.name?.message}
        {...register("name", {
  required: "Store name is required",
  minLength: {
    value: 20,
    message: "Store name must be at least 20 characters",
  },
  maxLength: {
    value: 60,
    message: "Store name cannot exceed 60 characters",
  },
})}
      />

      <Input
        label="Store Email"
        type="email"
        placeholder="Enter store email"
        error={errors.email?.message}
        {...register("email", {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email address",
  },
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
  maxLength: {
    value: 400,
    message: "Address cannot exceed 400 characters",
  },
})}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        {errors.address && (
          <p className="mt-2 text-sm text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>

<div>
  <label className="block mb-2 text-sm font-semibold text-slate-700">
    Store Owner
  </label>

  <Controller
  name="ownerId"
  control={control}
  rules={{
    required: "Owner is required",
  }}
  render={({ field }) => (
    <CustomSelect
      options={ownerOptions}
      value={field.value}
      onChange={field.onChange}
      placeholder="Select Owner"
      isSearchable={true}
    />
  )}
/>

  {errors.ownerId && (
    <p className="mt-2 text-sm text-red-500">
      {errors.ownerId.message}
    </p>
  )}
</div>

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
          {loading ? "Creating..." : "Create Store"}
        </Button>
      </div>
    </form>
  );
}