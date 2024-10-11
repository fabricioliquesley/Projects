import { FlatList } from "react-native";

import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";

interface CategoriesProps {
  selectedCategory: string;
  onChange: (category: string) => void;
}

export function Categories({ selectedCategory, onChange }: CategoriesProps) {
  return (
    <FlatList 
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <Category 
          title={item.title} 
          icon={item.icon} 
          isSelected={item.title === selectedCategory}  
          onPress={() => onChange(item.title)}
        />)}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    />
  )
}