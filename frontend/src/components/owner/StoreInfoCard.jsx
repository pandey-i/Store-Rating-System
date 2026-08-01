export default function StoreInfoCard({
  store,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <h2 className="text-xl font-bold mb-5">
        Store Information
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <p className="text-gray-500 text-sm">
            Store Name
          </p>

          <p className="font-semibold">
            {store.name}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Email
          </p>

          <p className="font-semibold">
            {store.email}
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-gray-500 text-sm">
            Address
          </p>

          <p className="font-semibold">
            {store.address}
          </p>
        </div>
      </div>
    </div>
  );
}