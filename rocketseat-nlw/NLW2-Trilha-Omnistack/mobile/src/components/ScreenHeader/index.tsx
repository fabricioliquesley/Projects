import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

import arrowLeft from "../../../assets/icons/back.png";
import logo from "../../../assets/images/logo.png";
import { ReactNode } from "react";

interface ScreenHeaderProps {
  title: string;
  filter?: ReactNode;
  children?: ReactNode;
}

export function ScreenHeader({
  title,
  filter: Filter,
  children,
}: ScreenHeaderProps) {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate("Landing");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={arrowLeft} style={{ resizeMode: "contain" }} />
        </TouchableOpacity>
        <Image source={logo} style={{ resizeMode: "contain" }} />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {Filter && Filter}
      </View>
      {children}
    </View>
  );
}
