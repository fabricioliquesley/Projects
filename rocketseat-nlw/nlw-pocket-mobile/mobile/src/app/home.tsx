import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { api } from "@/api";
import { Categories } from "@/components/categories";
import { Category } from "@/utils/types";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
        <Categories 
          data={categories} 
          selectedCategoryId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
    </View>
  )

  async function fetchCategories() {
    try {
      const { data } = await api.get<Category[]>("/categories");

      setCategories(data);
      setSelectedCategoryId(data[0].id);
    } catch (err) {
      console.log(err);
      Alert.alert("Categorias", "Não foi possível carregar as categorias.");
    }
  }
}