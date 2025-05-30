import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// Mutation to check if a plant is saved by the user
export const isPlantSaved = mutation({
  args: { userId: v.string(), plantId: v.id("plants") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("saved")
      .withIndex("by_user_plant", (q) =>
        q.eq("userId", args.userId).eq("plantId", args.plantId)
      )
      .first();
    return existing !== null;
  },
});

// Query plants by category and check if they are saved by the user
export const getPlantByCategory = query({
  args: {
    category: v.string(),
    userId: v.string(), // Add userId as an argument to check if plants are saved
  }, //
  handler: async (ctx, args) => {
    const plants = await ctx.db
      .query("plants")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();

    return await Promise.all(
      plants.map(async (plant) => {
        // Query the 'saved' table directly to check if the plant is saved by the user
        const existing = await ctx.db
          .query("saved")
          .withIndex("by_user_plant", (q) =>
            q.eq("userId", args.userId).eq("plantId", plant._id)
          )
          .first();

        // Add the 'isSaved' property based on whether the plant is saved by the user
        const isSaved = existing !== null;

        return {
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
          saved: isSaved, // Include the 'isSaved' field in the response
        };
      })
    );
  },
});
