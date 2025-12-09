import connectDB from "@/app/config/database";
import Property from "@/models/Property";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch property" }),
      {
        status: 500,
      }
    );
  }
};

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const propertyData = await request.json();

    const updatedProperty = await Property.findByIdAndUpdate(
      params.id,
      propertyData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProperty) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating property:', error);
    return new Response(
      JSON.stringify({
        message: "Failed to update property",
        error: error.message
      }),
      {
        status: 500,
      }
    );
  }
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const deletedProperty = await Property.findByIdAndDelete(params.id);

    if (!deletedProperty) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Property deleted successfully",
        property: deletedProperty
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error deleting property:', error);
    return new Response(
      JSON.stringify({ message: "Failed to delete property" }),
      {
        status: 500,
      }
    );
  }
};
