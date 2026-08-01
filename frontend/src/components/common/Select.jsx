export default function Select({
  label,
  error,
  children,
  className = "",
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <select
        {...props}
        className={`
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          transition-all
          duration-200
          ${className}
        `}
      >
        {children}
      </select>

      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
}