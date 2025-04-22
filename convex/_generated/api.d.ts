/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as api_ from "../api.js";
import type * as http from "../http.js";
import type * as plant_getPlantByCategory from "../plant/getPlantByCategory.js";
import type * as plant_getPlants from "../plant/getPlants.js";
import type * as plant_getSuggested from "../plant/getSuggested.js";
import type * as plant_savedPlants from "../plant/savedPlants.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  api: typeof api_;
  http: typeof http;
  "plant/getPlantByCategory": typeof plant_getPlantByCategory;
  "plant/getPlants": typeof plant_getPlants;
  "plant/getSuggested": typeof plant_getSuggested;
  "plant/savedPlants": typeof plant_savedPlants;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
