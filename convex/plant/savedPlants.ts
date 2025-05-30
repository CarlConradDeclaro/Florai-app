import { mutation, query } from "../_generated/server"; // Correct import
import { v } from "convex/values";

// Mutation to save plant
export const savePlant = mutation({
  args: { userId: v.string(), plantId: v.id("plants") },
  handler: async (ctx, args) => {
    // Query for existing saved plant entry
    const existing = await ctx.db
      .query("saved") // Use the imported 'saved' schema here
      .withIndex("by_user_plant", (q) =>
        q.eq("userId", args.userId).eq("plantId", args.plantId)
      )
      .first();

    if (!existing) {
      // Insert new saved plant record if it doesn't exist
      const result = await ctx.db.insert("saved", {
        // Use the 'saved' schema here
        userId: args.userId,
        plantId: args.plantId,
        savedAt: Date.now(),
      });
      return { status: "saved", id: result };
    }

    return { status: "already_saved" };
  },
});

export const getSavedPlantsByCategory = query({
  args: { userId: v.string(), category: v.string() },
  handler: async (ctx, args) => {
    const savedRecords = await ctx.db
      .query("saved") // Query the 'saved' table
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Fetch plants based on saved records and filter by category
    const plantIds = savedRecords
      .map((savedRecord) => savedRecord.plantId) // Extract plantIds from saved records
      .filter((plantId) => plantId !== null); // Ensure the plantId is not null

    // Fetch the plant data using plantIds
    const plants = await Promise.all(
      plantIds.map(async (plantId) => {
        const plant = await ctx.db.get(plantId); // Fetch each plant from the 'plants' table
        if (plant && plant.category === args.category) {
          // Return the full plant data as desired
          return {
            _id: plant._id,
            common_name: plant.common_name,
            category: plant.category,
            url: await ctx.storage.getUrl(plant.imageId), // Assuming you have imageId for URL
            culinaryUse: plant.culinaryUse,
            description: plant.description,
            humidityPreference: plant.humidityPreference,
            life_span: plant.life_span,
            medicinalUses: plant.medicinalUses,
            plant_Type: plant.plant_Type,
            scientific_name: plant.scientific_name,
            sunlight: plant.sunlight,
            wateringNeeds: plant.wateringNeeds,
            saved: true,
          };
        }
        return null; // If the plant doesn't match the category, return null
      })
    );

    // Filter out any null values and return the plants that matched the category
    return plants.filter((p) => p !== null);
  },
});

export const getSavedPlants = query({
  args: { userId: v.string() }, // Only require userId
  handler: async (ctx, args) => {
    // Query the 'saved' table to get all records for the given userId
    const savedRecords = await ctx.db
      .query("saved")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Extract the plantIds from the saved records
    const plantIds = savedRecords
      .map((savedRecord) => savedRecord.plantId)
      .filter((plantId) => plantId !== null); // Ensure plantId is not null

    // Fetch the plant details using the plantIds
    const plants = await Promise.all(
      plantIds.map(async (plantId) => {
        const plant = await ctx.db.get(plantId); // Fetch each plant from the 'plants' table
        if (plant) {
          return {
            _id: plant._id,
            common_name: plant.common_name,
            category: plant.category,
            url: await ctx.storage.getUrl(plant.imageId), // Get the plant image URL
            culinaryUse: plant.culinaryUse,
            description: plant.description,
            humidityPreference: plant.humidityPreference,
            life_span: plant.life_span,
            medicinalUses: plant.medicinalUses,
            plant_Type: plant.plant_Type,
            scientific_name: plant.scientific_name,
            sunlight: plant.sunlight,
            wateringNeeds: plant.wateringNeeds,
          };
        }
        return null; // If the plant doesn't exist
      })
    );

    // Filter out null values (if any plants were not found)
    return plants.filter((p) => p !== null);
  },
});

export const unsavePlant = mutation({
  args: { userId: v.string(), plantId: v.id("plants") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("saved")
      .withIndex("by_user_plant", (q) =>
        q.eq("userId", args.userId).eq("plantId", args.plantId)
      )
      .first();

    if (existing) {
      console.log("Found saved record with ID:", existing._id);

      await ctx.db.delete(existing._id); // ✅ CORRECT: don't pass collection name
    } else {
      console.log("No saved plant record found for the given user and plant.");
    }
  },
});
