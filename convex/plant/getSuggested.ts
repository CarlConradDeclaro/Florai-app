import { query } from "../_generated/server";
import { v } from "convex/values";

export const getSuggestedPlants = query({
  args: {
    category: v.optional(v.string()),
    sunlight: v.optional(v.string()),
    humidityPreference: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { category, sunlight, humidityPreference } = args;

    // Fetch all plants from the database
    const plants = await ctx.db.query("plants").collect();

    // Filter plants based on user preferences (e.g., sunlight, wateringNeeds, type)
    const suggestedPlants = plants.filter((plant) => {
      return (
        plant.category.toLowerCase().includes(category?.toLowerCase()) ||
        plant.sunlight.toLowerCase().includes(sunlight?.toLowerCase()) ||
        plant.humidityPreference
          .toLowerCase()
          .includes(humidityPreference?.toLowerCase())
      );
    });

    // If no plants match, return a default suggestion
    if (suggestedPlants.length === 0) {
      return [
        { name: "No plants found matching your preference, try another." },
      ];
    }

    // Return the mapped plant details
    return await Promise.all(
      suggestedPlants.map(async (plant) => ({
        _id: plant._id,
        common_name: plant.common_name,
        category: plant.category,
        url: await ctx.storage.getUrl(plant.imageId),
        culinaryUse: plant.culinaryUse,
        description: plant.description,
        humidityPreference: plant.humidityPreference,
        life_span: plant.life_span,
        medicinalUses: plant.medicinalUses,
        plant_Type: plant.plant_Type,
        scientific_name: plant.scientific_name,
        sunlight: plant.sunlight,
        wateringNeeds: plant.wateringNeeds,
      }))
    );
  },
});
