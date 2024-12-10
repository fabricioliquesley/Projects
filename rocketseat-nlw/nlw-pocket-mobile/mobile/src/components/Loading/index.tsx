import { ActivityIndicator } from "react-native";

import { styles } from "./styles";
import { COLORS } from "@/styles/theme";

export function Loading() {
  return (
    <ActivityIndicator color={COLORS.green.base} style={styles.container}/>
  )
}