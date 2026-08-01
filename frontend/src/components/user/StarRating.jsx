export default function StarRating({
  rating = 0,
  editable = false,
  onChange,
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!editable}
          onClick={() => editable && onChange(star)}
          className={`text-2xl transition ${
            star <= rating
              ? "text-yellow-400"
              : "text-gray-300"
          } ${editable ? "hover:scale-110 cursor-pointer" : "cursor-default"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}