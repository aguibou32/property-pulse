import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/app/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertySearchForm from "@/components/ProperySearchForm";
import convertToSerializableObject from "@/utils/convertToObject";

const SearchResultsPage = async ({ searchParams }) => {

  await connectDB();

  const { location, propertyType } = searchParams;

  const locationPattern = new RegExp(location, "i");

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ]
  };

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = propertiesQueryResults.map(convertToSerializableObject);

  return (
    <>
      <section className="py-4 bg-blue-700">
        <div className="mx-auto max-w-7xl flex flex-col items-start px-4 lg:px-8 sm:px-6">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl m-auto px-4 py-6 lg:container">
          <Link
            href="/properties"
            className="flex items-center mb-3 text-blue-500 hover:underline"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Properties
          </Link>
          <h1 className="mb-4 text-2xl">Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
