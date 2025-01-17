import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import * as Location from "expo-location";

interface Params {
  uf: string;
  city: string;
}

interface Item {
  id: string;
  title: string;
  image_url: string;
}

interface Points {
  id: string;
  image_url: string;
  name: string;
  email: string;
  phone: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
}

export const Points = () => {
  const { goBack, navigate } = useNavigation();

  const route = useRoute();
  const { uf, city } = route.params as Params;

  const [currentDeviceLocation, setCurrentDeviceLocation] = useState<
    [number, number]
  >([0, 0]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Points[]>([]);

  function handleMarkerPress(pointId: string) {
    navigate("Detail", { pointId });
  }

  function handleSelectItem(title: string) {
    if (selectedItems.includes(title)) {
      return setSelectedItems([
        ...selectedItems.filter((item) => item !== title),
      ]);
    }

    setSelectedItems([...selectedItems, title]);
  }

  // get user location
  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Ooooops...",
          "Precisamos de sua permissão para obter a localização."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      setCurrentDeviceLocation([
        location.coords.latitude,
        location.coords.longitude,
      ]);
    }

    loadPosition();
  }, []);

  // get points
  useEffect(() => {
    api
      .get(`/points?city=${city}&uf=${uf}&items=${selectedItems.join(",")}`)
      .then((response) => setPoints(response.data));
  }, [selectedItems]);

  // get items
  useEffect(() => {
    api.get("/items").then((response) => setItems(response.data));
  }, []);

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
        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>
        <View style={styles.mapContainer}>
          {currentDeviceLocation[0] !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: currentDeviceLocation[0],
                longitude: currentDeviceLocation[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <Marker
                  key={point.id}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  onPress={() => handleMarkerPress(point.id)}
                  style={styles.mapMarker}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      source={{
                        uri: point.image_url,
                      }}
                      style={styles.mapMarkerImage}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 28,
          }}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                selectedItems.includes(item.title) ? styles.selectedItem : {},
              ]}
              activeOpacity={0.6}
              onPress={() => handleSelectItem(item.title)}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Roboto_400Regular",
  },

  mapContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: "#34CB79",
    flexDirection: "column",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: "cover",
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    color: "#FFF",
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "space-between",

    textAlign: "center",
  },

  selectedItem: {
    borderColor: "#34CB79",
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 13,
  },
});
