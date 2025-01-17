import { useNavigation, useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import * as MailComposer from "expo-mail-composer";
import { api } from "../../lib/api";

interface Params {
  pointId: string;
}

interface Point {
  id: string;
  image_url: string;
  name: string;
  email: string;
  phone: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items: {
    title: string;
  }[];
}

export const Detail = () => {
  const { goBack } = useNavigation();

  const [point, setPoint] = useState<Point>({} as Point);

  const route = useRoute();
  const routeParams = route.params as Params;

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${point.phone}&text=Tenho interesse em fazer o descarte de resíduos`
    );
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: "Interesse em fazer o descarte de resíduos",
      recipients: [point.email],
    });
  }

  useEffect(() => {
    api
      .get(`/points/${routeParams.pointId}`)
      .then((response) => setPoint(response.data));
  }, []);

  if (!point.id) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity>
          <Icon
            name="arrow-left"
            size={20}
            color={"#34cb79"}
            onPress={goBack}
          />
        </TouchableOpacity>
        <Image
          style={styles.pointImage}
          source={{
            uri: point.image_url,
          }}
        />
        <Text style={styles.pointName}>{point.name}</Text>
        <Text style={styles.pointItems}>
          {point.items.map((item) => item.title).join(", ")}
        </Text>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {point.city}, {point.uf}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color={"#fff"} />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" size={20} color={"#fff"} />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: "#322153",
    fontSize: 28,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  pointItems: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: "#322153",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },

  addressContent: {
    fontFamily: "Roboto_400Regular",
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
    paddingVertical: 20,
    paddingBottom: 40,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "48%",
    backgroundColor: "#34CB79",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
  },
});
