import { Text, TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "@/styles/colors";

interface OptionProps extends TouchableOpacityProps {
  title: string
  icon: keyof typeof MaterialIcons.glyphMap
  variant?: "primary" | "secondary"
}

export function Option({ title, icon, variant = "primary", ...rest }: OptionProps) {
  const COLOR_ICON = {
    primary: colors.green[300],
    secondary: colors.gray[400]
  }

  const TITLE_STYLE = {
    primary: styles.primaryTitle,
    secondary: styles.secondaryTitle
  }

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <MaterialIcons name={icon} size={20} color={COLOR_ICON[variant]}/>
      <Text style={[styles.titleBase, TITLE_STYLE[variant]]}>{title}</Text>
    </TouchableOpacity>
  )
}