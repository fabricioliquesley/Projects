import { FlatList } from "react-native";
import { Category } from "../category";
import { categoriesIcons } from "@/utils/categories-icons";
import { Category as CategoryType} from "@/utils/types";

import { styles } from "./styles";

type CategoriesProps = {
  data: Array<CategoryType>
  selectedCategoryId: string
  onSelect: (categoryId: string) => void
}

export function Categories({ data, selectedCategoryId, onSelect }: CategoriesProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(category) => category.id}
      renderItem={({ item }) => (
        <Category 
          name={item.name} 
          iconName={categoriesIcons[item.id]}
          isSelected={selectedCategoryId === item.id}
          onPress={() => onSelect(item.id)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.container}
    />
  )
}