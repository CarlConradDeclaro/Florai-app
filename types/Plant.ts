export type Plant = {
  _id: string;
  category?: string;
  common_name: string;
  culinaryUse?: string;
  description: string;
  humidityPreference?: string;
  url?: string;
  life_span?: string;
  medicinalUses?: string;
  plant_Type?: string;
  scientific_name?: string;
  sunlight?: string;
  wateringNeeds?: string;
};

export type UserPreferences = {
  category?: string;
  sunlight?: string;
  humidityPreference?: string;
  wateringNeeds?: string;
};

export type RegisterError = {
  [key: string]: string[]; // example: { username: ["This field is required"] }
};
