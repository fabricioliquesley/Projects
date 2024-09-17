import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

import landingImage from "../../../assets/images/landing.png";
import studyIcon from "../../../assets/icons/study.png";
import giveClassesIcon from "../../../assets/icons/give-classes.png";
import heartIcon from "../../../assets/icons/heart.png";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

export function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);
  const { navigate } = useNavigation();

  function handleNavigateToStudyScreen() {
    navigate("Study");
  }

  function handleNavigateToGiveClassesScreen() {
    navigate("GiveClasses");
  }

  useEffect(() => {
    api
      .get("/connections")
      .then((response) => setTotalConnections(response.data.total));
  }, []);

  return (
    <View style={styles.container}>
      <Image source={landingImage} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem-vindo, {"\n"}
        <Text style={styles.titleBold}>O que desja fazer?</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudyScreen}
          activeOpacity={0.6}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToGiveClassesScreen}
          activeOpacity={0.6}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aula</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas{" "}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}
