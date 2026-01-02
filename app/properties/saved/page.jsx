import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/app/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedPropertiesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return (
      <section className="px-4 py-6">
        <div className="container m-auto px-5 py-6 lg:container">
          <h1 className="text-2xl mb-4">Saved Properties</h1>
          <p>Please log in to view your saved properties</p>
        </div>
      </section>
    );
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId).populate("bookmarks");

  if (!user) {
    return (
      <section className="px-4 py-6">
        <div className="container m-auto px-5 py-6 lg:container">
          <h1 className="text-2xl mb-4">Saved Properties</h1>
          <p>User not found</p>
        </div>
      </section>
    );
  }

  const { bookmarks } = user;

  return (
    <section className="px-4 py-6">
      <div className="container m-auto px-5 py-6 lg:container">
        <h1 className="text-2xl mb-4">Saved Properties</h1>

        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
