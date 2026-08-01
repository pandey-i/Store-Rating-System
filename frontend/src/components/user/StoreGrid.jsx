import EmptyState from "../common/EmptyState";
import StoreCard from "./StoreCard";

export default function StoreGrid({
  stores,
  onRate,
}) {
  if (stores.length === 0) {
    return (
      <EmptyState
        title="No stores found"
        message="Try searching with a different name."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {stores.map((store) => (
        <StoreCard
          key={store.id}
          store={store}
          onRate={onRate}
        />
      ))}
    </div>
  );
}