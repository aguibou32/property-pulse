import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";
import connectDB from "../config/database";
import Property from "@/models/Property";

const PropertiesPage = async ({ searchParams: { page = 1, pageSize = 9 } }) => {
  await connectDB();

  // Ensure page is at least 1
  const currentPage = Math.max(1, parseInt(page));
  const pageSizeNum = parseInt(pageSize);

  const skip = (currentPage - 1) * pageSizeNum;
  const total = await Property.countDocuments({});

  const properties = await Property.find({}).skip(skip).limit(pageSizeNum);

  const showPagination = total > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {showPagination && (
          <Pagination
            page={currentPage}
            pageSize={pageSizeNum}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};
export default PropertiesPage;
