import { MaterialCommunityIcons } from "@expo/vector-icons"

type IconOptions = keyof typeof MaterialCommunityIcons.glyphMap;

export const categoriesIcons: Record<string, IconOptions> = {
  "146b1a88-b3d3-4232-8b8f-c1f006f1e86d": "silverware-spoon",
  "52e81585-f71a-44cd-8bd0-49771e45da44": "shopping",
  "57d6e5ff-35f6-4d21-a521-84f23d511d25": "bed",
  "826910d4-187d-4c15-88f4-382b7e056739": "movie",
  "abce52cf-b33b-4b3c-8972-eb72c66c83e4": "coffee",
}
