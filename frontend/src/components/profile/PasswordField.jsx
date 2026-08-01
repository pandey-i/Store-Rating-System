import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordField({
  label,
  name,
  show,
  toggle,
  validation,
  placeholder,
  register,
  errors,
}) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          {...register(name, validation)}
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
        >
          {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>

      {errors[name] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}