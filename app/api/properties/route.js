import connectDB from "@/app/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async () => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return new Response(JSON.stringify({ message: "Failed to fetch properties" }), {
      status: 500,
    });
  }
};

// POST /api/properties
export const POST = async (request) => {
  try {
    await connectDB();

    const propertyData = await request.json();

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return new Response(JSON.stringify(newProperty), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating property:', error);
    return new Response(
      JSON.stringify({
        message: "Failed to create property",
        error: error.message
      }),
      {
        status: 500,
      }
    );
  }
};
