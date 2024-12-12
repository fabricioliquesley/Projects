import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { api } from "@/api";
import { Categories } from "@/components/categories";
import { Category, Place } from "@/utils/types";
import { Places } from "@/components/Places";

type MarketsProps = Place & {};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [markets, setMarkets] = useState<MarketsProps[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [selectedCategoryId]);

  return (
    <View style={{ flex: 1 }}>
        <Categories 
          data={categories} 
          selectedCategoryId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
        <Places data={markets}/>
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

  async function fetchMarkets() {
    try {
      if (!selectedCategoryId) return;

      const { data } = 
        await api.get<Place[]>(`/markets/category/${selectedCategoryId}`);

      setMarkets(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Locais", "Não foi possível carregar os locais.")
    }
  }
}