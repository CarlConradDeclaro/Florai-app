import { query } from "../_generated/server";

export const getPlants = query({
  handler: async (ctx) => {
    const plants = await ctx.db.query("plants").collect();

    return await Promise.all(
      plants.map(async (plant) => ({
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
//
