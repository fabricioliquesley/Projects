import { styles } from "./styles";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import whatsAppIcon from "../../../assets/icons/whatsapp.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { api } from "../../services/api";

export interface Class {
  id: string;
  subject: string;
  cost: number;
  user_id: string;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface ProffyCardProps extends Class {
  isAFavoriteProffy?: boolean;
}

export function ProffyCard({
  isAFavoriteProffy,
  ...classData
}: ProffyCardProps) {
  const [isFavorited, setIsFavorited] = useState(isAFavoriteProffy);

  async function handleContactTeacher() {
    await api.post("/connections", { user_id: classData.id });

    Linking.openURL(`whatsapp://send?phone=${classData.whatsapp}`);
  }

  async function handleToggleFavorite(id: string) {
    let favorites = JSON.parse(
      (await AsyncStorage.getItem("favorites")) ?? "[]"
    ) as string[];

    if (isFavorited) {
      favorites = favorites.filter((item) => item !== id);
    } else {
      favorites.push(id);
    }

    setIsFavorited(!isFavorited);
    return await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: classData.avatar,
          }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.teacherName}>{classData.name}</Text>
          <Text style={styles.subject}>{classData.subject}</Text>
        </View>
      </View>
      <Text style={styles.description}>{classData.bio}</Text>
      <View style={styles.footer}>
        <Text style={[styles.description, { marginTop: 0 }]}>
          Preço/hora{" "}
          <Text style={styles.price}>
            {" "}
            {classData.cost.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              isFavorited ? styles.removeFavoriteButton : styles.favoriteButton,
            ]}
            activeOpacity={0.7}
            onPress={() => handleToggleFavorite(classData.id)}
          >
            <Ionicons
              name={isFavorited ? "heart-dislike-outline" : "heart-outline"}
              size={24}
              color={"#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.contactButton]}
            activeOpacity={0.7}
            onPress={handleContactTeacher}
          >
            <Image source={whatsAppIcon} />
            <Text style={styles.buttonText}>Entrar em contato</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
