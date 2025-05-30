import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

export const helloHandler = httpAction(async (ctx, request) => {
  const plants = await ctx.runQuery(api.plant.getPlants.getPlants, {});

  return new Response(JSON.stringify({ plants }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});
