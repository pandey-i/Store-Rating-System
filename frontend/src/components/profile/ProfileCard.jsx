export default function ProfileCard({ profile }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
      <div className="flex items-center gap-5 mb-8">
        <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
          {profile.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            {profile.name}
          </h2>

          <p className="text-gray-500">
            {profile.role}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500 text-sm">
            Email
          </p>

          <p className="font-semibold">
            {profile.email}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Address
          </p>

          <p className="font-semibold">
            {profile.address}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Role
          </p>

          <span className="inline-block mt-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            {profile.role}
          </span>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Member Since
          </p>

          <p className="font-semibold">
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}