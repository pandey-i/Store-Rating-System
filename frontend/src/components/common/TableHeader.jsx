import { Link } from "react-router-dom";

export default function TableHeader({
  title,
  subtitle,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {buttonText && (
        <Link
          to={buttonLink}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}