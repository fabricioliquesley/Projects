import { ActivityIndicator, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { styles } from "./styles";
import { COLORS } from "@/styles/theme";

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean;
}

function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.8} 
      style={[styles.container, style]}
      {...rest}
    >
      {
        isLoading 
          ? <ActivityIndicator color={COLORS.gray[100]} size={"small"}/> 
          : children
      }
    </TouchableOpacity>
  )
}

function ButtonTitle({ children }: TextProps) {
  return (
    <Text style={styles.title}>{children}</Text>
  )
}

type ButtonIconProps = {
  name: keyof typeof FontAwesome.glyphMap;
}

function ButtonIcon({ name }: ButtonIconProps) {
  return (
    <FontAwesome name={name} size={24} color={COLORS.gray[100]}/>
  )
}

Button.Title = ButtonTitle;
Button.Icon = ButtonIcon;

export { Button };