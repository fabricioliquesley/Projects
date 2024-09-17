import { StyleSheet, View, Image, Text, ImageBackground } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";

import { Feather as Icon } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";

type Uf = {
  id: string;
  sigla: string;
  nome: string;
};

type City = {
  id: string;
  nome: string;
};

export const Home = () => {
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [ufs, setUfs] = useState<Uf[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const navigation = useNavigation();

  function handleNavigateToPoints() {
    navigation.navigate("Points", { uf: selectedUf, city: selectedCity });
  }

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => setUfs(response.data));
  }, []);

  useEffect(() => {
    if (selectedUf === "") return;

    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => setCities(response.data));
  }, [selectedUf]);

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      imageStyle={{ width: 274, height: 368 }}
      style={styles.container}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.selectContainer}>
          <View style={styles.selectView}>
            <RNPickerSelect
              style={{
                inputAndroid: styles.select,
                inputIOS: styles.select,
              }}
              placeholder={{ label: "Selecione o estado", value: "" }}
              onValueChange={(value) => setSelectedUf(value)}
              items={ufs.map((uf) => {
                return { label: `${uf.nome} (${uf.sigla})`, value: uf.sigla };
              })}
            />
          </View>
          <View style={styles.selectView}>
            <RNPickerSelect
              style={{
                inputAndroid: styles.select,
                inputIOS: styles.select,
              }}
              placeholder={{ label: "Selecione a cidade", value: "" }}
              onValueChange={(value) => setSelectedCity(value)}
              items={cities.map((city) => {
                return { label: city.nome, value: city.nome };
              })}
            />
          </View>
        </View>
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name="arrow-right" color={"#fff"} size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  selectContainer: {
    gap: 8,
    marginBottom: 24,
  },

  selectView: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  select: {
    backgroundColor: "transparent",
    color: "#A0A0B2",
  },

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});
