import { styles } from "./styles";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScreenHeader } from "../../components/ScreenHeader";
import { Class, ProffyCard } from "../../components/ProffyCard";
import { api } from "../../services/api";

export function TeacherList() {
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [classes, setClasses] = useState<Class[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        setFavorites(JSON.parse(response));
      }
    });
  }

  async function handleFilterSubmit() {
    loadFavorites();

    const response = await api.get("/classes", {
      params: {
        week_day: weekDay,
        subject,
        time,
      },
    });

    setClasses(response.data);
    setFiltersVisible(false);
  }

  function FilterComponent() {
    return (
      <TouchableOpacity
        style={{ padding: 8 }}
        onPress={() => setFiltersVisible(!isFiltersVisible)}
      >
        <Feather name="filter" size={20} color={"#fff"} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScreenHeader title="Proffys Disponiveis" filter={<FilterComponent />}>
          {isFiltersVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Matéria</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={(text) => setSubject(text)}
              />

              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <TextInput
                    style={styles.input}
                    value={weekDay}
                    onChangeText={(text) => setWeekDay(text)}
                  />
                </View>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput
                    style={styles.input}
                    value={time}
                    onChangeText={(text) => setTime(text)}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleFilterSubmit}
              >
                <Text style={styles.buttonText}>Filtrar</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScreenHeader>
        <View style={styles.cardContainer}>
          {classes.map((_class) => (
            <ProffyCard
              key={_class.id}
              {..._class}
              isAFavoriteProffy={favorites.includes(_class.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
