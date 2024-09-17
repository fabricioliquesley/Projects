import { styles } from "./styles";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import background from "../../../assets/images/give-classes-background.png";

export function GiveClasses() {
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.background}>
        <Text style={styles.title}>Quer ser um proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web.
        </Text>
      </ImageBackground>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Tudo bem</Text>
      </TouchableOpacity>
    </View>
  );
}
