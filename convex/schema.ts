import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  saved: defineTable({
    userId: v.string(),
    plantId: v.id("plants"),
    savedAt: v.number(),
  })
    .index("by_user", ["userId"]) // Optional index for querying by user
    .index("by_user_plant", ["userId", "plantId"]),
});
