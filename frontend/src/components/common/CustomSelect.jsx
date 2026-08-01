import ReactSelect from "react-select";

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
  error,
  isSearchable = false,
}) {
  const selectedOption =
    options.find((option) => option.value === value) || null;

  return (
    <div>
      {label && (
        <label className="block mb-2 text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <ReactSelect
        options={options}
        value={selectedOption}
        onChange={(selected) => onChange(selected?.value)}
        placeholder={placeholder}
        isSearchable={isSearchable}
        menuPortalTarget={document.body}
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: "44px",
            borderRadius: "12px",
            borderColor: state.isFocused
              ? "#2563eb"
              : "#cbd5e1",
            boxShadow: state.isFocused
              ? "0 0 0 2px rgba(37,99,235,.25)"
              : "none",
            "&:hover": {
              borderColor: "#2563eb",
            },
          }),

          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),

          menu: (base) => ({
            ...base,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow:
              "0 12px 30px rgba(0,0,0,.15)",
          }),

          option: (base, state) => ({
            ...base,
            cursor: "pointer",
            backgroundColor: state.isFocused
              ? "#2563eb"
              : state.isSelected
              ? "#1d4ed8"
              : "#fff",

            color:
              state.isFocused || state.isSelected
                ? "#fff"
                : "#111827",
          }),

          indicatorSeparator: () => ({
            display: "none",
          }),
        }}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}