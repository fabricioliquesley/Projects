import { styles } from "./styles";
import { ScrollView, View } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";

import { Class, ProffyCard } from "../../components/ProffyCard";
import { ScreenHeader } from "../../components/ScreenHeader";

export function TeacherFavorites() {
  const [classes, setClasses] = useState<Class[]>([]);

  async function loadClasses() {
    const response = await api.get("/classes");

    return response.data as Class[];
  }

  useFocusEffect(() => {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favorites = JSON.parse(response) as string[];

        loadClasses().then((response) => {
          setClasses(response.filter((item) => favorites.includes(item.id)));
        });
      }
    });
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScreenHeader title="Meus proffys favoritos" />
        <View style={styles.cardContainer}>
          {classes.map((_class) => (
            <ProffyCard key={_class.id} {..._class} isAFavoriteProffy />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
