import type { MaterialIcons } from "@expo/vector-icons";

type Category = {
  id: string;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export const categories: Category[] = [
  { id: "1", title: "Curso", icon: "school" },
  { id: "2", title: " Projeto", icon: "folder" },
  { id: "3", title: "Site", icon: "language" },
  { id: "4", title: "Artigo", icon: "newspaper" },
  { id: "5", title: "Video", icon: "movie" },
  { id: "6", title: "Documentação", icon: "content-paste" },
];