export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
  valueClassName = "text-5xl",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 font-medium">
            {title}
          </p>

          <h2
            className={`${valueClassName} font-bold mt-3 text-gray-800 leading-tight`}
          >
            {value}
          </h2>

          {subtitle && (
            <p className="text-sm text-gray-400 mt-3">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}
          >
            <span className={`text-3xl ${iconColor}`}>
              {icon}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}